import React from 'react'

import JoinButton from "../JoinGroup/joinButton.component"

import "./groupDetails.styles.css"

const GroupDetails = ({id, token, groupId, setGroupId, routeProps}) => {
    
    const [details, setDetails] = React.useState('')
    
    React.useEffect( ()=>{
        fetch(`http://localhost:5000/groups/${groupId}`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(data => setDetails(data))
            .catch(err=>{
                console.log("ERROR:", err)
            })
    }, [groupId, token])
    
    const { users, name, skills, description, curCap, maxCap } = details
    
    return (
        <div className="details-container">
            <div className="details-title">{name}</div>
            <JoinButton id={id} token={token} groupId={groupId}/>
            <div className="details-content">
                {description}
            </div>
            <div className="details-content">
                {skills}
            </div>
            <div className="details-content">
                {curCap}
            </div>
            <div className="details-content">
                {maxCap}
            </div>
            <div className="details-content">
                {users}
            </div>
        </div>
    )
}

export default GroupDetails