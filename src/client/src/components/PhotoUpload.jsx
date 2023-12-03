import { useState } from 'react';

const PhotoUpload = () => {

  const [files, setFiles] = useState([]);
  const [completedPeakId, setCompletedPeakId] = useState('');

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
    formData.append('completed_peak_id', completedPeakId);

    const requestOptions = {
      method: 'POST',
      body: formData,
    };

    requestOptions.headers = new Headers();
    requestOptions.headers.append('Content-Type', 'multipart/form-data');

    const response = await fetch('/upload-photos', requestOptions);

    if (!response.ok) {
      throw new Error('Failed to upload photos');
    }

    console.log("photos successfully uploaded")
  } catch (err) {
    console.error(err)
  }
};


  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      <input
        type="text"
        placeholder="Completed Peak ID"
        value={completedPeakId}
        onChange={(e) => setCompletedPeakId(e.target.value)}
      />
      <button onClick={handleUpload}>Upload Photos</button>
    </div>
  );
};

export default PhotoUpload;
