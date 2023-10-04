const mysql = require("mysql2");

const scorePeaks = (responses) => {
    const { experience, location, distance, range, class: classLevel, classPreference, exposure, traffic, length, gain } = responses;

    // lengthScore, gainScore, distanceScore, classPreferenceScore, trafficScore
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })

    // If the user has selected not to get peaks they've already climbed, check their list and remove those peaks.

    const classLevelArr = [];
    for (let i = 1; i <= parseInt(classLevel); i++) {
        classLevelArr.push(`'class ${i}'`);
    }
    const classLevelStr = classLevelArr.join(", ");

    // Fetching the peaks/routes that the user can safely climb based on class and exposure

    const queryPromise = new Promise((resolve, reject) => {
        connection.query(`SELECT r.*, p.* FROM routes AS r JOIN peaks AS p ON r.peak_id = p.id WHERE r.difficulty IN (${classLevelStr}) AND r.exposure <= ?`, [parseInt(exposure)], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })

    queryPromise.then((results) => {
        // Issue here with returning the results to the front end
        return results;
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        connection.end();
    })

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