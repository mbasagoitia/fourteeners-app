import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import RatingStars from "./RatingStars";

const IndividualPeakDetails = ({ peak, feedback, viewDetailsShown, setViewDetailsShown }) => {
    console.log(peak, feedback);

    const [description, setDescription] = useState(null);
    const [feedbackShown, setFeedbackShown] = useState(false);

    const overallScore = feedback.numericFeedback[0].avgOverall;

    feedback.reviewCount ? peak.reviewCount = feedback.reviewCount[0].review_count : peak.reviewCount = 0;

    useEffect(() => {
        fetch(`http://localhost:5000/peakDescription?peakId=${peak.id}`, {
            // Don't need credentials and authentication for this. Check backend route and test when logged out.
            credentials: "include"
        })
        .then((res) => res.json())
        .then((data) => {
          setDescription(data.description[0].description)
        });
    }, [])

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

    const showFeedback = () => {
        setFeedbackShown(true);
    }

    return (
        !feedbackShown ? (
            <div className="ip-details">
            <div className="ip-details-content">
                <div>
                    <h1 className="ip-details-title">{peak.name}</h1>  
                    <img src={`${peak.img}`} alt={`${peak.name}`} />
                    <p className="mt-2">{peak.elevation.toLocaleString()} ft.</p>
                    <p>{peak.range} Range</p>
                    <div className="summit-selector-score mt-4">
                        <p>Summit Selector Score:</p>
                        <RatingStars rating={overallScore} />
                    <span className="yellow-text" style={{"cursor": "pointer"}} onClick={showFeedback}>({peak.reviewCount} Reviews)</span>
                </div>
                </div>
                <Container className="align-self-start">
                {description ? <p>{description}</p> : null}
                {/* Include route information */}
                </Container>
                <span className="close-details" onClick={closeDetails}>
                &times;
                </span>
            </div>
        </div>
        ) : <Feedback peak={peak} feedback={feedback} />
    )
    // Make a general information area, including overall score in star form
    // Option for the users to view feedback
}

export default IndividualPeakDetails;