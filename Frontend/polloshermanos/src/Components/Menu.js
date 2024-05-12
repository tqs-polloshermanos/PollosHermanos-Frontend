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
      <div className="meal-examples">
        {/* Render meal examples here */}
        <div className="meal-card">
          <img src="example1.jpg" alt="Meal 1" />
          <h3>Meal Name</h3>
          <p>Description of the meal...</p>
        </div>
        <div className="meal-card">
          <img src="example2.jpg" alt="Meal 2" />
          <h3>Meal Name</h3>
          <p>Description of the meal...</p>
        </div>
        {/* Add more meal examples */}
      </div>
    </div>
  );
}

export default Menu;
