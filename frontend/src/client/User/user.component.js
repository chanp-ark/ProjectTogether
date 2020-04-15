import React from 'react'
import { Link } from 'react-router-dom'

import "./user.styles.css"

const User = ({allUsers, profileId, userId }) => {
    

    
    return (
        <div>
            <div className="user-title">
                <div>Collaborators</div>
                <div className="subtitle">Curious about who is interested in building something with you?</div>
            </div>
            <div className="user-container">
                { allUsers.map( (user, i) => {
                    return(
                        <div key={i} className="user-content">
                            {profileId !== userId && <Link to={{
                                pathname: `/users/${user.username}`,
                                state: { user }
                                }}>{user.username}</Link>}    
                        </div>  
                        
                    )
                } )}
            </div>
            
            
            
        </div>
    )
}

export default User