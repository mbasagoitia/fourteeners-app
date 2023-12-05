import { useState, useEffect } from "react";
import PhotoCollection from "../components/PhotoCollection";

function CompletedPeakDetails ({ peak }) {
    // Make sure to include a close button for the overlays
    const dateCompleted = peak.date_completed;
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/peak-photos?peak_id=${peak.id}`, {
            credentials: 'include',
          })
        .then((res) => {
            if (!res.ok) {
            throw new Error('Network response error');
            }
            return res.json();
        })
        .then((data) => {
            setPhotos(data.images);
        })
        .catch((error) => {
            console.error('Error fetching photos:', error);
        });
    }, [])

    return (
        <div className="cp-details">
            <h1>{peak.name}</h1>  
            <img src={`${peak.img}`} alt={`${peak.name}`} />
            <p>{peak.elevation}</p>
            <p>{peak.range}</p>
            <p>{peak.description}</p>
            {dateCompleted ? <p>{`Completed on ${dateCompleted}`}</p> : null}
            {photos.length > 0 ? <PhotoCollection images={photos} /> : null}
        </div>
      );
}

export default CompletedPeakDetails;