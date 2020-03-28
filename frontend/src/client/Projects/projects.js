import React from 'react';

import Thumbnail from "./Thumbnails/thumbnail.component"
import CreateProject from "./CreateProject/create-button.component"
import "./project.css"

const Projects = ({projects}) => {

    return (
        <div className="project-container">
            <div className="project-title">Projects</div>
            <div className="projects">
                <CreateProject />
                {projects.map( (project, i) => {
                    const {projectName, techStack, description, curCap, maxCap} = project
                    return(
                        <Thumbnail
                            projectName={projectName}
                            key={i}
                            techStack={techStack}
                            description={description}
                            curCap={curCap}
                            maxCap={maxCap}
                        />
                    )
                })} 
            </div>
        </div>
    )
}

export default Projects;