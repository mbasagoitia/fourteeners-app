// Add extra points for peaks that have at least one route that matches ALL of the 
// user's preferences for length, gain, and classPreference (or just two of them)

// I don't want to limit the user's options for which route to choose,
// but peaks with a "perfectly" matching route will be the most useful to the user
// On the front end, if there's a perfectly matching route on one of (or all) of their top three peaks, suggest it to them.

// This only allows the highest scoring route to determine the bonus score. That way, peaks with a higher number
// of routes don't compound bonus scores.


function calculateBonusScore (peak, exposure, classLevel) {
    let bonusScore = 0;
    for (let route in peak.routes) {
        let score = 0;
        if (parseInt(peak.routes[route].exposure) <= parseInt(exposure) && parseInt(peak.routes[route].difficulty.match(/\d+/)[0]) <= parseInt(classLevel)) {
            if (peak.routes[route].preferredLength && peak.routes[route].preferredGain && peak.routes[route].preferredClass) {
                score = 5;
            } else if (peak.routes[route].preferredLength && peak.routes[route].preferredClass) {
                score = 3;
            } else if (peak.routes[route].preferredLength && peak.routes[route].preferredGain) {
                score = 3;
            } else if (peak.routes[route].preferredGain && peak.routes[route].preferredClass) {
                score = 3;
            }
        }
        if (score >= bonusScore) {
            bonusScore = score;
        }
    }
    return bonusScore;
}

export {
    calculateBonusScore
}