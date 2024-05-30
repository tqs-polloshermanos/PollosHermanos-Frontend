import React, { useState } from 'react';
import './HomeAfterLogin.css'; // Import CSS file
import RestaurantSelection from './RestaurantSelection';

function HomeAfterLogin() {

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Dummy data for orders
  const inProgressOrders = [101, 102, 103, 104];
  const servingOrders = [201, 202, 203];

  if (!selectedRestaurant) {
    return <RestaurantSelection onSelectRestaurant={setSelectedRestaurant} />;
  }

  // return (
  //   <div className="orders-page">
  //     <h1>{selectedRestaurant.name}</h1>
  //     <div className="orders-tables">
  //       <div className="orders-table">
  //         <h2>In Progress</h2>
  //         <table>
  //           <thead>
  //             <tr>
  //               <th>Order Number</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {inProgressOrders.map(order => (
  //               <tr key={order}>
  //                 <td>{order}</td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //       <div className="orders-table">
  //         <h2>Serving</h2>
  //         <table>
  //           <thead>
  //             <tr>
  //               <th>Order Number</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {servingOrders.map(order => (
  //               <tr key={order}>
  //                 <td>{order}</td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default HomeAfterLogin;
