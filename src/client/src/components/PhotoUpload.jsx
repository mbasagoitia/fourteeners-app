import { useState } from 'react';
import Button from "react-bootstrap/Button";

const PhotoUpload = ({ peak }) => {

  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            files.forEach((file) => {
            formData.append('photos', file);
            });
            formData.append('peak_id', peak.id);

            const requestOptions = {
                method: 'POST',
                body: formData,
                credentials: 'include',
            };

            const response = await fetch('http://localhost:5000/upload-photos', requestOptions);
            if (!response.ok) {
            throw new Error('Failed to upload photos');
            }
            console.log("Photos successfully uploaded")
        } catch (err) {
            console.error(err)
        }
    };

  return (
    <div className="photo-upload">
        <h1>Upload photos for {peak.name}</h1>  
        <input type="file" onChange={handleFileChange} multiple />
        <Button onClick={handleUpload} className="d-block">Upload Photos</Button>
    </div>
  );
};

export default PhotoUpload;