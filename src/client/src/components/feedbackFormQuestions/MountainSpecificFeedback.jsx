import { Form, Row, Col } from 'react-bootstrap';

function MountainSpecificFeedback () {
    return (
    <>
    <Form.Group controlId="ms-feedback">
        <Form.Label>Please provide any additional feedback on the specific mountain(s) or route(s) recommended by the tool that you think might be helpful to future users.</Form.Label>
        <Form.Control
            as="textarea"
            rows={3}
            value={mountainSpecificFeedback}
            onChange={(e) => setMountainSpecificFeedback(e.target.value)}
        />
    </Form.Group>
    </>
    )
}

export default MountainSpecificFeedback;