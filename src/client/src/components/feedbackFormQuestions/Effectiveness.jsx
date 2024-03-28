import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

function Effectiveness({ setEffectiveness, peak }) {

  const [exp1, setExp1] = useState(3);
  const [exp2, setExp2] = useState(3);
  const [exp3, setExp3] = useState(3);
  const [exp4, setExp4] = useState(3);
  const [exp5, setExp5] = useState(3);
  const [exp6, setExp6] = useState(3);

  const handleInputChange = (e, inputNum) => {
    const value = parseInt(e.target.value);
    const inputs = [exp1, exp2, exp3, exp4, exp5, exp6];
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
    setEffectiveness(avgScore);
  };
  
  

  return (
    <>
    <Form.Group controlId="effectiveness-1">
      <Row>
        <Col>
          <label htmlFor="ef-range-1" className="form-label">
            How well did the recommended peak's class and exposure level align with your comfort and experience level for hiking?
          </label>
          <input
            type="range"
            className="form-range"
            min="1"
            max="5"
            step="1"
            value={exp1}
            id="ef-range-1"
            onChange={(e) => {
              setExp1(parseInt(e.target.value));
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
    <Form.Group controlId="effectiveness-2">
      <Row>
        <Col>
          <label htmlFor="ef-range-2" className="form-label">
          How well did the recommended peak match your desired length and elevation gain?
          </label>
          <input
            type="range"
            className="form-range"
            min="1"
            max="6"
            step="1"
            value={exp2}
            id="ef-range-2"
            onChange={(e) => {
              setExp2(parseInt(e.target.value));
              handleInputChange(e, 2);
            }}
          ></input>
          <div className="d-flex justify-content-between na-label">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>N/A</span>
          </div>
        </Col>
      </Row>
    </Form.Group>
    <Form.Group controlId="effectiveness-3">
      <Row>
        <Col>
          <label htmlFor="ef-range-3" className="form-label">
          How well did the recommended peak match your desired traffic level?
          </label>
          <input
            type="range"
            className="form-range"
            min="1"
            max="6"
            step="1"
            value={exp3}
            id="ef-range-3"
            onChange={(e) => {
              setExp3(parseInt(e.target.value));
              handleInputChange(e, 3);
            }}
          ></input>
          <div className="d-flex justify-content-between na-label">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>N/A</span>
          </div>
        </Col>
      </Row>
    </Form.Group>
    <Form.Group controlId="effectiveness-4">
      <Row>
        <Col>
          <label htmlFor="ef-range-4" className="form-label">
          How well did the recommended route(s) on {peak ? peak.name : "this peak"} (if any) match your preferences?
          </label>
          <input
            type="range"
            className="form-range"
            min="1"
            max="6"
            step="1"
            value={exp4}
            id="ef-range-4"
            onChange={(e) => {
              setExp4(parseInt(e.target.value));
              handleInputChange(e, 4);
            }}
          ></input>
          <div className="d-flex justify-content-between na-label">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>N/A</span>
          </div>
        </Col>
      </Row>
    </Form.Group>
    <Form.Group controlId="effectiveness-5">
      <Row>
        <Col>
          <label htmlFor="ef-range-5" className="form-label">
          How accurate was the driving time and distance from your location to the peak's trailhead?
          </label>
          <input
            type="range"
            className="form-range"
            min="1"
            max="6"
            step="1"
            id="ef-range-5"
            value={exp5}
            onChange={(e) => {
              setExp5(parseInt(e.target.value));
              handleInputChange(e, 5);
            }}
          ></input>
          <div className="d-flex justify-content-between na-label">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>N/A</span>
          </div>
        </Col>
      </Row>
    </Form.Group>
    <Form.Group controlId="effectiveness-6">
      <Row>
        <Col>
          <label htmlFor="ef-range-6" className="form-label">
          How well did the tool take into account your preferred mountain range, if any?
          </label>
          <input
            type="range"
            className="form-range"
            min="1"
            max="6"
            step="1"
            value={exp6}
            id="ef-range-6"
            onChange={(e) => {
              setExp6(parseInt(e.target.value));
              handleInputChange(e, 6);
            }}
          ></input>
          <div className="d-flex justify-content-between na-label">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>N/A</span>
          </div>
        </Col>
      </Row>
    </Form.Group>
    </>
  );
}

export default Effectiveness;
