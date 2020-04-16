import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import CustomForm from "../../Form/customForm.component"

import "./profile.styles.css"


const Profile = ({reactProps, userId}) => {
    
    const [ profileState, setProfileState ] = useState(reactProps.location.state.user)
    
    const { username, groups } = profileState
    
    // edit profile
    const [toggleEdit, setToggleEdit ] = useState(false)
    // prop to pass down to edit
    const arrProp = [ {username}, {groups} ]

    
    const editProfile = e => {
        e.preventDefault();
        setToggleEdit(!toggleEdit)
    }
    
    const saveProfile = e => {
        e.preventDefault();
        setToggleEdit(!toggleEdit)
    }
    
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
                    handleSubmit={saveProfile}
                    buttonLabel="SAVE"
                />
            </div>
        )
    }
    
}


export default Profile;