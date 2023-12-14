import { useState, useRef } from 'react';
import Button from "react-bootstrap/Button";
import PhotoGrid from "../components/PhotoGrid";
import fetchPhotos from '../helpers/fetchPhotos';
import deletePhoto from '../helpers/deletePhoto';

const PhotoUpload = ({ photos, peak, setPhotoUploadShown }) => {
  const [images, setImages] = useState(photos);
  // once photos are uploaded, close the interface. Also add a close button.
  // Make sure that state is also updated whenever the user uploads photos.
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
          console.log("Photos successfully uploaded");
          fetchPhotos(peak.id)
          .then((fetchedPhotos) => {
            setImages(fetchedPhotos);
            setFiles([]);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (err) {
          console.error(err)
      }
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
    <PhotoGrid mode="delete" fn={handleDeletePhoto} images={images} />
    </>
  );
};

export default PhotoUpload;
