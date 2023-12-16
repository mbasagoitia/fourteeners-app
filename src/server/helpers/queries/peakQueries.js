const fetchAllPeaks = async (pool) => {
    const result = await pool.query('SELECT peaks.id, peaks.name, peaks.img, peaks.elevation, peaks.range FROM peaks');
    return result;
}
    
const fetchCompletedPeaks = async (pool, userId) => {
    const result = await pool.query('SELECT DISTINCT peaks.id, peaks.name, peaks.img, peaks.elevation, peaks.range, completed_peaks.date_completed FROM peaks INNER JOIN completed_peaks ON peaks.id = completed_peaks.peak_id WHERE completed_peaks.user_id = ?', [userId]);
    return result;
}

const fetchPeakDescription = async (pool, peakId) => {
    const result = await pool.query('SELECT description FROM peaks WHERE id = ?', [peakId]);
    return result;
}

const addCompletedPeak = async (pool, userId, peakId) => {
    const result = await pool.query('INSERT INTO completed_peaks (user_id, peak_id) VALUES (?, ?)', [
        userId,
        peakId
      ]);
      return result;
}

const updateCompletedPeak = async (pool, userId, peakId, dateCompleted) => {
    const result = pool.query('UPDATE completed_peaks SET date_completed = ? WHERE user_id = ? AND peak_id = ?',[
            dateCompleted, userId, peakId
        ]);
    return result;
}

const deleteCompletedPeak = async (pool, userId, peakId) => {
    const result = await pool.query('DELETE FROM completed_peaks WHERE user_id = ? AND peak_id = ?', [
        userId,
        peakId
        ]);
    return result;
}

module.exports = {
    fetchAllPeaks,
    fetchCompletedPeaks,
    fetchPeakDescription,
    addCompletedPeak,
    updateCompletedPeak,
    deleteCompletedPeak
}