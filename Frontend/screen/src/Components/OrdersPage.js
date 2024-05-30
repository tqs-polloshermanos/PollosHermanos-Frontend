import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './OrdersPage.css'; // Import CSS file
import { useRestaurant } from './RestaurantContext';

function OrdersPage() {
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
        setRestaurantName(data.name);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchRestaurantName();
  }, [restaurantId]);

  // Dummy data for orders
  const inProgressOrders = [101, 102, 103, 104];
  const servingOrders = [201, 202, 203];

  const handleCheckOrderStatus = () => {
    window.location.href = '/checkorderstatus';
  };

  return (
    <div className="orders-page">
      <h1>{restaurantName ? `${restaurantName} - Orders` : 'Restaurant Orders'}</h1>
      <div className="check-status">
        <button onClick={handleCheckOrderStatus} className="check-status-btn">
          Check your order status here
        </button>
      </div>
      <div className="orders-tables">
        <div className="orders-table">
          <h2>In Progress</h2>
          <table>
            <thead>
              <tr>
                <th>Order Number</th>
              </tr>
            </thead>
            <tbody>
              {inProgressOrders.map(order => (
                <tr key={order}>
                  <td>{order}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="orders-table">
          <h2>Serving</h2>
          <table>
            <thead>
              <tr>
                <th>Order Number</th>
              </tr>
            </thead>
            <tbody>
              {servingOrders.map(order => (
                <tr key={order}>
                  <td>{order}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
