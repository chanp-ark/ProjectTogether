import React, {useState} from 'react'

import { Link } from "react-router-dom"

import ChatRoom from "../ChatRoom/chatroom.component"

import "./groupDetails.styles.css"

const GroupDetails = ({routeProps, user }) => {

    const { name, skills, description, curCap, maxCap, users } = routeProps.location.state
    console.log("USERS IN STATE", users)
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
                        {users.map((curUser, i) => {
                            return (
                                <div key={i} className="link-to-user">
                                    <Link to={{
                                        pathname: `/users/${curUser.username}`,
                                        state: { curUser }
                                        }}>{curUser.username}</Link>
                                </div>
                            )
                        })}
                </div>
                {
                    users.includes(user.username) && (
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
                user={user}
                groupName={name}
                users={users}
                closeChat={closeChat}
            />
        )
    }
    
}

export default GroupDetails