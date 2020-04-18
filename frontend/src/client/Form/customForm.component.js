import React, {useState} from 'react'
import FormInput from './FormInput/formInput.component'

const CustomForm = ({state, handleSubmit, buttonLabel, ...otherProps}) => {
    
    const [ formState, setFormState ] = useState(state)
    

    // initial state is passed down prop
    // onChange, setFormState with user input
    const handleChange = (e, ind, state ) => {
        e.preventDefault()
        console.log(e.target)
        const newState = formState.map((obj, i) => {
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
        })
=        setFormState(newState)
    }

    // onSubmit, post formState
    console.log("formState", formState)
    return (
        <form onSubmit={handleSubmit}>
            { formState.map((obj, i) => {                
                for (let key in obj) {
                    return(
                        <FormInput 
                            label={key}
                            key={i}
                            name={key}
                            value={obj[key]}
                            handleChange={(e) => handleChange(e, i, obj)}
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