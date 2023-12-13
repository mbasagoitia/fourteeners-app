import { useState, useEffect } from "react";
import PhotoCollection from "../components/PhotoCollection";

function CompletedPeakDetails ({ peak, photos }) {
    // Make sure to include a close button for the overlays
    const dateCompleted = peak.date_completed;
    const [description, setDescription] = useState(null);
    
    useEffect(() => {
        fetch(`http://localhost:5000/peakDescription?peakId=${peak.id}`, {
            credentials: "include"
        })
        .then((res) => res.json())
        .then((data) => setDescription(data.description[0][0].description));
    }, [])

    return (
    <div className="cp-details">
        <div className="cp-details-content">
            <div>
                <p>{peak.name}</p>  
                <img src={`${peak.img}`} alt={`${peak.name}`} />
                <p>{peak.elevation.toLocaleString()} ft.</p>
                <p>{peak.range} Range</p>
                {dateCompleted ? <p>{`Completed on ${new Date(dateCompleted).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}</p> : null}
            </div>
            <div className="align-self-start">
                {description ? <p>{description}</p> : null}
            </div>
        </div>
        {photos && Object.keys(photos).length !== 0 ? <PhotoCollection images={photos} /> : null}
    </div>
      );
}

export default CompletedPeakDetails;