import React from 'react';

import "./multistep-form.styles.css"

const MultiStepForm = ({routeProps, token, groups, setGroups, id}) => {
    
    const initialState = {
        name: '',
        skills: '',
        description: '',
        curCap: 1,
        maxCap: '',
        users: id,
    }

    const [ groupInfo, setGroupInfo ] = React.useState(initialState)
    
    const { name, skills, description, maxCap} = groupInfo
    
    // tracker for this form
    const [trackStep, setTrackStep] = React.useState(0)
    
    const handleChange = e => {
        e.preventDefault()
        setGroupInfo({
            ...groupInfo,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        for (let i in groupInfo) {
            if (groupInfo[i] === '') {
                alert (`${i} is required`)
                return false
            }
        }
        groupInfo.name = name.split(' ').join('').toLowerCase()

        // update db
        fetch("http://localhost:5000/groups", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(groupInfo)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setGroups(groups.concat(groupInfo))
            routeProps.history.push("/groups")

        })        
    }
    
    
    // form components
    const fields = [
        <div className="tab" key="groupName">
            <label className="tab-label">Group Name</label>
            <input 
                type="text"
                autoFocus={true}
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="name of group"
            />
        </div>
        ,
        <div className="tab" key="skills">
            <label className="tab-label">Tech Stack</label>
            <input 
                type="text"
                autoFocus={true}
                name="skills"
                value={skills}
                onChange={handleChange}
                onKeyPress={ e => {
                    if (e.key === "Enter") next()
                    }}
                placeholder="skills"
            />
        </div>
        ,
        <div className="tab" key="group-description">
            <label className="tab-label">Description</label>
            <input 
                type="text"
                // add overflow:scroll into css
                name="description"
                autoFocus={true}
                value={description}
                onChange={handleChange}
                onKeyPress={ e => {
                    if (e.key === "Enter") next()
                    }}
                placeholder="brief description of your group"
            />
        </div>
        ,
        <div className="tab" key="maxCap">
            <label className="tab-label">Max Number of Members</label>
            <select id="maxCap" name="maxCap" onChange={handleChange} 
                onKeyPress={ e => {
                    if (e.key === "Enter") next()
                    }}> 
                <option value="0">-</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
        </div>
    ]
    
    // next and previous buttons
    const next = () => {
        if (trackStep < fields.length) {
            setGroupInfo({...groupInfo})
            setTrackStep(trackStep+1)
            let curStep = document.getElementById(`${trackStep+1}`)
            let classes = curStep.classList;
            classes.add("step-active")  
        }
    }
        
    const prev = () => {
        if (trackStep <= fields.length && trackStep > 0) {
            setGroupInfo({...groupInfo})
            setTrackStep(trackStep-1)
        }
        let curStep = document.getElementById(`${trackStep}`)
        let classes = curStep.classList;
        classes.remove("step-active")
    }
    
    // track each step
    const stepTracker = [
        <span key="step1"className="step step-active" id="0" ></span>,
        <span key="line1"className="line"></span>,
        <span key="step2"className="step" id="1"></span>,
        <span key="line2"className="line"></span>,
        <span key="step3"className="step" id="2"></span>,
        <span key="line3"className="line"></span>,
        <span key="step4"className="step" id="3"></span>,
        <span key="line4"className="line"></span>,
        <span key="step-submit"className="step" id="4"></span>
   ]
    
    return (
        <form className="multi-container" onSubmit={handleSubmit}>
            
            <div className="multi-subcontainer">
                 
                <div className="multi-tracker">
                    {
                        stepTracker
                    }

                </div>
                
                {
                   fields.filter( (curTab, i) => i === trackStep)
                }
                
                {
                    trackStep === fields.length &&
                        <div className='multi-review'>
                            <label className="multi-review-label">Group Name</label>
                            <div className="signup-review">
                                {name}
                            </div>

                            <label className="multi-review-label">Skills</label>
                            <div className="signup-review">
                                {skills}
                            </div>

                            <label className="multi-review-label">Description</label>
                            <div className="signup-review">
                                {description}
                            </div>

                            <label className="multi-review-label">Max Number of Members</label>
                            <div className="signup-review">
                                {maxCap}
                            </div>

                        </div>

                }
                
                <div className="prevNext-container">
                    
                    {
                        (trackStep <= fields.length && trackStep > 0) &&
                            <button 
                                className="prevNext" 
                                key="prevButton"
                                onClick={ e => {
                                    e.preventDefault();
                                    prev();
                                }}>
                                    Prev
                            </button>
                    }
                    
                    {
                        trackStep < fields.length && 
                            <button 
                                className="prevNext"
                                key="nextButton"
                                value={trackStep}
                                onClick={ e => {
                                    e.preventDefault();
                                    next()
                                }
                            }>
                                Next
                            </button>
                    }
                </div>
                
                {
                    trackStep === fields.length &&
                        <input
                            className="multi-submit" 
                            type="submit"
                        />
                }
                
                
               
                
            </div>
            
        </form>
    )
}

export default MultiStepForm