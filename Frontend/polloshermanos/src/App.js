import React from 'react';
import './App.css';
import NavbarComponent from './Components/NavbarComponent';
import Home from './Components/Home';
import Login from './Components/Login';
import SignIn from './Components/SignIn';
import Logout from './Components/Logout';
import History from './Components/History';
import Restaurants from './Components/Restaurants';
import Cart from './Components/Cart';
import Contact from './Components/Contact';
import RestaurantMenu from './Components/RestaurantMenu';
import Checkout from './Components/Checkout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider  } from './Components/AuthContext';
import { CartProvider  } from './Components/CartContext';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <NavbarComponent />
            <Switch>
              <Route exact path="/" component={Home} /> 
              <Route path="/login" component={Login} /> 
              <Route path="/signin" component={SignIn} />
              <Route path="/logout" component={Logout} />
              <Route path="/history" component={History} /> 
              <Route path="/restaurants" component={Restaurants} /> 
              <Route path="/cart" component={Cart} /> 
              <Route path="/contact" component={Contact} /> 
              <Route path="/restaurantMenu" component={RestaurantMenu} /> 
              <Route path="/checkout" component={Checkout} /> 
            </Switch>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
