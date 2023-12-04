const express = require('express');
const passport = require('passport');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
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

router.get("/peak-photos", async (req, res) => {
    const isAuthenticated = req.isAuthenticated();

    if (isAuthenticated) {
        const user_id = req.user.id;
        const { peak_id } = req.body;

        try {
            const photos = await fetchPhotos(user_id, peak_id);
            res.json({ photos });
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        return res.status(401).json({ error: 'Unauthorized request' });
    }
});

async function fetchPhotos(userId, peakId) {
    const result = await pool.query('SELECT photo_url FROM peak_photos WHERE user_id = ? AND peak_id = ?', [userId, peakId]);
    return result;
  }

module.exports = router;