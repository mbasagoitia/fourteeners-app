import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const ManageAccount = () => {
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [updateEmailSuccess, setUpdateEmailSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    // Implement your logic to send a reset password request to the backend API
    // Use the provided email to send a reset link or code to the user

    try {
      // Mock API call (replace this with actual API call)
      // const response = await fetch('/api/reset-password', {
      //   method: 'POST',
      //   body: JSON.stringify({ email }),
      //   headers: { 'Content-Type': 'application/json' },
      // });
      // const data = await response.json();

      // Mock success response (replace this with actual response handling)
      const data = { success: true };

      if (data.success) {
        setResetSuccess(true);
        setUpdateEmailSuccess(false);
        setError('');
      } else {
        setResetSuccess(false);
        setUpdateEmailSuccess(false);
        setError('Password reset request failed. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setResetSuccess(false);
      setUpdateEmailSuccess(false);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  const handleUpdateEmail = async () => {
    // Look at this file and make sure it routes users correctly.
    // Implement your logic to update the user's email address on the backend

    try {
      // const response = await fetch('/api/update-email', {
      //   method: 'PUT',
      //   body: JSON.stringify({ email, newEmail }),
      //   headers: { 'Content-Type': 'application/json' },
      // });
      // const data = await response.json();

      if (res.ok) {
        setUpdateEmailSuccess(true);
        setResetSuccess(false);
        setError('');
      } else {
        setUpdateEmailSuccess(false);
        setResetSuccess(false);
        setError('Email update failed. Please try again.');
      }
    } catch (error) {
      console.error('Error updating email:', error);
      setUpdateEmailSuccess(false);
      setResetSuccess(false);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Account Management</h2>
      <Form>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleResetPassword}>
          Reset Password
        </Button>

        {resetSuccess && (
          <Alert variant="success" className="mt-3">
            Password reset email sent successfully. Please check your email.
          </Alert>
        )}

        <Form.Group controlId="formNewEmail">
          <Form.Label>New Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your new email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleUpdateEmail}>
          Update Email
        </Button>

        {updateEmailSuccess && (
          <Alert variant="success" className="mt-3">
            Email address updated successfully.
          </Alert>
        )}

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Form>
    </Container>
  );
};

export default ManageAccount;
