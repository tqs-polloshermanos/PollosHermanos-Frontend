import React, { useState } from 'react';
import './HomeAfterLogin.css';
import RestaurantSelection from './RestaurantSelection';

function HomeAfterLogin() {

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  if (!selectedRestaurant) {
    return <RestaurantSelection onSelectRestaurant={setSelectedRestaurant} />;
  }
}

export default HomeAfterLogin;
