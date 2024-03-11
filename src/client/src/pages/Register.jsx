import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';

function Register () {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  // Will check validity of password for security concerns

  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  const navigate = useNavigate();

  const handleCheckPassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const hasMinLength = newPassword.length >= 8;
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasLowercase = /[a-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  
    const isValidPassword = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
  
    setHasMinLength(hasMinLength);
    setHasUppercase(hasUppercase);
    setHasLowercase(hasLowercase);
    setHasNumber(hasNumber);
    setHasSpecialChar(hasSpecialChar);
    setValidPassword(isValidPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        // Alert the user to this somehow
        console.error("Passwords do not match");
        return;
    }

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
    <div className="overlay-container">
        <div className="fullsize-overlay-box create-account">
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
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => handleCheckPassword(e)} />
                    <Form.Text>
                        <p className={`mt-1 ${validPassword ? "hidden" : "visible"}`}>Please create a secure password that meets the following criteria:</p>
                        <ul className="pw-instructions">
                            <li className={hasMinLength ? "d-none" : ""}>At least 8 characters long</li>
                            <li className={hasUppercase && hasLowercase ? "d-none" : ""}>Contains a mix of uppercase and lowercase letters</li>
                            <li className={hasNumber ? "d-none" : ""}>Includes at least one number</li>
                            <li className={hasSpecialChar ? "d-none" : ""}>Includes at least one special character (! @ # $ %)</li>
                        </ul>    
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPasswordConfirmation">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>
                {/* Grey out the submit button until everything is good */}
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
    </div>
  </div>
)
}

export default Register;