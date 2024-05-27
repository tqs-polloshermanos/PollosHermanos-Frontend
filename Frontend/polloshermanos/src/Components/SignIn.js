import React, { useState } from 'react';
import './SignIn.css'; // Import CSS file

function Signin() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    
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

    try {
      const response = await fetch('http://localhost:8005/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, fullName }),
      });

      if (response.status === 200) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log('Registration successful:', data);
        }
        else {
          const text = await response.text();
          console.log('Registration successful:', text);
        }
        window.location.href = '/login'; // Redirect to the login page
      }
      else if (response.status === 400) {
        const errorData = await response.text();
        console.error('User already exists:', errorData);
        setError(errorData || 'User already exists');
        alert(errorData || 'User already exists');
      }
      else {
        const errorData = await response.json();
        console.error('Error response from server:', errorData);
        setError(errorData.message || 'Registration failed');
        alert(errorData.message || 'Registration failed');
      }
      
    } catch (error) {
      console.error('Network error:', error);
      setError('An error occurred, please try again');
      alert('An error occurred, please try again');
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <h2>Sign In</h2>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={handleFullNameChange}
            required
          />
        </div>
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
