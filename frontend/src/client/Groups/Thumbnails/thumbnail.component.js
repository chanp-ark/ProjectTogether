import React from 'react'
import JoinButton from "../JoinGroup/joinButton.component"

import "./thumbnail.styles.css"

const Thumbnail = ( {userId, token, routeProps, name, skills, description, curCap, maxCap, users, setGroupId, setRefresh, openGroupDetails, handleJoin} ) => {
    
    return (
        <div className="thmnl-container">
            <div className="thmnl-project">
                <button onClick={openGroupDetails} className="thmnl-name">{name}</button>
                {curCap < maxCap && <JoinButton setRefresh={setRefresh} onClick={handleJoin} userId={userId} curCap={curCap} maxCap={maxCap} token={token} groupId={name} setGroupId={setGroupId} routeProps={routeProps}/> }

                <div className="thmnl-title">Skills</div>
                    <p>{skills}</p>
                <div className="thmnl-title">Description</div>
                    <p>{description}</p>
                <div className="thmnl-title">Current Number of Members</div>
                    <p>{curCap}</p>
                <div className="thmnl-title">Maximum Capacity</div>
                    <p>{maxCap}</p>
            </div>
        </div>
    )
}

export default Thumbnail

