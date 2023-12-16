// The different ranges of trail lengths. Min and max represent miles. A score will be dynamically assigned based on user preferences.

const lengthRanges = [
    {
        value: 1,
        min: 1,
        max: 5,
        score: null
    },
    {
        value: 2,
        min: 6,
        max: 10,
        score: null
    },
    {
        value: 3,
        min: 11,
        max: 15,
        score: null
    },
    {
        value: 4,
        min: 16,
        max: 20,
        score: null
    },
    {
        value: 5,
        min: 21,
        max: 26,
        score: null
    }
];

// Weight (score) the different ranges in lengthRanges according to user preferences. The farther away from the user's length preference a range is, the less weight it receives.

function scoreLengthRanges (length, lengthRanges) {
    for (let range of lengthRanges) {
        if (range.value === parseInt(length)) {
            range.score = 10;
        } else if (range.value === (parseInt(length) + 1) || range.value === (parseInt(length) - 1)) {
            range.score = 8;
        } else if (range.value === (parseInt(length) + 2) || range.value === (parseInt(length) - 2)) {
            range.score = 6;
        } else if (range.value === (parseInt(length) + 3) || range.value === (parseInt(length) - 3)) {
            range.score = 4;
        } else if (range.value === (parseInt(length) + 4) || range.value === (parseInt(length) - 4)) {
            range.score = 2;
        }
    }
}

// Assign a lengthScore to each individual route on a peak based on the scores in lengthRanges

function assignLengthScore(route, lengthRanges) {
    for (let range of lengthRanges) {
        if (parseInt(route.mileage) >= parseInt(range.min) && parseInt(route.mileage) <= parseInt(range.max)) {
            return range.score;
        } 
    }   
}

module.exports = {
    lengthRanges,
    scoreLengthRanges,
    assignLengthScore
}