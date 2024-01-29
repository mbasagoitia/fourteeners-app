import express from "express";
import mysql from 'mysql2';
import dotenv from "dotenv";
import newPeaksOnly from "../middlewares/newPeaksOnly.js";

import {
    recommendPeaks,
    getAllPeaks,
    getCompletedPeaks,
    getPeakDescription,
    addCompletedPeaks,
    updateCompletedPeaks,
    deleteCompletedPeaks
} from "../controllers/peaksController.js";

export { express, mysql, dotenv, recommendPeaks, getAllPeaks, getCompletedPeaks, getPeakDescription, addCompletedPeaks, updateCompletedPeaks, deleteCompletedPeaks };

const router = express.Router();
dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  };

const pool = mysql.createPool(dbConfig);

router.post("/recommend-peaks", newPeaksOnly(pool), (req, res, next) => {
  recommendPeaks(req, res, next);
});

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


export default router;