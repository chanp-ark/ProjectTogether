import React from 'react'

import JoinButton from "../JoinGroup/joinButton.component"

import "./thumbnail.styles.css"

const Thumbnail = ( {id, token, routeProps, name, skills, description, curCap, maxCap, groupId, setGroupId, setRefresh} ) => {
    
    const handleClick= e => {
        e.preventDefault()
        setGroupId(name)
        routeProps.history.push(`/groups/${name}`)
    }
    
    console.log(groupId, "currentCap", curCap, "maxCap", maxCap)
    
    return (
        <div className="thmnl-container">
            <div className="thmnl-project">
                <button onClick={handleClick} className="thmnl-name">{name}</button>
                {curCap < maxCap && <JoinButton setRefresh={setRefresh} id={id} curCap={curCap} maxCap={maxCap} token={token} groupId={name} setGroupId={setGroupId} routeProps={routeProps}/> }

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

