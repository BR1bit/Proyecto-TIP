import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/auth/login', { email, password });
      if (response.data.success) {
        setIsAuthenticated(true);
        navigate('/upload');
      } else {
        setMessage(response.data.message || 'Credenciales invalidas');
      }
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Falla en Login');
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={onEmailChange} required />
        <input type="password" placeholder="Password" value={password} onChange={onPasswordChange} required />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={goToRegister}>Registrarme</button>
    </div>
  );
};

export default Login;



