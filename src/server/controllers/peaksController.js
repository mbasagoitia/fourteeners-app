const mysql = require("mysql2");

const scorePeaks = (responses) => {
    const { class: classLevel, exposure } = responses;

    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })

    const classLevelArr = [];
    for (let i = 1; i <= parseInt(classLevel); i++) {
        classLevelArr.push(`'class ${i}'`);
    }
    const classLevelStr = classLevelArr.join(", ");

    return new Promise((resolve, reject) => {
        // Fetch the peaks/routes that the user can safely climb based on class and exposure
        // *** If the user has selected not to get peaks they've already climbed, check their list and remove those peaks.
        connection.query(`SELECT DISTINCT p.* FROM routes AS r JOIN peaks AS p ON r.peak_id = p.id WHERE r.difficulty IN (${classLevelStr}) AND r.exposure <= ?`, [parseInt(exposure)], (err, results) => {
            if (err) {
                reject(err);
            } else {
                // Score peaks
                const recommendedPeaks = assignScore(results, responses);
                resolve(recommendedPeaks);
            }
        })
    })

    function assignScore (peaks, responses) {
        // const { location, distance, range, classPreference, traffic, length, gain } = responses;
        const { length } = responses;
        if (length) {

            // Assigning scores to each length range
            // The score will be determined by user preferences

            const lengthRanges = {
                1: {
                    lengthRange: "1-5",
                    score: null
                },
                2: {
                    lengthRange: "6-10",
                    score: null
                },
                3: {
                    lengthRange: "11-15",
                    score: null
                },
                4: {
                    lengthRange: "16-20",
                    score: null
                },
                5: {
                    lengthRange: "21-26",
                    score: null
                }
            };

            //Rewrite this using a for loop (score -= 2?)
            // Make it a function call score ranges and reuse
            for (let key in lengthRanges) {
                if (parseInt(key) === parseInt(length)) {
                    lengthRanges[key].score = 10;
                } else if (parseInt(key) === (parseInt(length) + 1) || parseInt(key) === (parseInt(length) - 1)) {
                    lengthRanges[key].score = 8;
                } else if (parseInt(key) === (parseInt(length) + 2) || parseInt(key) === (parseInt(length) - 2)) {
                    lengthRanges[key].score = 6;
                } else if (parseInt(key) === (parseInt(length) + 3) || parseInt(key) === (parseInt(length) - 3)) {
                    lengthRanges[key].score = 4;
                } else if (parseInt(key) === (parseInt(length) + 4) || parseInt(key) === (parseInt(length) - 4)) {
                    lengthRanges[key].score = 2;
                }
            }

            peaks.forEach((peak) => {
                let lengthScore = 0;
                for (let route of peaks.route) {
                    // Check that the particular route isn't higher than the user's class or exposure comfort levels
                    if (parseInt(route.exposure) <= parseInt(exposure) && parseInt(route.difficulty) <= parseInt(classLevel)) {
                        // Get the range of each object in lengthRanges, assign min and max values, 
                        // and check to see where each route mileage falls. 
                        // Assign the score of that route to lengthScore and only reassign if the next route has a higher score
                        // Assign lengthScore as a new property on each peak and use that for later calculations.
                        // And finally move this monstrous function into a different file!!!
                    }
                }
            })
        }


            // lengthScore
            return peaks;
            // gainScore
            // distanceScore
            // classPreferenceScore
            // trafficScore

            // return top five averages of all four scores
    }


    // Check all of the remaining peaks (those with at least one route remaining) to see if they contain routes that match the user's length preference.
    // Score each PEAK based off of their route lengths (distanceScore). If a peak has at least one route with distance of user's preference, score 10. 
    // If a peak has at least one route one step away from user's preference, score 8. Two steps away, 6. Three steps away, 4. Four steps away, 2.

    // Do the same for elevation gain (gainScore) and traffic (trafficScore).

    // Give all remaining peaks within the preferred range (if there is one) a base distanceScore of 10 points.

    // Calculate the distance from all remaining peaks from the user's location.
    // Peaks that fall outside of the user's preferred distance range get an additional score of 0.
    // Filter these peaks "on a curve"
    // If there are any within 1-25 miles, they get a score of 10. If not, those within 26-50 miles get 10. If none of those, those within 51-100 miles get 10, and those in higher groups get 8, 6, etc.
    // And so on but DO NOT give any additional score to peaks beyond the user's preferred driving range.

    // If a user selects "no preference" for any category, no peaks get a score in that category.

    // Average the five scores (lengthScore, gainScore, classPreferenceScore, distanceScore, trafficScore) and return the peaks with the highest scores.
    // Show the top peak (if there is a tie, show the one closest to the user), and top 3-5 peaks. If more than five were returned, allow users to explore them all and to filter by range, distance, and class.
}

module.exports = {
    scorePeaks,
}