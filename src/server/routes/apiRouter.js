const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

const mapsApiKey = process.env.MAPS_API_KEY;
const weatherApiKey = process.env.WEATHER_API_KEY;

router.get("/maps-api-key", (req, res) => {
    res.json({ mapsApiKey });
})

router.get("/weather-api-key", (req, res) => {
    res.json({ weatherApiKey });
})

module.exports = router;
