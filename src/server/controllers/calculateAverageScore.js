function calculateAverageScore (peak) {
    let scores = 0;
    let scoreNames = [];
    if (peak.hasOwnProperty("lengthScore")) {
        scores ++;
        scoreNames.push("lengthScore");
    }
    if (peak.hasOwnProperty("gainScore")) {
        scores ++;
        scoreNames.push("gainScore");
    }
    if (peak.hasOwnProperty("trafficScore")) {
        scores ++;
        scoreNames.push("trafficScore");
    }
    if (peak.hasOwnProperty("classPreferenceScore")) {
        scores ++;
        scoreNames.push("classPreferenceScore");
    }
    if (peak.hasOwnProperty("distanceScore")) {
        scores ++;
        scoreNames.push("distanceScore");
    }

    let totalScore = 0;

    for (let i = 0; i < scoreNames.length; i++) {
        totalScore += peak[scoreNames[i]];
    }
    if (totalScore && scores) {
        let averageScore = totalScore/scores;
        return averageScore;
    } else {
        return null;
    }

}

module.exports = {
    calculateAverageScore
}