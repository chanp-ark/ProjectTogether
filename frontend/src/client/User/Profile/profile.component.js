import React from 'react'
import { Link } from 'react-router-dom'

import "./profile.styles.css"


const Profile = ({reactProps, userId}) => {

    const {groups, username} = reactProps.location.state.user
    
    return (
    // this will display username
    <div className='userprof-container'>
        <div className='userprof-title'>
            <h1>User Profile</h1>  
            <p> {username} </p>
            <p> {groups} </p>
        </div>
        {/* Edit button only shows if profile username matches the logged in user */}
        <div className="edit-button">
        { userId === username && <Link to={`/users/profile/${userId}/edit`}>EDIT</Link> }
        </div>
        <div className='userprof-content'>
            <p>from the fetch: <strong>{username}</strong></p>
            <p>This is just some content to see how it would look. Prob will import user's info here</p>
        </div>
    </div>
    )
}


export default Profile;