import React, { useState } from 'react';
import RestaurantSelection from './RestaurantSelection';
import './Home.css'; 

function Home() {

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  if (!selectedRestaurant) {
    return <RestaurantSelection onSelectRestaurant={setSelectedRestaurant} />;
  }
}

export default Home;
