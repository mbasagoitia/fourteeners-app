const fetchAllPeaks = (pool) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT peaks.id, peaks.name, peaks.img, peaks.elevation, peaks.range FROM peaks';
      
      pool.query(query, (error, result) => {
        if (error) {
          reject(new Error(`Error fetching all peaks: ${error.message}`));
        } else {
          resolve(result);
        }
      });
    });
  };
  
  const fetchCompletedPeaks = (pool, userId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT DISTINCT peaks.id, peaks.name, peaks.img, peaks.elevation, peaks.range, completed_peaks.date_completed FROM peaks INNER JOIN completed_peaks ON peaks.id = completed_peaks.peak_id WHERE completed_peaks.user_id = ?';
      
      pool.query(query, [userId], (error, result) => {
        if (error) {
          reject(new Error(`Error fetching completed peaks: ${error.message}`));
        } else {
          resolve(result);
        }
      });
    });
  };
  
const fetchPeakDescription = (pool, peakId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT description FROM peaks WHERE id = ?';
      
      pool.query(query, [peakId], (error, result) => {
        if (error) {
          reject(new Error(`Error fetching peak description: ${error.message}`));
        } else {
          resolve(result);
        }
      });
    });
  };
  
const addCompletedPeak = async (pool, userId, peakId) => {
    const result = await pool.query('INSERT INTO completed_peaks (user_id, peak_id) VALUES (?, ?)', [
        userId,
        peakId
      ]);
      return result;
}

const updateCompletedPeak = (pool, userId, peakId, dateCompleted) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE completed_peaks SET date_completed = ? WHERE user_id = ? AND peak_id = ?';

    pool.query(query, [dateCompleted, userId, peakId], (error, result) => {
      if (error) {
        reject(new Error(`Error updating completed peak: ${error.message}`));
      } else {
        resolve(result);
      }
    });
  });
};

const deleteCompletedPeak = (pool, userId, peakId) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM completed_peaks WHERE user_id = ? AND peak_id = ?';

    pool.query(query, [userId, peakId], (error, result) => {
      if (error) {
        reject(new Error(`Error deleting completed peak: ${error.message}`));
      } else {
        resolve(result);
      }
    });
  });
};

export {
    fetchAllPeaks,
    fetchCompletedPeaks,
    fetchPeakDescription,
    addCompletedPeak,
    updateCompletedPeak,
    deleteCompletedPeak
}