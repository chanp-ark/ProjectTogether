import React from 'react';

import Thumbnail from "./Thumbnails/thumbnail.component"
import CreateGroup from "./CreateGroup/create-button.component"
import "./groups.css"

const Groups = ({groups}) => (
    <div className="group-container">
        <div className="group-title">Groups</div>
        <div className="groups">
            <CreateGroup />
            {groups.map( (group, i) => {
                const {name, skills, description, curCap, maxCap} = group
                return(
                    <Thumbnail
                        name={name}
                        key={i}
                        skills={skills}
                        description={description}
                        curCap={curCap}
                        maxCap={maxCap}
                    />
                )
            })} 
        </div>
    </div>
)

export default Groups;