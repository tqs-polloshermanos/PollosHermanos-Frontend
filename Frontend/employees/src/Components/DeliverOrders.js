import React, { useState, useEffect } from 'react';
import './DeliverOrders.css'; // Import CSS file

function DeliverOrdersPage() {
  const [doneOrderList, setDoneOrderList] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');
  const [error, setError] = useState('');
  const restaurant = localStorage.getItem('selectedRestaurant');
  const restaurantId = JSON.parse(restaurant).id;

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
    const fetchDoneOrders = async () => {
      try {
        const response = await fetch(`http://localhost:8005/orders/restaurant/${restaurantId}?status=DONE`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error fetching orders:', errorData);
          throw new Error(errorData.message || 'Failed to fetch orders');
        }
        const data = await response.json();
        console.log('Orders:', data);
        if(Array.isArray(data)){
          setDoneOrderList(data);
        }
        else{
          console.log('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchDoneOrders();
  }, [restaurantId]);

  if (!restaurantId) {
    return (
      <div className="information-message">
        <h1>Please select a restaurant first</h1>
        <button onClick={() => window.location.href="/homeAfterLogin"} className='info-btn'>Select a restaurant</button>
      </div>
    );
  }

  const handleOrderDone = async (orderId) => {
    setError('');

    await fetchAuthenticatedUser();

    setDoneOrderList(doneOrderList.filter(order => order.id !== orderId));

    setTimeout(async () => {
      try{
        const response = await fetch(`http://localhost:8005/orders/${orderId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
          body: JSON.stringify({
            status: 'DELIVERED',
          }),
        });

        console.log("Response: ", response);

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error done order:', errorData);
          setError(errorData.message || 'Failed to process order');
          return;
        }

        console.log('Order marked as done:', orderId);
      }
      catch (error) {
        console.error('Error done order:', error);
      }
    }, 1000);

  };

  return (
    <div className="manage-orders-page">
      <h1>Deliver Orders for: {restaurantName}</h1>
      <div className="orders-container">
        {doneOrderList.length > 0 ? (
          doneOrderList.map(order => (
            <div className="delivers-card" key={order.id}>
              <div className="order-details">
                <h2>Order #{order.id}</h2>
                <h3>Date: {order.orderDate}</h3>
                <h3>Items:</h3>
                <ul>
                  {order.orderItems.map(item => (
                    <li key={item.productId}>{item.productName} - Quantity: {item.quantity}</li>
                  ))}
                </ul>
                <button onClick={() => handleOrderDone(order.id)} className="done-button">
                  Delivered
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

export default DeliverOrdersPage;
