import React, { useState } from 'react';
import './SignIn.css'; // Import CSS file

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    // Handle sign-in logic here
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    // You can add further logic here, such as sending the data to a backend server for user registration
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      alert("Please enter a valid email");
      return;
    }
    if (password != confirmPassword ) {
      setError('The passwords do not match')
      alert('The passwords do not match');
      return;
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <h2>Sign In</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Re-enter Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <button type="submit" className="signin-btn">Sign In</button>
      </form>
    </div>
  );
}

export default Signin;
