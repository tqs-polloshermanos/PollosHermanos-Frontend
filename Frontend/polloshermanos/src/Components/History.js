import React, { useEffect, useState } from 'react';
import './History.css'; // Import CSS file
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';

function History() {
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const { addItemToCart } = useCart();
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


  const handleReorder = (purchase) => {
    console.log('Reordering:', purchase);
    console.log('Items:', purchase.orderItems);
    const itemIds = purchase.orderItems.map(item => item.productId);
    console.log('Item IDs:', itemIds);
    const quantities = purchase.orderItems.reduce((acc, item) => {
      acc[item.productId] = item.quantity;
      return acc;
    }, {});
    console.log('Quantities:', quantities);
    
    const fetchItems = async () => {
      try {
        const items = await Promise.all(itemIds.map(async (itemId) => {
          const response = await fetch(`http://localhost:8005/products/${itemId}`);
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Error fetching item:', errorData);
            throw new Error(errorData.message || 'Failed to fetch item');
          }
          return response.json();
        }));
        console.log('Items:', items);
        return items;
      }
      catch (error) {
        console.error('Error fetching items:', error);
        setError(error.message);
        throw error;
      }
    };

    fetchItems()
      .then((items) => {
        console.log('Items:', items);
        addItemsToCart(items, quantities);
        window.location.href = '/cart';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleLogin = () => {
    window.location.href = `/login`;
  }

  const addItemsToCart = async (items, quantities) => {
    console.log('Items type:', typeof items);
    console.log('Adding items to cart:', items);
    console.log('Quantities:', quantities);
    items.forEach((item) => {
      addItemToCart(item, quantities[item.id]);
    });
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCuisineTypeChange = (e) => {
    setCuisineType(e.target.value);
  };

  const filteredPurchases = purchases.filter((purchase) => {
    const nameMatch = purchase.restaurantName.toLowerCase().includes(searchQuery.toLowerCase());
    const cuisineTypeMatch = !cuisineType || purchase.cuisineType === cuisineType;
    return nameMatch && cuisineTypeMatch;
  });


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
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a restaurant..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select value={cuisineType} onChange={handleCuisineTypeChange}>
          <option value="">All Cuisines</option>
          <option value="MEXICAN">Mexican</option>
          <option value="AMERICAN">American</option>
          <option value="ITALIAN">Italian</option>
          <option value="CHINESE">Chinese</option>
          <option value="JAPANESE">Japanese</option>
          <option value="INDIAN">Indian</option>
          <option value="FRENCH">French</option>
          <option value="MEDITERRANEAN">Mediterranean</option>
          <option value="OTHER">Other</option>
        </select>
      </div>
      <div className="purchases-container">
        {filteredPurchases.length === 0 ? (
          <p className="no-purchases-message">No purchases found.</p>
        ) : (
          <div className="purchase-list">
            {filteredPurchases.map((purchase, index) => (
              <div className="purchase-card" key={purchase.id}>
                <div className="purchase-details">
                  <h3>Restaurant: {purchase.restaurantName}</h3>
                  <h4>Order Number: {purchase.id}</h4>
                  <p>Meal: {purchase.cuisineType}</p>
                  <p>Date: {new Date(purchase.orderDate).toDateString()}</p>
                  <p>Status: {purchase.status}</p>
                  <button onClick={() => handleReorder(purchase)}>Reorder</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
