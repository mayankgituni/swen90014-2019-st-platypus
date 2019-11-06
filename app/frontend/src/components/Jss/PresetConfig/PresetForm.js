/**************************************************************************
 * Author: Mayank Tomar
 * This component manages the input form of the preset forms
 *************************************************************************/
import React ,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
// Inhouse Material Ui imports
import Card from "../../MaterialUi/Jss/Card/Card.js";
import CardBody from '../../MaterialUi/Jss/Card/CardBody.js';
import GridContainer from "../../MaterialUi/Jss/Grid/GridContainer.js";
import GridItem from "../../MaterialUi/Jss/Grid/GridItem.js";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add'
import FormHandler from '../FormHandler'
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import ShapesSel from './ShapesSel'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

// This is more or less empty with functionality. So we need to implement it.
const PresetForm = (props) => {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({});
  const classes = useStyles();
  const radioclasses = useStyles();
  let formButton;
  let cardHeadContent = "";
  let initialData = {};

  // Is there any current user logged in
  // if(!props.isEdit){
    const [presetInfo, setPresetInfo] = useState({
        "name": "",
        "description": "",
        "ROW": 4,
        "PRIVACY":true,
        "TARGET": 13,
        "NEAR": 10,
        "FAR": 10,
        "BORDER": 1,
        "PADDING": 10,
        "BACKGROUND": "",
        "FRAME_WIDTH":1100,
        "SHAPE_HEIGHT": 172,
        "SPACE_BETWEEN_SHAPES": 1,
        "SPACE_SHAPES": 20,
        "DIM_AFTER_CLICK": 0.3,
        "TIMEOUT": 10,
        "TRIAL": 2,
        "LEVEL": 2,
        "IS_TIMED": true,
        "TRANSITION_DURATION": 1
    })
  const [timed, setTimed] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  const handleCheckTime = () => {
    setTimed(!timed);
  }

  console.log("timed:")
  console.log(timed)
  const handleCheckPrivacy = () => {
    setPrivacy(!privacy);
  }

  const SubmitForm = (values) => {
    let requestType = 'POST';
    let url = `/preset/AddPreset/${props.researcherId}`;
    let val = JSON.parse(JSON.stringify(values));
    val.PRIVACY = privacy;
    val.IS_TIMED = timed;

    console.log("val: ")
    console.log(val)

    if(props.isEdit){
      requestType = 'PUT'
      url = `/preset/EditPreset/${props.researcherId}/${props.presetInfo.preset_id}`;
    }
    
    fetch(url, {
      method: requestType,
      body: JSON.stringify(val),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    handleClose();
    props.refreshPreset();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  if(props.isEdit){
    cardHeadContent = "Edit Preset"
    initialData = props.presetInfo;
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
    cardHeadContent = "Add Preset"
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

  const [selectShape, setSelectShape] = useState(false)
  const shapeSelect = () => {
    setSelectShape(!selectShape);
  }
  
  let {handleChange, handleSubmit, values} = FormHandler(initialData, SubmitForm)
  console.log(values)
  return (
    <div>

      {formButton}
      
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h4" className={classes.title}>
                {cardHeadContent}
              </Typography>
              <Button color="inherit" onClick={handleSubmit}>
                Save
              </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
        <div>
      <form className={classes.form}>

        <CardBody>

          {
          (!selectShape)?(
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <h2>Title</h2>
              <TextField
                variant="outlined"
                autoComplete="name"
                label="Preset Name"
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                fullWidth
                required
                autoFocus/>
            </Grid>
            <Grid item xs={30} sm={8}>
              <h2>Description</h2>
              <TextField
                onChange={handleChange}
                value={values.description}
                autoComplete="description"
                name="description"
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Description"
                autoFocus/>
            </Grid>
            <h3>Timed </h3>
            
            <input 
               type="checkbox" 
               
               id="IS_TIMED"
               name="IS_TIMED"
               value={timed}
               onChange={handleCheckTime} defaultChecked={timed}/>
            <h3>Private </h3>
            
            <input 
               type="checkbox"
               id="PRIVACY"
               name="PRIVACY"
               value={privacy}
             onChange={handleCheckPrivacy} defaultChecked={privacy}/>
            
            
            <GridContainer item xs={12}>
              <GridItem xs={4}>
                <h3>No. Near distrators</h3>
                <TextField
                  onChange={handleChange}
                  value={values.NEAR}
                  autoComplete="NEAR"
                  name="NEAR"
                  variant="outlined"
                  required
                  fullWidth
                  id="NEAR"
                  label="NEAR"
                  autoFocus/>
              </GridItem>
                
              <GridItem xs={4}>
                <h3>No. Near Targets</h3>
                <TextField
                  onChange={handleChange}
                  value={values.TARGET}
                  autoComplete="TARGET"
                  name="TARGET"
                  variant="outlined"
                  required
                  fullWidth
                  id="TARGET"
                  label="TARGET"
                  autoFocus/>
              </GridItem>
            <GridItem xs={4}>
            <h3>No. Far distrators</h3>
            <TextField
                onChange={handleChange}
                value={values.FAR}
                autoComplete="FAR"
                name="FAR"
                variant="outlined"
                required
                fullWidth
                id="FAR"
                label="FAR"
                autoFocus/>
              </GridItem>
              </GridContainer>

            <Grid item xs={4}>
              <br/>
              <TextField
              onChange={handleChange}
              value={values.TIMEOUT}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="TIMEOUT"
              label="TIMEOUT"
              name="TIMEOUT"
              autoComplete="TIMEOUT"
              autoFocus />

              <TextField
              onChange={handleChange}
              value={values.FRAME_WIDTH}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="FRAME_WIDTH"
              label="FRAME_WIDTH"
              name="FRAME_WIDTH"
              autoComplete="FRAME_WIDTH"
              autoFocus />

              <TextField
              onChange={handleChange}
              value={values.SHAPE_HEIGHT}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="SHAPE_HEIGHT"
              label="SHAPE_HEIGHT"
              name="SHAPE_HEIGHT"
              autoComplete="SHAPE_HEIGHT"
              autoFocus />

              <TextField
              onChange={handleChange}
              value={values.TRIAL}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="TRIAL"
              label="TRIAL"
              name="TRIAL"
              autoComplete="TRIAL"
              autoFocus />

              <TextField
              onChange={handleChange}
              value={values.LEVEL}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="LEVEL"
              label="LEVEL"
              name="LEVEL"
              autoComplete="LEVEL"
              autoFocus />

              <TextField
                onChange={handleChange}
                value={values.ROW}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="ROW"
                label="ROW"
                name="ROW"
                autoComplete="ROW"
                autoFocus />
              </Grid>
              <Grid item xs={6}>
              <TextField
                onChange={handleChange}
                value={values.BORDER}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="BORDER"
                label="BORDER"
                name="BORDER"
                autoComplete="BORDER"
                autoFocus />


              <TextField
                onChange={handleChange}
                value={values.SPACE_SHAPES}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="SPACE_SHAPES"
                label="SPACE_SHAPES"
                name="SPACE_SHAPES"
                autoComplete="SPACE_SHAPES"
                autoFocus />

                <TextField
                onChange={handleChange}
                value={values.TRANSITION_DURATION}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="TRANSITION_DURATION"
                label="TRANSITION_DURATION"
                name="TRANSITION_DURATION"
                autoComplete="TRANSITION_DURATION"
                autoFocus />
          </Grid>
            </Grid>):(<GridItem ><ShapesSel shapeSelect={shapeSelect}/> </GridItem>)}

        </CardBody>
        
      </form>
        <button onClick={shapeSelect}>Select Shapes</button>
    </div>
        </DialogContent>  
      </Dialog>
    </div>
  )
}

export default PresetForm