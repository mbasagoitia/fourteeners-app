const express = require("express");
const dotenv = require("dotenv");
const { scorePeaks } = require("../controllers/peaksController");

dotenv.config();

// Might want to break this up into smaller router instances

const router = express.Router();

const mapsApiKey = process.env.MAPS_API_KEY;
const weatherApiKey = process.env.WEATHER_API_KEY;

router.get("/maps-api-key", (req, res) => {
    res.json({ mapsApiKey });
})

router.get("/weather-api-key", (req, res) => {
    res.json({ weatherApiKey });
})

router.post("/recommend-peaks", (req, res) => {
    if (!req.body.responses) {
        return res.status(400).json({ error: "Missing user responses" });
    }
    const { responses } = req.body;

    scorePeaks(responses)
    .then((peaks) => {
        res.json({ peaks });
    })
    .catch((err) => {
        console.error(err);
    })
})

module.exports = router;
