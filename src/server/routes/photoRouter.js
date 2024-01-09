import express from 'express';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
import mysql from 'mysql2';
import dotenv from 'dotenv';
import {
    uploadPhotos,
    getPhotos,
    getStaticPhoto,
    deletePhotos
} from "../controllers/photoController.js";
import validateFileType from "../middlewares/validateFileType.js";

dotenv.config();

const router = express.Router();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  };

const pool = mysql.createPool(dbConfig);

router.post('/upload-photos', upload.array('photos'), validateFileType, (req, res, next) => {
    uploadPhotos(pool, req, res, next);
  }
);

router.get('/peak-photos/:filename', getStaticPhoto);

router.get("/peak-photos", (req, res, next) => {
  getPhotos(pool, req, res, next);
});

router.delete("/peak-photos/:photoId", (req, res, next) =>{
  deletePhotos(pool, req, res, next);
});

export default router;