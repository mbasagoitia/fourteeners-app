import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "../components/Header";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';  

function Login () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
      
          const data = await response.json();
      
          if (response.ok) {
            navigate('/');
          } else {
            console.error(data.message);
            // Save this as a piece of state and render is as a modal or something else if there's an error
            console.error(data.flash);
          }
        } catch (error) {
          console.error('Error during login:', error);
        }
      };

    return (
        <div className="hp-background">
            <Header />
            <div className="overlay-container">
                <div className="overlay-box">
                    <Form>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login;