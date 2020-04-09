import React from 'react'
import { Link } from 'react-router-dom'

import "./profile.styles.css"


const Profile = ({routeProps, id, name}) => {
    
    
    const [userInfo, setUserInfo] = React.useState('')
    
    const {username} = userInfo
    
    React.useEffect( () => {
        fetch(`http://localhost:5000/users/${name}`, {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                if (!data['failure']) {
                    setUserInfo(data)
                } else {
                    alert ("User does not exist")
                    routeProps.history.push("/users")
                }
                // data returns an object {user: "requested username"}
            })
            .catch(err=> {
                console.log("error:" , err)
            })
    }, [id, routeProps.history, name])
    
    console.log(id, username)
    
    return (
    // this will display username
    <div className='userprof-container'>
        <div className='userprof-title'>
            <h1>User Profile</h1>  
           
        </div>
        {/* Edit button only shows if profile username matches the logged in user */}
        <div className="edit-button">
        { id === username && <Link to={`/users/profile/${id}/edit`}>EDIT</Link> }
        </div>
        <div className='userprof-content'>
            <p>from the fetch: <strong>{username}</strong></p>
            <p>This is just some content to see how it would look. Prob will import user's info here</p>
        </div>
    </div>
    )
}


export default Profile;