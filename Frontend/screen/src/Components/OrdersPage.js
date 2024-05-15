import React from 'react';
import './OrdersPage.css'; // Import CSS file
import { useHistory, useLocation } from 'react-router-dom'; // Import useHistory and useLocation hooks

function OrdersPage() {
  const history = useHistory();
  const location = useLocation();
  const { selectedRestaurant } = location.state || {};

  // Dummy data for orders
  const inProgressOrders = [101, 102, 103, 104];
  const servingOrders = [201, 202, 203];

  const handleCheckOrderStatus = () => {
    history.push('/checkorderstatus', { selectedRestaurantName: selectedRestaurant.name });
  };

  return (
    <div className="orders-page">
      <h1>{selectedRestaurant ? `${selectedRestaurant.name} Orders` : 'Restaurant Orders'}</h1>
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
