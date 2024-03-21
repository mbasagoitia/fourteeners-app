import sanitizeHtml from "sanitize-html";

const fetchMsFeedback = async (pool, peakId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const fetchFeedbackQuery = `SELECT m.id, m.comment, u.username
            FROM mountain_specific_feedback AS m
            INNER JOIN feedback AS f ON m.feedback_id = f.id
            INNER JOIN users AS u ON f.user_id = u.id
            INNER JOIN peaks AS p ON f.peak_id = p.id
            WHERE p.id = ?;`;

            pool.query(fetchFeedbackQuery, [peakId], (error, results) => {
                if (error) {
                    reject(error);
                  } else {
                    resolve(results);
                  }
            })
        } catch (error) {
            reject(error);
          }
    })
}

const fetchReviewCount = async (pool, peakId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // In this case, we don't want individual responses, but the average of all user responses from each category

            const fetchFeedbackQuery = `SELECT COUNT(id) AS review_count FROM feedback WHERE peak_id = ? GROUP BY peak_id;`;

            pool.query(fetchFeedbackQuery, [peakId], (error, results) => {
                if (error) {
                    reject(error);
                  } else {
                    results.length === 0 ? resolve(0) : resolve(results);
                  }
            })
        } catch (error) {
            reject(error);
          }
    })
}

const fetchNumericFeedback = async (pool, peakId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // In this case, we don't want individual responses, but the average of all user responses from each category

            const fetchFeedbackQuery = `SELECT AVG(effectiveness) AS avgEffectiveness, AVG(usability) AS avgUsability, AVG(relevance) AS avgRelevance, AVG(future_use) AS avgFutureUse, AVG(overall_experience) AS avgOverall FROM feedback WHERE peak_id = ?;`;

            pool.query(fetchFeedbackQuery, [peakId], (error, results) => {
                if (error) {
                    reject(error);
                  } else {
                    resolve(results);
                  }
            })
        } catch (error) {
            reject(error);
          }
    })
}

let feedbackId = null;

const insertNumericFeedback = async (pool, userFeedback) => {
    return new Promise(async (resolve, reject) => {
      try {
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
  
        pool.query(feedbackInsertQuery, feedbackValues, (error, results) => {
          if (error) {
            reject(error);
          } else {
            feedbackId = results.insertId;
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  };
  
  const insertImprovements = async (pool, userFeedback) => {
    return new Promise(async (resolve, reject) => {
      try {
        const improvementsInsertQuery = `
          INSERT INTO improvements (feedback_id, not_useful, additional_criteria, suggestions)
          VALUES (?, ?, ?, ?);
        `;
  
        const improvementsValues = [
          feedbackId,
          sanitizeHtml(userFeedback.improvements.notUseful),
          sanitizeHtml(userFeedback.improvements.additionalCriteria),
          sanitizeHtml(userFeedback.improvements.suggestions),
        ];
  
        pool.query(improvementsInsertQuery, improvementsValues, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  };
  
  const insertMountainSpecificFeedback = async (pool, userFeedback) => {
    return new Promise(async (resolve, reject) => {
      try {
        const mountainSpecificFeedbackInsertQuery = `
          INSERT INTO mountain_specific_feedback (feedback_id, comment)
          VALUES (?, ?);
        `;
  
        const mountainSpecificFeedbackValue = [feedbackId, sanitizeHtml(userFeedback.mountainSpecificFeedback)];
        pool.query(mountainSpecificFeedbackInsertQuery, mountainSpecificFeedbackValue, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  };
  
  export {
      fetchMsFeedback,
      fetchNumericFeedback,
      fetchReviewCount,
      insertNumericFeedback,
      insertImprovements,
      insertMountainSpecificFeedback
  };
  