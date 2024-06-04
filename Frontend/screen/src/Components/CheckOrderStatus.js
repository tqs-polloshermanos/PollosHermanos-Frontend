import React, { useState, useEffect } from 'react';
import './CheckOrderStatus.css';
import config from '../config';

function CheckOrderStatusPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const restaurant = localStorage.getItem('selectedRestaurant');
  const restaurantId = JSON.parse(restaurant).id;
  const selectedRestaurantName = JSON.parse(restaurant).name;
  const [processingOrderList, setProcessingOrderList] = useState([]);
  const [doneOrderList, setDoneOrderList] = useState([]);
  const [orderStatus, setOrderStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!restaurantId) {
      return;
    }
    const fetchOrders = async (status, setOrderList) => {
      try {
        const response = await fetch(`${config.api}/orders/${status}/${restaurantId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error fetching orders:', errorData);
          throw new Error(errorData.message || 'Failed to fetch orders');
        }
        const data = await response.json();
        console.log(`${status} Orders:`, data);
        if (Array.isArray(data.orders)) {
          setOrderList(data.orders);
        } else {
          console.log('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchOrders('in-progress', setProcessingOrderList);
    fetchOrders('done', setDoneOrderList);
  }, [restaurantId]);

  const handleInputChange = (e) => {
    setOrderNumber(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const allOrders = [
      ...processingOrderList,
      ...doneOrderList
    ];
    const foundOrder = allOrders.find(order => order.id === Number(orderNumber));
    if (foundOrder) {
      setOrderStatus(foundOrder.status);
      setError('');
    } else {
      setOrderStatus('');
      setError('Order not found. Please check the order number and try again.');
    }
  };

  return (
    <div className="check-order-status-page">
      <div className="order-status-container">
        <h1>Check Order Status for: {selectedRestaurantName}</h1>
        <form onSubmit={handleFormSubmit} className="order-status-form">
          <label htmlFor="orderNumber">Enter your order number:</label>
          <input
            type="text"
            id="orderNumber"
            value={orderNumber}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Search</button>
        </form>
        {orderStatus && (
          <div className="order-status-result">
            <h2>Order Status</h2>
            <p>{orderStatus}</p>
          </div>
        )}
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckOrderStatusPage;
