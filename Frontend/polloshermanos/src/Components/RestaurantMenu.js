import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RestaurantMenu.css'; // Import CSS file

function RestaurantMenu() {
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

  const { id } = useParams();
  // const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});

  const restaurant = dummyData.find(restaurant => restaurant.id === parseInt(id));

  // useEffect(() => {
  //   const fetchRestaurant = async () => {
  //     try {
  //       const response = await fetch(`/api/restaurants/${id}`);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch restaurant');
  //       }
  //       const data = await response.json();
  //       setRestaurant(data);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchRestaurant();
  // }, [id]);

  const handleQuantityChanges = (menuItemId, value) => {
    setQuantities({
      ...quantities,
      [menuItemId]: value,
    });
  };

  const addToCart = (menuItem) => {
    const quantity = quantities[menuItem] || 1;
    setCart([...cart, { ...menuItem, quantity }]);
  };

  // if (loading) {
  //   return <div className='loading'>Loading...</div>;
  // }

  // if (error) {
  //   return <div className='error'>Error: {error}</div>;
  // }

  return (
    <div className="menu-page-container">
      <h2>{restaurant ? `${restaurant.name}` : 'Select a Restaurant'}</h2>
      <div className="menu-items">
        {restaurant && restaurant.menu ? (
          restaurant.menu.map((item) => (
            <div className="menu-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>${item.price.toFixed(2)}</p>
                <div className="add-to-cart">
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    value = {quantities[item.id] || 1}
                    onChange={(e) => handleQuantityChanges(item.id, parseInt(e.target.value))}
                  />
                  <button onClick={() => addToCart(item)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No menu items available</p>
        )}
      </div>
    </div>
  );
}

export default RestaurantMenu;
