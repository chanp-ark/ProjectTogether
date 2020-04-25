import React, {useState} from 'react'

import { Link } from "react-router-dom"

import ChatRoom from "../ChatRoom/chatroom.component"

import "./groupDetails.styles.css"

const GroupDetails = ({routeProps, userId }) => {

    const { name, skills, description, curCap, maxCap, users } = routeProps.location.state
    
    console.log(users)
    
    const [ chat, setChat ] = useState(false)

    const openChat = e => {
        e.preventDefault()
        setChat(true)
    }
    
    const closeChat = e => {
        e.preventDefault()
        setChat(false)
    }
    
    if (!chat) {
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
                    All Users: 
                        {users.map((user, i) => {
                            
                            return (
                                <div key={i} className="link-to-user">
                                    <Link to={`/users/${user}`}>{user}</Link>
                                </div>
                            )
                            })}
                </div>
                {
                    users.includes(userId) && (
                        <div className="details-content">
                            <button onClick={openChat}>Open Chat</button>
                        </div>
                    )
                }
            </div>
        )
    } else {
        return (
            <ChatRoom 
                userId={userId}
                groupName={name}
                users={users}
                closeChat={closeChat}
            />
        )
    }
    
}

export default GroupDetails