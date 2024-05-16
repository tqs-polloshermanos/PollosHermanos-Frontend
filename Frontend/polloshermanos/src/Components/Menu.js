import React, { useState } from 'react';
import './Menu.css'; // Import CSS file

function Menu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisineType, setCuisineType] = useState('');


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCuisineChange = (e) => {
    setCuisineType(e.target.value);
  };

  const handleSearch = () => {
    // Logic to handle search
    console.log('Search query:', searchQuery);
    console.log('Cuisine type:', cuisineType);
  };

  const handleAddToCart = (mealName) => {
    // Logic to add meal to cart
    console.log(`Adding ${mealName} to cart...`);
  };

  return (
    <div className="menu-container">
      <h1>Menu</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a meal..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select value={cuisineType} onChange={handleCuisineChange}>
          <option value="">Select cuisine type</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Asian">Asian</option>
          {/* Add more cuisine types as needed */}
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="meal-container">
        <div className="meal-examples">
          {/* Render meal examples here */}
          <div className="meal-card">
            <img src="example1.jpg" alt="Meal 1" />
            <h3>Meal Name</h3>
            <p>Description of the meal...</p>
            <p>Price of the meal...</p>
            <button onClick={() => handleAddToCart('Meal 1')}>Add to Cart</button>
          </div>
          <div className="meal-card">
            <img src="example2.jpg" alt="Meal 2" />
            <h3>Meal Name</h3>
            <p>Description of the meal...</p>
            <p>Price of the meal...</p>
            <button onClick={() => handleAddToCart('Meal 2')}>Add to Cart</button>
          </div>
          {/* Add more meal examples */}
        </div>
      </div>
    </div>
  );
}

export default Menu;
