const classLevels = [
    {
        value: 1,
        score: null
    },
    {
        value: 2,
        score: null
    },
    {
        value: 3,
        score: null
    },
    {
        value: 4,
        score: null
    },
    {
        value: 5,
        score: null
    }
];

function scoreClassLevels (classPreference, classLevels) {
    let min = Math.min(...classPreference);
    let max = Math.max(...classPreference);

    for (let level of classLevels) {
        // There may be an issue here with the type (str vs int). Make sure to check that it's working correctly.
        if (classPreference.includes(parseInt(level.value))) {
            level.score = 10;
        } else if (level.value === (max + 1) || level.value === (min - 1) || level.value === (max - 1) || level.value === (min + 1)) {
            level.score = 8;
        } else if (level.value === (max + 2) || level.value === (min - 2) || level.value === (max - 2) || level.value === (min + 2)) {
            level.score = 6;
        } else if (level.value === (max + 3) || level.value === (min - 3) || level.value === (max - 3) || level.value === (min + 3)) {
            level.score = 4;
        } else if (level.value === (max + 4) || level.value === (min - 4) || level.value === (max - 4) || level.value === (min + 4)) {
            level.score = 2;
        }
    }
}

function assignClassPreferenceScore(route, classLevels) {
    const routeClassNum = parseInt(route.difficulty.match(/\d+/)[0]);

    for (let level of classLevels) {
        if (routeClassNum === parseInt(level.value)) {
            return level.score;
        }
    }   
}

module.exports = {
    classLevels,
    scoreClassLevels,
    assignClassPreferenceScore
}