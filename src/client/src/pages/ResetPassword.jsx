import { Form, Button, Container } from 'react-bootstrap';
import { useState } from 'react';

const ResetPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:5000/reset-password", {
              method: 'POST',
              body: JSON.stringify({ email }),
              headers: { 'Content-Type': 'application/json' },
            })
            .then((res) => res.json())
            .then((data) => {
                // Reset password email sent (keep generic)
                // If your email address is associated with an account,
                // a reset password link was sent.
                if (data.success) {
                    console.log(data.success);
                  }
                console.log(data.message);
            });
            // Flash some kind of feedback to user.
        setEmail("");
    }
    
    return (
        <Container>
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