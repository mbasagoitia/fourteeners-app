import { Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

function Relevance ({ setRelevance }) {

  const [responses, setResponses] = useState(0);
  const [totalRating, setTotalRating] = useState(0);

  const handleRatingChange = (value) => {
    // We want to calculate the average score of all responses for the relevance category
    setResponses((prev) => prev + 1);
    setTotalRating((prev) => prev + value);
    setRelevance(totalRating / responses);
  };

    return (
    <>
      <Form.Group controlId="relevance">
        <Form.Label>How well did the tool's criteria (experience level, class, length, etc.) align with your priorities when selecting a hiking peak?</Form.Label>
        <Row>
          {[1, 2, 3, 4, 5].map((value) => (
            <Col key={value}>
              <Form.Check
                inline
                type="radio"
                label={value}
                name="relevance"
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

export default Relevance;