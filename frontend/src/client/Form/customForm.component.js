import React, {useState} from 'react'
import FormInput from './FormInput/formInput.component'

const CustomForm = ({state, handleSubmit, buttonLabel, ...otherProps}) => {
    
    const [ formState, setFormState ] = useState(state)
    

    // initial state is passed down prop
    // onChange, setFormState with user input

    // onSubmit, post formState
    console.log("formState", formState)
    return (
        <form onSubmit={handleSubmit}>
            { formState.map((obj, i) => {
                for (let key in obj) {
                    const handleChange = e => {
                        e.preventDefault()

                    }
                    return(
                        <FormInput 
                            label={key}
                            key={i}
                            name={key}
                            value={obj[key]}
                            handleChange={handleChange}
                        />
                    )
                }
            })
            }
            <button>{buttonLabel}</button>
        </form>
    )
}

export default CustomForm