import React from 'react';
import './App.css';
import NavbarComponent from './Components/NavbarComponent';
import Login from './Components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarComponent />
        <Switch>
          <Route path="/login" component={Login} />
          {/* Add more routes here if needed */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
