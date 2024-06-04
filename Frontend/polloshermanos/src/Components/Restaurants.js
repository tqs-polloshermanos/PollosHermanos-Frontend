import React, { useEffect, useState } from 'react';
import './Restaurants.css';
import config from '../config';

function Restaurants() {

  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try{
        const response = await fetch(`${config.apiUrl}/restaurants`);
        if (!response.ok) {
          throw new Error('Something went wrong while fetching the data');
        }
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error('Error:', error)
        setError('An error occurred while fetching restaurant data');
        alert('An error occurred while fetching restaurant data');
      }
    };
    fetchRestaurants();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCuisineTypeChange = (e) => {
    setCuisineType(e.target.value);
  }

  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    window.location.href = `/restaurantMenu?=${restaurant.id}`;
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const nameMatch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const cuisineTypeMatch = !cuisineType || restaurant.cuisineType === cuisineType;
    return nameMatch && cuisineTypeMatch;
  });


  return (
    <div className="restaurant-selection-container">
      <h1>Restaurant Selection</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a restaurant..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select value={cuisineType} onChange={handleCuisineTypeChange}>
          <option value="">All Cuisines</option>
          <option value="MEXICAN">Mexican</option>
          <option value="AMERICAN">American</option>
          <option value="ITALIAN">Italian</option>
          <option value="CHINESE">Chinese</option>
          <option value="JAPANESE">Japanese</option>
          <option value="INDIAN">Indian</option>
          <option value="FRENCH">French</option>
          <option value="MEDITERRANEAN">Mediterranean</option>
          <option value="OTHER">Other</option>
        </select>
      </div>
      <div className="restaurant-container">
        {filteredRestaurants.length === 0 ? (
          <p className="no-restaurants-message">No restaurants found.</p>
        ) : (
          <div className="restaurant-list">
            {filteredRestaurants.map((restaurant) => (
              <div className="restaurant-card" key={restaurant.id}>
                <h3>{restaurant.name}</h3>
                <p><strong>Cuisine Type:</strong> {restaurant.cuisineType}</p>
                <p><strong>Address:</strong> {restaurant.address}</p>
                <p><strong>Description:</strong> {restaurant.description}</p>
                <button onClick={() => handleSelectRestaurant(restaurant)}>Select</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Restaurants;
