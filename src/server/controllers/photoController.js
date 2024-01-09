import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { addPhoto, fetchPhotos, deletePhoto } from '../helpers/queries/photoQueries.js';


const uploadPhotos = (pool, req, res, next) => {
    const isAuthenticated = req.isAuthenticated();
  
    if (isAuthenticated) {
      try {
        const userId = req.user.id;
        const { peakId } = req.body;
        const files = req.files;
  
        for (let file of files) {
            const filePath = file.path.replace(/\\/g, "/");
            addPhoto(pool, userId, peakId, filePath);
        }
        return res.status(200).json({ message: 'Photos uploaded successfully' });
      } catch (err) {
        next(err);
      }
    } else {
      return res.status(401).json({ error: 'Unauthorized request' });
    }
  };

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  const uploadsDirectory = path.join(__dirname, '../uploads');

  const getStaticPhoto = (req, res, next) => {
    const isAuthenticated = req.isAuthenticated();
  
    if (isAuthenticated) {
      try {
        const { filename } = req.params;
        const imagePath = path.join(uploadsDirectory, filename);
            
        const fileStream = fs.createReadStream(imagePath);
      
        fileStream.on('error', (err) => {
          if (err.code === 'ENOENT') {
            console.log("Image not found");
            return res.status(404).send('Image not found');
          } else {
            console.error("Error reading file:", err);
            return res.status(500).send('Internal Server Error');
          }
        });
      
        fileStream.on('open', () => {
          res.setHeader('Content-Type', 'image/jpeg');
          fileStream.pipe(res);
        });
      
      } catch (err) {
        next(err);
      }
    }
  };
  

const getPhotos = async (pool, req, res, next) => {

    const isAuthenticated = req.isAuthenticated();
  
    if (isAuthenticated) {
      const userId = req.user.id;
      const { peakId } = req.query;
  
      try {
        const photos = await fetchPhotos(pool, userId, peakId);
        const images = photos.map((photo) => {
          return { id: photo.id, url: `/peak-photos/${path.basename(photo.photo_url)}` }
        })
        res.json({ images });
      } catch (err) {
        next(err);
      }
    } else {
      return res.status(401).json({ error: 'Unauthorized request' });
    }
  }

const deletePhotos = async (pool, req, res, next) => {
    const isAuthenticated = req.isAuthenticated();
  
    if (isAuthenticated) {
      const userId = req.user.id;
      const { photoId } = req.params;
  
      try {
        await deletePhoto(pool, userId, photoId);
        return res.status(200).json({ message: 'Photo deleted successfully' });
      } catch (err) {
        next(err);
      }
    } else {
      return res.status(401).json({ error: 'Unauthorized request' });
    }
  }
  
  export {
    uploadPhotos,
    getStaticPhoto,
    getPhotos,
    deletePhotos
  };
  