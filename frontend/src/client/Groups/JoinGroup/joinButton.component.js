import React from 'react'

import { Link } from 'react-router-dom'

import "./joinButton.styles.css"

const JoinButton = ({token, id, groupId}) => {
    const handleJoin = e => {
        e.preventDefault();
        if (!token && !id) {
            alert("You must log in to join a group")
        } else {
            fetch ("http://localhost:5000/groups", {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id, groupId})
            })
                .then(response => response.json())
                .then(data => {
                    console.log("data", data)
                    return data
                })
                .catch(err=>{
                    console.error("error: ", err)
                })
        }
    }
    
    return (
        <div className="join-button">
            <button onClick={handleJoin} to={`/groups/${groupId}`}>JOIN</button>
        </div>
    )
}

export default JoinButton