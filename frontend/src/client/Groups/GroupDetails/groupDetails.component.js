import React from 'react'

import "./groupDetails.styles.css"

const GroupDetails = ({id, token, groupId, setGroupId, routeProps}) => {
    
    React.useEffect( ()=>{
        fetch(`http://localhost:5000/groups/${groupId}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(err=>{
                console.log("ERROR:", err)
            })
    }, [])
    
    
    return (
        <div>{groupId}</div>
    )
}

export default GroupDetails