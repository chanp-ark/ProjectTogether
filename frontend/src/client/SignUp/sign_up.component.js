import React, {useState} from 'react'

import FormInput from "../Form/FormInput/formInput.component"

import "./sign_up.styles.css"

const SignUp = ({setToken, setUserId, validate}) => {
    
    const initialState = {
        username: '',
        email: '',
        password: '',
        confirmPw: '',
        skills: 'update field',
        iAm: 'update field',
        iLike: 'update field',
        iAppreciate: 'update field'
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
                    body: JSON.stringify(userInfo)
                })
                    .then(response => response.json(response))
                    .then(data => {
                        console.log("sign up: ", data)
                        if (data.failure) {
                            alert(data.failure)
                        } else {
                            const {token, userProfile} = data
                            localStorage.setItem("token", token)
                            localStorage.setItem("userId", userProfile.username)
                            setToken(token)
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