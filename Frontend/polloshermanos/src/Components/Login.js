import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; // Import Link
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Login.css'; // Import CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
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
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
    // You can add further logic here, such as sending the data to a backend server for authentication
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      alert("Please enter a valid email");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/users/login',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        login();
        history.push('/');
      }
      else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
        alert(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred, please try again');
      alert('An error occurred, please try again');
    }
  };

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

        <p>If you don’t have an account please sign in <a href="/signin">here</a>.</p> {/* Link to the sign-in component */}
      </form>
    </div>
  );
}

export default Login;
