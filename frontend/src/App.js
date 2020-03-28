import React from 'react';
import Navbar from "./client/Navbar/navbar.component"
import Router from "./Router"
import './App.css';

function App() {

  
  return (  
    <div>
      <Navbar />
      <div className="router-component">
        <Router /> 
      </div>
    </div>
  );
}

export default App;
