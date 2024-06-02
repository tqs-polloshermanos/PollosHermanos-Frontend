// NavbarComponent.js
import React from 'react';
import './NavbarComponent.css'; // Import CSS file
import { useAuth } from './AuthContext';

function NavbarComponent() {
  const { isAuthenticated, user, logout } = useAuth();

  console.log('isAuthenticated:', isAuthenticated);
  console.log('user:', user);
  
  return (
    <nav className="navbar">
      <div className="container">
        <a href="/" className="brand">Pollos Hermanos</a>
        <ul className="nav-list">
          <li className="nav-item"><a href="/" className="nav-link">Home(Restaurant Selection)</a></li>
          <li className="nav-item"><a href="/manageOrders" className="nav-link">Manage Orders</a></li>
          <li className="nav-item"><a href="/deliverOrders" className="nav-link">Deliver Orders</a></li>
        </ul>
        <ul className='nav-user'>
          {isAuthenticated ? (
            <>
              <p className='nav-greeting'>Hi, {user.fullName}!</p>
              <a href="/logout" className="nav-link" onClick={logout}>Logout</a>
            </>
          ): (
            <a href="/login" className="nav-link">Login/Sign-up</a>
            )}
        </ul>
      </div>
    </nav>
  );
}

export default NavbarComponent;
