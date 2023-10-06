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
        } else if (level.value === (max + 1) || level.value === (min - 1)) {
            level.score = 8;
        } else if (level.value === (max + 2) || level.value === (min - 2)) {
            level.score = 6;
        } else if (level.value === (max + 3) || level.value === (min - 3)) {
            level.score = 4;
        } else if (level.value === (max + 4) || level.value === (min - 4)) {
            level.score = 2;
        }
    }
}

function assignClassPreferenceScore(classLevel, classLevels) {
    // classLevel will come to you as a string such as "class 3". Use regex to extract the integer.
    // You will need to loop through the routes as before. Make sure to check that the route doesn't exceed user's comfort level.
    // Very similar logic to lengthScore
    for (let level of classLevels) {
        if (parseInt(classLevel) === parseInt(level.value)) {
            return level.score;
        }
    }   
}

module.exports = {
    classLevels,
    scoreClassLevels,
    assignClassPreferenceScore
}