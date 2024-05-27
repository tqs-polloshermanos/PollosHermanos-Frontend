// NavbarComponent.js
import React from 'react';
import './NavbarComponent.css'; // Import CSS file
import cartImage from './img/cart.png'; // Import the cart image
import { useAuth } from './AuthContext';

function NavbarComponent() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="container">
        <a href="/" className="brand">Pollos Hermanos</a>
        <ul className="nav-list">
          <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
          {/* <li className="nav-item"><a href="/menu" className="nav-link">Menu</a></li> */}
          <li className="nav-item"><a href="/history" className="nav-link">History</a></li>
          <li className="nav-item"><a href="/restaurants" className="nav-link">Restaurants</a></li>
          <li className="nav-item"><a href="/contact" className="nav-link">Contact</a></li>
          <li className="nav-item">
            {/* Cart link with cart image */}
            <a href="/cart" className="nav-link cart-link">
              <div className="cart-container">
                <img src={cartImage} alt="Cart" className="cart-image" />
              </div>
            </a>
          </li>
        </ul>
        <ul className='nav-user'>
          {isAuthenticated ? (
            <>
              <span className='nav-greeting'>Hi, {user.fullName}</span>
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
