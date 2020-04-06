import React from 'react'
import JoinButton from "../JoinGroup/joinButton.component"

import "./thumbnail.styles.css"

const Thumbnail = ( {routeProps, name, skills, description, curCap, maxCap, token, id, groupId, setGroupId} ) => {
    
    const handleClick= async () => {
        setGroupId(groupId)
        routeProps.history.push(`/groups/${groupId}`)
    }
    
    return (
        <div className="thmnl-container">
            <div className="thmnl-project">
                <div onClick={handleClick} className="thmnl-name">{name}</div>
                <div><JoinButton id={id} token={token}/></div>
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

