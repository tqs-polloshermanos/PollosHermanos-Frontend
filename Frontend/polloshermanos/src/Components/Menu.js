import React, { useState } from 'react';
import './Menu.css'; // Import CSS file
import { useCart } from './CartContext';

function Menu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const { addItemToCart } = useCart();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCuisineChange = (e) => {
    setCuisineType(e.target.value);
  };

  const handleSearch = () => {
    console.log('Search query:', searchQuery);
    console.log('Cuisine type:', cuisineType);
  };

  const handleAddToCart = (meal) => {
    addItemToCart(meal);
    console.log(`Adding ${meal.name} to cart...`);
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
          <div className="meal-card">
            <img src="example1.jpg" alt="Meal 1" />
            <h3>Meal Name</h3>
            <p>Description of the meal...</p>
            <p>Price: $10</p>
            <button onClick={() => handleAddToCart({ id: 1, name: 'Meal 1', price: 10 })}>Add to Cart</button>
          </div>
          <div className="meal-card">
            <img src="example2.jpg" alt="Meal 2" />
            <h3>Meal Name</h3>
            <p>Description of the meal...</p>
            <p>Price: $15</p>
            <button onClick={() => handleAddToCart({ id: 2, name: 'Meal 2', price: 15 })}>Add to Cart</button>
          </div>
          {/* Add more meal examples */}
        </div>
      </div>
    </div>
  );
}

export default Menu;
