import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './Login.css'; // Import CSS file

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Username:", username);
    console.log("Password:", password);
    // You can add further logic here, such as sending the data to a backend server for authentication
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
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

        <p>If you don’t have an account please sign in <Link to="/signin">here</Link>.</p> {/* Link to the sign-in component */}
      </form>
    </div>
  );
}

export default Login;
