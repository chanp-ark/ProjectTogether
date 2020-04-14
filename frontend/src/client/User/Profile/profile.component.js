import React, {useState, useEffect} from 'react'
import { Link, useParams, useRouteMatch } from 'react-router-dom'

import "./profile.styles.css"


const Profile = (reactProps) => {
    
    // const {slug} = useParams()
    // console.log("slug:", slug)
    console.log("props: ", reactProps)
    let matching = useRouteMatch("/users/:slug")
    

    // console.log(profileid)
    // const [userInfo, setUserInfo] = useState('')
    
    // const {username} = userInfo
    
    // useEffect( () => {
    //     fetch(`http://localhost:5000/users/${profileid}`, {method: 'GET'})
    //         .then(response => response.json())
    //         .then(data => {
    //             if (!data['failure']) {
    //                 setUserInfo(data)
    //             } else {
    //                 alert ("User does not exist")
    //                 routeProps.history.push("/users")
    //             }
    //             // data returns an object {user: "requested username"}
    //         })
    //         .catch(err=> {
    //             console.log("error:" , err)
    //         })
    // }, [profileid, routeProps.history ])
  
    
    return (
    // this will display username
    <div className='userprof-container'>
        <div className='userprof-title'>
            <h1>User Profile</h1>  
            {/* {profileid} */}
        </div>
        {/* Edit button only shows if profile username matches the logged in user */}
        {/* <div className="edit-button">
        { userId === username && <Link to={`/users/profile/${userId}/edit`}>EDIT</Link> }
        </div>
        <div className='userprof-content'>
            <p>from the fetch: <strong>{username}</strong></p>
            <p>This is just some content to see how it would look. Prob will import user's info here</p>
        </div> */}
    </div>
    )
}


export default Profile;