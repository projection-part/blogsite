import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginDialog = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });
  const [apiError, setApiError] = useState('');

  const navigate = useNavigate();

  const handleLoginSubmit = async () => {
    // Reset error states
    setError({ email: '', password: '' });
    let isValid = true;

    // Basic validation
    if (!email) {
      setError((prev) => ({ ...prev, email: 'Email is required' }));
      isValid = false;
    }
    if (!password) {
      setError((prev) => ({ ...prev, password: 'Password is required' }));
      isValid = false;
    }

    if (isValid) {
      try {
        const response = await fetch('https://bloghub-1cq5.onrender.com/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          localStorage.setItem('token', data.token);
          navigate('/profile'); // Redirect to profile page
          console.log('Login successful:', data);
          onClose(); // Close the dialog
        } else {
          const errorData = await response.json();
          setApiError(errorData.message || 'Login failed. Please try again.');
        }
      } catch (err) {
        console.error('Error:', err);
        setApiError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        {/* Email Field */}
        <TextField
          autoFocus
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error.email}
          helperText={error.email}
        />
        {/* Password Field */}
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
        {/* API Error Message */}
        {apiError && <Typography color="error" sx={{ mt: 2 }}>{apiError}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleLoginSubmit} color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
