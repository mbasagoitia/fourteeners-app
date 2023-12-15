const express = require("express");
const mysql = require('mysql2');
const dotenv = require("dotenv");

const {
    recommendPeaks,
    getAllPeaks,
    getCompletedPeaks,
    getPeakDescription,
    addCompletedPeaks,
    updateCompletedPeaks,
    deleteCompletedPeaks
} = require("../controllers/peaksController");

const router = express.Router();
dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  };

const pool = mysql.createPool(dbConfig);

router.post("/recommend-peaks", recommendPeaks);
router.get('/allPeaks', getAllPeaks);
router.get('/peakDescription', getPeakDescription);
    
router.get('/completedPeaks', getCompletedPeaks);
router.post('/completedPeaks', addCompletedPeaks);
router.put('/completedPeaks/:id', updateCompletedPeaks);
router.delete('/completedPeaks/:id', deleteCompletedPeaks);

module.exports = router;