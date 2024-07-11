// frontend/src/components/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginPage = ({ setIsLoggedIn, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8081/login', { username, password });
      setUser(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  const handleVisitorLogin = async () => {
    try {
      const response = await axios.get('http://localhost:8081/items');
      setUser(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      setError('Unable to fetch items');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleVisitorLogin}>Enter as Visitor</button>
      <Link to="/register">Register</Link>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
