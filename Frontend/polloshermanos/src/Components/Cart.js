import React, { useState } from 'react';
import './Cart.css'; // Import CSS file

function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Pizza', price: 10, quantity: 2, image: 'pizza.jpg' },
    { id: 2, name: 'Burger', price: 8, quantity: 1, image: 'burger.jpg' },
    { id: 3, name: 'Salad', price: 6, quantity: 1, image: 'salad.jpg' },
  ]);

  const handleIncreaseQuantity = (itemId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (itemId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
      ).filter(item => item.quantity > 0) // Filter out items with quantity 0
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== itemId)
    );
  };

  const handleConfirmPurchase = () => {
    // Logic to confirm purchase
    console.log('Purchase confirmed!');
  };

    const handlePersonalize = (itemId) => {
    // Logic to personalize item
    console.log('Personalize item with id:', itemId);
    };

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      <ul className="cart-items">
        {cartItems.map(item => (
          <li className="cart-item" key={item.id}>
            <div className="item-info">
              <img src={item.image} alt={item.name} className="item-image" />
              <div>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
            <button className="personalize" onClick={() => handlePersonalize(item.id)}>Personalize</button>
            <button className="increase" onClick={() => handleIncreaseQuantity(item.id)}>+</button>
            <button className="decrease" onClick={() => handleDecreaseQuantity(item.id)}>-</button>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="total-price">Total Price: ${totalPrice}</div>
      <button onClick={handleConfirmPurchase}>Confirm Purchase</button>
    </div>
  );
}

export default Cart;
