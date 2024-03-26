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
        <Form.Group controlId="overallExperience-1">
      <Row>
        <Col>
          <label htmlFor="oa-range-1" className="form-label">
          How would you rate your overall experience with the Summit Selector tool?
          </label>
          <input
            type="range"
            className="form-range"
            min="1"
            max="5"
            step="1"
            value="3"
            id="oa-range-1"
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
    <Form.Group controlId="overallExperience-2">
      <Row>
        <Col>
          <label htmlFor="oa-range-2" className="form-label">
          Overall, how well did the tool help you find a suitable peak based on your preferences?
          </label>
          <input
            type="range"
            className="form-range"
            min="1"
            max="5"
            step="1"
            value="3"
            id="oa-range-2"
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

export default OverallExperience;