import React, { useState } from 'react';
import './SignIn.css'; // Import CSS file

function Signin() {
  const [restaurantId, setRestaurantId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employeePassword, setEmployeePassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRestaurantIdChange = (e) => {
    setRestaurantId(e.target.value);
  };

  const handleEmployeeIdChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleEmployeePasswordChange = (e) => {
    setEmployeePassword(e.target.value);
  };

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
    // Handle sign-in logic here
    console.log("Restaurant ID:", restaurantId);
    console.log("Employee ID:", employeeId);
    console.log("Employee Password:", employeePassword);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    // add further logic here, such as sending the data to a backend server for user registration
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-group-left">
          <h2>Sign In</h2>
          <div className="form-group">
            <label htmlFor="restaurantId">Restaurant ID:</label>
            <input
              type="text"
              id="restaurantId"
              value={restaurantId}
              onChange={handleRestaurantIdChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="employeeId">Employee ID:</label>
            <input
              type="text"
              id="employeeId"
              value={employeeId}
              onChange={handleEmployeeIdChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="employeePassword">Employee Password:</label>
            <input
              type="password"
              id="employeePassword"
              value={employeePassword}
              onChange={handleEmployeePasswordChange}
              required
            />
          </div>
        </div>
        <div className="form-group-right">
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
        </div>
        <button type="submit" className="signin-btn">Sign In</button>
      </form>
    </div>
  );
}

export default Signin;
