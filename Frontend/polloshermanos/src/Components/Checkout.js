import React, { useEffect, useState } from 'react';
import './Checkout.css'; // Import CSS file
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';

function Checkout() {

  const { cartItems, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [error, setError] = useState(null);
  const [showPaymentFields, setShowPaymentFields] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expirationDate: '',
    cvv: '',
  });

  async function fetchAuthenticatedUser() {
    const response = await fetch('/users/me', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    });

    console.log('Response:', response);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching user:', errorData);
      throw new Error(errorData.message || 'Failed to fetch user data');
    }
  }

  const handleCheckout = async () => {
    setError('');

    await fetchAuthenticatedUser();

    const response = await fetch('http://localhost:8005/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
      body: JSON.stringify({
        restaurantId: cartItems[0].restaurantId,
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      }),
    });

    const responseBody = await response.text();
    console.log('Response body:', responseBody);
    localStorage.setItem('order', responseBody);

    if (!response.ok) {
      setError(responseBody);
      alert(responseBody);
      setShowPaymentFields(false);
      return;
    }
    else {
      setShowPaymentFields(true);
    }

  };

  const handlePayment = async () => {
    await fetchAuthenticatedUser();
    setError('');
    
    const { cardNumber, cardName, expirationDate, cvv } = paymentInfo;

    if (!cardNumber || cardNumber.length !== 16 || isNaN(cardNumber)) {
      setError('Invalid card number');
      return;
    }
    if (!cardName) {
      setError('Invalid card name');
      return;
    }
    if (!expirationDate || !/^\d{2}\/\d{2}$/.test(expirationDate)) {
      setError('Invalid expiration date');
      return;
    }
    if (!cvv || cvv.length !== 3 || isNaN(cvv)) {
      setError('Invalid CVV');
      return;
    }

    setTimeout(async () => {
      try{
        const orderItem = localStorage.getItem('order');
        
        if (!orderItem) {
          setError('Order not found');
          return;
        }

        const order = JSON.parse(orderItem);
        const orderId = order.id;

        const response = await fetch(`http://localhost:8005/orders/${orderId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
          body: JSON.stringify({
            status: 'PROCESSING',
          }),
        });

        console.log("Response: ", response);

        if (!response.ok) {
          setError('Failed to process payment');
          console.error('Error processing payment:', response);
          return;
        } 

        alert('Payment successful! Your order has been placed.');
        clearCart();
        setShowPaymentFields(false);
        window.location.href = '/history';
      }
      catch (error) {
        setError('Failed to process payment');
        console.error('Error processing payment:', error);
      }
    }, 1000);

  };

  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: value,
    });
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <ul className="checkout-items">
        {cartItems.map(item => (
          <li className="checkout-item" key={item.id}>
            <div className="item-info">
              <div className='item-text'>
                <h3>{item.name}</h3>
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Restaurant:</strong> {item.restaurantName}</p>
                <p><strong>Price:</strong> ${item.price}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="total-price">Total Price: ${totalPrice}</div>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      {showPaymentFields &&(
        <div className="payment-fields">
          <p>Payment Information</p>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={paymentInfo.cardNumber}
            onChange={handlePaymentInfoChange}
          />
          <input
            type="text"
            name="cardName"
            placeholder="Card Name"
            value={paymentInfo.cardName}
            onChange={handlePaymentInfoChange}
          />
          <input
            type="text"
            name="expirationDate"
            placeholder="Expiration Date (MM/YY)"
            value={paymentInfo.expirationDate}
            onChange={handlePaymentInfoChange}
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={paymentInfo.cvv}
            onChange={handlePaymentInfoChange}
          />
            <button className='pay-button' onClick={handlePayment}>
              {'Pay'}
            </button>
        </div>
      
      )}
      {!showPaymentFields && !error && (
        <div className="success">
          <button className='checkout-button' onClick={handleCheckout}>
            {'Place Order'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
