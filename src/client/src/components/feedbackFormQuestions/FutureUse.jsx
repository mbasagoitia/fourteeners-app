import { Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

function FutureUse ({ setFutureUse }) {

  const [future1, setFuture1] = useState(3);
  const [future2, setFuture2] = useState(3);

  const handleInputChange = (e, inputNum) => {
    const value = parseInt(e.target.value);
    const inputs = [future1, future2];
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
    setFutureUse(avgScore);
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
            value={future1}
            id="fu-range-1"
            onChange={(e) => {
              setFuture1(parseInt(e.target.value));
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
            value={future2}
            id="fu-range-2"
            onChange={(e) => {
              setFuture2(parseInt(e.target.value));
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

export default FutureUse;