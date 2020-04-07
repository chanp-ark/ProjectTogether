import React from 'react'

import JoinButton from "../JoinGroup/joinButton.component"

import "./thumbnail.styles.css"

const Thumbnail = ( {id, token, routeProps, name, skills, description, curCap, maxCap, groupId, setGroupId} ) => {
    
    const handleClick= async (e) => {
        e.preventDefault()
        setGroupId(groupId)
        localStorage.setItem("groupId", groupId)
        routeProps.history.push(`/groups/${groupId}`)
    }
    
    return (
        <div className="thmnl-container">
            <div className="thmnl-project">
                <button onClick={handleClick} className="thmnl-name">{name}</button>
                <JoinButton id={id} token={token} groupId={groupId} routeProps={routeProps}/>

                <div className="thmnl-title">Skills</div>
                    <p>{skills}</p>
                <div className="thmnl-title">Description</div>
                    <p>{description}</p>
                <div className="thmnl-title">Current Number of Collaborators</div>
                    <p>{curCap}</p>
                <div className="thmnl-title">Maximum Capacity</div>
                    <p>{maxCap}</p>
            </div>
        </div>
    )
}

export default Thumbnail

