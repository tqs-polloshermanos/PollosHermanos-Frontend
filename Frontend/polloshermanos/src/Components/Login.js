import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import './Login.css';
import config from '../config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email.includes('@') || !email.includes('.') || email.indexOf('@') > email.lastIndexOf('.') || email.lastIndexOf('.') === email.length - 1 || email.indexOf('@') === 0 || email.indexOf('.') === 0) {
      setError('Please enter a valid email');
      alert("Please enter a valid email");
      return;
    }

    try {
      const response = await fetch(`${config.apiUrl}/auth/login`,  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        sessionStorage.setItem('token', data.token);
        localStorage.setItem('token', data.token);
        console.log('Token stored successfully');
        login(data.user);
        window.location.href = '/';
      }
      else {
        const errorData = await response.json();
        console.log('Error:', errorData);
        setError(errorData.message || 'Login failed');
        alert(errorData.message || 'Login failed! Try again!');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred, please try again');
      alert('An error occurred, please try again');
    }
  };

  console.log('Tokennnn stored:', localStorage.getItem('token'));

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="login-btn">Login</button>

        <p>If you don’t have an account please sign in <a href="/signin">here</a>.</p>
      </form>
    </div>
  );
}

export default Login;
