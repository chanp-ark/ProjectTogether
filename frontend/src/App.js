import React from 'react';
import Navbar from "./client/Navbar/Navbar.component"
import Router from "./Router"
import './App.css';


function App() {
  // for token
  const [token, setToken] = React.useState(false)
  console.log("token :", token, "(app.js)")
  
  const [ id, setId ] = React.useState(null)
  console.log("id :", id, "(app.js")
  
  React.useEffect( () => {
    if (localStorage.getItem("token")) setToken(true)
    let idStore = localStorage.getItem("id")
    if (idStore) setId(idStore)
  }, [] )
  


  
  return (  
    <div>
      <Navbar token={token} setToken={setToken} id={id}/>
        <div className="router-component">
          <Router token={token}setToken={setToken} id={id} setId={setId}/> 
        </div>
    </div>
  );
}

export default App;
