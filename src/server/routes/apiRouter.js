import express from 'express';
import dotenv from 'dotenv';


dotenv.config();

const router = express.Router();

const mapsApiKey = process.env.MAPS_API_KEY;
const weatherApiKey = process.env.WEATHER_API_KEY;

router.get("/maps-api-key", (req, res, next) => {
    res.json({ mapsApiKey });
})

router.get("/weather-api-key", (req, res, next) => {
    res.json({ weatherApiKey });
})

export default router;

