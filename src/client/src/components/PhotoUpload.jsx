import { useState, useRef } from 'react';
import Button from "react-bootstrap/Button";
import PhotoGrid from "../components/PhotoGrid";
import fetchPhotos from '../helpers/fetchPhotos';
import deletePhoto from '../helpers/deletePhoto';

const PhotoUpload = ({ photos, setPhotos, peak, setPhotoUploadShown }) => {
  // Give user feedback that their photos have been uploaded successfully.
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const closeUpload = () => {
    setPhotoUploadShown(false);
  }

  const handleFileChange = (e) => {
    const selectedFiles = [...e.target.files];
    setFiles(selectedFiles);
  };

  const handleDeletePhoto = (id) => {
    deletePhoto(id);
    const updatedPhotos = photos.filter((photo) => photo.id !== id);
    setPhotos(updatedPhotos);
  }

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      for (let file of files) {
        formData.append('photos', file);
      }
      formData.append('peakId', peak.id);
  
      const requestOptions = {
        method: 'POST',
        body: formData,
        credentials: 'include',
      };
  
      const response = await fetch('http://localhost:5000/upload-photos', requestOptions);
      if (!response.ok) {
        throw new Error('Failed to upload photos');
      }
      
      // Change this to display feedback to the user
      console.log("Photos successfully uploaded");
  
      handlePhotosUpdate(peak.id);
    } catch (err) {
      console.error(err);
    }
  };
  
  const handlePhotosUpdate = (peakId) => {
    fetchPhotos(peakId)
      .then((fetchedPhotos) => {
        setPhotos(fetchedPhotos);
        setFiles([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };  

  return (
    <>
    <div className="photo-upload">
        <h1>Edit photos: {peak.name}</h1>  
        <input type="file" className="mt-4" onChange={handleFileChange} ref={fileInputRef} multiple />
        {files.length > 0 ? <Button onClick={handleUpload} className="d-block mt-4">Upload Photos</Button> : null}
        <span className="close-upload" onClick={closeUpload}>
            &times;
        </span>
    </div>
    <PhotoGrid mode="delete" fn={handleDeletePhoto} images={photos} />
    </>
  );
};

export default PhotoUpload;
