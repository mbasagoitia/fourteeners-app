import { Form, Row, Col } from 'react-bootstrap';

function Improvements () {
    return (
    <>
          <Form.Group controlId="improvements-1">
        <Form.Label>Were there any criteria (experience level, exposure level, etc.) that you found to be not useful?</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={improvements}
          onChange={(e) => setImprovements(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="improvements-2">
        <Form.Label>Were there any additional criteria you wished the tool had considered?</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={improvements}
          onChange={(e) => setImprovements(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="improvements-3">
        <Form.Label>Do you have any suggestions for how you think the tool could be improved?</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={improvements}
          onChange={(e) => setImprovements(e.target.value)}
        />
      </Form.Group>
    </>
    )
}

export default Improvements;