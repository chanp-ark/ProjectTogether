import React from 'react';
import Navbar from "./client/Navbar/Navbar.component"
import Main from "./Router"
import './App.css';


function App() {
  // for token
  const [token, setToken] = React.useState(localStorage.getItem("token"))
  console.log("token :", token, "(app.js)")
  
  const [ userId, setUserId ] = React.useState(localStorage.getItem("userId"))
  console.log("userId :", userId, "(app.js")
  


  return (  
    <div>
      <Navbar token={token} setToken={setToken} userId={userId} setId={setUserId}/>
      <div className="router-component">
        <Main token={token} setToken={setToken} userId={userId} setUserId={setUserId} /> 
      </div>
    </div>
  );
}

export default App;
