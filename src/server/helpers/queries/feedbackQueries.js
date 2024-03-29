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

const fetchAllMsFeedback = async (pool) => {
  return new Promise(async (resolve, reject) => {
      try {
          const fetchAllMsFeedbackQuery = `SELECT m.comment, p.name FROM mountain_specific_feedback AS m INNER JOIN feedback AS f ON m.feedback_id = f.id INNER JOIN peaks AS p ON f.peak_id = p.id;`;

          pool.query(fetchAllMsFeedbackQuery, (error, results) => {
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

const fetchAllNumericData = async (pool) => {
  return new Promise(async (resolve, reject) => {
      try {
          const fetchAllNumericDataQuery = `SELECT AVG(effectiveness) AS effectiveness, AVG(usability) AS usability, AVG(relevance) AS relevance, AVG(future_use) AS futureUse, AVG(overall_experience) AS overallExperience FROM feedback;`;

          pool.query(fetchAllNumericDataQuery, (error, results) => {
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

const fetchImprovements = async (pool) => {
  return new Promise(async (resolve, reject) => {
      try {
          const fetchImprovementsQuery = `SELECT not_useful AS notUseful, additional_criteria AS additionalCriteria, suggestions FROM improvements;`;

          pool.query(fetchImprovementsQuery, (error, results) => {
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
            const improvementFields = ['notUseful', 'additionalCriteria', 'suggestions'];
            const improvementsValues = [];
            const fieldPlaceholders = [];

            const toSnakeCase = (str) => {
              return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
            }

            improvementFields.forEach(field => {
                const snakeCaseField = toSnakeCase(field);
                if (userFeedback.improvements[field] !== '') {
                    fieldPlaceholders.push(snakeCaseField);
                    improvementsValues.push(sanitizeHtml(userFeedback.improvements[field]));
                }
            });

            if (improvementsValues.length > 0) {
                const queryPlaceholders = fieldPlaceholders.map(() => '?').join(', ');

                const dynamicQuery = `
                    INSERT INTO improvements (feedback_id, ${fieldPlaceholders.join(', ')})
                    VALUES (?, ${queryPlaceholders});
                `;

                improvementsValues.unshift(feedbackId);

                pool.query(dynamicQuery, improvementsValues, (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    });
};
  
const insertMountainSpecificFeedback = async (pool, userFeedback) => {
  return new Promise(async (resolve, reject) => {
      try {
          if (userFeedback.mountainSpecificFeedback !== '') {
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
          } else {
              resolve();
          }
      } catch (error) {
          reject(error);
      }
  });
};

  
  export {
      fetchMsFeedback,
      fetchAllMsFeedback,
      fetchAllNumericData,
      fetchImprovements,
      fetchNumericFeedback,
      fetchReviewCount,
      insertNumericFeedback,
      insertImprovements,
      insertMountainSpecificFeedback
  };
  