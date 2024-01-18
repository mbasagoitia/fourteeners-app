import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ManageAccount = ({ user }) => {

  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("")

  const handleUpdateEmail = () => {
    
    // You will use the user's id (from passed down user object) and newEmail to send a fetch request to update the user's email address

      // const response = await fetch('update-email', {
      //   method: 'PUT',
      //   body: JSON.stringify({ email, newEmail }),
      //   headers: { 'Content-Type': 'application/json' },
      // });
      // const data = await response.json();

  }

  const handleUpdateUsername = () => {
    
    // You will use the user's id (from passed down user object) and newEmail to send a fetch request to update the user's email address

      // const response = await fetch('update-email', {
      //   method: 'PUT',
      //   body: JSON.stringify({ email, newEmail }),
      //   headers: { 'Content-Type': 'application/json' },
      // });
      // const data = await response.json();

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
          <Button type="button">Update email</Button>
        </Form.Group>

        <h2>Update Username</h2>
        <Form.Group controlId="formUsername">
          <Form.Label>New Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your new username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <Button type="button">Update username</Button>
        </Form.Group>
        <Link to={"/reset-password"}>Reset Password</Link>
      </Form>
    </Container>
  );
};

export default ManageAccount;
