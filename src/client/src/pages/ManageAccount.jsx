import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ManageAccount = ({ user }) => {

  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("")

  const handleUpdateEmail = () => {
    
    // Use the user's id (from authenticated user object) and newEmail to send a fetch request to update the user's email address

    fetch("http://localhost:5000/update-email", {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify({ newEmail }),
    headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
    .then((data) => console.log(data.message));

  }

  const handleUpdateUsername = () => {

    fetch("http://localhost:5000/update-username", {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify({ newUsername }),
    headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
    .then((data) => console.log(data.message));

  }

  return (
    <Container className="mt-4">
      <h1>Manage Account</h1>
      <p>{user.username}</p>
      <Form>
        <h2>Update Email Address</h2>
        <Form.Group controlId="formEmail">
          <Form.Label>New Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your new email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <Button onClick={handleUpdateEmail}>Update email</Button>
        </Form.Group>

        <h2>Update Username</h2>
        <Form.Group controlId="formUsername">
          <Form.Label>New Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your new username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <Button onClick={handleUpdateUsername}>Update username</Button>
        </Form.Group>
        <Link to={"/reset-password"}>Reset Password</Link>
      </Form>
    </Container>
  );
};

export default ManageAccount;
