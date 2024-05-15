import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import './Assist.css'; // Import CSS file

// Dummy data for demonstration purposes
const orders = [
  { id: 101, priority: true, description: 'Issue with the payment process.' },
  { id: 102, priority: false, description: 'Need assistance with the menu.' },
  { id: 103, priority: true, description: 'Customer requested extra napkins.' },
  { id: 104, priority: false, description: '' },
];

function AssistPage() {
  const [orderList, setOrderList] = useState(orders);
  const history = useHistory(); // Initialize useHistory hook

  const togglePriority = (orderId) => {
    setOrderList(orderList.map(order => 
      order.id === orderId ? { ...order, priority: !order.priority } : order
    ));
  };

  const handleSelectOrder = (orderId) => {
    history.push(`/assistOrder/${orderId}`);
  };

  return (
    <div className="assist-page">
      <h1>Assistance</h1>
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>See More</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map(order => (
              <tr key={order.id} className={`order-row ${order.priority ? 'priority' : ''}`}>
                <td>{order.id}</td>
                <td>
                  <button className="select-button" onClick={() => handleSelectOrder(order.id)}>Select to see</button>
                </td>
                <td>
                  <button 
                    className={`priority-button ${order.priority ? 'remove-priority' : 'give-priority'}`} 
                    onClick={() => togglePriority(order.id)}
                  >
                    {order.priority ? 'Remove Priority' : 'Give Priority'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssistPage;
