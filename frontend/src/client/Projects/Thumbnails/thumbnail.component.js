import React from 'react'

import "./thumbnail.styles.css"

const Thumbnail = ( {projectName, techStack, description, curCap, maxCap} ) => {
    return (
        <div className="thmnl-container">
            <div className="thmnl-project">
                <div className="thmnl-name">{projectName}</div>
                <div className="thmnl-title">Tech Stack</div>
                    <p>{techStack}</p>
                <div className="thmnl-title">Description</div>
                    <p>{description}</p>
                <div className="thmnl-title">Current Number of Collaborators</div>
                    <p>{curCap}</p>
                <div className="thmnl-title">Maximum Capacity</div>
                    <p>{maxCap}</p>
            </div>
        </div>
    )
}

export default Thumbnail

