import React, {useState, useEffect} from 'react'


import "./groupDetails.styles.css"

const GroupDetails = ({userId, token, groupId}) => {
    
    const [details, setDetails] = useState('')
        
    useEffect(()=> {    
        const returnGroup = () => {
            fetch(`http://localhost:5000/groups/${groupId}`, {
                method: "GET",
                header: {
                    "Authorization": `Bearer ${token}`
                },
    
            })
                .then(response=>response.json())
                .then(data=> {
                    console.log(data)
                    setDetails(data)
                    })
                .catch(err=> {
                    console.error("error:", err)
                })
        }
        returnGroup()
    }, [groupId, token])
    
    const { name, skills, description, curCap, maxCap, users } = details 

    return (
        <div className="details-container">
            <div className="details-title">Group {name} </div>
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