import React from 'react';
import './App.css';
import NavbarComponent from './Components/NavbarComponent';
import Home from './Components/Home';
import Login from './Components/Login';
import SignIn from './Components/SignIn';
import Menu from './Components/Menu';
import History from './Components/History';
import Restaurants from './Components/Restaurants';
import Cart from './Components/Cart';
import Contact from './Components/Contact';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarComponent />
        <Switch>
          <Route exact path="/" component={Home} /> {/* Define route for Home component */}
          <Route path="/login" component={Login} /> {/* Define route for Login component */}
          <Route path="/signin" component={SignIn} /> {/* Define route for SignIn component */}
          <Route path="/menu" component={Menu} /> {/* Define route for Menu component */}
          <Route path="/history" component={History} /> {/* Define route for History component */}
          <Route path="/restaurants" component={Restaurants} /> {/* Define route for Restaurants component */}
          <Route path="/cart" component={Cart} /> {/* Define route for Cart component */}
          <Route path="/contact" component={Contact} /> {/* Define route for Contact component */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
