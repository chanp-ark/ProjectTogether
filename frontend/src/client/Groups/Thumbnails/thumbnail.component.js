import React from 'react';

import { Link } from "react-router-dom";

import "./thumbnail.styles.css"

const Thumbnail = ( {userId,  name, skills, description, curCap, maxCap, users, handleJoin} ) => {
    
    return (
        <div className="thmnl-container">
            <div className="thmnl-headers">
                <Link className="detail" to={{
                    pathname: `/groups/${name}`,
                    state: {name, skills, description, curCap, maxCap, users}
                }}>{name}</Link>
            </div>
            
            <div className="thmnl-content">
                <div>Skills</div>
                    <p>{skills}</p>
                <div>Description</div>
                    <p>{description}</p>
                <div>Current Number of Members</div>
                    <p>{curCap}</p>
                <div>Maximum Capacity</div>
                    <p>{maxCap}</p>
                
            </div>
            
             {(curCap < maxCap && !users.includes(userId)) ? 
                <Link onClick={handleJoin} className="join-group" to={{
                        pathname: `/groups`,
                        state: {name, skills, description, curCap, maxCap, users}
                    }}>JOIN</Link> 
                : 
                <div className='empty-div'></div>
            }
        </div>
    )
}

export default Thumbnail

