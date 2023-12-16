const fileTypeMime = require('file-type-mime');

const validateFileType = (req, res, next) => {
  for (let file of req.files) {
    const detectedType = fileTypeMime(file.buffer);

    if (!detectedType || !['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm', 'video/quicktime'].includes(detectedType)) {
      return res.status(415).json({ error: 'Unsupported Media Type - Invalid file type' });
    }
  }
  next();
};

module.exports = validateFileType;
