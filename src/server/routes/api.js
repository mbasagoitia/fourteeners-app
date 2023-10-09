const express = require("express");
const dotenv = require("dotenv");
const { scorePeaks } = require("../controllers/peaksController");

dotenv.config();

const router = express.Router();

const apiKey = process.env.MAPS_API_KEY;

router.get("/api-key", (req, res) => {
    res.json({ apiKey });
})

router.get("/recommend-peaks", (req, res) => {
    res.json("hello world");
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
