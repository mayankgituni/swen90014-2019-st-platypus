/**************************************************************************
 * Author: Mayank Tomar
 * This component manages the input form of the preset forms.
 *************************************************************************/
import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add'
import FormHandler from '../FormHandler'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import EditIcon from '@material-ui/icons/Edit';

export default function PatientForm(props) {
  const [open, setOpen] = React.useState(false);
  let formButton;
  let cardHeadContent = "";
  let initialData = {};


  // Handle form submission for the patients
  const SubmitForm = (values) => {
    let requestType = 'POST';
    let url = `/user/AddPatient/${props.practitionerId}`;
    
    if(props.isEdit){
      requestType = 'PUT'
      url = `/user/EditPatient/${props.practitionerId}/${props.patientId}`;
    }

    fetch(url, {
      method: requestType,
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    handleClose();
    props.refreshPatients();
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if(props.isEdit){
    cardHeadContent = "Edit Patient"
    initialData = props.patientInfo;
    formButton = (
      <Button
        variant="contained"
        size="small"
        style={{
        color: 'white',
        backgroundColor: "#276691"
        }}
        onClick={handleClickOpen}>
        Edit
        <EditIcon />
      </Button>
    )
  }else{
    cardHeadContent = "Add Patient"
    
    formButton = (
      <Button
        variant="contained"
        color="primary"
        size="medium"
        onClick={handleClickOpen}
        style={{
        marginLeft: 0,
        color: 'white',
        backgroundColor: "#276691"
      }}>
        Add new
        <AddIcon/>
    </Button>
    )
  }

  // Form input handlers
  let {handleChange, handleSubmit, values} = FormHandler(initialData, SubmitForm)

  return (
    <div>
      {formButton}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{cardHeadContent} <hr/></DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Full Name"
            type="name"
            fullWidth
            value={values.name}
            onChange={handleChange}
            name="name"
            autoComplete="name"
            autoFocus
          />
          
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={values.email}
            onChange={handleChange}
            name="email"
            autoComplete="email"
            autoFocus
          />
          
          <TextField
            autoFocus
            margin="dense"
            id="age"
            label="Age"
            type="age"
            fullWidth
            value={values.age}
            onChange={handleChange}
            name="age"
            autoComplete="age"
            autoFocus
          />

          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="type"
            name="gender"
            value={values.gender}
            onChange={handleChange}>
            <FormControlLabel value="male" control={< Radio />} label="Male"/>
            <FormControlLabel value="female" control={< Radio />} label="Female"/>

          </RadioGroup>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}