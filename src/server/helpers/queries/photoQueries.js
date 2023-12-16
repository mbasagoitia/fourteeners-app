const addPhoto = async (pool, userId, peakId, filePath) => {
    const result = await pool.query(`INSERT INTO peak_photos (user_id, peak_id, photo_url) VALUES (${userId}, ${peakId}, '${filePath}')`);
    return result;
}

const fetchPhotos = (pool, userId, peakId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id, photo_url FROM peak_photos WHERE user_id = ? AND peak_id = ?';
      
      pool.query(query, [userId, peakId], (error, result) => {
        if (error) {
          reject(new Error(`Error fetching photos: ${error.message}`));
        } else {
          resolve(result);
        }
      });
    });
  };
  
const deletePhoto = async (pool, userId, photoId) => {
    const result = await pool.query('DELETE FROM peak_photos WHERE user_id = ? AND id = ?', [userId, photoId]);
    return result;
}

module.exports = {
    addPhoto,
    fetchPhotos,
    deletePhoto
}