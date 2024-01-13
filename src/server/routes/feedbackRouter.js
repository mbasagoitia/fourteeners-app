import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  };

const pool = mysql.createPool(dbConfig);

// you will need to separate this into helper and controller functions. Also make sure to validate the user session.

router.post('/submit-feedback', async (req, res, next) => {
    try {
        const userFeedback = req.body;

        const feedbackInsertQuery = `
          INSERT INTO feedback (user_id, peak_id, effectiveness, usability, relevance, future_use, overall_experience)
          VALUES (?, ?, ?, ?, ?, ?, ?);
        `;
    
        const feedbackValues = [
          userFeedback.userId,
          userFeedback.peakId,
          userFeedback.effectiveness,
          userFeedback.usability,
          userFeedback.relevance,
          userFeedback.futureUse,
          userFeedback.overallExperience,
        ];
    
        const [feedbackResult] = await pool.query(feedbackInsertQuery, feedbackValues);
        const feedbackId = feedbackResult.insertId;
    
        const improvementsInsertQuery = `
          INSERT INTO improvements (feedback_id, not_useful, additional_criteria, suggestions)
          VALUES (?, ?, ?, ?);
        `;
    
        const improvementsValues = [
          feedbackId,
          userFeedback.improvements.notUseful,
          userFeedback.improvements.additionalCriteria,
          userFeedback.improvements.suggestions,
        ];
    
        await pool.query(improvementsInsertQuery, improvementsValues);

        const mountainSpecificFeedbackInsertQuery = `
          INSERT INTO mountain_specific_feedback (feedback_id, comment)
          VALUES (?, ?);
        `;
    
        const mountainSpecificFeedbackValue = [feedbackId, userFeedback.mountainSpecificFeedback];
    
        await pool.query(mountainSpecificFeedbackInsertQuery, mountainSpecificFeedbackValue);
        
        res.status(200).json({ message: 'User feedback inserted successfully.' });
      } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

export default router;