import React, {useState, useEffect, useRef } from 'react'


import "./chatroom.styles.css"

const ChatRoom = ({ userId, groupName, users, closeChat }) => {
    
    // fetch chats from db for initial state
    const initialState = [
        {"user1": "hello"},
        {"user2": "hey"},
        {"user3": "what is up"},
        {"user4": "not interested"}
    ]
    // state for chat room
    const [ chats, setChats ] = useState(initialState) 

    // state for sending chat
    const [ message, setMessage ] = useState('')
    
    // ref to scroll down to newest message
    const lastMessageRef = useRef(null)
    
    const scrollToBottom = () => {
        lastMessageRef.current.scrollIntoView({behavior: "smooth"})
    }
    
    useEffect (scrollToBottom, [chats])
    
    // const handleChange
    const handleMessage = e => {
        setMessage(e.target.value)
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        setChats(chats.concat({[userId]: message}))
        setMessage('')
    }
    
    return (
        <div className="chat-container">
            <div className="chat-content">
                <h3>{groupName} chatroom</h3>
                <div className="chat-users">
                    {users.map(user => <p key={user}>{user}</p>)}
                </div>
                <div className="chatbox">
                    <div className="read-messages">
                        {chats.map((chat, i) => {
                            for (let key in chat) {
                                return (
                                    <div className="chat-message-container" key={i}> 
                                        <div className="chat-user">{key}:</div> 
                                        <div className="chat-message">{chat[key]}</div>
                                    </div>
                                )
                            }
                        })}
                        <div ref={lastMessageRef} />
                    </div>
                    <form className="send-container" onSubmit={handleSubmit}>
                        <textarea className="send-message" rows="2" cols="50"
                            autoFocus={true}
                            label="Send Chat"
                            type="text"
                            value={message}
                            onChange={handleMessage}
                            onKeyPress={e=>{
                                if (e.key === "Enter") {
                                    e.preventDefault()
                                    handleSubmit(e)
                                }
                                
                                // shift + enter creates new line
                                // if (e.key === "Enter" && e.shiftKey) {
                                //     console.log("hello")
                                // }
                            }}
                            
                        />
                        <button className="send-button" >SEND</button>
                        
                    </form>
                </div>
                
                <button className="close" onClick={closeChat}>Close Chat</button>   
            </div>
        </div>
    )
}

export default ChatRoom