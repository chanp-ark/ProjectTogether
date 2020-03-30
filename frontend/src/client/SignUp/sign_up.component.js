import React from 'react'
import { Link } from "react-router-dom"

import "./sign_up.styles.css"

const SignUp = ({routeProps}) => {
    
    const initialState = {
        username: '',
        email: '',
        password: '',
        confirmPw: '',
    }
    
    const [userInfo, setUserInfo] = React.useState(initialState)
    
    const { username, email, password, confirmPw } = userInfo
    
    const handleChange = e => {
        e.preventDefault()
        setUserInfo({...userInfo, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        if (password !== confirmPw) {
            alert("Passwords do not match!")
            setUserInfo({
                ...userInfo,
                password: '',
                confirmPw: ''
            })
        }
        // POST
            // server IP 'http://18.216.121.242:4000/user/signup'
        fetch('http://localhost:4000/user/signup', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, email, password})
        })
            .then(response => response.json(response))
            .then(() => alert("Your account has been created"))
            .then(() => routeProps.history.push("/about"))
            .catch(() => alert('Your account could not be created. Please try again'))
        // redirect
       
    }
    
    return (
        <div className="signup-container" elevation={3}>
            <h2 className="signup-header">SIGN UP</h2>
            <form onSubmit={handleSubmit}>
                <label className="signup-label">Username</label>
                <input 
                    className="signup-input"
                    name="username"
                    value={username}
                    type="text"
                    placeholder="username"
                    onChange={handleChange}
                />

                <label className="signup-label">Email</label>
                <input 
                    className="signup-input"
                    name="email"
                    value={email}
                    type="email"
                    placeholder="email"
                    onChange={handleChange}
                />

                <label className="signup-label">Password</label>
                <input 
                    className="signup-input"
                    name="password"
                    value={password}
                    type="password"
                    placeholder="password"
                    onChange={handleChange}
                />

                <label className="signup-label">Confirm Password</label>
                <input 
                    className="signup-input"
                    name="confirmPw"
                    value={confirmPw}
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                />

                <input 
                    className="signup-submit"
                    type='submit'
                    onSubmit={handleSubmit}
                />
                <Link className="link-to-login" to="/login">Already registered? Click here to log in</Link>
            </form>
        </div>
    )
}

export default SignUp