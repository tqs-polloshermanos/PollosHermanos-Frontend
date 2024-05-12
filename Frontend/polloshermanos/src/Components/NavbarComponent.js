import React from 'react';
import './NavbarComponent.css'; // Import CSS file

function NavbarComponent() {
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <a href="index.html" className="brand">Pollos Hermanos</a>
          <ul className="nav-list">
            <li className="nav-item"><a href="index.html" className="nav-link">Home</a></li>
            <li className="nav-item"><a href="#menu" className="nav-link">Menu</a></li>
            <li className="nav-item"><a href="#locations" className="nav-link">Locations</a></li>
            <li className="nav-item"><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
          <a href="login.html" className="login-btn nav-link">Login/Sign-up</a>
        </div>
      </nav>
    </>
  );
}

export default NavbarComponent;
