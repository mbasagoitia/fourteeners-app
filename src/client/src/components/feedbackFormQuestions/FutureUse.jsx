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
    <Form.Group controlId="futureUse-1">
      <Row>
        <Col>
          <label htmlFor="fu-range-1" className="form-label">
          How likely are you to use the Summit Selector tool again for future hiking plans?
          </label>
          <input
            type="range"
            className="form-range"
            min="1"
            max="5"
            step="1"
            value="3"
            id="fu-range-1"
            onChange={(e) => handleRatingChange(parseInt(e.target.value))}
          ></input>
          <div className="d-flex justify-content-between">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </Col>
      </Row>
    </Form.Group>
    <Form.Group controlId="futureUse-2">
      <Row>
        <Col>
          <label htmlFor="fu-range-2" className="form-label">
          How likely are you to recommend the tool to a friend or fellow hiker?
          </label>
          <input
            type="range"
            className="form-range"
            min="1"
            max="5"
            step="1"
            value="3"
            id="fu-range-2"
            onChange={(e) => handleRatingChange(parseInt(e.target.value))}
          ></input>
          <div className="d-flex justify-content-between">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </Col>
      </Row>
    </Form.Group>
    </>
    )
}

export default FutureUse;