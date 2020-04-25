import React, {useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import CustomForm from "../../Form/customForm.component"

import "./profile.styles.css"


const Profile = ({reactProps, userId, token, refresh, setRefresh, allUsers}) => {
    
    let { user } = useParams()
    
    const curUser = allUsers.filter(findUser => {
        for (let key in findUser) {
            if (key === 'username' && findUser[key] === user ) return true
        }
        return false
    })
    console.log("allUsers: ", allUsers)
    console.log("curUser", curUser)
    
    const [ profileState, setProfileState ] = useState(curUser[0])
    console.log("profileState", profileState)
    console.log("reactProp location", reactProps.location.state)
    
    const { username, groups, skills, iAm, iLike, iAppreciate } = profileState
    //console.log(profileState)
    // edit profile
    const [toggleEdit, setToggleEdit ] = useState(false)
    // prop to pass down to edit
        // modify initital state to be just what can be edited
            // for example, updating group should be in the group itself (can leave)
    const [ arrProp, setArrProp ] = useState([ {username}, {skills}, {iAm}, {iLike}, {iAppreciate}, {groups} ])
    
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
        console.log("STATE IN FETCH", state.username)
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
                setRefresh(!refresh)
                
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
                        if (key !== 'username' && key!=='groups') {
                            return (
                                <div key={key} className='userprof-content'>
                                    <p> <span>{key}</span> : {info[key]}</p>
                                </div>
                            )
                        }
                        if (key === 'groups') {
                            
                            return (
                                <div key={key}>
                                    <div className="user-group-title">GROUPS</div>
                                    <div className='user-group'>
                                        {info[key].map((group, i) => {
                                            for (let key in group) {
                                                const { name } = group
                                                return (
                                                    <Link key={i} 
                                                        to={{
                                                            pathname: `/groups/${name}`,
                                                            state: group }}>
                                                        {group[key]}
                                                    </Link>
                                                )
                                            }
                                            return null
                                        })}
                                    </div>
                                   
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