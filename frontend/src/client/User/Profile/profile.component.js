import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import "./profile.styles.css"


const Profile = ({reactProps, userId}) => {

    const {groups, username} = reactProps.location.state.user
    
    // edit profile
    const [toggleEdit, setToggleEdit ] = useState(false)
    
    const editProfile = e => {
        e.preventDefault();
        setToggleEdit(true)
    }
    
    return (
    // this will display username
    <div className='userprof-container'}>
        <div className='userprof-title'>
            <h1>User Profile</h1>  
            <p> {username} </p>
            <p> Groups: {groups} </p>
        </div>
        {/* Edit button only shows if profile username matches the logged in user */}
        <div className="edit-button">
        { userId === username && <Link to={`/`}>EDIT</Link> }
        </div>
        <div className='userprof-content'>
            <p>from the fetch: <strong>{username}</strong></p>
            <p>This is just some content to see how it would look. Prob will import user's info here</p>
        </div>
    </div>
    )
}


export default Profile;