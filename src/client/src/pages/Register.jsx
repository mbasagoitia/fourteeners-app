import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';  

function Register () {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('/register', {
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
            // Save this as a piece of state and render is as a modal or something else if there's an error
            console.error(data.flash);
          }
        } catch (error) {
          console.error('Error during registration:', error);
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
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                            <Form.Text className="text-muted">
                            Put instructions here on choosing a secure password.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Register;