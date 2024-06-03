import React from 'react';
import './App.css';
import NavbarComponent from './Components/NavbarComponent';
import Home from './Components/Home';
import RestaurantSelection from './Components/RestaurantSelection';
import OrdersPage from './Components/OrdersPage';
import CheckOrderStatusPage from './Components/CheckOrderStatus';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RestaurantProvider } from './Components/RestaurantContext';
import { useEffect } from 'react';

function App() {
  
  return (
    <RestaurantProvider>
      <Router>
        <div className="App">
          <NavbarComponent />
          <Switch>
            <Route exact path="/" component={Home} /> {/* Define route for Home component */}
            <Route exact path="/orderspage" component={OrdersPage} /> {/* Define route for OrdersPage component */}
            <Route exact path="/restaurantSelection" component={RestaurantSelection} /> {/* Define route for RestaurantSelection component */}
            <Route exact path="/checkorderstatus" component={CheckOrderStatusPage} /> {/* Define route for CheckOrderStatus component */}
          </Switch>
        </div>
      </Router>
    </RestaurantProvider>
  );
}

export default App;
