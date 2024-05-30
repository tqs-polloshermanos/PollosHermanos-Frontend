import React, { useState } from 'react';
import RestaurantSelection from './RestaurantSelection';
import './Home.css'; // Import CSS file

function Home() {
  // Dummy data for demonstration
  // const restaurants = [
  //   { id: 1, name: 'Italian Bistro', image: 'italian.jpg' },
  //   { id: 2, name: 'Mexican Grill', image: 'mexican.jpg' },
  //   { id: 3, name: 'Asian Fusion', image: 'asian.jpg' },
  //   // Add more restaurants as needed
  // ];

  // const [searchQuery, setSearchQuery] = useState('');
  // const history = useHistory(); // Initialize useHistory hook

  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  // const handleSelectRestaurant = (restaurant) => {
  //   history.push('/orderspage', { selectedRestaurant: restaurant }); // Navigate to orders page with restaurant data
  // };

  // return (
  //   <div className="restaurant-selection-container">
  //     <h1>Restaurant Selection</h1>
  //     <div className="search-container">
  //       <input
  //         type="text"
  //         placeholder="Search for a restaurant..."
  //         value={searchQuery}
  //         onChange={handleSearchChange}
  //       />
  //     </div>
  //     <div className="restaurant-container">
  //       <div className="restaurant-list">
  //         {restaurants
  //           .filter((restaurant) =>
  //             restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  //           )
  //           .map((restaurant) => (
  //             <div className="restaurant-card" key={restaurant.id}>
  //               <img src={restaurant.image} alt={restaurant.name} />
  //               <h3>{restaurant.name}</h3>
  //               <button onClick={() => handleSelectRestaurant(restaurant)}>Select</button>
  //             </div>
  //           ))}
  //       </div>
  //     </div>
  //   </div>
  // );


  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  if (!selectedRestaurant) {
    return <RestaurantSelection onSelectRestaurant={setSelectedRestaurant} />;
  }
}

export default Home;
