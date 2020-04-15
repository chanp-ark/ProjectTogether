import React, {useState} from 'react'

import FormInput from "../FormInput/formInput.component"

import "./sign_up.styles.css"

const SignUp = ({routeProps, setToken, setUserId, setProfileId, validate}) => {
    
    const initialState = {
        username: '',
        email: '',
        password: '',
        confirmPw: '',
    }
    
    const [userInfo, setUserInfo] = useState(initialState)
    
    const { username, email, password, confirmPw } = userInfo
    
    const handleChange = e => {
        e.preventDefault()
        setUserInfo({...userInfo, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        // validate function
        if(validate(userInfo)) {
            fetch('http://localhost:5000/signup', 
                {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({username, email, password})
                })
                    .then(response => response.json(response))
                    .then(data => {
                        console.log(data)
                        if (data.message !== "User saved!") {
                            alert(data.message)
                        } else if (!data.token) {
                            alert(data.message)
                        } else {
                            const {token, userProfile} = data
                            localStorage.setItem("token", token)
                            localStorage.setItem("id", userProfile.username)
                            setToken(true)
                            setUserId(userProfile.username)
                        }
                    })
                    .catch((err) => console.error(err))
        }
    }
    
    return (
        <div className="signup-container" elevation={3}>
            <h2 className="signup-header">REGISTER</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <FormInput 
                    name="username"
                    value={username}
                    type="text"
                    placeholder="username"
                    onChange={handleChange}
                />
                <FormInput
                    name="email"
                    value={email}
                    type="email"
                    placeholder="email"
                    onChange={handleChange}
                />
                <FormInput 
                    name="password"
                    value={password}
                    type="password"
                    placeholder="password"
                    onChange={handleChange}
                />
                <FormInput
                    name="confirmPw"
                    value={confirmPw}
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                />
                
                <button
                    className="signup-submit"
                    type='submit'
                    onSubmit={handleSubmit}
                >Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp