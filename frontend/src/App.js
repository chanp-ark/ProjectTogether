import React, {useState} from 'react';
import Navbar from "./client/Navbar/Navbar.component"
import Main from "./Router"
import './App.css';


function App() {
  // for token
  const [token, setToken] = useState(localStorage.getItem("token"))
  console.log("token :", token, "(app.js)")
  
  const [ userId, setUserId ] = useState(localStorage.getItem("userId"))
  console.log("userId :", userId, "(app.js")
  
    // groupId to read group details
    const [groupId, setGroupId ] = useState('')

  return (  
    <div>
      <Navbar token={token} setToken={setToken} userId={userId} setUserId={setUserId}/>
      <div className="router-component">
        <Main token={token} setToken={setToken} userId={userId} setUserId={setUserId} groupId={groupId} setGroupId={setGroupId} /> 
      </div>
    </div>
  );
}

export default App;
