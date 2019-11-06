/**************************************************************************
 * Author: Mayank Tomar
 * This component is a custom hook to manage the form handler functions.
 *************************************************************************/
import React from "react"

function FormHandler(initialState, callback){
  const [values, setValues] = React.useState(initialState)
  
  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    return callback(values);
  }

  return { handleChange, handleSubmit, values }
}

export default FormHandler