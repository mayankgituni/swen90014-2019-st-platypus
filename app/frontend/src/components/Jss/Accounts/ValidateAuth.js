/**************************************************************************
 * Author: Mayank Tomar
 * This component manages the form authorization when filling up the form
 * to make sure the user enters the right input.
 *************************************************************************/
import React from 'react'

export default function ValidateAuth(values){
  let errors = {};
  // Validation expression for the email
  if (!values.email) {
    errors.email = 'Email Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }

  // Password errors
  if(!values.password){
   errors.password = 'Password Required'
  } else if(values.password.length < 6){
   errors.password = 'Password must be at least 6 characters'
  }
  return errors;
}