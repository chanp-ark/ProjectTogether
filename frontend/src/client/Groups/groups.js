import React from 'react';


import Thumbnail from "./Thumbnails/thumbnail.component"
import CreateGroup from "./CreateGroup/create-button.component"
import "./groups.css"

const Groups = ({groups, token, id, routeProps, groupId, setGroupId}) => {

    return (
        <div className="group-container">
            <div className="group-title">Groups</div>
            <div className="groups">
                <CreateGroup />
                {groups.map( (group, i) => {
                    const {name, skills, description, curCap, maxCap} = group
                    const groupId = name.split(' ').join('').toLowerCase()
                    return(
                        <Thumbnail
                            name={name}
                            key={i}
                            skills={skills}
                            description={description}
                            curCap={curCap}
                            maxCap={maxCap}
                            token={token}
                            id={id}
                            routeProps={routeProps}
                            groupId={groupId}
                            setGroupId={setGroupId}
                        />
                    )
                })} 
            </div>
            
        </div> 
    )
}

export default Groups;