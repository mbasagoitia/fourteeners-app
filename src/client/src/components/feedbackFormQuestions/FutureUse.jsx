import { Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

function FutureUse ({ setFutureUse }) {

  const [future1, setFuture1] = useState(3);
  const [future2, setFuture2] = useState(3);

  const handleInputChange1 = (e) => {
    const value = parseInt(e.target.value);
    setFuture1(value);
    setFutureUse(prev => {
      const avgScore = (future2 + value) / 2;
      return avgScore;
    });
  };
  
  const handleInputChange2 = (e) => {
    const value = parseInt(e.target.value);
    setFuture2(value);
    setFutureUse(Prev => {
      const avgScore = (future1 + value) / 2;
      return avgScore;
    });
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

export default FutureUse;