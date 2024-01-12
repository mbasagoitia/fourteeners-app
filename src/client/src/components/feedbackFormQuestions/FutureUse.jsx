import { Form, Row, Col } from 'react-bootstrap';

function FutureUse () {
    return (
    <>
      <Form.Group controlId="future-use-1">
        <Form.Label>How likely are you to use the Summit Selector tool again for future hiking plans?</Form.Label>
        <Row>
          {[1, 2, 3, 4, 5].map((value) => (
            <Col key={value}>
              <Form.Check
                inline
                type="radio"
                label={value}
                name="future-use-1"
                onChange={() => handleRatingChange('relevance', value)}
              />
            </Col>
          ))}
        </Row>
      </Form.Group>

      <Form.Group controlId="future-use-2">
        <Form.Label>How likely are you to recommend the tool to a friend or fellow hiker?</Form.Label>
        <Row>
          {[1, 2, 3, 4, 5].map((value) => (
            <Col key={value}>
              <Form.Check
                inline
                type="radio"
                label={value}
                name="future-use-2"
                onChange={() => handleRatingChange('relevance', value)}
              />
            </Col>
          ))}
        </Row>
      </Form.Group>
    </>
    )
}

export default FutureUse;