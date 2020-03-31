import React from 'react'
import {Link} from 'react-router-dom'

import "./log_in.styles.css"

const LogIn = ({routeProps, token, setToken}) => {
    
    const initialState = {
        email: '',
        password: ''
    }
    
    const [login, setLogin] = React.useState(initialState)
    
    // pull email and password out
    const {email, password} = login
    
    // state for token
    
    
    const handleChange = e => {
        e.preventDefault()
        setLogin({...login, [e.target.name]: e.target.value})
    }
    
    
    const handleSubmit = e => {
        e.preventDefault()
        // connect to backend
        fetch('http://localhost:4000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password}) 
        })
            .then(response => response.json())
            .then(data => {
                // data has token info
                if (!data.token) {
                    alert("Email/Password is not correct")
                } else {
                    //save data to local or cookie
                    localStorage.setItem("token", data.token)
                    setToken(true)
                    // redirect
                    routeProps.history.push("/user/profile/edit")
                }
            })
            .then(() => {
                console.log(localStorage.getItem("token"))
            })
            .catch((err) => console.error(err))
    }
      
    
    return (
        <div className="login-container" >
            <h2 className="login-header">WELCOME</h2>
            <form onSubmit={e=>handleSubmit(e)}>
                <label className="login-label">Email</label>
                <input 
                    name="email"
                    className="login-input"
                    type="text"
                    value={email}
                    onChange={handleChange}
                    placeholder="email"
                />
                <label className="login-label">Password</label>
                <input 
                    name="password"
                    className="login-input"
                    type="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="password"
                />
                <input
                    className="submit-login"
                    value="Log In"
                    type="submit"
                />
                <Link className="link-to-signup" to="/signup">Not registered? Click here to sign up</Link>
            </form>
        </div>
    )
}

export default LogIn

