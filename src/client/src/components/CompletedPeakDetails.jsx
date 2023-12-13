import { useState, useEffect } from "react";
import PhotoCollection from "../components/PhotoCollection";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CompletedPeakDetails ({ peak, photos, viewDetailsShown, setViewDetailsShown }) {
    // Make sure to include a close button for the overlays
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
        .then((data) => setDescription(data.description[0][0].description));
    }, [])

    return (
    <div className="cp-details">
        <div className="cp-details-content">
            <div>
                <h1 className="cp-details-title">{peak.name}</h1>  
                <img src={`${peak.img}`} alt={`${peak.name}`} />
                <p className="mt-2">{peak.elevation.toLocaleString()} ft.</p>
                <p>{peak.range} Range</p>
                {dateCompleted ? <p>{`Completed on ${new Date(dateCompleted).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}</p> : null}
            </div>
            <Container className="align-self-start">
                {description ? <p>{description}</p> : null}
            </Container>
            <span className="close-details" onClick={closeDetails}>
            &times;
            </span>
        </div>
        {photos && Object.keys(photos).length !== 0 ? <PhotoCollection images={photos} /> : null}
    </div>
      );
}

export default CompletedPeakDetails;