import React, { useState, useEffect } from 'react';

import MultiStepForm from "./CreateGroup/multistep-form.component"

import Thumbnail from "./Thumbnails/thumbnail.component"
import "./groups.css"

const Groups = ({token, userId, routeProps, validate, groupId, setGroupId}) => {

    const [refresh, setRefresh] = useState("")
    
    const [ multi, setMulti ] = useState(false)

    const [ groups, setGroups ] = useState([])
            
    useEffect( () => {
        const result = () => {
            fetch("http://localhost:5000/groups", {method: "GET"})
                .then(response => response.json())
                .then(data => setGroups(data.groups))
                .catch(err => {
                    console.error(err)
                })
            }
            result()
    }, [groupId, multi])
        
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
            { !multi ? <button className="create-group-button" onClick={createGroup}>+ Create Group</button> : <MultiStepForm groups={groups} token={token} setMulti={setMulti} validate={validate} userId={userId}/> }
            <div className={multi ? "no-groups":"groups"}>
                {groups.map( (group, i) => {
                    const openGroupDetails= e => {
                        e.preventDefault()
                        setGroupId(name)
                        routeProps.history.push(`/groups/${name}`)
                    }
                    const {name, skills, description, curCap, maxCap, users} = group
                    const handleJoin = e => {
    
                        e.preventDefault();
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
                                .then(data => {
                                    alert("You have successfully joined the group")               
                                })
                                .catch(err=>{
                                    console.error("error: ", err)
                                })
                        }
                        setGroupId(name)
                    }
                    return(
                        <Thumbnail
                            name={name}
                            key={i}
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
                            setRefresh={setRefresh}
                            handleJoin={handleJoin}
                            openGroupDetails={openGroupDetails}
                        />
                    )
                })} 
            </div>
            
        </div> 
    )
}

export default Groups;