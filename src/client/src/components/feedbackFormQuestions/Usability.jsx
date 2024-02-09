import { Form, Row, Col } from 'react-bootstrap';

function Usability ({ setUsability }) {

    const handleRatingChange = (value) => {
      setUsability(value);
    };

    return (
        <>
        <Form.Group controlId="usabilityInput">
            <Row>
                <Col>
                <label htmlFor="usability-range-1" className="form-label">
                How easy was the tool to use and navigate?
                </label>
                <input
                    type="range"
                    className="form-range"
                    min="1"
                    max="5"
                    step="1"
                    defaultValue="3"
                    id="usability-range-1"
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

export default Usability;