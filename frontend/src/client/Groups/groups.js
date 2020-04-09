import React from 'react';


import Thumbnail from "./Thumbnails/thumbnail.component"
import CreateGroup from "./CreateGroup/create-button.component"
import "./groups.css"

const Groups = ({groups, token, id, routeProps, groupId, setGroupId}) => {

    const [refresh, setRefresh] = React.useState("")
    
    console.log(refresh)
    
    const [ groups, setGroups ] = React.useState([])
    
    const [ groupId, setGroupId ] = React.useState(localStorage.getItem("groupId"))
        
    React.useEffect( () => {
        const result = () => {
            fetch("http://localhost:5000/groups", {method: "GET"})
                .then(response => response.json())
                .then(data => setGroups(data.groups))
                .catch(err => {
                    console.error(err)
                })
            }
            result()
        }, [groupId])
    
    
    return (
        <div className="group-container">
            <div className="group-title">Groups</div>
            <div className="groups">
                <CreateGroup token={token} id={id}/>
                {groups.map( (group, i) => {
                    const {name, skills, description, curCap, maxCap, users} = group
                    return(
                        <Thumbnail
                            name={name}
                            key={i}
                            skills={skills}
                            description={description}
                            curCap={curCap}
                            maxCap={maxCap}
                            users={users}
                            token={token}
                            id={id}
                            routeProps={routeProps}
                            groupId={groupId}
                            setGroupId={setGroupId}
                            setRefresh={setRefresh}
                        />
                    )
                })} 
            </div>
            
        </div> 
    )
}

export default Groups;