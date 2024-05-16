import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; // Import Link
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Logout.css'; // Import CSS file

function Logout() {
  const { logout } = useAuth();
  const history = useHistory();
  
  useEffect (() => {
    logout();
    history.push('/login');
  }, [logout, history]);

  return (
    <div className="logout-container">
      <h2>Login out...</h2>
    </div>
  );
}

export default Logout;
