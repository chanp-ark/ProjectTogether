import React from 'react'
import { Link } from "react-router-dom"

import "./sign_up.styles.css"

const SignUp = ({routeProps, token, setToken}) => {
    
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
        if (!(username && email && password)) {
            alert("You must enter all fields")
            routeProps.history.push('/users/signup')
        } else if (password !== confirmPw) {
            alert("Passwords do not match!")
            setUserInfo({
                ...userInfo,
                password: '',
                confirmPw: ''
            })
            routeProps.history.push('/users/signup')
            return false
        } else { 
            fetch('http://localhost:4000/users/signup', 
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, email, password})
            })
                .then(response => response.json(response))
                .then(data => {
                    // token is in this data
                    if (data.message !== "User saved!") {
                        alert(data.message)
                    } else if (!data.token) {
                        alert(data.message)
                    } else {
                        localStorage.setItem("token", data.token)
                        setToken(true)
                        routeProps.history.push("/user/profile/edit")
                    }
                })
                .catch((err) => console.error(err))
    }}
    
    React.useEffect(()=> {
        if(token) routeProps.history.push("/users/profile/edit")
    }, [token, routeProps.history])
    
    return (
        <div className="signup-container" elevation={3}>
            <h2 className="signup-header">SIGN UP</h2>
            <form onSubmit={e=>handleSubmit(e)}>
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
                <Link className="link-to-login" to="/users/login">Already registered? Click here to log in</Link>
            </form>
        </div>
    )
}

export default SignUp