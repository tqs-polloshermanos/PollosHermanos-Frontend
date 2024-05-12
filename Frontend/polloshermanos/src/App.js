import React from 'react';
import './App.css';
import NavbarComponent from './Components/NavbarComponent';
import Home from './Components/Home';
import Login from './Components/Login';
import SignIn from './Components/SignIn';
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
