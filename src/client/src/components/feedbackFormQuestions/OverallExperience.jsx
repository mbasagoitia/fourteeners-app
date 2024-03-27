import { Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

function OverallExperience ({ setOverallExperience }) {

  const [overall1, setOverall1] = useState(3);
  const [overall2, setOverall2] = useState(3);

  const handleInputChange1 = (e) => {
    const value = parseInt(e.target.value);
    setOverall1(value);
    setOverallExperience(prev => {
      const avgScore = (overall2 + value) / 2;
      return avgScore;
    });
  };
  
  const handleInputChange2 = (e) => {
    const value = parseInt(e.target.value);
    setOverall2(value);
    setOverallExperience(prev => {
      const avgScore = (overall1 + value) / 2;
      return avgScore;
    });
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
            value={overall1}
            id="oa-range-1"
            onChange={handleInputChange1}
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
            value={overall2}
            id="oa-range-2"
            onChange={handleInputChange2}
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