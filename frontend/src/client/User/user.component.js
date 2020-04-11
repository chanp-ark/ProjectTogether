import React from 'react'
import { Link } from 'react-router-dom'

import "./user.styles.css"

const User = ({profileName, setProfileName, userId, token}) => {
    
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
    
    if (token && userId) {
        fetch(`http://localhost:5000/users/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.error("FETCH ERROR: ", err)
            })
    }


    // sort users by created date, most recent first, **do this later
    
    return (
        <div>
            <div className="user-title">
                <div>Collaborators</div>
                <div className="subtitle">Curious about who is interested in building something with you?</div>
            </div>
            <div className="user-container">
                { allUsers.map( (user, i) => {
                     const handleClick = () =>{
                        setProfileName(user.username)
                    }
                    return(
                        <div key={i} className="user-content">
                            {profileName !== id && <Link onClick={handleClick} to={`/users/${user.username}`}>{user.username}</Link>}    
                        </div>  
                        
                    )
                } )}
            </div>
            
            
            
        </div>
    )
}

export default User