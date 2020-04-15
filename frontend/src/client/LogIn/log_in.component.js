import React, {useState} from 'react'

import FormInput from "../FormInput/formInput.component"

import "./log_in.styles.css"

const LogIn = ({setLoggedInUser, setToken, setUserId, validate}) => {
    
    const initialState = {
        email: '',
        password: ''
    }
    
    const [login, setLogin] = useState(initialState)

    const {email, password} = login
    
    const handleChange = e => {
        e.preventDefault()
        setLogin({...login, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        if(validate(login)) {
            fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password}) 
            })
                .then(response => response.json())
                .then(data => {
                    console.log("in fetch:", data)
                    if (!data.token) {
                        alert(data.message)
                        return false
                    } else {
                        const {token, userProfile} = data
                        console.log("userprofile at login: ", userProfile, "(login.js)")
                        localStorage.setItem("token", token)
                        localStorage.setItem("userId", userProfile.username)
                        setUserId(userProfile.username)
                        setToken(token)
                        setLoggedInUser(userProfile)
                        return true
                    }
                })

                .catch((err) => console.error(err))
        }
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

