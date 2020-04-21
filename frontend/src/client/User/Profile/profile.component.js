import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import CustomForm from "../../Form/customForm.component"

import "./profile.styles.css"


const Profile = ({reactProps, userId, token, refresh, setRefresh}) => {
                        
    const [ profileState, setProfileState ] = useState(reactProps.location.state.user)
    
    const { username, groups, skills, iAm, iLike, iAppreciate } = profileState
    //console.log(profileState)
    
    
    // edit profile
    const [toggleEdit, setToggleEdit ] = useState(false)
    // prop to pass down to edit
        // modify initital state to be just what can be edited
            // for example, updating group should be in the group itself (can leave)
    const [ arrProp, setArrProp ] = useState([ {username}, {groups}, {skills}, {iAm}, {iLike}, {iAppreciate}  ])

    const editProfile = e => {
        e.preventDefault();
        setToggleEdit(!toggleEdit)
    }
    // useEffect, if username changes, update userId in App.js

    const saveProfile = async (state) => {
        // modify the array of objects, into one object
        setRefresh(!refresh)
        const newState = state.reduce((acc, cur)=>{
            for (let i in cur){
                acc[i] = cur[i]
            }
            return acc
        }, {})
        setProfileState(newState)
        // setSaved(true)
        // fetch request
        fetch(`http://localhost:5000/users/${userId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newState)
        })
            .then(response => response.json())
            .then(data=> {
                console.log("IN FETCH SAVE PROFILE: ", data)
                setToggleEdit(!toggleEdit)
                
            })
            .catch( err => {
                console.error("Error on Saving Profile: " , err)})
    }
    if (!toggleEdit) {
        return (
        // this will display username
        <div className='userprof-container'>
            <div className='userprof-title'>
                <h1>User Profile</h1>  
                <p> {username} </p>
            </div>
            {/* Edit button only shows if profile username matches the logged in user */}
            <div className="edit-button">
            { userId === username && <Link onClick={editProfile} to={`/`}>EDIT</Link> }
            </div>
                {arrProp.map(info => {
                    for (let key in info) {
                        if (key !== 'username') {
                            return (
                                <div key={key} className='userprof-content'>
                                    <p> <span>{key}</span> : {info[key]}</p>
                                </div>
                            )
                        }
                        if (key === 'groups') {
                            return (
                                <div key={key} className='userprof-content'>
                                    <p> <span>{key}</span> : 
                                        {info[key].map(group => <p>{group}</p>)}</p>
                                </div>
                            )
                        }
                    }
                    return null
                })
                }
        </div>
        )
    } else {
        return (
            <div className="editprof-container">
                <h2>Edit Profile</h2>
                <CustomForm 
                    state={arrProp}
                    setArrProp={setArrProp}
                    saveProfile={saveProfile}
                    buttonLabel="SAVE"
                />
            </div>
        )
    }
    
}


export default Profile;