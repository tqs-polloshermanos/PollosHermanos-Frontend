// NavbarComponent.js
import React from 'react';
import './NavbarComponent.css'; // Import CSS file
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function NavbarComponent() {
  return (
    <nav className="navbar">
      <div className="container">
        <a href="/" className="brand">Pollos Hermanos</a>
        <ul className="nav-list">
          <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
          <li className="nav-item"><a href="/manageOrders" className="nav-link">Manage Orders</a></li>
          <li className="nav-item"><a href="/payments" className="nav-link">Payments</a></li>
          <li className="nav-item"><a href="/assist" className="nav-link">Assist</a></li>
        </ul>
        <a href="/login" className="login-btn nav-link">Login/Sign-up</a>
      </div>
    </nav>
  );
}

export default NavbarComponent;
