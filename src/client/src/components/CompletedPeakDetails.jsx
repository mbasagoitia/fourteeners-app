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
        <>
        <div className="cp-details d-flex flex-row">
            <div>
                <p>{peak.name}</p>  
                <img src={`${peak.img}`} alt={`${peak.name}`} />
                <p>{peak.elevation}</p>
                <p>{peak.range}</p>
                {dateCompleted ? <p>{`Completed on ${dateCompleted}`}</p> : null}
            </div>
            <div>
                {description ? <p>{description}</p> : null}
            </div>
        </div>
        {photos && photos.length > 0 ? <PhotoCollection images={photos} /> : null}
        </>
      );
}

export default CompletedPeakDetails;