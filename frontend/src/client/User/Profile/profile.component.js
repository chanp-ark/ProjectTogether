import React from 'react'
import { Link, useParams } from 'react-router-dom'

import "./profile.styles.css"


const Profile = ({routeProps}) => {
    
    
    const [userInfo, setUserInfo] = React.useState([])
    
    let { id }  = useParams()
   
    React.useEffect( () => {
        fetch(`http://localhost:4000/users/profile/${id}`,
            {
                method: 'GET'

            })
            .then(response => response.json())
            .then(data => {
                if (!data['failure']) {
                    setUserInfo(data['user'])
                } else {
                    alert ("User does not exist")
                    routeProps.history.push("/users")
                }
                // data returns an object {user: "requested username"}
            })
            .catch(err=> {
                console.log(err)
            })
    }, [id, routeProps.history])
    
    return (
    // this will display username
    <div className='userprof-container'>
        <div className='userprof-title'>
            <h1>User Profile</h1>  
           
        </div>
        {/* Edit button only shows if profile username matches the logged in user */}
        <div className="edit-button">
            <Link to="/users/profile/edit">EDIT</Link>
        </div>
        <div className='userprof-content'>
            <p>from the route param: <strong>{userInfo}</strong></p>
            <p>This is just some content to see how it would look. Prob will import user's info here</p>
        </div>
    </div>
    )
}


export default Profile;