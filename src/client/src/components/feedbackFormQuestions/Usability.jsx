import { Form, Row, Col } from 'react-bootstrap';

function Usability () {
    return (
        <>
        <Form.Group controlId="usability">
            <Form.Label>How easy was the tool to use and navigate?</Form.Label>
            <Row>
            {[1, 2, 3, 4, 5].map((value) => (
                <Col key={value}>
                <Form.Check
                    inline
                    type="radio"
                    label={value}
                    name="effectiveness-3"
                    onChange={() => handleRatingChange('usability', value)}
                />
                </Col>
            ))}
            </Row>
        </Form.Group>
        </>
    )
}

export default Usability;