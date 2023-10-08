const fetch = require("isomorphic-fetch");
const dotenv = require("dotenv");
dotenv.config();

const apiKey = process.env.MAPS_API_KEY;

// Calculate the distance from all remaining peaks from the user's location.
// Peaks that fall outside of the user's preferred distance range get an additional score of 0.
// Filter these peaks "on a curve"
// If there are any within 1-25 miles, they get a score of 10. If not, those within 26-50 miles get 10. If none of those, those within 51-100 miles get 10, and those in higher groups get 8, 6, etc.
// And so on but DO NOT give any additional score to peaks beyond the user's preferred driving range.
async function calculateDistance (userLocation, peakLat, peakLng) {
    const userLat = userLocation.lat;
    const userLng = userLocation.lng;

    try {
        const res = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${peakLat},${peakLng}&origins=${userLat},${userLng}&units=imperial&key=${apiKey}`);
        const data = await res.json();
        if (res.status !== 200) {
            throw new Error(data.error_message || "Failed to calculate distance")
        }
        // There's an issue here accessing the correct distance off of data. Use some console.logs to figure it out.
        console.log("new calculation");
        console.log(data);
        if (data.rows[0].elements[0].status === "OK") {
            const distance = data.rows[0].elements[0].distance.text;
            const duration = data.rows[0].elements[0].duration.text;
            return { distance, duration };
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    calculateDistance
}