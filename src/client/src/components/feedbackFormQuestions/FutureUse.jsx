import { Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

function FutureUse ({ setFutureUse }) {

  const [responses, setResponses] = useState(0);
  const [totalRating, setTotalRating] = useState(0);

  const handleRatingChange = (value) => {
    // We want to calculate the average score of all responses for the future use category
    setResponses((prev) => prev + 1);
    setTotalRating((prev) => prev + value);
    setFutureUse(totalRating / responses);
  };

    return (
    <>
      <Form.Group controlId="future-use-1">
        <Form.Label className="mt-4">How likely are you to use the Summit Selector tool again for future hiking plans?</Form.Label>
        <Row>
          {[1, 2, 3, 4, 5].map((value) => (
            <Col key={value}>
              <Form.Check
                inline
                type="radio"
                label={value}
                name="future-use-1"
                onChange={() => handleRatingChange(value)}
                required
              />
            </Col>
          ))}
        </Row>
      </Form.Group>

      <Form.Group controlId="future-use-2">
        <Form.Label>How likely are you to recommend the tool to a friend or fellow hiker?</Form.Label>
        <Row>
          {[1, 2, 3, 4, 5].map((value) => (
            <Col key={value}>
              <Form.Check
                inline
                type="radio"
                label={value}
                name="future-use-2"
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

export default FutureUse;