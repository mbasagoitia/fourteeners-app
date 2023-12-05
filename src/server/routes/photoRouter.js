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
    // Make sure to validate the file types
//     const fileType = require('file-type');

// // Assuming file is the uploaded file object
// const fileBuffer = file.buffer;

// // Check the file's MIME type using file-type
// const detectedType = fileType(fileBuffer);

// if (!detectedType || !['image/jpeg', 'image/png', 'image/gif'].includes(detectedType.mime)) {
//   // Reject the file if the detected MIME type is not allowed
//   // Handle the error or respond with an appropriate message
// } else {
//   // File type is allowed, proceed with handling the file
//   // Save or process the file as needed
// }

    const isAuthenticated = req.isAuthenticated();

    if (isAuthenticated) {
        try {
            const user_id = req.user.id;
            const files = req.files;
            const { peak_id } = req.body;

            files.forEach((file) => {
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
  
      // Set appropriate headers for image response
      res.setHeader('Content-Type', 'image/jpeg'); // Adjust content type based on your image type
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
  
        const photoUrls = photos.map((photo) => `/peak-photos/${path.basename(photo.photo_url)}`);
  
        res.json({ images: photoUrls });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      return res.status(401).json({ error: 'Unauthorized request' });
    }
  });
  
  async function fetchPhotos(userId, peakId) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT photo_url FROM peak_photos WHERE user_id = ? AND peak_id = ?', [userId, peakId], (err, results) => {
        if (err) {
          console.error('Error fetching photos:', err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
  


module.exports = router;