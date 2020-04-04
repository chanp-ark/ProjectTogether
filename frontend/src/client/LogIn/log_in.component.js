import React from 'react'
import { Link } from 'react-router-dom'

import "./log_in.styles.css"

const LogIn = ({routeProps, token, setToken, id, setId}) => {
    
    const initialState = {
        email: '',
        password: ''
    }
    
    const [login, setLogin] = React.useState(initialState)
    
    // pull email and password out
    const {email, password} = login
    
    const handleChange = e => {
        e.preventDefault()
        setLogin({...login, [e.target.name]: e.target.value})
    }
    
    
    const handleSubmit = e => {
        e.preventDefault()
        // connect to backend
        if (!(email && password)) {
            alert("You must enter all fields")
        } else {
            fetch('http://localhost:5000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password}) 
            })
                .then(response => response.json())
                .then(data => {
                    if (!data.token) {
                        alert(data.message)
                    } else {
                        localStorage.setItem("token", data.token)
                        localStorage.setItem("id", data.username)
                        setId(data.username)
                        setToken(data.token)
                    }
                })
                .then(() => {
                    routeProps.history.push(`/users/profile/${id}`)

                })
                .catch((err) => console.error(err))
        }
    }

    
    React.useEffect(()=> {
        if(token) routeProps.history.push(`/users/profile/${id}`)
    }, [token, routeProps.history, id])
    
    
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
                <Link className="link-to-signup" to="/users/signup">Not registered? Click here to sign up</Link>
            </form>
        </div>
    )
}

export default LogIn

