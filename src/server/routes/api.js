const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

const apiKey = process.env.MAPS_API_KEY;

router.get("/api-key", (req, res) => {
    res.json({ apiKey });
})

module.exports = router;
