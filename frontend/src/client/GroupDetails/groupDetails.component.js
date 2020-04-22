import React, {useState} from 'react'

import ChatRoom from "../ChatRoom/chatroom.component"

import "./groupDetails.styles.css"

const GroupDetails = ({routeProps, userId }) => {
    
    const { name, skills, description, curCap, maxCap, users } = routeProps.location.state
    
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
                    All Users: {users}
                </div>
                <div className="details-content">
                    Current User: {userId}
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