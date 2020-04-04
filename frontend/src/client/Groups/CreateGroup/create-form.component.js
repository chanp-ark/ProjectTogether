import React from 'react'

import "./create-form.styles.css"

const CreateNewProjectForm = () => {
    const initialState = {
        name: '',
        tech_stack: '',
        description: '',
        curCap: 1,
        maxCap: '',
        users: []
    }
    
    const [projectInfo, setProjectInfo] = React.useState(initialState)
    
    const { username, tech_stack, description, curCap, maxCap, users } = projectInfo
    
    const handleChange = e => {
        e.preventDefault()
        setProjectInfo({...projectInfo, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        let mcToInt = parseInt(e.target.maxCap.value)
        
        if (isNaN(mcToInt)) {
            alert("You must enter a number")
            setProjectInfo({
                ...projectInfo,
                maxCap: '',
            })
        } else if (mcToInt < 2 || mcToInt >6) {
            alert("You must enter a number between 2 and 6")
            setProjectInfo({
                ...projectInfo,
                maxCap: '',
            })  
            
        } else {
            // send data to back end
            setProjectInfo({
                name: '',
                tech_stack: '',
                curCap: 1,
                maxCap: '',
                users: []
            })
        }
        console.log(projectInfo)
    }
    
    return (
        <div className="new-project-container" elevation={3}>
            <h2 className="new-project-header">Create a New Project</h2>
            <form onSubmit={handleSubmit}>
                <label className="new-project-label">Project Name</label>
                <input 
                    className="new-project-input"
                    name="username"
                    value={username}
                    type="text"
                    placeholder="username"
                    onChange={handleChange}
                />

                <label className="new-project-label">Tech Stack</label>
                <input 
                    className="new-project-input"
                    name="tech_stack"
                    value={tech_stack}
                    type="text"
                    placeholder="tech stack"
                    onChange={handleChange}
                />
                
                <label className="new-project-label">Project Description</label>
                <textarea
                    id="project-description" rows="4" cols="19"
                    className="new-project-input"
                    name="description"
                    value={description}
                    type="text"
                    placeholder="a brief description about your project"
                    onChange={handleChange}
                />

                <label className="new-project-label">Maximum Capacity</label>
                <input 
                    className="new-project-input"
                    name="maxCap"
                    value={maxCap}
                    type="text"
                    placeholder="Enter a number 2 to 6"
                    onChange={handleChange}
                />
                <input 
                    className="new-project-submit"
                    type='submit'
                    onSubmit={handleSubmit}
                />
            </form>
        </div>
    )
}

export default CreateNewProjectForm