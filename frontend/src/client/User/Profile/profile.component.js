import React from 'react'
import { Link } from 'react-router-dom'

import "./profile.styles.css"

const Profile = () => (
    // this will display username
    <div className='userprof-container'>
        <div className='userprof-title'>
            <h1>User Profile Title</h1>
        </div>
        {/* Edit button only shows if profile username matches the logged in user */}
        <div className="edit-button">
            <Link to="/user/profile/edit">EDIT</Link>
        </div>
        <div className='userprof-content'>
            <p>This is just some content to see how it would look. Prob will import user's info here</p>
        </div>
    </div>
)

export default Profile;