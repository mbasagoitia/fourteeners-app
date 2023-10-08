const mysql = require("mysql2");
const { lengthRanges, scoreLengthRanges, assignLengthScore } = require("./length");
const { gainRanges, scoreGainRanges, assignGainScore } = require("./gain");
const { trafficLevels, scoreTrafficLevels, assignTrafficScore } = require("./traffic");
const { classLevels, scoreClassLevels, assignClassPreferenceScore } = require("./classPreference");
const { calculateDistance, updatePeakDistances, distanceRanges, scoreDistanceRanges, assignDistanceScore } = require("./distance");
const { calculateAverageScore } = require("./calculateAverageScore");

const scorePeaks = (responses) => {

    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })

    const { class: classLevel, exposure } = responses;

    const classLevelArr = [];
    for (let i = 1; i <= parseInt(classLevel); i++) {
        classLevelArr.push(`'class ${i}'`);
    }
    const classLevelStr = classLevelArr.join(", ");

    return new Promise((resolve, reject) => {
        // Fetch the peaks that contain routes that the user can safely climb based on class and exposure.
        // This will fetch ALL routes for each peak, so further checks will be necessary later for each individual route.
        // *** If the user has selected not to get peaks they've already climbed, check their list and remove those peaks.
        connection.query(`SELECT DISTINCT p.* FROM routes AS r JOIN peaks AS p ON r.peak_id = p.id WHERE r.difficulty IN (${classLevelStr}) AND r.exposure <= ?`, [parseInt(exposure)], (err, results) => {
            if (err) {
                reject(err);
            } else {
                // Score peaks based on user preferences
                const recommendedPeaks = assignScore(results, responses);
                resolve(recommendedPeaks);
            }
        })
    })

    async function assignScore (peaks, responses) {

        const { length, gain, traffic, classPreference, location, distance, range } = responses;
        
        // lengthScore

        if (parseInt(length)) {
            // Weight each range of trail length based on user preference
            scoreLengthRanges(length, lengthRanges);
            // We want to assign a lengthScore to each peak based on their routes.
            peaks.forEach((peak) => {
                let lengthScore = 0;
                for (let route in peak.routes) {
                    // Check that the route isn't higher than the user's class or exposure comfort levels
                    // Routes too difficult for the user won't be included in the length scoring system
                    if (parseInt(peak.routes[route].exposure) <= parseInt(exposure) && parseInt(peak.routes[route].difficulty.match(/\d+/)[0]) <= parseInt(classLevel)) {
                        let score = assignLengthScore(peak.routes[route], lengthRanges);
                        // Each peak will be assigned the score of their highest scoring route
                        if (score >= lengthScore) {
                            lengthScore = score;
                        }
                    }
                }
                // Assign lengthScore as a property on the peak object so that it can be used for later calculations
                peak.lengthScore = lengthScore;
            })
        }

        // Might consider combining logic for length and gain to make sure that the same trails that have
        // preferred length ALSO have preferred gain

        if (parseInt(gain)) {
            scoreGainRanges(gain, gainRanges);
            peaks.forEach((peak) => {
                let gainScore = 0;
                for (let route in peak.routes) {
                    if (parseInt(peak.routes[route].exposure) <= parseInt(exposure) && parseInt(peak.routes[route].difficulty.match(/\d+/)[0]) <= parseInt(classLevel)) {
                        let score = assignGainScore(peak.routes[route], gainRanges);
                        if (score >= gainScore) {
                            gainScore = score;
                        }
                    }
                }
                peak.gainScore = gainScore;
            })
        }

        if (parseInt(traffic)) {
            scoreTrafficLevels(traffic, trafficLevels);
            peaks.forEach((peak) => {
                let trafficScore = assignTrafficScore(peak.traffic_id, trafficLevels);
                peak.trafficScore = trafficScore;
            })
        }

        if (classPreference.length > 0) {
            scoreClassLevels(classPreference, classLevels);
            peaks.forEach((peak) => {
                let classPreferenceScore = 0;
                for (let route in peak.routes) {
                    if (parseInt(peak.routes[route].exposure) <= parseInt(exposure) && parseInt(peak.routes[route].difficulty.match(/\d+/)[0]) <= parseInt(classLevel)) {
                        let score = assignClassPreferenceScore(peak.routes[route], classLevels);
                        if (score >= classPreferenceScore) {
                            classPreferenceScore = score;
                        }
                    }
                }
                peak.classPreferenceScore = classPreferenceScore;
            })
        }

        if (location) {
            peaks = await updatePeakDistances(location, peaks, calculateDistance);
            scoreDistanceRanges(distance, distanceRanges);
            peaks.forEach((peak) => {
                let distanceScore = assignDistanceScore(peak, distanceRanges);
                peak.distanceScore = distanceScore;
                // Give extra points to peaks that are in the user's preferred range
                if (peak.range === range) {
                    // Is this too much? Maybe 5 points?
                    // I don't think this is working
                    peak.distanceScore += 10;
                }
            })
        }

        // This could take a while so add a loading screen in the front end 
        peaks.forEach((peak) => {
            peak.averageScore = calculateAverageScore(peak);
        })

        const topFive = [];


            return peaks;
            // Average all five scores (or however many exist) and return top five scores
    }

    // Average the five scores (lengthScore, gainScore, classPreferenceScore, distanceScore, trafficScore) and return the peaks with the highest scores.
    // Show the top peak (if there is a tie, show the one closest to the user), and top 3-5 peaks. If more than five were returned, allow users to explore them all and to filter by range, distance, and class.
}

module.exports = {
    scorePeaks,
}