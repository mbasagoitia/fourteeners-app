const mysql = require("mysql2");
const { lengthRanges, scoreLengthRanges, assignLengthScore } = require("./length");
const { gainRanges, scoreGainRanges, assignGainScore } = require("./gain");
const { trafficLevels, scoreTrafficLevels, assignTrafficScore } = require("./traffic");
const { classLevels, scoreClassLevels, assignClassPreferenceScore } = require("./classPreference");
const { calculateDistance, updatePeakDistances, distanceRanges, scoreDistanceRanges, assignDistanceScore } = require("./distance");
const { calculateAverageScore } = require("./calculateAverageScore");
const { calculateBonusScore } = require("./bonusScore");

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
        if (i === 2) {
            // Accounting for class 2+ peaks. A warning will be given to users that are only comfortable with class 2.
            classLevelArr.push("'class 2+'");
        }
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

    async function assignScore(peaks, responses) {

        let { experience, length, gain, traffic, classPreference, location, distance, range } = responses;
                
        // If the user has no preferences for a certain category, give them some base "preferences" for length, gain, traffic, and classPreference
        // based on their experience level. Location, distance, and range will not be considered.

        if (!parseInt(length)) {
            // Suggest short trails for people with no experience
            if (parseInt(experience) === 1) {
                length = 1;
            }
            // Gradually increase trail length as experience increases
            if (parseInt(experience) === 2 || parseInt(experience) === 3) {
                length = 2;
            }
            if (parseInt(experience) === 4) {
                length = 3;
            }
        }
        if (!parseInt(gain)) {
            // Same logic as for length. Beginners will likey appreciate routes with gentler elevation gain.
            gain = parseInt(experience);
        }
        if (!parseInt(traffic)) {
            // For first-timers, suggest popular peaks since the most beginner-friendly peaks are also the most popular (high traffic score)
            if (parseInt(experience) === 1) {
                traffic = 5;
            }
            if (parseInt(experience) === 2) {
                traffic = 4;
            }
            // More experienced users will not be assigned a traffic preference if they don't specify one.
            // This will allow for more variation in the range of peaks selected for experienced users.
        }
        if (classLevel > 1 && classPreference.length === 0) {
            let userClassLevelArr = [];
            for (let i = 1; i <= classLevel; i++) {
                userClassLevelArr.push(i);
            }
            // Less experienced users will be suggested peaks that have their lowest comfortable class level
            if (parseInt(experience) === 1 || parseInt(experience) === 2) {
                classPreference = [...classPreference, Math.min(...userClassLevelArr)];
            }
            // More experienced users will be suggested peaks that have their highest comfortable class level, if it exists
            if (parseInt(experience) === 3 || parseInt(experience) === 4) {
                classPreference = [...classPreference, Math.max(...userClassLevelArr)];
            }
        }

        // Calculate lengthScore

        if (parseInt(length)) {
            // Weight each range of trail length based on user preference
            scoreLengthRanges(length, lengthRanges);
            // We want to assign a lengthScore to each peak based on their individual routes.
            peaks.forEach((peak) => {
                let lengthScore = 0;
                for (let route in peak.routes) {
                    // Check that the route isn't higher than the user's class or exposure comfort levels
                    // Routes too difficult for the user won't be included in the length scoring system
                    if (parseInt(peak.routes[route].exposure) <= parseInt(exposure) && parseInt(peak.routes[route].difficulty.match(/\d+/)[0]) <= parseInt(classLevel)) {
                        let score = assignLengthScore(peak.routes[route], lengthRanges);
                        // If the score is 10, meaning the route matches the user's preference,
                        // set a new property indicating this. This will be used for bonus scoring later.
                        if (score === 10) {
                            peak.routes[route].preferredLength = true;
                        }
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

        // Calculate gainScore

        if (parseInt(gain)) {
            scoreGainRanges(gain, gainRanges);
            peaks.forEach((peak) => {
                let gainScore = 0;
                for (let route in peak.routes) {
                    if (parseInt(peak.routes[route].exposure) <= parseInt(exposure) && parseInt(peak.routes[route].difficulty.match(/\d+/)[0]) <= parseInt(classLevel)) {
                        let score = assignGainScore(peak.routes[route], gainRanges);
                        if (score === 10) {
                            peak.routes[route].preferredGain = true;
                        }
                        if (score >= gainScore) {
                            gainScore = score;
                        }
                    }
                }
                peak.gainScore = gainScore;
            })
        }

        // Calculate trafficScore

        if (parseInt(traffic)) {
            scoreTrafficLevels(traffic, trafficLevels);
            peaks.forEach((peak) => {
                let trafficScore = assignTrafficScore(peak.traffic_id, trafficLevels);
                peak.trafficScore = trafficScore;
            })
        }

        // Calculate classPreferenceScore

        if (classPreference.length > 0) {
            scoreClassLevels(classPreference, classLevels);
            peaks.forEach((peak) => {
                let classPreferenceScore = 0;
                for (let route in peak.routes) {
                    if (parseInt(peak.routes[route].exposure) <= parseInt(exposure) && parseInt(peak.routes[route].difficulty.match(/\d+/)[0]) <= parseInt(classLevel)) {
                        let score = assignClassPreferenceScore(peak.routes[route], classLevels);
                        if (score === 10) {
                            peak.routes[route].preferredClass = true;
                        }
                        if (score >= classPreferenceScore) {
                            classPreferenceScore = score;
                        }
                    }
                }
                peak.classPreferenceScore = classPreferenceScore;
            })
        }

        // Calculate distanceScore

        if (range) {
            peaks.forEach((peak) => {
            // Peaks in the user's preferred range will get a base distanceScore based on whether
            // user location is specified or not. If user location is not specified, preferred range is more important.
                if (peak.range === range && !location) {
                    peak.distanceScore = 30;
                } else if (peak.range === range && location) {
                peak.distanceScore = 10;
                }
            })
        }

        if (location) {
            peaks = await updatePeakDistances(location, peaks, calculateDistance);
            scoreDistanceRanges(distance, distanceRanges);
            peaks.forEach((peak) => {
                let distanceScore = assignDistanceScore(peak, distanceRanges);
                if (peak.hasOwnProperty("distanceScore")) {
                    peak.distanceScore += distanceScore;
                } else {
                    peak.distanceScore = distanceScore;
                }
            })
        }

        // Calculate the average score of all peaks
        // This could take a while so add a loading screen on the front end 

        peaks.forEach((peak) => {
            peak.averageScore = calculateAverageScore(peak);
            // Peaks with (safe) routes that match the user's preferences perfectly (have the user's preferred length, gain, and difficulty) will have a bonus added to their average score
            let bonusScore = calculateBonusScore(peak, exposure, classLevel);
            peak.averageScore += bonusScore;
        })

        // Sort in descending order based on averageScore

        peaks.sort((a,b) => {
                // If two peaks have the same average score, the one closest to the user takes priority (if distance is specified)
                if (a.distanceFromUser && b.distanceFromUser && b.averageScore === a.averageScore) {
                    return parseInt(a.distanceFromUser.match(/\d+/)[0]) - parseInt(b.distanceFromUser.match(/\d+/)[0]);
                } 

            return b.averageScore - a.averageScore;

        })

        return { peaks };

    }
}

module.exports = {
    scorePeaks,
}