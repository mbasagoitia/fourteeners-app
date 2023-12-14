import { useState } from 'react';
import Button from "react-bootstrap/Button";
import PhotoGrid from "../components/PhotoGrid";
import deletePhoto from '../helpers/deletePhoto';

const PhotoUpload = ({ photos, peak }) => {
  console.log("photos from upload", photos);

  const [images, setImages] = useState(photos);
  // once photos are uploaded, close the interface. Also add a close button.
  // Make sure that state is also updated whenever the user uploads photos.
  // Give user feedback that their photos have been uploaded successfully.
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleDeletePhoto = (id) => {
    deletePhoto(id);
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);
  }

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
          const responseData = await response.json(); // If response contains updated photo data
          setImages((prevImages) => [...prevImages, ...responseData.updatedPhotos]);
          console.log("Photos successfully uploaded")
      } catch (err) {
          console.error(err)
      }
  };

  return (
    <>
    <div className="photo-upload">
        <h1>Upload photos for {peak.name}</h1>  
        <input type="file" onChange={handleFileChange} multiple />
        <Button onClick={handleUpload} className="d-block">Upload Photos</Button>
    </div>
    <PhotoGrid mode="delete" fn={handleDeletePhoto} images={images} />
    </>
  );
};

export default PhotoUpload;
