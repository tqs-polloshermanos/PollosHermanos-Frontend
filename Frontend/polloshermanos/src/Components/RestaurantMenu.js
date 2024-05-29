import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext';
import './RestaurantMenu.css'; // Import CSS file

function RestaurantMenu() {

  const { id } = useParams();
  const { addItemToCart } = useCart();
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`http://localhost:8005/restaurants/${id}`);
        if (!response.ok) {
          throw new Error('Something went wrong while fetching the data');
        }
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        console.error('Error:', error)
        setError('An error occurred while fetching restaurant data');
        alert('An error occurred while fetching restaurant data');
      }
    };
    fetchRestaurant();
  }, [id]);

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
      <h2>{restaurant ? `${restaurant.name}` : 'Select a Restaurant'}</h2>
      <div className='menu-container'>
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
                      <span>{item.name}:  ${(item.price * item.quantity).toFixed(2)} x {item.quantity}</span>
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
