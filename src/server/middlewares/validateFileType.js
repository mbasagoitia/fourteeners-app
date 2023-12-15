const fileType = require('file-type');

const validateFileType = (file) => {
    const fileBuffer = file.buffer;
    const detectedType = fileType(fileBuffer);

    return (detectedType && ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm', 'video/quicktime'].includes(detectedType.mime));
}

module.exports = validateFileType;