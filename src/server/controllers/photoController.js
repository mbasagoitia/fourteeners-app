const path = require('path');
const fs = require('fs');
const { addPhoto, fetchPhotos, deletePhoto } = require("../helpers/queries/photoQueries");

const uploadPhotos = (pool, req, res, next) => {
    const isAuthenticated = req.isAuthenticated();
  
    if (isAuthenticated) {
      try {
        const userId = req.user.id;
        const files = req.files;
        const { peakId } = req.body;
        console.log(req.body);
  
        for (let file in files) {
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

const uploadsDirectory = path.join(__dirname, '../uploads');

const getStaticPhoto = (req, res, next) => {
    const isAuthenticated = req.isAuthenticated();

    if (isAuthenticated) {
        try {
            const { filename } = req.params;
            const imagePath = path.join(uploadsDirectory, filename);
          
            fs.stat(imagePath, (err, stats) => {
              if (err || !stats.isFile()) {
                return res.status(404).send('Image not found');
              }
              res.setHeader('Content-Type', 'image/jpeg');
              fs.createReadStream(imagePath).pipe(res);
            });
        } catch(err) {
            next(err);
        }
    }
  }

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
  
  module.exports = {
    uploadPhotos,
    getStaticPhoto,
    getPhotos,
    deletePhotos
  };
  