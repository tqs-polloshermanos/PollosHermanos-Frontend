import React from 'react';
import './App.css';
import NavbarComponent from './Components/NavbarComponent';
import Home from './Components/Home';
import Login from './Components/Login';
import SignIn from './Components/SignIn';
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
            <Route exact path="/" component={Home} /> {/* Define route for Home component */}
            <Route path="/login" component={Login} /> {/* Define route for Login component */}
            <Route path="/signin" component={SignIn} /> {/* Define route for SignIn component */}
            <Route path="/logout" component={Logout} /> {/* Define route for Logout component */}
            <Route path="/homeAfterLogin" component={HomeAfterLogin} /> {/* Define route for HomeAfterLogin component */}
            <Route path="/manageOrders" component={ManageOrders} /> {/* Define route for ManageOrders component */}
            <Route path="/deliverOrders" component={DeliverOrders} /> {/* Define route for DeliverOrders component */}
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
