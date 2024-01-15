import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import { getPeakFeedback, insertUserFeedback } from '../controllers/feedbackController.js';

dotenv.config();

const router = express.Router();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  };

const pool = mysql.createPool(dbConfig);

// Also add in admin-only routes for accessing written feedback to review

router.get("/feedback/:peakId", async (req, res, next) => {
  await getPeakFeedback(pool, req, res, next);
})

router.post('/submit-feedback', async (req, res, next) => {
    await insertUserFeedback(pool, req, res, next);
});

export default router;