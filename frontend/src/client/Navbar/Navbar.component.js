import React from 'react'
import { Link } from 'react-router-dom'


import "./navbar.styles.css"

const Navbar = () => {
  
    
  const [toggle, setToggle] = React.useState(true)
  
  const handleToggle = e => {
    e.preventDefault();
    setToggle(!toggle)
  }
  
  const toggleToTrue = () => {
    if (toggle === false) setToggle(!toggle)
  }
    
  return (
    <header>
      <div className="navbar-container">
        <Link className="home-icon" to='/' 
          onClick={toggleToTrue}> <div>P \ T</div></Link>
        <nav className="navbar-nav">
          <ul className="navbar-ul">
            <li className="dropdown-icon"><Link to="#" onClick={e=>handleToggle(e)}>ICON</Link></li>
            <div className={toggle ? "navbar-others" : "dropdown-navbar"}>
              <li><Link onClick={toggleToTrue} to='/login'>Login</Link></li>
              <li><Link onClick={toggleToTrue} to='/projects'>Projects</Link></li>
              <li><Link onClick={toggleToTrue} to='/about'>About</Link></li>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  )

  
}
export default Navbar
