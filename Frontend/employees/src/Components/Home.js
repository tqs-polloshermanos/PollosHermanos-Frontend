import React from 'react';
import { useAuth } from './AuthContext';
import './Home.css'; // Import CSS file for initial view
import HomeAfterLogin from './HomeAfterLogin'; // Import the component to show after login

function Home() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <HomeAfterLogin />;
  }

  return (
    <div className="home-container">
      <h1>Welcome to</h1>
      <h2>Pollos Hermanos</h2>
      <a href="/login">
        <button className="login-button">Please Login</button>
      </a>
    </div>
  );
}

export default Home;
