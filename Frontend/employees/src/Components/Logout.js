import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import './Logout.css'; // Import CSS file

function Logout() {
  const { logout } = useAuth();

  return (
    <div className="logout-container">
      <form  className="logout-form">
        <h2>Logged out!</h2>
      </form>
  </div>
  );
}

export default Logout;
