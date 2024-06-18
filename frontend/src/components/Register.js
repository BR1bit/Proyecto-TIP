import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:5000/auth/register', {
        username,
        email,
        password,
      });
      if (response.data.success) {
        setMessage('Registration successful');
        navigate('/login'); // Redirige al usuario al login después de un registro exitoso
      } else {
        setMessage(response.data.message || 'Registration failed');
      }
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Registration failed');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={onUsernameChange} required />
        <input type="email" placeholder="Email" value={email} onChange={onEmailChange} required />
        <input type="password" placeholder="Password" value={password} onChange={onPasswordChange} required />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={onConfirmPasswordChange} required />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
