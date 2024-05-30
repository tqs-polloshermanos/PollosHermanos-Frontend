// NavbarComponent.js
import React, { useState, useEffect } from 'react';
import './NavbarComponent.css'; // Import CSS file
import { useRestaurant } from './RestaurantContext';

function NavbarComponent() {
  const { restaurantName } = useRestaurant();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  console.log('Restaurant nameee:', restaurantName);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleTimeString(undefined, options);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <a href="/" className="brand">Pollos Hermanos</a>
        <div className="date-time">
          <span className="date">{formatDate(currentDateTime)}</span>
          <span className="time">{formatTime(currentDateTime)}</span>
        </div>
        <a href="/" className="nav-link">{restaurantName}</a>
        <a href="/" className="nav-link">Restaurant Select one</a>
      </div>
    </nav>
  );
}

export default NavbarComponent;
