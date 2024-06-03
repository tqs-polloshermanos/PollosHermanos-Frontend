import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
import './Logout.css';

function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    localStorage.clear();
    logout();
  }
  , [logout]);

  return (
    <div className="logout-container">
      <form  className="logout-form">
        <h2>Logged out!</h2>
      </form>
  </div>
  );
}

export default Logout;
