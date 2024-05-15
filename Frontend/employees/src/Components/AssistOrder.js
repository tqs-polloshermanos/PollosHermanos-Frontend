import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './AssistOrder.css'; // Import CSS file

// Dummy data for demonstration purposes
let orders = {
  101: { priority: true, description: 'Issue with the payment process.', answered: false },
  102: { priority: false, description: 'Need assistance with the menu.', answered: false },
  103: { priority: true, description: 'Customer requested extra napkins.', answered: false },
  104: { priority: false, description: '', answered: false },
};

function OrderDetailsPage() {
  const { orderId } = useParams();
  const history = useHistory();
  const order = orders[orderId];

  const handleGoBack = () => {
    history.push('/assist');
  };

  const handleMarkAsDone = () => {
    // Update the state to mark the order as answered
    orders = {
      ...orders,
      [orderId]: {
        ...orders[orderId],
        answered: true
      }
    };
    // Redirect back to the assist page
    history.push('/assist');

  };

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="order-details-page">
      <h1>Assistance: {orderId}</h1>
      <div className="order-description-container">
        <p>{order.description || 'No description available.'}</p>
      </div>
      <div className="buttons-container">
        <button onClick={handleGoBack} className="back-button">Go Back</button>
        <button onClick={handleMarkAsDone} className="mark-done-button">Mark as Read</button>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
