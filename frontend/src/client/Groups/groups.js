import React, { useState  } from 'react';

import MultiStepForm from "./CreateGroup/multistep-form.component"

import Thumbnail from "./Thumbnails/thumbnail.component"
import "./groups.css"

const Groups = ({groups, token, user, routeProps, validate, groupId, setGroupId, refresh, setRefresh}) => {
    
    const [ multi, setMulti ] = useState(false)
    
    const createGroup= e => {
        e.preventDefault()
        if (!token || !user) {
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
                    user={user}
                    refresh={refresh}
                    setRefresh={setRefresh}/> }
            <div className={multi ? "no-groups":"groups"}>
                {groups.map( (group, i) => {
                    const { name } = group
                    const handleJoin = e => {

                        console.log(token, user)
                        if (!token || !user) {
                            alert("You must log in to join a group")
                        } else {
                            fetch ("http://localhost:5000/groups", {
                                method: "PUT",
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({user, name})
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
                            group={group}
                            token={token}
                            user={user}
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