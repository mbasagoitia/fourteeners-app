const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const mysql = require('mysql2');
const dotenv = require("dotenv");
const { uploadPhotos, getPhotos, getStaticPhoto, deletePhotos } = require("../controllers/photoController");
const validateFileType = require("../middlewares/validateFileType.js");

dotenv.config();

const router = express.Router();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  };

const pool = mysql.createPool(dbConfig);

router.post('/upload-photos', (req, res, next) => {
  uploadPhotos(pool, req, res, next);
}, validateFileType, upload.array('photos'));

router.get('/peak-photos/:filename', getStaticPhoto);

router.get("/peak-photos", (req, res, next) => {
  getPhotos(pool, req, res, next);
});

router.delete("/peak-photos/:photoId", (req, res, next) =>{
  deletePhotos(pool, req, res, next);
});

module.exports = router;