import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from './CartContext';
import './RestaurantMenu.css';

function RestaurantMenu() {
  
  const { addItemToCart, cartItems, removeItemFromCart } = useCart();
  const [restaurantName, setRestaurantName] = useState('');
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
        console.log('Restaurant:', data);
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
        const response = await fetch(`http://localhost:8005/products/restaurant/${restaurantId}`);
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

  const handleBuy = () => {
    console.log('Selected items:', selectedItems);
    console.log('Cart items:', cartItems);
    if (cartItems.length > 0) {
      window.location.href = `/cart`;
    }
    else {
      alert('No items selected');
    }
  };
  
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
    const quantity = quantities[menuItem.id] || 1;
    if (existingItem) {
      setSelectedItems(selectedItems.map(item => item.id == menuItem.id ? {...item, quantity}: item));
    }
    else {
      setSelectedItems([...selectedItems, { ...menuItem, quantity}]);
    }
    addItemToCart(menuItem, quantity);
  };

  const removeItem = (itemId) => {
    setSelectedItems(selectedItems.filter(item => item.id !== itemId));
    removeItemFromCart(itemId);
  };
  

  return (
    <div className="menu-page-container">
      <h2>{restaurantName ? `${restaurantName} - Menu` : 'Select a Restaurant'}</h2>
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
                    <button className='select-to-add-button' onClick={() => selectItem(item)}>
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
              <h2>Selected Items</h2>
              <ul>
                {selectedItems.map(item => (
                  <li key={item.id} className="selected-item">
                    <div className="selected-item-details">
                      <h3>{item.name}:  ${(item.price).toFixed(2)} x {item.quantity}  </h3>
                      <button onClick={() => removeItem(item.id)}>🗑️</button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="total-price">
                <h2>Total: ${selectedItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h2>
              </div>
              <button className='handle-buy-button' onClick={handleBuy}>Buy</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantMenu;
