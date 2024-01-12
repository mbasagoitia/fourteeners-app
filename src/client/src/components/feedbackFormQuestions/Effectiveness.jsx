import { Form, Row, Col } from 'react-bootstrap';

function Effectiveness () {
    return (
        <>
        <Form.Group controlId="effectiveness-1">
            <Form.Label>How well did the recommended peak's class and exposure level align with your comfort and experience level for hiking?</Form.Label>
            <Row>
            {[1, 2, 3, 4, 5].map((value) => (
                <Col key={value}>
                <Form.Check
                    inline
                    type="radio"
                    label={value}
                    name="effectiveness-1"
                    // Issue here with the handleRatingChange function... need to account for averages
                    onChange={() => handleRatingChange('effectiveness', value)}
                />
                </Col>
            ))}
            </Row>
        </Form.Group>

        <Form.Group controlId="effectiveness-2">
            <Form.Label>How well did the recommended peak match your desired length and elevation gain?</Form.Label>
            <Row>
            {[1, 2, 3, 4, 5].map((value) => (
                <Col key={value}>
                <Form.Check
                    inline
                    type="radio"
                    label={value}
                    name="effectiveness-2"
                    onChange={() => handleRatingChange('effectiveness', value)}
                />
                </Col>
            ))}
            </Row>
        </Form.Group>

        <Form.Group controlId="effectiveness-3">
            <Form.Label>How well did the recommended peak match your desired traffic level?</Form.Label>
            <Row>
            {[1, 2, 3, 4, 5].map((value) => (
                <Col key={value}>
                <Form.Check
                    inline
                    type="radio"
                    label={value}
                    name="effectiveness-3"
                    onChange={() => handleRatingChange('effectiveness', value)}
                />
                </Col>
            ))}
            </Row>
        </Form.Group>

        <Form.Group controlId="effectiveness-4">
            <Form.Label>How well did the recommended route(s) on (peak name) (if any) match your preferences? (option for N/A)</Form.Label>
            <Row>
            {[1, 2, 3, 4, 5].map((value) => (
                <Col key={value}>
                <Form.Check
                    inline
                    type="radio"
                    label={value}
                    name="effectiveness-4"
                    // Issue here with the handleRatingChange function... need to account for averages
                    onChange={() => handleRatingChange('effectiveness', value)}
                />
                </Col>
            ))}
            </Row>
        </Form.Group>

        <Form.Group controlId="effectiveness-5">
            <Form.Label>How accurate was the driving time and distance from your location to the peak's trailhead? (option for N/A)</Form.Label>
            <Row>
            {[1, 2, 3, 4, 5].map((value) => (
                <Col key={value}>
                <Form.Check
                    inline
                    type="radio"
                    label={value}
                    name="effectiveness-5"
                    onChange={() => handleRatingChange('effectiveness', value)}
                />
                </Col>
            ))}
            </Row>
        </Form.Group>

        <Form.Group controlId="effectiveness-6">
            <Form.Label>How well did the tool take into account your preferred mountain range, if any? (option for N/A)</Form.Label>
            <Row>
            {[1, 2, 3, 4, 5].map((value) => (
                <Col key={value}>
                <Form.Check
                    inline
                    type="radio"
                    label={value}
                    name="effectiveness-6"
                    onChange={() => handleRatingChange('effectiveness', value)}
                />
                </Col>
            ))}
            </Row>
        </Form.Group>
        </>
    )
}

export default Effectiveness;