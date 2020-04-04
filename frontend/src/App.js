import React from 'react';
import Navbar from "./client/Navbar/Navbar.component"
import Router from "./Router"
import './App.css';


function App() {
  // for token
  const [token, setToken] = React.useState(localStorage.getItem("token"))
  console.log("token :", token, "(app.js)")
  
  const [ id, setId ] = React.useState(localStorage.getItem("id"))
  console.log("id :", id, "(app.js")

  return (  
    <div>
      <Navbar token={token} setToken={setToken} id={id} setId={setId}/>
        <div className="router-component">
          <Router token={token}setToken={setToken} id={id} setId={setId}/> 
        </div>
    </div>
  );
}

export default App;
