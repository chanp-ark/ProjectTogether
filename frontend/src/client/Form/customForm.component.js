import React, {useState} from 'react'
import FormInput from './FormInput/formInput.component'

const CustomForm = ({state, setArrProp, saveProfile, buttonLabel, ...otherProps}) => {
    
    const [ formState, setFormState ] = useState(state)


    // initial state is passed down prop
    // onChange, setFormState with user input
    const handleChange = e => {
        e.preventDefault()
        const newState = formState.map( obj => {
            for (let key in obj) {
              if (e.target.name === key) {
                  const newObj = {
                      ...obj,
                      [e.target.name]: e.target.value
                  }
                  return newObj
              }
              return obj
            }
            return null
        })
        setFormState(newState)
    }

    // onSubmit, post formState
        // in profile.component.js
    const handleSubmit = e => {
        e.preventDefault()
        setArrProp(formState)
        saveProfile(formState)
    }
    
    return (
        <form onSubmit={handleSubmit}>
            { formState.map((obj, i) => {                
                for (let key in obj) {
                    if (key !== 'groups') {
                        return(
                            <FormInput 
                                label={key}
                                key={i}
                                name={key}
                                value={obj[key]}
                                handleChange={handleChange}
                            />
                        )  
                    } else {
                        return (
                            <p key={key}>{key}: {obj[key]}</p>
                        )
                    }
                }
                return null
            })
            }
            <button>{buttonLabel}</button>
        </form>
    )
}

export default CustomForm