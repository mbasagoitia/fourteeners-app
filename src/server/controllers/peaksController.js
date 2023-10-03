// Select peaks and routes of a certain range and difficulty

// SELECT DISTINCT peaks.name, routes.route_name, routes.difficulty FROM routes
// INNER JOIN peaks ON peaks.id = routes.peak_id
// INNER JOIN ranges WHERE peaks.range = "San Juan" AND routes.difficulty IN ("Class 1", "Class 2");

const scorePeaks = (responses) => {
    const { experience, location, distance, range, class: classLevel, classPreference, exposure, traffic, length, gain } = responses;
    // Responses will be an object in the following format:
    // {
    //     experience: "1",
    //     class: "1",
    //     classPreference: "1",
    //     exposure: "1",
    //     length: "0",
    //     gain: "0"
    //     location: userLocation,
    //     distance: "0",
    //     range: "0",
    //     traffic: "0",
    // }

    // lengthScore, gainScore, distanceScore, classPreferenceScore, trafficScore
    
    // Get all routes from the database whose class matches the user's class and below AND exposure level and below
    // If the user has selected not to get peaks they've already climbed, check their list and remove those peaks.

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