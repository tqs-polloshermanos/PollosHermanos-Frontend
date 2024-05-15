import React, { useState } from 'react';
import './ManageOrders.css'; // Import CSS file

// Dummy data for demonstration purposes
const orders = [
  {
    id: 1,
    image: 'product1.jpg',
    name: 'Chicken Sandwich',
    priority: true,
    quantity: 2,
  },
  {
    id: 2,
    image: 'product2.jpg',
    name: 'Veggie Burger',
    priority: false,
    quantity: 1,
  },
  {
    id: 3,
    image: 'product3.jpg',
    name: 'Fish Tacos',
    priority: true,
    quantity: 3,
  },
];

function ManageOrdersPage() {
  const [orderList, setOrderList] = useState(orders);

  const handleOrderDone = (orderId) => {
    setOrderList(orderList.filter(order => order.id !== orderId));
  };

  return (
    <div className="manage-orders-page">
      <h1>Manage Orders</h1>
      <div className="orders-container">
        {orderList.map(order => (
          <div className={`order-card ${order.priority ? 'priority' : ''}`} key={order.id}>
            <img src={order.image} alt={order.name} className="order-image" />
            <div className="order-details">
              <h3>Order #{order.id}</h3>
              <h4>{order.name}</h4>
              <p>Priority: {order.priority ? 'Yes' : 'No'}</p>
              <p>Quantity: {order.quantity}</p>
              <button onClick={() => handleOrderDone(order.id)} className="done-button">
                Done
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageOrdersPage;
