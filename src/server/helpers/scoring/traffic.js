// Traffic level values represent levels of traffic (other hikers) on each peak, ranging from low to critical

const trafficLevels = [
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

function scoreTrafficLevels (traffic, trafficLevels) {
    for (let level of trafficLevels) {
        if (level.value === parseInt(traffic)) {
            level.score = 10;
        } else if (level.value === (parseInt(traffic) + 1) || level.value === (parseInt(traffic) - 1)) {
            level.score = 8;
        } else if (level.value === (parseInt(traffic) + 2) || level.value === (parseInt(traffic) - 2)) {
            level.score = 6;
        } else if (level.value === (parseInt(traffic) + 3) || level.value === (parseInt(traffic) - 3)) {
            level.score = 4;
        } else if (level.value === (parseInt(traffic) + 4) || level.value === (parseInt(traffic) - 4)) {
            level.score = 2;
        }
    }
}

// Assign a trafficScore to each peak

function assignTrafficScore(traffic, trafficLevels) {
    for (let level of trafficLevels) {
        if (parseInt(traffic) === parseInt(level.value)) {
            return level.score;
        } 
    }   
}

export {
    trafficLevels,
    scoreTrafficLevels,
    assignTrafficScore
}