import React, { useEffect, useState } from 'react';
import './History.css'; // Import CSS file
import { useAuth } from './AuthContext';

function History() {
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch('http://localhost:8005/orders', {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        
        console.log('Response:', response);

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error fetching order history:', errorData);
          throw new Error(errorData.message || 'Failed to fetch order history');
        }
        const data = await response.json();
        console.log('Order history:', data);
        setPurchases(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching order history:', error);
      }
    };
    if (isAuthenticated) {
      fetchOrderHistory();
    }
  }, [isAuthenticated]);


  const handleReorder = (mealName) => {
    // Logic to reorder the selected meal
    console.log('Reordering:', mealName);
  };

  const handleLogin = () => {
    window.location.href = `/login`;
  }

  if (!isAuthenticated) {
    return (
      <div className='login-message'>
        <h2>Please log in to view your orders history.</h2>
        <button className='login-button' onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="history-container">
      <h1>Purchase History</h1>
      <div className="purchases-container">
        <div className="purchase-list">
          {purchases.map((purchase) => (
            <div className="purchase-card" key={purchase.id}>
              <div className="purchase-details">
                <h3>Restaurant: {purchase.restaurantName}</h3>
                <p>Meal: {purchase.cuisineType}</p>
                <p>Date: {new Date(purchase.orderDate).toDateString()}</p>
                <p>Status: {purchase.status}</p>
                <button onClick={() => handleReorder(purchase.meal)}>Reorder</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;
