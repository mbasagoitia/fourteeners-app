import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import IndividualPeakDetails from "../components/IndividualPeakDetails";
import fetchFeedback from "../helpers/fetchFeedback";

const IndividualPeak = ({ peak }) => {

    const [viewDetailsShown, setViewDetailsShown] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [feedbackFetched, setFeedbackFetched] = useState(false);

    const handleShowDetails = () => {
      setViewDetailsShown(true);
    }

    useEffect(() => {
        fetchFeedback(peak.id)
        .then((feedback) => {
          setFeedback(feedback);
          setFeedbackFetched(true);
        })
        .catch((error) => {
          console.error(error);
        });
      }, [])

    return (
        <>
        <div className={`view-details-overlay ${viewDetailsShown ? "" : "d-none"}`}>
        <div className="view-details-overlay-box">
          {feedbackFetched ? (
            <IndividualPeakDetails peak={peak} feedback={feedback} viewDetailsShown={viewDetailsShown} setViewDetailsShown={setViewDetailsShown} />
          ) : null }
        </div>
      </div>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={peak.img} />
        <Card.Body>
          <Card.Title>{peak.name}</Card.Title>
          <Card.Text>{peak.elevation.toLocaleString()}'</Card.Text>
          <Button variant="primary" onClick={handleShowDetails}>View Details</Button>
        </Card.Body>
      </Card>
      </>
    )
}

export default IndividualPeak;