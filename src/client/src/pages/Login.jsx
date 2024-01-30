import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';  

function Login ({ setUser }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // Make this a separate helper function

    const handleSubmit = async (e, email, password) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
            'Cookie': document.cookie,
          });
      
          const data = await response.json();
      
          if (response.ok) {
            console.log("logged in", data);
            setUser(data.user);
            navigate('/');
          } else {
            console.error(data.message);
            // Save this as a piece of state and render is as a modal or something else if there's an error
          }
        } catch (error) {
          console.error('Error during login:', error);
        }
      };

    return (
        <div className="hp-background">
            <div className="overlay-container">
                <div className="overlay-box">
                    <Form onSubmit={(e) => handleSubmit(e, email, password)}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Link to={"/reset-password"}>Forgot Password?</Link>
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login;