import React from 'react';
import {Link} from 'react-router-dom';

import "./edit.styles.css"


const EditProfile = ({routeProps, token, id}) => {
    // type in password if want to edit
    const [userData, setUserData] = React.useState(null)

    const userToken = localStorage.getItem("token");

    const handleSave = () => {
        if (token === false) {
            routeProps.history.push("/")
        } else {
            fetch(`http://localhost:5000/users/${id}/edit`, 
            {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                }
            })
            .then(response => response.json())
            .then(userData => {
                if (userData.message === 'Unauthorized') {
                    alert("Unauthorized Access")
                    return false
                } else {
                    setUserData(userData)
                }
            })
            .catch(err => {
                console.error("error: ", err)
            })
        }
    }
    
    
    return (
        <div className="edituser-container">
            <div className="edituser-title">
                <h1>EDIT PROFILE PAGE</h1>
                { userData && <h4>{userData['username']}</h4> }
            </div>
            <div className="edituser-content">
                <p>some blah lorem info to edit content filling up space ipsum</p>
            </div>
            <div className="save-button">
                {/* needs an onclick to save info */}
                <Link onClick={handleSave} to="/users/profile">Save</Link>
            </div>
        </div>
    )
}

export default EditProfile