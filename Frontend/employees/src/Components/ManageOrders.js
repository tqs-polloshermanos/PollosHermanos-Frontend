import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ManageOrders.css'; // Import CSS file

// Dummy data for demonstration purposes
// const orders = [
//   {
//     id: 1,
//     image: 'product1.jpg',
//     name: 'Chicken Sandwich',
//     priority: true,
//     quantity: 2,
//   },
//   {
//     id: 2,
//     image: 'product2.jpg',
//     name: 'Veggie Burger',
//     priority: false,
//     quantity: 1,
//   },
//   {
//     id: 3,
//     image: 'product3.jpg',
//     name: 'Fish Tacos',
//     priority: true,
//     quantity: 3,
//   },
// ];

function ManageOrdersPage() {
  const [orderList, setOrderList] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const restaurantId = searchParams.get('');

  useEffect(() => {
    if (!restaurantId) {
      return;
    }
    const fetchRestaurantName = async () => {
      try {
        const response = await fetch(`http://localhost:8005/restaurants/${restaurantId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch restaurant data');
        }
        const data = await response.json();
        console.log('Restaurant:', data);
        setRestaurantName(data.name);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchRestaurantName();
  }, [restaurantId]);

  useEffect(() => {
    if (!restaurantId) {
      return;
    }
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:8005/orders/restaurant/${restaurantId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token') || '',
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error fetching orders:', errorData);
          throw new Error(errorData.message || 'Failed to fetch orders');
        }
        const data = await response.json();
        if(Array.isArray(data)){
          setOrderList(data);
        }
        else{
          console.log('Unexpected response format:', data);
        }
        // console.log('Orders:', data);
        // setOrderList(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchOrders();
  }, [restaurantId]);

  if (!restaurantId) {
    return (
      <div className="information-message">
        <h1>Please select a restaurant first</h1>
        <button onClick={() => window.location.href="/homeAfterLogin"} className='info-btn'>Select a restaurant</button>
      </div>
    );
  }

  const handleOrderDone = (orderId) => {
    setOrderList(orderList.filter(order => order.id !== orderId));
  };

  return (
    <div className="manage-orders-page">
      <h1>Manage Orders for: {restaurantName}</h1>
      <div className="orders-container">
        {orderList.length > 0 ? (
          orderList.map(order => (
            <div className={`order-card ${order.priority ? 'priority' : ''}`} key={order.id}>
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
          ))
        ) : (
          <p>No orders found for this restaurant</p>
        )}
      </div>
    </div>
  );
}

export default ManageOrdersPage;
