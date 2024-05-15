import React from 'react';
import './App.css';
import NavbarComponent from './Components/NavbarComponent';
import Home from './Components/Home';
import OrdersPage from './Components/OrdersPage';
import CheckOrderStatusPage from './Components/CheckOrderStatus';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarComponent />
        <Switch>
          <Route exact path="/" component={Home} /> {/* Define route for Home component */}
          <Route exact path="/orderspage" component={OrdersPage} /> {/* Define route for OrdersPage component */}
          <Route exact path="/checkorderstatus" component={CheckOrderStatusPage} /> {/* Define route for CheckOrderStatus component */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
