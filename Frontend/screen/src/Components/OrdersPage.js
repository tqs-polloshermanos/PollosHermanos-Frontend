import React, { useEffect, useState } from 'react';
import './OrdersPage.css'; // Import CSS file

function OrdersPage() {
  const [restaurantName, setRestaurantName] = useState('');
  const restaurant = localStorage.getItem('selectedRestaurant');
  const restaurantId = JSON.parse(restaurant).id;
  const [processingOrderList, setProcessingOrderList] = useState([]);
  const [doneOrderList, setDoneOrderList] = useState([]);

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

    const fetchProcessingOrders = async () => {
      try {
        const response = await fetch(`http://localhost:8005/orders/in-progress/${restaurantId}`, {
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
        console.log('Processing Orders:', data);
        if (Array.isArray(data.orders)) {
          setProcessingOrderList(data.orders);
        } else {
          console.log('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchDoneOrders = async () => {
      try {
        const response = await fetch(`http://localhost:8005/orders/done/${restaurantId}`, {
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
        console.log('Done Orders:', data);
        if (Array.isArray(data.orders)) {
          setDoneOrderList(data.orders);
        } else {
          console.log('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRestaurantName();
    fetchProcessingOrders();
    fetchDoneOrders();

    const intervalId = setInterval(() => {
      fetchProcessingOrders();
      fetchDoneOrders();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [restaurantId]);

  const processingOrdersIds = processingOrderList.map(order => order.id);
  console.log('Processing Orders IDs:', processingOrdersIds);
  const doneOrdersIds = doneOrderList.map(order => order.id);
  console.log('Done Orders IDs:', doneOrdersIds);

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
              {processingOrdersIds.map(order => (
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
              {doneOrdersIds.map(order => (
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
