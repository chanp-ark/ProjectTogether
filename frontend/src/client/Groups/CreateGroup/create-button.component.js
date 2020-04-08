import React from 'react'

import { Link } from "react-router-dom"

import "./create-button.styles.css"

const CreateProject = ({token, id}) => {
    
    const handleClick=e=>{
        if (!token || !id) {
            alert("You must be logged in to create a group")
            e.preventDefault()
        }
    }
    
    return (
        <div className="button-container">
            <button
                className="button-submit"
            >
            <Link onClick={handleClick} to={"./groups/new"}> + CREATE NEW PROJECT</Link>
            </button>
        </div>
    )
}

export default CreateProject