import React from 'react';
import Navbar from "./client/Navbar/Navbar.component"
import Router from "./Router"
import './App.css';


function App() {
  // for token
  const [token, setToken] = React.useState(false)
  console.log("token :", token, "(app.js)")
  
  React.useEffect( () => {
    if (localStorage.getItem("token")) setToken(true)
  }, [token] )


  
  return (  
    <div>
      <Navbar token={token} setToken={setToken}/>
        <div className="router-component">
          <Router token={token}setToken={setToken}/> 
        </div>
    </div>
  );
}

export default App;
