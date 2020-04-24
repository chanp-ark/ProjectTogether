import React, { useState  } from 'react';

import MultiStepForm from "./CreateGroup/multistep-form.component"

import Thumbnail from "./Thumbnails/thumbnail.component"
import "./groups.css"

const Groups = ({groups, token, userId, routeProps, validate, groupId, setGroupId, refresh, setRefresh}) => {
    
    const [ multi, setMulti ] = useState(false)

    const createGroup= e => {
        e.preventDefault()
        if (!token || !userId) {
            return alert("You must be logged in to create a group")
        }
        setMulti(true)
    }    
    
    return (
        <div className="group-container">
            <div className="group-title">Groups</div>
            { !multi ? 
                <button className="create-group-button" 
                    onClick={createGroup}>
                    + Create Group
                </button> 
                : 
                <MultiStepForm 
                    groups={groups} 
                    token={token} 
                    setMulti={setMulti} 
                    validate={validate} 
                    userId={userId}
                    refresh={refresh}
                    setRefresh={setRefresh}/> }
            <div className={multi ? "no-groups":"groups"}>
                {groups.map( (group, i) => {
                    const {name, skills, description, curCap, maxCap, users} = group
                    const handleJoin = e => {

                        console.log(token, userId)
                        if (!token || !userId) {
                            alert("You must log in to join a group")
                        } else {
                            fetch ("http://localhost:5000/groups", {
                                method: "PUT",
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({userId, name})
                            })
                                .then(response => response.json())
                                .then(() => {
                                    setRefresh(!refresh)         
                                })
                                .catch(err=>{
                                    console.error("error: ", err)
                                })
                        }
                        setGroupId(name)
                    }
                    return(
                        <Thumbnail
                            key={i}
                            name={name}
                            skills={skills}
                            description={description}
                            curCap={curCap}
                            maxCap={maxCap}
                            users={users}
                            token={token}
                            userId={userId}
                            routeProps={routeProps}
                            groupId={groupId}
                            setGroupId={setGroupId}
                            handleJoin={handleJoin}
                        />
                    )
                })} 
            </div>
            
        </div> 
    )
}

export default Groups;