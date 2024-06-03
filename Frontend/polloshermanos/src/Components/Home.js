import React from 'react';
import friesImage from './img/fries.png';
import specialBurgerImage from './img/special_burger.png';
import pizzaImage from './img/pizza.png';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to</h1>
      <h2>Pollos Hermanos</h2>
      <p>Where something delicious is always cooking</p>
      <div className="image-container">
        <div className="image-wrapper">
          <img src={friesImage} alt="Fries" width="250" height="300" />
          <p>Fries</p>
        </div>
        <div className="image-wrapper">
          <img src={specialBurgerImage} alt="Special Burger" width="250" height="300" />
          <p>Special Burger</p>
        </div>
        <div className="image-wrapper">
          <img src={pizzaImage} alt="Pizza" width="250" height="300" />
          <p>Pizza</p>
        </div>
      </div>
      <p>And more...</p>
    </div>
  );
}

export default Home;
