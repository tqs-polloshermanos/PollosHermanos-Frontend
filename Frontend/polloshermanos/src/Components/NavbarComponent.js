// NavbarComponent.js
import React from 'react';
import './NavbarComponent.css'; // Import CSS file
import cartImage from './img/cart.png'; // Import the cart image
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function NavbarComponent() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="brand">Pollos Hermanos</Link> {/* Update the link to use Link */}
        <ul className="nav-list">
          <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
          <li className="nav-item"><a href="#menu" className="nav-link">Menu</a></li>
          <li className="nav-item"><a href="#history" className="nav-link">History</a></li>
          <li className="nav-item"><a href="#locations" className="nav-link">Locations</a></li>
          <li className="nav-item"><a href="#contact" className="nav-link">Contact</a></li>
          <li className="nav-item">
            {/* Cart link with cart image */}
            <a href="#cart" className="nav-link cart-link">
              <div className="cart-container">
                <img src={cartImage} alt="Cart" className="cart-image" />
              </div>
            </a>
          </li>
        </ul>
        {/* Wrap the login link inside Link component */}
        <Link to="/login" className="login-btn nav-link">Login/Sign-up</Link>
      </div>
    </nav>
  );
}

export default NavbarComponent;
