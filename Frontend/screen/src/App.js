import React from 'react';
import './App.css';
import NavbarComponent from './Components/NavbarComponent';
import Home from './Components/Home';
import RestaurantSelection from './Components/RestaurantSelection';
import OrdersPage from './Components/OrdersPage';
import CheckOrderStatusPage from './Components/CheckOrderStatus';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RestaurantProvider } from './Components/RestaurantContext';

function App() {
  
  return (
    <RestaurantProvider>
      <Router>
        <div className="App">
          <NavbarComponent />
          <Switch>
            <Route exact path="/" component={Home} /> 
            <Route exact path="/orderspage" component={OrdersPage} /> 
            <Route exact path="/restaurantSelection" component={RestaurantSelection} />
            <Route exact path="/checkorderstatus" component={CheckOrderStatusPage} />
          </Switch>
        </div>
      </Router>
    </RestaurantProvider>
  );
}

export default App;
