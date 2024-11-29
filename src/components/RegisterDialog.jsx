import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography, Alert } from '@mui/material';

function RegisterDialog({ open, onClose }) {
  const [title, setTitle] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegisterSubmit = async () => {
    let isValid = true;
    const newError = {};

    // Validate fields
    if (!title) {
      newError.title = 'Title is required';
      isValid = false;
    }
    if (!fname) {
      newError.fname = 'First name is required';
      isValid = false;
    }
    if (!lname) {
      newError.lname = 'Last name is required';
      isValid = false;
    }
    if (!email) {
      newError.email = 'Email is required';
      isValid = false;
    }
    if (!password) {
      newError.password = 'Password is required';
      isValid = false;
    }
    setError(newError);

    // Submit the data if valid
    if (isValid) {
      try {
        const response = await fetch('https://bloghub-1cq5.onrender.com/authors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, fname, lname, email, password }),
        });

        if (response.ok) {
          setSuccessMessage('Author created successfully. Please login.'); // Show success message
          setTitle('');
          setFname('');
          setLname('');
          setEmail('');
          setPassword('');
          setError({});
        } else {
          const errorData = await response.json();
          setApiError(errorData.message || 'Registration failed.');
        }
      } catch (err) {
        setApiError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        {/* Display Success Message */}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        {/* Title Input */}
        <TextField
          autoFocus
          margin="dense"
          label="Title (e.g., Mr, Ms, Dr)"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!error.title}
          helperText={error.title}
        />

        {/* First Name Input */}
        <TextField
          margin="dense"
          label="First Name"
          fullWidth
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          error={!!error.fname}
          helperText={error.fname}
        />

        {/* Last Name Input */}
        <TextField
          margin="dense"
          label="Last Name"
          fullWidth
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          error={!!error.lname}
          helperText={error.lname}
        />

        {/* Email Input */}
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error.email}
          helperText={error.email}
        />

        {/* Password Input */}
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!error.password}
          helperText={error.password}
        />

        {/* Display API Error if any */}
        {apiError && <Typography color="error" sx={{ mt: 2 }}>{apiError}</Typography>}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleRegisterSubmit}>Register</Button>
      </DialogActions>
    </Dialog>
  );
}

export default RegisterDialog;
