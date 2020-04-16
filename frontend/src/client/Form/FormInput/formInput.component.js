import React from 'react'

import "./formInput.styles.css"

const FormInput = ({routeProps, label, handleChange, ...otherProps}) => {
        
    return (
        <div>
            {label && <label className="form-label">{label}</label> }
            <input 
                className="form-input"
                onChange={handleChange}
                {...otherProps}
            />
        </div>
    )
}

export default FormInput

