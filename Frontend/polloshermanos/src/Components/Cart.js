import React, { useEffect } from 'react';
import './Cart.css'; // Import CSS file
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';

function Cart() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeItemFromCart, clearCart, getCartItems } = useCart();
  const { isAuthenticated } = useAuth();

  const handleConfirmPurchase = () => {
    window.location.href = '/checkout';
  };

  useEffect(() => {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      getCartItems(JSON.parse(cartItems));
    }
  }, [getCartItems]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }  , [cartItems]);

  const handleLogin = () => {
    window.location.href = `/login`;
  };

  if (!isAuthenticated) {
    return (
      <div className='login-message'>
        <h2>Please log in to be able to use the cart.</h2>
        <button className='login-button' onClick={handleLogin}>Login</button>
      </div>
    );
  }

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      <ul className="cart-items">
        {cartItems.map(item => (
          <li className="cart-item" key={item.id}>
            <div className="item-info">
              <div className='item-text'>
                <h3>{item.name}</h3>
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Restaurant:</strong> {item.restaurantName}</p>
                <p><strong>Price:</strong> ${item.price}</p>
              </div>
              <div className='quantity-buttons'>
                <button className="personalize" onClick={() => console.log('Personalize item with id:', item.id)}>Personalize</button>
                <button className="decrease" onClick={() => decreaseQuantity(item.id)}>-</button>
                <p>Quantity: {item.quantity}</p>
                <button className="increase" onClick={() => increaseQuantity(item.id)}>+</button>
              <button className='remove' onClick={() => removeItemFromCart(item.id)}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="total-price-buy">Total Price: ${totalPrice}</div>
      {cartItems.length > 0 && (
        <button className='confirm-button-buy' onClick={handleConfirmPurchase}>Confirm Purchase</button>
      )}
    </div>
  );
}

export default Cart;
