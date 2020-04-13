import React from 'react'

import { Link } from 'react-router-dom'

import "./joinButton.styles.css"

const JoinButton = ({groupId, handleJoin }) => {
    // change this to "CustomButton"
    return (
        <div className="join-button">
            <Link onClick={handleJoin} to={`/groups/${groupId}`}>JOIN</Link>
        </div>
    )
}

export default JoinButton