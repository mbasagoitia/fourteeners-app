import { Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

function OverallExperience ({ setOverallExperience }) {

  const [overall1, setOverall1] = useState(3);
  const [overall2, setOverall2] = useState(3);

  const handleInputChange = (e, inputNum) => {
    const value = parseInt(e.target.value);
    const inputs = [overall1, overall2];
    inputs[inputNum - 1] = value;

    let responses = 0;
    for (let value of inputs) {
      if (value !== 6) {
        responses++;
      }
    }

    // We will add the current value being updated manually to the rest of the values that are not N/A (6)
    const otherInputs = inputs.filter((el, idx) => inputNum !== idx + 1 && el !== 6);

    // The value 6 should not be calculated in the total sum
    let sum = value !== 6 ? value + (otherInputs.reduce((acc, curr) => acc + curr, 0)) : (otherInputs.reduce((acc, curr) => acc + curr, 0));
    let avgScore = sum / responses;
    setOverallExperience(avgScore);
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
            onChange={(e) => {
              setOverall1(parseInt(e.target.value));
              handleInputChange(e, 1);
            }}
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
            onChange={(e) => {
              setOverall2(parseInt(e.target.value));
              handleInputChange(e, 2);
            }}
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