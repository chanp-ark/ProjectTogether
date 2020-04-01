import React from 'react'

import "./user.styles.css"

const User = () => {
    
    const [allUsers, setAllUsers] = React.useState([])
    
    fetch("http://localhost:4000/users",
        {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => data['usernames'])
        .then(users => {
            if (users.length > allUsers) setAllUsers(allUsers.concat(users))
        })
        .catch(err=> {
            console.error(err)
        })



    return (
        <div>
            <div className="user-title">
                <div>Collaborators</div>
                <div className="subtitle">Curious about who is interested in building something with you?</div>
            </div>
            <div className="user-container">
                { allUsers.map( (user, i) => (
                    <div key={i} className="user-content">
                        <p>{user}</p>    
                    </div>  
                ))}
            </div>
            
            
            
        </div>
    )
}

export default User