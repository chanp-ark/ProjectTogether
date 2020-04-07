import React from 'react'

import "./user.styles.css"

const User = () => {
    
    const [allUsers, setAllUsers] = React.useState([])
    
    React.useEffect( () => {
        fetch("http://localhost:5000/users",
            {
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => data.profile)
            .then(users => {
                setAllUsers(users)})
            .catch(err=> {
                console.error(err)
            })
    }, [])   

    // sort users by created date, most recent first, **do this later
    
    return (
        <div>
            <div className="user-title">
                <div>Collaborators</div>
                <div className="subtitle">Curious about who is interested in building something with you?</div>
            </div>
            <div className="user-container">
                { allUsers.map( (user, i) => (
                    <div key={i} className="user-content">
                        <p>{user.username}</p>    
                    </div>  
                ))}
            </div>
            
            
            
        </div>
    )
}

export default User