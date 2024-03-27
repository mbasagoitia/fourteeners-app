import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

function Effectiveness({ setEffectiveness, peak }) {
  const [responses, setResponses] = useState(0);
  const [totalRating, setTotalRating] = useState(0);

  const [classExp, setClassExp] = useState(3);
  const [lengthElev, setLengthElev] = useState(3);
  const [traffic, setTraffic] = useState(3);
  const [route, setRoute] = useState(3);
  const [distance, setDistance] = useState(3);
  const [range, setRange] = useState(3);

  const handleRatingChange = (value) => {
    // We want to calculate the average score of all responses for the effectiveness category
    // 6 represents the last value in some cases, "N/A," which will not be included in the calculations
    if (value !== 6) {
      setResponses((prev) => prev + 1);
      setTotalRating((prev) => prev + value);
      setEffectiveness(totalRating / responses);
    }
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
            value={classExp}
            id="ef-range-1"
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setClassExp(value);
              handleRatingChange(value)}
            }
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
            value={lengthElev}
            id="ef-range-2"
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setLengthElev(value);
              handleRatingChange(value)}
            }
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
            value={traffic}
            id="ef-range-3"
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setTraffic(value);
              handleRatingChange(value)}
            }
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
            value={route}
            id="ef-range-4"
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setRoute(value);
              handleRatingChange(value)}
            }
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
            value={distance}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setDistance(value);
              handleRatingChange(value)}
            }
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
            value={range}
            id="ef-range-6"
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setRange(value);
              handleRatingChange(value)}
            }
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
