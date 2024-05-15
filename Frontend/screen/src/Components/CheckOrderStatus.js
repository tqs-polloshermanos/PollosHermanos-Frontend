import React, { useState } from 'react';
import './CheckOrderStatus.css'; // Import CSS file

function CheckOrderStatusPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);

  const handleInputChange = (e) => {
    setOrderNumber(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Dummy data for demonstration purposes
    const orderData = {
      101: 'In Progress',
      102: 'In Progress',
      103: 'Serving',
      104: 'In Progress',
      201: 'Serving',
      202: 'Serving',
      203: 'Serving',
    };

    // Fetch the order status based on the order number
    const status = orderData[orderNumber];
    setOrderStatus(status ? status : 'Order not found');
  };

  return (
    <div className="check-order-status-page">
      <div className="order-status-container">
        <h1>Check Order Status</h1>
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
      </div>
    </div>
  );
}

export default CheckOrderStatusPage;
