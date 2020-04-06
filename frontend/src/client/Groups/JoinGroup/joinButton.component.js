import React from 'react'

import { Link } from 'react-router-dom'

import "./joinButton.styles.css"

const JoinButton = ({token, id, groupId}) => {
    const handleJoin = () => {
        if (!token && !id) {
            alert("You must log in to join a group")
        } else {
            fetch ("http://localhost:5000/groups", {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id})
            })
                .then(response => {
                    console.log(response)
                    let res = response.json()
                    console.log("res", res)
                    return res})
                .then(data => {
                    console.log(data)
                    return data
                })
                .catch(err=>{
                    console.error("error: ", err)
                })
        }
    }
    
    return (
        <div className="join-button">
            <Link onClick={() => handleJoin()} to={`/groups/${groupId}`}>JOIN</Link>
        </div>
    )
}

export default JoinButton