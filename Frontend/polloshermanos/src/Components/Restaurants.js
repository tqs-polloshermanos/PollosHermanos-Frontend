import React, { useEffect, useState } from 'react';
import './Restaurants.css'; // Import CSS file
import RestaurantMenu from './RestaurantMenu'; // Import the page with the menu of each restaurant

function Restaurants() {
  // Dummy data for demonstration
  const dummyData = [
    {
      id: 1,
      name: 'Italian Bistro',
      image: 'italian.jpg',
      cuisineType: 'ITALIAN',
      menu: [
        { id: 1, name: 'Spaghetti', description: 'Classic spaghetti with tomato sauce', price: 12.99, image: 'spaghetti.jpg'},
        { id: 2, name: 'Lasagna', description: 'Layers of pasta, meat, and cheese baked to perfection', price: 15.99, image: 'lasagna.jpg'},
      ],
    },
    {
      id: 2,
      name: 'Mexican Grill',
      image: 'mexican.jpg',
      cuisineType: 'MEXICAN',
      menu: [
        { id: 1, name: 'Tacos', description: 'Authentic Mexican tacos with your choice of filling', price: 8.99, image: 'tacos.jpg'},
        { id: 2, name: 'Burritos', description: 'Large flour tortilla stuffed with rice, beans, and meat', price: 10.99, image: 'burritos.jpg'},
      ],
    },
    {
      id: 3,
      name: 'Asian Fusion',
      image: 'asian.jpg',
      cuisineType: 'ASIAN',
      menu: [
        { id: 1, name: 'Sushi', description: 'Assorted sushi rolls with fresh fish and vegetables', price: 14.99, image: 'sushi.jpg'},
        { id: 2, name: 'Stir Fry', description: 'Mix of vegetables and protein stir-fried in a savory sauce', price: 12.99, image: 'stir-fry.jpg'},
      ],
    },
  ];

  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchRestaurants = async () => {
  //     try{
  //       const response = await fetch('api/restaurants');
  //       if (!response.ok) {
  //         throw new Error('Something went wrong while fetching the data');
  //       }
  //       const data = await response.json();
  //       setRestaurants(data);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error.message);
  //       setLoading(false);
  //     }
  //   };
  //   fetchRestaurants();
  // }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCuisineTypeChange = (e) => {
    setCuisineType(e.target.value);
  }

  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    window.location.href = `/restaurantMenu/${restaurant.id}`;
  };

  const filteredRestaurants = dummyData.filter((restaurant) => {
  // const filteredRestaurants = restaurants.filter((restaurant) => {
    const nameMatch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const cuisineTypeMatch = !cuisineType || restaurant.cuisineType === cuisineType;
    return nameMatch && cuisineTypeMatch;
  });

  // if (loading) {
  //   return <div className='loading'>Loading...</div>
  // }

  // if (error) {
  //   return <div className='error'>Error: {error}</div>
  // }

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
                <img src={restaurant.image} alt={restaurant.name} />
                <h3>{restaurant.name}</h3>
                <button onClick={() => handleSelectRestaurant(restaurant)}>Select</button>
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedRestaurant && <RestaurantMenu selectedRestaurant={selectedRestaurant} />}
    </div>
  );
}

export default Restaurants;
