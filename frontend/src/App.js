import React, {useState} from 'react';
import Navbar from "./client/Navbar/Navbar.component"
import Main from "./Router"
import './App.css';


function App() {
  // for token
  const [token, setToken] = useState(localStorage.getItem("token"))
  console.log("token :", token, "(app.js)")
  
  const [ userId, setUserId ] = useState(localStorage.getItem("userId"))
  console.log("userId :", userId, "(app.js)")
  
  const [groupId, setGroupId ] = useState('')
  console.log("groupId :", groupId, "(app.js)")
  
  
   // to pass down updated info
  const [ refresh, setRefresh ] = useState(false)
  console.log("refresh :", refresh, "(app.js)")
   
  return (  
    <div>
      <Navbar token={token} setToken={setToken} userId={userId} setUserId={setUserId}/>
      <div className="router-component">
        <Main 
          token={token} 
          setToken={setToken} 
          userId={userId} 
          setUserId={setUserId} 
          groupId={groupId} 
          setGroupId={setGroupId}
          refresh={refresh}
          setRefresh={setRefresh} /> 
      </div>
    </div>
  );
}

export default App;
