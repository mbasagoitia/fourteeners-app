import validateFileType from "../helpers/validateFileType";

const uploadPhotos = (req, res) => {
    const isAuthenticated = req.isAuthenticated();
  
    if (isAuthenticated) {
      try {
        const user_id = req.user.id;
        // This could actually be a middleware.
        const files = req.files;
        const { peak_id } = req.body;
  
        files.forEach((file) => {
          if (validateFileType(file)) {
            const filePath = file.path.replace(/\\/g, "/");
            // Separate this into a helper function
            const query = `INSERT INTO peak_photos (user_id, peak_id, photo_url) VALUES (${user_id}, ${peak_id}, '${filePath}')`;
    
            pool.query(query, (err) => {
              if (err) {
                console.error('Error inserting photo:', err);
                return res.status(500).json({ error: 'Error uploading photos' });
              }
            });
          } else {
            return res.status(415).json("Unsupported media type");
          }
        });
        return res.status(200).json({ message: 'Photos uploaded successfully' });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      return res.status(401).json({ error: 'Unauthorized request' });
    }
  };
  
  module.exports = uploadPhotos;
  