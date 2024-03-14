import { useState, useEffect } from "react";
import PhotoCollection from "../components/PhotoCollection";
import formatDate from "../helpers/formatDate";

function CompletedPeakDetails ({ peak, photos, viewDetailsShown, setViewDetailsShown }) {

    const dateCompleted = peak.date_completed;
    const [description, setDescription] = useState(null);

    useEffect(() => {
        const handleEscKeyPress = (event) => {
          if (event.key === "Escape" && viewDetailsShown) {
            closeDetails();
          }
        };
        
        window.addEventListener("keydown", handleEscKeyPress);
    
        return () => {
          window.removeEventListener("keydown", handleEscKeyPress);
        };
      }, [viewDetailsShown]);

    const closeDetails = () => {
        setViewDetailsShown(false);
    }
    
    useEffect(() => {
        fetch(`http://localhost:5000/peakDescription?peakId=${peak.id}`, {
            credentials: "include"
        })
        .then((res) => res.json())
        .then((data) => {
          setDescription(data.description[0].description)
        });
    }, [])

    return (
    <div className="ip-details">
        <div className="ip-details-content">
            <div>
                <h1 className="ip-details-title">{peak.name}</h1>  
                <img src={`${peak.img}`} alt={`${peak.name}`} />
                <p className="mt-2">{peak.elevation.toLocaleString()} ft.</p>
                <p>{peak.range} Range</p>
                {dateCompleted ? <p>{`Completed on ${formatDate(dateCompleted)}`}</p> : null}
            </div>
            <div className="align-self-start">
                {description ? <p>{description}</p> : null}
            </div>
            <span className="close-details" onClick={closeDetails}>
            &times;
            </span>
        </div>
        {photos && photos.length > 0 ? <PhotoCollection images={photos} /> : null}
    </div>
      );
}

export default CompletedPeakDetails;