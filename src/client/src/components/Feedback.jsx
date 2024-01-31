import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StarRatings from "./StarRatings";
import MSFeedback from "./MSFeedback";

const Feedback = ({ peak, setFeedbackShown }) => {

    const { reviewCount } = peak;

    const handleClick = () => {
        setFeedbackShown(false);
    }

      return (
        <Container className="feedback">
            <h1 className="peak-feedback-title">{peak.name}</h1>
            <div className="peak-feedback-subtitle mb-4">Summit Selector Rating</div>
            {reviewCount > 0 ? (
                <>
                <Row>
                <Col md={6} className="mb-4 mb-md-0">
                    <StarRatings peak={peak} />
                </Col>
                <Col md={6}>
                    <MSFeedback peak={peak} />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Button onClick={handleClick}>Back</Button>
                </Col>
            </Row>
            </>
            ) : (
                <Row className="mt-4">
                <Col>
                    <p>No Reviews Yet</p>
                    <Button onClick={handleClick}>Back</Button>
                </Col>
                </Row>
            )}

        </Container>
      )
}

export default Feedback;