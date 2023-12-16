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
  
  router.get('/allPeaks', (req, res, next) => {
    getAllPeaks(pool, req, res, next);
  });
  
  router.get('/peakDescription', (req, res, next) => {
    getPeakDescription(pool, req, res, next);
  });
  
  router.get('/completedPeaks', (req, res, next) => {
    getCompletedPeaks(pool, req, res, next);
  });
  
  router.post('/completedPeaks', (req, res, next) => {
    addCompletedPeaks(pool, req, res, next);
  });
  
  router.put('/completedPeaks/:peakId', (req, res, next) => {
    updateCompletedPeaks(pool, req, res, next);
  });

  router.delete('/completedPeaks/:peakId', (req, res, next) => {
    deleteCompletedPeaks(pool, req, res, next);
  });
  

module.exports = router;