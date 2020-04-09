import React from 'react'
import { Link } from 'react-router-dom'

import FormInput from "../FormInput/formInput.component"

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
        // validate function
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
                    return false
                } else {
                    localStorage.setItem("token", data.token)
                    localStorage.setItem("id", data.username)
                    setId(data.username)
                    setToken(data.token)
                    return true
                }
            })
            .then( next => {
                if (!next) routeProps.history.push(`/users/login`)
                else routeProps.history.push(`/users/profile/${id}`)

            })
            .catch((err) => console.error(err))
    }
    
    return (
        <div className="login-container" >
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Email"
                    type="text"
                    name="email"
                    placeholder="email"
                    handleChange={handleChange}
                    value={email}
                />
                <FormInput 
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="password"
                    handleChange={handleChange}
                    value={password}
                />
                <button
                    className="submit-login"
                    value="Log In"
                    type="submit"
                >Log In</button>
            </form>
        </div>
    )
}

export default LogIn

