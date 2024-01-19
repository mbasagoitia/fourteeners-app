import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import fetchUserData from '../helpers/fetchUserData';

const ManageAccount = ({ user, setUser }) => {

  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");

  const handleUpdateEmail = () => {
    fetch("http://localhost:5000/update-email", {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify({ newEmail }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("msg", data.message);
      return fetchUserData();
    })
    .then((data) => {
      console.log("Updated user data:", data);
      setUser(data);
    });
  }
  

  const handleUpdateUsername = () => {
    fetch("http://localhost:5000/update-username", {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify({ newUsername }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("msg", data.message);
      return fetchUserData();
    })
    .then((data) => {
      console.log("Updated user data:", data);
      setUser(data);
    });
  }
  

  return user && (
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
        <Button>Send password reset link</Button>
      </Form>
    </Container>
  );
};

export default ManageAccount;
