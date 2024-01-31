import { useState, useEffect } from "react";
import fetchFeedback from "../helpers/fetchFeedback";
import Card from 'react-bootstrap/Card';

const MSFeedback = ({ peak }) => {
    
    const [feedback, setFeedback] = useState(null);
    const [feedbackFetched, setFeedbackFetched] = useState(false);

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

      const msFeedback = feedback.msFeedback;

    return (
        feedbackFetched ? (
            <>
            {msFeedback.map((entry) => {
                return (
                    <Card className="mb-2" key={entry.id}>
                        <Card.Header>@{entry.username}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {entry.comment}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )
            })}
            </>
        ) : null
    )
}

export default MSFeedback;