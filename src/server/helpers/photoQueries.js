const addPhoto = async (pool, userId, peakId, filePath) => {
    const result = await pool.query(`INSERT INTO peak_photos (user_id, peak_id, photo_url) VALUES (${userId}, ${peakId}, '${filePath}')`);
    return result;
}

const fetchPhotos = async (pool, userId, peakId) => {
    const result = await pool.query('SELECT id, photo_url FROM peak_photos WHERE user_id = ? AND peak_id = ?', [userId, peakId]);
    return result;
}

const deletePhoto = async (pool, userId, photoId) => {
    const result = await pool.query('DELETE FROM peak_photos WHERE user_id = ? AND id = ?', [userId, photoId]);
    return result;
}

module.exports = {
    addPhoto,
    fetchPhotos,
    deletePhoto
}