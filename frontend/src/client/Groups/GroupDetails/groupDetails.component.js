import React from 'react'


import "./groupDetails.styles.css"

const GroupDetails = ({routeProps, userId }) => {
    
    const { name, skills, description, curCap, maxCap, users } = routeProps.location.state

    return (
        <div className="details-container">
            <div className="details-title">Group {name}</div>
            <div className="details-content">
                Description: {description}
            </div>
            <div className="details-content">
                Skills: {skills}
            </div>
            <div className="details-content">
                {curCap} / {maxCap}
            </div>
            <div className="details-content">
                All Users: {users}
            </div>
            <div className="details-content">
                Current User: {userId}
            </div>
        </div>
    )
}

export default GroupDetails