import { Form, Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import sendPasswordLink from '../helpers/sendPasswordLink';

const ResetPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        sendPasswordLink(email);
        setEmail("");
    }
    
    return (
        <Container className="content-container">
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </Form.Group>
                <Button type="submit">Send Reset Password Link</Button>
            </Form>
        </Container>
    )
}

export default ResetPassword;