import React from 'react';
import './OrdersPage.css'; // Import CSS file
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function OrdersPage() {
  // Dummy data for orders
  const inProgressOrders = [101, 102, 103, 104];
  const servingOrders = [201, 202, 203];

  return (
    <div className="orders-page">
      <h1>Restaurant Orders</h1>
      <div className="check-status">
        <a href="/checkorderstatus" className="check-status-btn">
          Check your order status here
        </a>
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
