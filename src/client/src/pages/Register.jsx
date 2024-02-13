import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from 'react-bootstrap';

function Register () {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Will check validity of password for security concerns

  const [minLength, setMinLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        console.error("Passwords do not match");
        return;
    }

    // Grey out the submit button until everything is good

    try {
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            navigate('/login');
        } else {
            console.error(data.message);
            console.error(data.flash);
        }
    } catch (error) {
        console.error('Error during registration:', error);
    }
}; 

return (
  <div className="content-container">
    <Container>
        <div className="overlay-container">
          <div className="fullsize-overlay-box">
            <h1 className="mb-4">Create Account</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Form.Text>
                          <p className="mt-1">Please create a secure password that meets the following criteria:</p>
                          <ul className="pw-instructions">
                            <li>At least 8 characters</li>
                            <li>Contains a mix of uppercase and lowercase letters</li>
                            <li>Includes at least one number</li>
                            <li>Includes at least one special character (! @ # $ %)</li>
                          </ul>    
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPasswordConfirmation">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </div>
        </div>
      </Container>
  </div>
)
}

export default Register;