import React from 'react'

import { Link } from "react-router-dom"

import "./create-button.styles.css"

const CreateProject = () => {
    
    
    return (
        <div className="button-container">
            <button
                className="button-submit"
            >
            <Link to={"./projects/new"}> + CREATE NEW PROJECT</Link>
            </button>
        </div>
    )
}

export default CreateProject