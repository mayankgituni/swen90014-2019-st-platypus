/**************************************************************************
 * Author: Mayank Tomar
 * This component is a user profile page controller that manages the child 
 * components under the profile page.
 *************************************************************************/
import React, {useState, useEffect, Profiler} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from "react-router-dom";
import Button from "../../MaterialUi/Jss/Button";
import Camera from "@material-ui/icons/Tune";
import Palette from "@material-ui/icons/PhonelinkSetup";
import Equalizer from "@material-ui/icons/Equalizer";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import styles from "../../Style/sidebarStyle.js";
import classNames from "classnames";
import sideImage from"../../Images/sidebar.png"
import PatientProfileController from '../PatientsProfile/PatientProfileController'
import 'react-splitter-layout/lib/index.css';
import PresetController from '../PresetConfig/PresetController';
import UserProfileInfo from './UserProfileInfo'
import mike from "../../Images/mike.jpg";
import prac from "../../Images/prac.jpg"
import stylesImg from "../../Style/profilePageStyle";
import TestController from '../Tests/TestController'

const useStyles = makeStyles(styles);

const UserProfileController = (props) => {
  const [listIndex, setListIndex] = useState(0)
  const profile = props.profile;
  const logout = props.logout;
  
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const useStylesImg = makeStyles(stylesImg);
  const classesImg = useStylesImg();
  const imageClasses = classNames(classesImg.imgRaised, classesImg.imgRoundedCircle, classesImg.imgFluid);
  
  let img;
  let micon;
  let iconText;
  let pform;
  
  useEffect(() => {
  }, [listIndex]);

  const iconStyle = { fontSize: 30, color:"white"}

  //The difference in the views of the researcher and pratitioner 
  if (profile.type.toUpperCase() == "RESEARCHER") {
    img = mike
    iconText = "Create Preset"
    micon = <Camera style={iconStyle}/>
    pform = <PresetController researcherId={profile.user_id}/>
  } else if(profile.type.toUpperCase() == "PRACTITIONER") {
    img = prac
    iconText = "Patients"
    micon = <SupervisorAccountIcon style={iconStyle}/>
    pform = <PatientProfileController practitionerId={profile.user_id} />
  }


  let iconList = [<AccountBoxIcon style={iconStyle}/>, micon, <Palette style={iconStyle} />, <Equalizer style={iconStyle}/>]
  const sideMenu = ['Profile', iconText, 'Stored Test', 'Results'];
  let content;

  if(listIndex == 0){
    content = <UserProfileInfo email={profile.email} password={profile.password} />
  }else if(listIndex == 1){
    content = pform
  }else if(listIndex == 2){
    content = <TestController userId={profile.user_id}/>
  }else if(listIndex == 3){
    content = <h1>Results</h1>
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
        [classes.appBarShift]: open
      })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
            [classes.hide]: open
          })}>
            <MenuIcon/>
          </IconButton>
          
            <div style={{display:'flex', width:"1200px",margin:0, justifyContent: "right", alignItems: "right"}}>
            <Typography variant="h4" noWrap align='right'>
              STIMULI SOLUTIONS
            </Typography>
            </div>
            
            <div style={{display:'flex', width:"800px", margin:0, justifyContent: "right", alignItems: "right"}}>
          
            <Link to={"/Signin"} className={classes.link}>
              <Button
                size="lg"
                align="right"
                onClick={() => logout(false)}
                color="inherit"
                style={{
                backgroundColor: "#124059"
              }}>
                <main>Logout</main>
              </Button>
            </Link>

          </div>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open
      })}
        classes={{ paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}>
        <div className={classes.background} style={{ backgroundImage: "url(" + sideImage + ")" }}>

        <div className={classes.toolbar}>
            <h1 style={{ color:'#e6e2d3', display:'flex',  justifyContent:'center', alignItems:'center'}}>{profile.firstName} {profile.lastName}</h1>
          <IconButton onClick={handleDrawerClose}>
          <br/>
            {theme.direction === 'rtl'
              ? <ChevronRightIcon/>
              : <ChevronLeftIcon/>}
          </IconButton>
        </div>
        
        <div>
          <br/>
          <br/>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <img src={img} alt="..." className={imageClasses}/>
          </div>
          <br/>
          <Divider/>
          <Divider/>
          <Divider/>
          <Divider/>
            
          <List>
            {sideMenu.map((text, index) => (
              
              <ListItem button key={text} onClick={() => setListIndex(index)}>
              <ListItemIcon> {iconList[index]}</ListItemIcon>
                <ListItemText style={{color:'#e6e2d3', fontWeight: 'bold'}} primary={text}/>
              </ListItem>
            ))};
          </List>
        
          </div>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Typography paragraph>
          {content}
        </Typography>
      </main>
    </div>
  );
}
export default UserProfileController;
