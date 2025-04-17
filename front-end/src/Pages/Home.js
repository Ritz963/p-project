import React from 'react';
import Navigation from '../Components/Navigation';
import '../css/App.css';
import ClosetCarousels from '../Components/ClosetCarousels';
import ActionButtons from '../Components/ActionButtons';

function Home() {
  return (
    <div className="app-container">

      
      <Navigation />


      <svg className="cursor" width="80" height="80" viewBox="0 0 80 80">
        <circle className="cursor__inner" cx="40" cy="40" r="20" />
      </svg>
      <div className="main-content">
        <ClosetCarousels />
        <ActionButtons />
      </div>
    </div>
  );
}

export default Home;
