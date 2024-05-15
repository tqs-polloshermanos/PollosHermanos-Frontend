import React, { useState } from 'react';
import './Payments.css'; // Import CSS file

// Dummy data for demonstration purposes
const orders = {
  101: { total: 25.99, paid: false },
  102: { total: 18.75, paid: false },
  103: { total: 42.50, paid: false },
  104: { total: 31.00, paid: false },
};

function PaymentsPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleInputChange = (e) => {
    setOrderNumber(e.target.value);
  };

  const handleSearch = () => {
    const order = orders[orderNumber];
    setOrderDetails(order ? { ...order, orderNumber } : null);
    setPaymentStatus(order ? order.paid ? 'Yes' : 'No' : '');
  };

  const handlePaymentStatusChange = (e) => {
    setPaymentStatus(e.target.value);
  };

  const handleConfirm = () => {
    if (orderDetails) {
      orders[orderDetails.orderNumber].paid = paymentStatus === 'Yes';
      setOrderDetails({ ...orderDetails, paid: paymentStatus === 'Yes' });
    }
  };

  return (
    <div className="payments-page">
      <h1>Payment</h1>
      <div className="search-order">
        <label htmlFor="orderNumber">Order:</label>
        <input
          type="text"
          id="orderNumber"
          value={orderNumber}
          onChange={handleInputChange}
          required
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      {orderDetails && (
        <div className="order-details">
          <p>Order: {orderDetails.orderNumber}</p>
          <p>Total: ${orderDetails.total.toFixed(2)}</p>
          <div className='paid'>
            <label htmlFor="paidStatus">Paid?</label>
            <select id="paidStatus" value={paymentStatus} onChange={handlePaymentStatusChange}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
            <button onClick={handleConfirm} className="confirm-button">Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentsPage;
