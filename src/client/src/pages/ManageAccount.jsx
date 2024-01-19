import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import fetchUserData from '../helpers/fetchUserData';
import sendPasswordLink from '../helpers/sendPasswordLink';

const ManageAccount = ({ user, setUser }) => {

  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");

  const handleUpdateEmail = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/update-email", {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify({ newEmail }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => res.json())
    .then((data) => {
    console.log(data.message);
      return fetchUserData();
    })
    .then((data) => {
      setUser(data);
    })
    .catch((error) => {
      console.error("Error updating email:", error);
    });
  }
  
  const handleUpdateUsername = () => {
    fetch("http://localhost:5000/update-username", {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify({ newUsername }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
        console.log(data.message);
      return fetchUserData();
    })
    .then((data) => {
      setUser(data);
    })
    .catch((error) => {
      console.error("Error updating username:", error);
    });
  }

  const handlePwResetClick = () => {
    sendPasswordLink(user.email);
  }
  
  return user && (
    <Container className="mt-4">
      <h1 className="mb-4">Manage Account</h1>
      <Form>
        <Row>
            <Col md={6}>
            <h2>Email Address</h2>
            <InputGroup>
            <Form.Control
            placeholder={user.email}
            aria-label="current-email"
            aria-describedby="basic-addon1"
            readOnly
            />
            </InputGroup>
            <Form.Group controlId="formEmail">
                <Form.Label className="d-none">Email Address</Form.Label>
                <InputGroup className="mb-3 mt-2">
                    <Form.Control
                        type="email"
                        placeholder="New email address"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        aria-describedby="basic-addon2"
                        />
                    <InputGroup.Text onClick={(e) => handleUpdateEmail(e)} id="basic-addon2">Update</InputGroup.Text>
                </InputGroup>
            </Form.Group>
        </Col>
        <Col md={6} className="mt-4 mt-md-0">
            <h2>Username</h2>
            <InputGroup>
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <Form.Control
            placeholder={user.username}
            aria-label="current-username"
            aria-describedby="basic-addon1"
            readOnly
            />
        </InputGroup>
            <Form.Group controlId="formUsername">
                <Form.Label className="d-none">Username</Form.Label>
                <InputGroup className="mt-2">
                    <Form.Control
                        type="text"
                        placeholder="New username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Text onClick={(e) => handleUpdateUsername(e)} id="basic-addon2">Update</InputGroup.Text>
                </InputGroup>
            </Form.Group>
        </Col>
        </Row>
        <Row>
            <Col className="mt-4">
                <h2>Password</h2>
                <Form.Group controlId="formPassword">
                    <Button onClick={handlePwResetClick}>Send password reset link</Button>
                </Form.Group>
            </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ManageAccount;
