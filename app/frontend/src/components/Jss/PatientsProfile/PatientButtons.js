/**************************************************************************
 * Author: Mayank Tomar
 * This component manages the Patients helper buttons and their 
 * functionalities.
 *************************************************************************/
import React, {useState} from "react";
// @material-ui/core components
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import ExtensionIcon from '@material-ui/icons/Extension';
import 'react-splitter-layout/lib/index.css';
import PatientForm from './PatientForm'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

const PatientButtons = (props) => {
  
  // Delete the patient
  const submitDelete = () => {
    const url = `/user/DeletePatient/${props.practitionerId}/${props.patientInfo.patient_id}`;
    fetch(url)
    props.refreshPatients()
  }

  // Need to be implemented
  const submitTest = () => {
    console.log("SubmitTest:")
    console.log(props.patientId)
  }

  const editButton = (
    <PatientForm 
      isEdit={true} 
      patientInfo={props.patientInfo} 
      refreshPatients={props.refreshPatients} 
      practitionerId={props.practitionerId}
      patientId={props.patientInfo.patient_id}
    />)

  const testButton = (
    <Button
      variant="contained"
      size="small"
      style={{
      marginLeft: 0,
      color: 'white',
      backgroundColor: "#276691"
      }}
      onClick={() => submitTest()}>
      Take Test
      <ExtensionIcon/>
    </Button>
  )
  const deleteButton = (
    <IconButton 
      edge="start" 
      color="red" 
      size="small"
      onClick={submitDelete} 
      aria-label="close">
        <DeleteIcon color="error" style={{ fontSize: 30 }} />
    </IconButton>
  )
  
  // The array of buttons for the patients
  let content = (
 
    <Grid container justify="center" spacing={2}>
      <Grid item >
      {editButton}
      </Grid>
      <Grid item >
      {testButton}
      </Grid>
      <Grid item xs={2}>
      {deleteButton}
      </Grid>
    </Grid>
  )

  return content;
}

export default PatientButtons