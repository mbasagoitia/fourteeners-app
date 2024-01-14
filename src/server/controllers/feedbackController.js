const insertUserFeedback = async (pool, req, res, next) => {
    const isAuthenticated = req.isAuthenticated();
  
    if (isAuthenticated) {
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
            next(error);
          }
    } else {
      res.status(401).json({ error: "Unauthorized request" })
    }
  };

export default insertUserFeedback;