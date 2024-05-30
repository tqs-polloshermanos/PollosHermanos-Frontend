// NavbarComponent.js
import React, { useState, useEffect } from 'react';
import './NavbarComponent.css'; // Import CSS file
import { useRestaurant } from './RestaurantContext';

function NavbarComponent() {
  const { restaurantData, getRestaurantData } = useRestaurant();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const restaurantData = localStorage.getItem('restaurantData');
    if (restaurantData){
      getRestaurantData(JSON.parse(restaurantData));
    }
  }, [getRestaurantData]);
  
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
        {restaurantData.name ? (
          <a href="/" className="nav-link">{restaurantData.name}</a>
        ) : (
          <a href="/restaurantSelection" className="nav-link">Select a Restaurant</a>
        )}
      </div>
    </nav>
  );
}

export default NavbarComponent;
