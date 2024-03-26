import { Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

function Relevance ({ setRelevance }) {

  const handleRatingChange = (value) => {
    setRelevance(value);
  };

    return (
    <>
    <Form.Group controlId="relevanceInput">
      <Row>
        <Col>
          <label htmlFor="relevance-range-1" className="form-label">
          How well did the tool's criteria (experience level, class, length, etc.) align with your priorities when selecting a hiking peak?
          </label>
          <input
            type="range"
            className="form-range"
            min="1"
            max="5"
            step="1"
            value="3"
            id="relevance-range-1"
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

export default Relevance;