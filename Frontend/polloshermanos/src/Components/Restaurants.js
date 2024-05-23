import React, { useState } from 'react';
import './Restaurants.css'; // Import CSS file

function Restaurants() {
  // Dummy data for demonstration
  const dummyData = [
    { id: 1, name: 'Italian Bistro', image: 'italian.jpg', cuisineType: 'ITALIAN'},
    { id: 2, name: 'Mexican Grill', image: 'mexican.jpg', cuisineType: 'MEXICAN' },
    { id: 3, name: 'Asian Fusion', image: 'asian.jpg', cuisineType: 'ASIAN'},
    // Add more restaurants as needed
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  // const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCuisineTypeChange = (e) => {
    setCuisineType(e.target.value);
  }

  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const filteredRestaurants = dummyData.filter((restaurant) => {
    const nameMatch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const cuisineTypeMatch = !cuisineType || restaurant.cuisineType === cuisineType;
    return nameMatch && cuisineTypeMatch;
  } );

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
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {!loading && !error && (
          <div className="restaurant-list">
              {filteredRestaurants.map((restaurant) => (
              <div className="restaurant-card" key={restaurant.id}>
                  <img src={restaurant.image} alt={restaurant.name} />
                  <h3>{restaurant.name}</h3>
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
