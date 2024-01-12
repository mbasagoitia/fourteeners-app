import { Form, Row, Col } from 'react-bootstrap';

function Relevance () {
    return (
    <>
      <Form.Group controlId="relevance">
        <Form.Label>How well did the tool's criteria (experience level, class, length, etc.) align with your priorities when selecting a hiking peak?</Form.Label>
        <Row>
          {[1, 2, 3, 4, 5].map((value) => (
            <Col key={value}>
              <Form.Check
                inline
                type="radio"
                label={value}
                name="relevance"
                onChange={() => handleRatingChange('relevance', value)}
              />
            </Col>
          ))}
        </Row>
      </Form.Group>
    </>
    )
}

export default Relevance;