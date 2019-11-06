/**************************************************************************
 * Author: Mayank Tomar
 * This component manages the form validation with a validation type react
 * custom hook.
 *************************************************************************/
import React from "react";

function useFormValidation(initialState, validate) {
  // Init the state variables
  const [values, setValues] = React.useState(initialState)
  const [errors, setErrors] = React.useState({})
  const [isSubmitting, setSubmitting] = React.useState(false)

  // Check for errors
  React.useEffect(() => {
    if(isSubmitting){
      const noErrors = Object.keys(errors).length === 0
      
      if(noErrors){
        setSubmitting(false)
      } else{
        setSubmitting(false)
      }
    }

  }, [errors])

  // Handling the form input change
  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  // Handle the blurr of the input
  function handleBlurr() {
    const validationErrors = validate(values)
    setErrors(validationErrors)
  }

  // Handle the submission form
  function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true)
    const validationErrors = validate(values)
    setErrors(validationErrors)

    let dataBody = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      institute: values.institute,
      type: values.type
    }
    try {
      const res = fetch("/signup", {
        method: 'POST',
        body: JSON.stringify(dataBody),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = res.json();
      
    } catch (error) {
      return error;
    }
    
  }

  return {handleSubmit, handleChange, handleBlurr, values, errors, isSubmitting}
}

export default useFormValidation;
