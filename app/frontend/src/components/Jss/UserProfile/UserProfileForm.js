/**************************************************************************
 * Author: Mayank Tomar
 * This component manages the input form of the user profile forms.
 *************************************************************************/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../MaterialUi/Jss/Grid/GridItem.js";
import GridContainer from "../../MaterialUi/Jss/Grid/GridContainer.js";
import CustomInput from "../../MaterialUi/Jss/CustomInput.js";
import Button from "../../MaterialUi/Jss/Button.js";
import Card from "../../MaterialUi/Jss/Card/Card.js";
import CardHeader from "../../MaterialUi/Jss/Card/CardHeader.js";
import CardBody from "../../MaterialUi/Jss/Card/CardBody.js";
import CardFooter from "../../MaterialUi/Jss/Card/CardFooter.js";
import EditIcon from '@material-ui/icons/Edit';
import FormLabel from '@material-ui/core/FormLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormHandler from '../FormHandler'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

const UserProfileForm = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  const SubmitForm = (values) => {
    let requestType = 'PUT';
    let url = `/EditProfile`;
    
    fetch(url, {
      method: requestType,
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    handleClose();
    props.refreshProfile();
  }

  const handleDelete = () => {
    const url = `/user/deleteProfile/${props.userProfileInfo.user_id}`;
    fetch(url);
    handleClose();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let formButton = (
    <Button
      variant="contained"
      size="small"
      style={{
      color: 'white',
      backgroundColor: "#276691"
      }}
      onClick={handleClickOpen}>
      Update Profile
      <EditIcon />
    </Button>
  )
  let {handleChange, handleSubmit, values} = FormHandler(props.userProfileInfo, SubmitForm)

  let content =  (
    <div>
      {formButton}
      <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <CardHeader color="warning">
            <h2 className={classes.cardTitleWhite}>Edit Profile</h2>
          </CardHeader>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardBody>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                      <TextField
                        fullWidth
                        autoFocus
                        margin="dense"
                        autoComplete="email"
                        label="Email address"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                    <TextField
                        fullWidth
                        autoFocus
                        margin="dense"
                        autoComplete="age"
                        label="Age"
                        id="age"
                        value={values.age}
                        name="age"
                        onChange={handleChange}
                      />
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        autoFocus
                        margin="dense"
                        autoComplete="firstName"
                        label="First Name"
                        id="firstName"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        autoFocus
                        margin="dense"
                        autoComplete="lastName"
                        label="Last Name"
                        id="lastName"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                      />
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        autoFocus
                        margin="dense"
                        autoComplete="institute"
                        label="Intitute"
                        id="institute"
                        name="institute"
                        value={values.institute}
                        onChange={handleChange}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        autoFocus
                        margin="dense"
                        autoComplete="password"
                        label="Password"
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                      />
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormLabel>Account Type</FormLabel>
                      <RadioGroup
                        aria-label="type"
                        name="type"
                        value={values.type}
                        onChange={handleChange}>
                        <FormControlLabel value="RESEARCHER" control={< Radio />} label="Researcher"/>
                        <FormControlLabel value="PRACTITIONER" control={< Radio />} label="Pratitioner"/>
                      </RadioGroup>
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <TextField
                        fullWidth
                        autoComplete="description"
                        label="Description"
                        id="description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        multiline
                        rows="3"
                        margin="normal"
                        variant="outlined"
                      />
                    </GridItem>
                  </GridContainer>

                </CardBody>
              </Card>
            </GridItem>
            </GridContainer>
          </DialogContent>
          <DialogActions>
          <Button onClick={handleDelete} color="danger">
            Delete
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
        </Dialog>
      </div>
    </div>
  );

  return content;
}
export default UserProfileForm;