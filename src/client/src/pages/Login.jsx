import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import login from "../helpers/login";

function Login({ setUser, onLoginRedirect }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e, email, password) => {
    e.preventDefault();
    try {
      const userInfo = await login(email, password);
      setUser(userInfo);

      if (onLoginRedirect) {
        onLoginRedirect();
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="content-container">
      <div className="overlay-container">
        <div className="overlay-box">
          <Form onSubmit={(e) => handleSubmit(e, email, password)}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link to={"/reset-password"}>Forgot Password?</Link>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
