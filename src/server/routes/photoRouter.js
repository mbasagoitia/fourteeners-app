const express = require('express');
const mysql = require('mysql2');
const dotenv = require("dotenv");
const { uploadPhotos, getPhotos, getStaticPhoto, deletePhotos } = require("../controllers/photoController");

const validateFileType = require("../middlewares/validateFileType");

dotenv.config();

const router = express.Router();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  };

const pool = mysql.createPool(dbConfig);

router.post('/upload-photos', validateFileType, upload.array('photos'), uploadPhotos);

router.get('/peak-photos/:filename', getStaticPhoto);

router.get("/peak-photos", getPhotos);

router.delete("/peak-photos/:photoId", deletePhotos);

module.exports = router;