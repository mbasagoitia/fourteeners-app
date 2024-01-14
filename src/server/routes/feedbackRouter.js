import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import insertUserFeedback from '../controllers/feedbackController.js';

dotenv.config();

const router = express.Router();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  };

const pool = mysql.createPool(dbConfig);

router.post('/submit-feedback', async (req, res, next) => {
    await insertUserFeedback(pool, req, res, next);
});

export default router;