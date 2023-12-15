const express = require('express');
const passport = require('passport');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2');
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  };

const pool = mysql.createPool(dbConfig);

router.post('/upload-photos', upload.array('photos'), (req, res) => {


  const isAuthenticated = req.isAuthenticated();

  if (isAuthenticated) {
      try {
          const user_id = req.user.id;
          const files = req.files;
          const { peak_id } = req.body;

          files.forEach((file) => {
            // Check each file type with the middleware
              const filePath = file.path.replace(/\\/g, "/");
              const query = `INSERT INTO peak_photos (user_id, peak_id, photo_url) VALUES (${user_id}, ${peak_id}, '${filePath}')`;
            
              pool.query(query, (err) => {
                if (err) {
                  console.error('Error inserting photo:', err);
                  return res.status(500).json({ error: 'Error uploading photos' });
                }       
              });
            });
          res.status(200).json({ message: 'Photos uploaded successfully' });
      } catch(err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
  } else {
      return res.status(401).json({ error: 'Unauthorized request' });
  }
});

const uploadsDirectory = path.join(__dirname, '../uploads');

router.get('/peak-photos/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(uploadsDirectory, filename);

  fs.stat(imagePath, (err, stats) => {
    if (err || !stats.isFile()) {
      return res.status(404).send('Image not found');
    }

    res.setHeader('Content-Type', 'image/jpeg');
    fs.createReadStream(imagePath).pipe(res);
  });
});

router.get("/peak-photos", async (req, res) => {
  const isAuthenticated = req.isAuthenticated();

  if (isAuthenticated) {
    const user_id = req.user.id;
    const { peak_id } = req.query;

    try {
      const photos = await fetchPhotos(user_id, peak_id);
      const images = photos.map((photo) => {
        return { id: photo.id, url: `/peak-photos/${path.basename(photo.photo_url)}` }
      })

      res.json({ images });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(401).json({ error: 'Unauthorized request' });
  }
});

router.delete("/peak-photos/:photoId", async (req, res) => {
  const isAuthenticated = req.isAuthenticated();

  if (isAuthenticated) {
    const user_id = req.user.id;
    const { photoId } = req.params;

    try {
      await deletePhoto(user_id, photoId);
      return res.status(200).json({ message: 'Photo deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(401).json({ error: 'Unauthorized request' });
  }
})

async function fetchPhotos(userId, peakId) {
  return new Promise((resolve, reject) => {
    pool.query('SELECT id, photo_url FROM peak_photos WHERE user_id = ? AND peak_id = ?', [userId, peakId], (err, results) => {
      if (err) {
        console.error('Error fetching photos:', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

async function deletePhoto(userId, photoId) {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM peak_photos WHERE user_id = ? AND id = ?', [userId, photoId], (err, results) => {
      if (err) {
        console.error('Error deleting photos:', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = router;