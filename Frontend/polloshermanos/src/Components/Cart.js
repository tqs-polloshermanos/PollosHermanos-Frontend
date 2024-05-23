import React from 'react';
import './Cart.css'; // Import CSS file
import { useHistory } from 'react-router-dom';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';

function Cart() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeItemFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const history = useHistory();

  const handleConfirmPurchase = () => {
    console.log('Purchase confirmed!');
    clearCart();
  };

  const handleLogin = () => {
    history.push('/login');
  };

  // if (!isAuthenticated) {
  //   return (
  //     <div className='login-message'>
  //       <h2>Please log in to be able to use the cart.</h2>
  //       <button className='login-button' onClick={handleLogin}>Login</button>
  //     </div>
  //   );
  // }

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
            <button className="personalize" onClick={() => console.log('Personalize item with id:', item.id)}>Personalize</button>
            <button className="increase" onClick={() => increaseQuantity(item.id)}>+</button>
            <button className="decrease" onClick={() => decreaseQuantity(item.id)}>-</button>
            <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="total-price">Total Price: ${totalPrice}</div>
      <button onClick={handleConfirmPurchase}>Confirm Purchase</button>
    </div>
  );
}

export default Cart;
