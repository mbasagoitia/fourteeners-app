const addPhoto = (pool, userId, peakId, filePath) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO peak_photos (user_id, peak_id, photo_url) VALUES (?, ?, ?)';
    
    pool.query(query, [userId, peakId, filePath], (error, result) => {
      if (error) {
        reject(new Error(`Error adding photo: ${error.message}`));
      } else {
        resolve(result);
      }
    });
  });
};

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
  
const deletePhoto = (pool, userId, photoId) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM peak_photos WHERE user_id = ? AND id = ?';

    pool.query(query, [userId, photoId], (error, result) => {
      if (error) {
        reject(new Error(`Error deleting photo: ${error.message}`));
      } else {
        resolve(result);
      }
    });
  });
};


export {
    addPhoto,
    fetchPhotos,
    deletePhoto
}