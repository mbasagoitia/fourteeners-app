import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import RatingStars from "./RatingStars";

const Feedback = ({ peak, feedback, setFeedbackShown }) => {

    const { reviewCount } = peak;
 
    // Each value will be a number between 1 and 5.
    const {
        avgEffectiveness,
        avgFutureUse,
        avgRelevance,
        avgUsability,
        avgOverall,
      } = feedback.numericFeedback[0];
      
      const effectivenessScore = avgEffectiveness;
      const futureUseScore = avgFutureUse;
      const relevanceScore = avgRelevance;
      const usabilityScore = avgUsability;
      const overallScore = avgOverall;

    // This will be an array of objects, each with an id, username, and comment property.  
    const msFeedback = feedback.msFeedback;

    const handleClick = () => {
        setFeedbackShown(false);
    }

      return (
        <Container className="feedback">
            <h1 className="peak-feedback-title">{peak.name}</h1>
            <div className="peak-feedback-subtitle mb-4">Summit Selector Rating</div>
            {/* Add a back button. Make the heading text smaller so all the stars fit. Comments scrollable? */}
            {reviewCount > 0 ? (
                <>
                <Row>
                <Col md={6} className="mb-4 mb-md-0">
                {/* Make the overall score larger */}
                    <div className="overall-stars">
                        <div>Overall Score</div>
                        <RatingStars rating={overallScore} />
                    </div>

                    <div className="d-flex justify-content-evenly mt-4">
                        <div>
                            <span>Effectiveness</span>
                            <RatingStars rating={effectivenessScore} />
                            <span>Relevance</span>
                            <RatingStars rating={relevanceScore} />
                        </div>
                        <div>
                            <span>Usability</span>
                            <RatingStars rating={usabilityScore} />
                            <span>Future Use</span>
                            <RatingStars rating={futureUseScore} />
                        </div>
                    </div>
                </Col>
                <Col md={6}>
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
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Button onClick={handleClick}>Back</Button>
                </Col>
            </Row>
            </>
            ) : (
                <Row className="mt-4">
                <Col>
                    <p>No Reviews Yet</p>
                    <Button onClick={handleClick}>Back</Button>
                </Col>
                </Row>
            )}

        </Container>
      )
}

export default Feedback;