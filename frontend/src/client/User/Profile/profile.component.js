import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import CustomForm from "../../Form/customForm.component"

import "./profile.styles.css"


const Profile = ({reactProps, userId, token}) => {
    
    const [ profileState, setProfileState ] = useState(reactProps.location.state.user)
    
    const { username, groups } = profileState
    
    // edit profile
    const [toggleEdit, setToggleEdit ] = useState(false)
    // prop to pass down to edit
    const [ arrProp, setArrProp ] = useState([ {username}, {groups} ])

    const editProfile = e => {
        e.preventDefault();
        setToggleEdit(!toggleEdit)
    }
    
    const saveProfile = async (state) => {
        // modify the array of objects, into one object
        // update state here
        const newState = state.reduce((acc, cur)=>{
            for (let i in cur){
                acc[i] = cur[i]
            }
            return acc
        }, {})
        console.log("NEW STATE", newState)
        await setProfileState(newState)
        // fetch request
        fetch(`http://localhost:5000/users/${userId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(state)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setToggleEdit(!toggleEdit)
                return alert("Profile Saved")
            })
            .catch( err => {
                console.error("Error on Saving Profile: " , err)})
    }
    console.log("PROFILE STATE", profileState)

    if (!toggleEdit) {
        return (
        // this will display username
        <div className='userprof-container'>
            <div className='userprof-title'>
                <h1>User Profile</h1>  
                <p> {username} </p>
                <p> Groups: {groups} </p>
            </div>
            {/* Edit button only shows if profile username matches the logged in user */}
            <div className="edit-button">
            { userId === username && <Link onClick={editProfile} to={`/`}>EDIT</Link> }
            </div>
            <div className='userprof-content'>
                <p>from the fetch: <strong>{username}</strong></p>
                <p>This is just some content to see how it would look. Prob will import user's info here</p>
            </div>
        </div>
        )
    } else {
        return (
            <div className="editprof-container">
                <h2>Edit Profile</h2>
                <CustomForm 
                    state={arrProp}
                    setArrProp={setArrProp}
                    saveProfile={saveProfile}
                    buttonLabel="SAVE"
                />
            </div>
        )
    }
    
}


export default Profile;