/**************************************************************************
 * Author: Mayank Tomar
 * This component manages the input form of the test form.
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
import EditIcon from '@material-ui/icons/Edit';

export default function TestForm(props) {
  const [open, setOpen] = React.useState(false);
  let formButton;
  let cardHeadContent = "";
  let initialData = {};

  const SubmitForm = (values) => {
    let requestType = 'POST'
    let url = `/test/AddTest/${props.userId}/${values.preset_id}`;
    
    if(props.isEdit){
      requestType = 'PUT'
      url = `/user/EditPatient`;
    }

    fetch(url, {
      method: requestType,
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    handleClose();
    props.refreshTest();
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if(props.isEdit){
    cardHeadContent = "Edit Test"
    initialData = props.testInfo;
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
    cardHeadContent = "Add Test"
    
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
            margin="dense"
            id="name"
            label="Test Name"
            type="name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            fullWidth
            autoFocus
            autoFocus
          />
          
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="description"
            name="description"
            autoComplete="description"
            value={values.description}
            onChange={handleChange}
            autoFocus
            fullWidth
            autoFocus
          />
          <TextField
            margin="dense"
            id="preset_id"
            label="Enter PresetID"
            type="preset_id"
            name="preset_id"
            autoComplete="preset_id"
            value={values.preset_id}
            onChange={handleChange}
            autoFocus
            fullWidth
            autoFocus
          />
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