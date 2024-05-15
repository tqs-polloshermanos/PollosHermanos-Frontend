import React from 'react';
import './Home.css'; // Import CSS file

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to</h1>
      <h2>Pollos Hermanos</h2>
      <a href="/login"> <h2>Please Login</h2> </a>
    </div>
  );
}

export default Home;
