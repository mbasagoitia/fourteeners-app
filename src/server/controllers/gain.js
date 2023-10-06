// Min and max values represent feet of elevation gain on each route

const gainRanges = [
    {
        value: 1,
        min: 1400,
        max: 2000,
        score: null
    },
    {
        value: 2,
        min: 2001,
        max: 3000,
        score: null
    },
    {
        value: 3,
        min: 3001,
        max: 4000,
        score: null
    },
    {
        value: 4,
        min: 4001,
        max: 5000,
        score: null
    },
    {
        value: 5,
        min: 5001,
        max: 6000,
        score: null
    },
    {
        value: 6,
        min: 6001,
        max: 7500,
        score: null
    }
];

function scoreGainRanges (gain, gainRanges) {
    for (let range of gainRanges) {
        if (range.value === parseInt(gain)) {
            range.score = 10;
        } else if (range.value === (parseInt(gain) + 1) || range.value === (parseInt(gain) - 1)) {
            range.score = 8;
        } else if (range.value === (parseInt(gain) + 2) || range.value === (parseInt(gain) - 2)) {
            range.score = 6;
        } else if (range.value === (parseInt(gain) + 3) || range.value === (parseInt(gain) - 3)) {
            range.score = 4;
        } else if (range.value === (parseInt(gain) + 4) || range.value === (parseInt(gain) - 4)) {
            range.score = 2;
        } else if (range.value === (parseInt(gain) + 5) || range.value === (parseInt(gain) - 5)) {
            range.score = 1;
        }
    }
}

function assignGainScore(route, gainRanges) {
    for (let range of gainRanges) {
        if (parseInt(route.gain) >= parseInt(range.min) && parseInt(route.gain) <= parseInt(range.max)) {
            return range.score;
        } 
    }   
}



module.exports = {
    gainRanges,
    scoreGainRanges,
    assignGainScore
}