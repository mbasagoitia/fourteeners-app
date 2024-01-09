import fs from 'fs';
import { fileTypeFromBuffer } from 'file-type';

const validateFileType = async (req, res, next) => {
  try {
    const files = req.files;
    for (let file of files) {
      
      const buffer = fs.readFileSync(file.path);
      const fileType = await fileTypeFromBuffer(buffer);

      if (!fileType || !['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm', 'video/quicktime'].includes(fileType.mime)) {
        return res.status(415).json({ error: 'Unsupported Media Type - Invalid file type' });
      }
    }
    next();
  } catch (error) {
    console.error('Error validating file type:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default validateFileType;



