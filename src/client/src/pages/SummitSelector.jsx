import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserForm from "../components/UserForm";
import ProgressBar from '../components/ProgressBar';

function SummitSelector ({ user, onLoginRedirect }) {
    
    const [step, setStep] = useState(1);

    return (
        <Container fluid>
            <Row>
                <Col md={3} className="sidebar">
                    <div className="form-overlay-box">
                        <ProgressBar step={step} />
                    </div>
                </Col>
                <Col md={9} className="form-container">
                    <div className="form-overlay-box">
                        <UserForm user={user} onLoginRedirect={onLoginRedirect} step={step} setStep={setStep} />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default SummitSelector;