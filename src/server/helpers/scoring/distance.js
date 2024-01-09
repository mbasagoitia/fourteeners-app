import fetch from 'isomorphic-fetch';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.MAPS_API_KEY;

// Calculate the distance from all remaining peaks from the user's location.
// Peaks below or equal to the user's max distance get a score of 10

async function calculateDistance (userLocation, peakLat, peakLng) {
    const userLat = userLocation.lat;
    const userLng = userLocation.lng;

    try {
        const res = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${peakLat},${peakLng}&origins=${userLat},${userLng}&units=imperial&key=${apiKey}`);
        const data = await res.json();
        if (res.status !== 200) {
            throw new Error(data.error_message || "Failed to calculate distance")
        }
        if (data.rows[0].elements[0].status === "OK") {
            const distance = data.rows[0].elements[0].distance.text;
            const duration = data.rows[0].elements[0].duration.text;
            return { distance, duration };
        }
    } catch (err) {
        console.error(err);
    }
}

async function updatePeakDistances(location, peaks, calculateDistance) {
    const updatedPeaks = [];
    for (let peak of peaks) {
        const res = await calculateDistance(location, peak.latitude, peak.longitude);
        if (res) {
            peak.distanceFromUser = res.distance;
            peak.durationFromUser = res.duration;
        }
        updatedPeaks.push(peak);
    }
    return updatedPeaks;
}

const distanceRanges = [
    {
        value: 1,
        min: 0,
        max: 25,
        score: null
    },
    {
        value: 2,
        min: 26,
        max: 50,
        score: null
    },
    {
        value: 3,
        min: 51,
        max: 100,
        score: null
    },
    {
        value: 4,
        min: 101,
        max: 200,
        score: null
    },
    {
        value: 5,
        min: 201,
        max: 300,
        score: null
    },
    {
        value: 6,
        min: 301,
        max: 100000,
        score: null
    }
];

function scoreDistanceRanges (maxDistance, distanceRanges) {
    for (let range of distanceRanges) {
        if (range.value === parseInt(maxDistance)) {
            range.score = 10;
        } else if (range.value === (parseInt(maxDistance) + 1) || range.value === (parseInt(maxDistance) - 1)) {
            range.score = 8;
        } else if (range.value === (parseInt(maxDistance) + 2) || range.value === (parseInt(maxDistance) - 2)) {
            range.score = 6;
        } else if (range.value === (parseInt(maxDistance) + 3) || range.value === (parseInt(maxDistance) - 3)) {
            range.score = 4;
        } else if (range.value === (parseInt(maxDistance) + 4) || range.value === (parseInt(maxDistance) - 4)) {
            range.score = 2;
        } else if (range.value === (parseInt(maxDistance) + 5) || range.value === (parseInt(maxDistance) - 5)) {
            range.score = 1;
        }
    }
}

function assignDistanceScore(peak, distanceRanges) {
    for (let range of distanceRanges) {
        if (parseInt(peak.distanceFromUser) >= parseInt(range.min) && parseInt(peak.distanceFromUser) <= parseInt(range.max)) {
            return range.score;
        } 
    }   
}

export {
    calculateDistance,
    updatePeakDistances,
    distanceRanges,
    scoreDistanceRanges,
    assignDistanceScore
}