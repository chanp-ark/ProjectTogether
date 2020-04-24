import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'


import "./navbar.styles.css"

const Navbar = ({token, setToken, userId, setUserId, refresh}) => {

  const [toggle, setToggle] = React.useState(true)
  
  const handleToggle = e => {
    e.preventDefault();
    setToggle(!toggle)
  }
  
  const toggleToTrue = () => {
    if (toggle === false) setToggle(!toggle)
  }
    
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    setToken(false)
    setUserId(false)
    setLoggedInUser('')
    toggleToTrue()
  }
  
  // logged in user Profile Info
  const [ loggedInUser, setLoggedInUser ] = useState('')
  // get userId profile Info
  useEffect( () => {
    if (userId) {fetch(`http://localhost:5000/users/${userId}`, { method: "GET",})
      .then(response => response.json())
      .then(data => {
          setLoggedInUser(data)})
      .catch(err=> {
        console.error("Error in Navbar: ", err)
      })}
  }, [userId, refresh])
    
  const loggedInTabs = [
    <li key="logout" ><Link onClick={logout} to='/'>Log Out</Link></li>, 
    <li key="profile">
      <Link onClick={toggleToTrue} 
        to={{
          pathname: `/users/${userId}`,
          state: {user: loggedInUser}
          }} >
        Profile
      </Link>
    </li>
  ]
  
  const alwaysInTabs = [
    <li key="groups"><Link onClick={toggleToTrue} to='/groups'>Groups</Link></li>,
    <li key="allusers"><Link onClick={toggleToTrue} to='/users'>Users</Link></li>,
    <li key="about"><Link onClick={toggleToTrue} to='/about'>About</Link></li>
  ]
  
  let iconImage = "https://img.icons8.com/android/22/FFFFFF/plus.png"
  !toggle && (iconImage = "https://img.icons8.com/ios/26/FFFFFF/circled-x.png") 
  
  const dropIconTab = [
    <li key="dropdownicon" className="dropdown-icon">
      <Link to="/" onClick={e=>handleToggle(e)}>
        <img alt="responsive navbar icon" samesite='none' secure="true" src={iconImage}/>
      </Link>
    </li>
  ]
  
    
  return (
    <header>
      <div className="navbar-container">
        <Link className="home-icon" to='/' onClick={toggleToTrue}> <div>P \ T</div></Link>
        <nav className="navbar-nav">
          <ul className="navbar-ul">
            { dropIconTab }
            <div className={toggle ? "navbar-others" : "dropdown-navbar"}>
              { 
                !token ?
                  <li key="login"><Link onClick={toggleToTrue} to='/'>Login</Link></li>
                : loggedInTabs
              }
              { alwaysInTabs }
            </div>
          </ul>
        </nav>
      </div>
    </header>
  )

  
}
export default Navbar
