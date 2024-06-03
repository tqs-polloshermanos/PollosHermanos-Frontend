import React from 'react';
import './App.css';
import NavbarComponent from './Components/NavbarComponent';
import Home from './Components/Home';
import Login from './Components/Login';
import Logout from './Components/Logout';
import HomeAfterLogin from './Components/HomeAfterLogin';
import ManageOrders from './Components/ManageOrders';
import DeliverOrders from './Components/DeliverOrders';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <NavbarComponent />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} /> 
            <Route path="/logout" component={Logout} />
            <Route path="/homeAfterLogin" component={HomeAfterLogin} /> 
            <Route path="/manageOrders" component={ManageOrders} />
            <Route path="/deliverOrders" component={DeliverOrders} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
