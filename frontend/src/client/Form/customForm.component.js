import React, {useState} from 'react'
import FormInput from './FormInput/formInput.component'

const CustomForm = ({handleSubmit, ...otherProps}) => {
    
    const [ formState, setFormState ] = useState('')
    
    return (
        <form onSubmit={handleSubmit}>
            
        </form>
    )
}

export default CustomForm