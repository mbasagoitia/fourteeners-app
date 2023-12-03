const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/upload-photos', upload.array('photos'), (req, res) => {
    const files = req.files;
    const { completed_peak_id } = req.body;
  
    // Save the photo filepaths/urls to the database    
    
    res.json({ message: 'Photos uploaded successfully' });
  });

module.exports = router;