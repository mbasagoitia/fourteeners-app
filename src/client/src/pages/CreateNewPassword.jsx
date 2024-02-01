import { Form, Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const CreateNewPassword = () => {
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    const token = searchParams.get("token");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Add some extra checks in here to make sure it meets length and complexity requirements.
        if (password === verifyPassword) {

            fetch(`http://localhost:5000/reset-password/${token}`, {
                method: 'POST',
                body: JSON.stringify({ password }),
                headers: { 'Content-Type': 'application/json' },
              })
              .then((res) => res.json())
              .then((data) => {
                  // Password updated successfully
                  // Give user link to log in
                  if (data.success) {
                    console.log(data.success);
                  }
                  console.log(data.message);
              });
              // Flash some kind of feedback to user.
        } else {
            // Show feedback to user
            console.log("Passwords do not match");
        }
    }
    
    return (
        <Container className="content-container">
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group controlId="formPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </Form.Group>
                <Form.Group controlId="formVerifyPassword">
                <Form.Label>Verify Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Please verify your password"
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                    required
                />
                </Form.Group>
                <Button type="submit">Reset Password</Button>
            </Form>
        </Container>
    )
}

export default CreateNewPassword;