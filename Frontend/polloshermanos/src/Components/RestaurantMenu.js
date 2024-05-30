import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from './CartContext';
import './RestaurantMenu.css'; // Import CSS file

function RestaurantMenu() {
  
  const { addItemToCart } = useCart();
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const restaurantId = searchParams.get('');

  useEffect(() => {
    if (!restaurantId) {
      return;
    }
    const fetchRestaurantName = async () => {
      try {
        const response = await fetch(`http://localhost:8005/restaurants/${restaurantId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch restaurant data');
        }
        const data = await response.json();
        setRestaurantName(data.name);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchRestaurantName();
  }, [restaurantId]);

  useEffect(() => {
    if (!restaurantId) {
      return;
    }
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`http://localhost:8005/api/products/restaurant/${restaurantId}`);
        console.log("response", response)
        if (!response.ok) {
          throw new Error('Something went wrong while fetching the data');
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error:', error)
        setError('An error occurred while fetching restaurant data');
        alert('An error occurred while fetching restaurant data');
      }
    };
    fetchMenuItems();
  }, [restaurantId]);

  if (!restaurantId) {
    return (
      <div className="information-message">
        <h1>Please select a restaurant first</h1>
        <button onClick={() => window.location.href="/restaurants"} className='info-btn'>Select a restaurant</button>
      </div>
    );
  }

  const handleQuantityChanges = (menuItemId, value) => {
    setQuantities({
      ...quantities,
      [menuItemId]: value,
    });
  };

  const selectItem = (menuItem) => {
    const existingItem = selectedItems.find(item => item.id ==menuItem.id);
    if (existingItem) {
      setSelectedItems(selectedItems.map(item => item.id == menuItem.id ? {...item, quantity: quantities[menuItem.id] || 1}: item));
    }
    else {
      setSelectedItems([...selectedItems, { ...menuItem, quantity: quantities[menuItem.id] || 1}]);
    }
  };

  const handleBuy = () => {
    selectedItems.forEach(item => addItemToCart(item));
    window.location.href = `/cart`;
  };
  

  return (
    <div className="menu-page-container">
      <h2>{restaurant ? `${restaurantName} - Menu` : 'Select a Restaurant'}</h2>
      <div className='menu-container'>
        <div className="menu-items">
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <div className="menu-item" key={item.id}>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p><strong>${item.price.toFixed(2)}</strong></p>
                  <div className="add-to-cart">
                    <input
                      type="number"
                      min="1"
                      value = {quantities[item.id] || 1}
                      onChange={(e) => handleQuantityChanges(item.id, parseInt(e.target.value))}
                    />
                    <button onClick={() => selectItem(item)}>
                      Select to add
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No menu items available</p>
          )}
        </div>
        <div className='side-form'>
          {selectedItems.length > 0 && (
            <div className='side-form2'>
              <h3>Selected Items</h3>
              <ul>
                {selectedItems.map(item => (
                  <li key={item.id} className="selected-item">
                    <div className="selected-item-details">
                      <span>{item.name}:  ${(item.price).toFixed(2)} x {item.quantity}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="total-price">
                Total: ${selectedItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
              </div>
              <button onClick={handleBuy}>Buy</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantMenu;
