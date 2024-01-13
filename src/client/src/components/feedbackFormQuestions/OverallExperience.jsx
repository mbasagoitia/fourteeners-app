import { Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

function OverallExperience ({ setOverallExperience }) {

  const [responses, setResponses] = useState(0);
  const [totalRating, setTotalRating] = useState(0);

  const handleRatingChange = (value) => {
    // We want to calculate the average score of all responses for the overall experience category
    setResponses((prev) => prev + 1);
    setTotalRating((prev) => prev + value);
    setOverallExperience(totalRating / responses);
  };

    return (
    <>
      <Form.Group controlId="overall-experience-1">
        <Form.Label>How would you rate your overall experience with the Summit Selector tool?</Form.Label>
        <Row>
          {[1, 2, 3, 4, 5].map((value) => (
            <Col key={value}>
              <Form.Check
                inline
                type="radio"
                label={value}
                name="overall-experience-1"
                onChange={() => handleRatingChange(value)}
                required
              />
            </Col>
          ))}
        </Row>
      </Form.Group>

      <Form.Group controlId="overall-experience-2">
        <Form.Label>Overall, how well did the tool help you find a suitable peak based on your preferences?</Form.Label>
        <Row>
          {[1, 2, 3, 4, 5].map((value) => (
            <Col key={value}>
              <Form.Check
                inline
                type="radio"
                label={value}
                name="overall-experience-2"
                onChange={() => handleRatingChange(value)}
                required
              />
            </Col>
          ))}
        </Row>
      </Form.Group>
    </>
    )
}

export default OverallExperience;