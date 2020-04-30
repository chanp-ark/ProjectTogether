import React from 'react'
import { Link } from 'react-router-dom'

import "./user.styles.css"

const User = ({allUsers, user }) => {

    return (
        <div>
            <div className="user-title">
                <div>Collaborators</div>
                <div className="subtitle">Curious about who is interested in building something with you?</div>
            </div>
            <div className="user-container">
                { allUsers.map( (curUser, i) => {
                    return(
                        curUser.username !== user.username && 
                            <div key={i} className="user-content">
                                <Link to={{
                                    pathname: `/users/${curUser.username}`,
                                    state: { curUser }
                                    }}>{curUser.username}</Link>
                            </div>  
                        
                    )
                } )}
            </div>
            
            
            
        </div>
    )
}

export default User