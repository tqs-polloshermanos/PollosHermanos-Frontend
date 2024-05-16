import React from 'react';
import './History.css'; // Import CSS file
import { useHistory } from 'react-router-dom';

function History({ isAuthenticated }) {
  // Dummy data for demonstration
  const purchases = [
    { id: 1, meal: 'Spaghetti', price: '$10', date: '2024-05-12', img: 'spaghetti.jpg' },
    { id: 2, meal: 'Pizza', price: '$12', date: '2024-05-11', img: 'pizza.jpg' },
    { id: 3, meal: 'Burger', price: '$8', date: '2024-05-10', img: 'burger.jpg' },
    // Add more purchases as needed
  ];

  const history = useHistory();

  const handleReorder = (mealName) => {
    // Logic to reorder the selected meal
    console.log('Reordering:', mealName);
  };

  const handleLogin = () => {
    // Go to login page
    history.push('/login');
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
              <img src={purchase.img} alt={purchase.meal} />
              <div className="purchase-details">
                <h3>{purchase.meal}</h3>
                <p>Price: {purchase.price}</p>
                <p>Date: {purchase.date}</p>
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
