/**************************************************************************
 * Author: Mayank Tomar
 * This component is a patientS profile controller which manages all the
 * child components that build a patient system.
 *************************************************************************/
import React, { useState } from "react";
import {fade, makeStyles} from "@material-ui/core/styles";
// core components
import GridItem from "../../MaterialUi/Jss/Grid/GridItem.js";
import GridContainer from "../../MaterialUi/Jss/Grid/GridContainer.js";
import Card from "../../MaterialUi/Jss/Card/Card.js";
import CardHeader from "../../MaterialUi/Jss/Card/CardHeader.js";
import CardBody from "../../MaterialUi/Jss/Card/CardBody.js";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import PatientForm from './PatientForm';
// Material components
import useHttp from '../http'
import Loader from "../Loader"
import PatientsList from './PatientsList.js'
import styles from '../../Style/PatientProfileStyle'

const PatientProfileController = (props) => {
  
  // Init the helper variable
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [isRefresh, setIsRefresh] = useState(false)
  
  // Refresh the patientsList
  const refreshPatients = () => {
    if(isRefresh){
      setIsRefresh(false)
    } else {
      setIsRefresh(true)
    }
  }
  
  // Authenticating and fetching the user information with the backend api
  const [patientsList, isLoading, error] = useHttp(`/user/ListPatients/${props.practitionerId}`, [isRefresh]);
  
  // Loading while fetching the information
  let content = <Loader message="Fetching Patients.."/>
  
  // If user is authenticated and the correct profile is fetched
  if (!isLoading && patientsList) {
    content = <PatientsList refreshPatients={refreshPatients} patientsList={patientsList} practitionerId={props.practitionerId} />
  } else if (!isLoading && !patientsList) {
    content = <h1>NO PATIENTS FOUND!!</h1>;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="info">
            <div style={{
              display: 'flex'
            }}>
              <div
                style={{
                display: 'flex',
                width: "300px",
                margin: 0,
                justifyContent: "left",
                alignItems: "left"
              }}>
                <h2 className={classes.cardTitleWhite}>Patient List</h2>
              </div>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon/>
                </div>

                <InputBase
                  placeholder="Search…"
                  classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                  inputProps={{
                  'aria-label': 'search'
                }}/>
              </div>
              <div
                style={{
                display: 'flex',
                width: "700px",
                margin: 0,
                justifyContent: "right",
                alignItems: "right"
              }}>
                <PatientForm isEdit={false} refreshPatients={refreshPatients} practitionerId={props.practitionerId}/>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            {content}
          </CardBody>
        </Card>
      </GridItem>
      {/* // This needs to be filled with real data */}
      <GridItem xs={6} sm={6} md={4}>
        <Card>
          <CardHeader color="warning">
            <div
              style={{
              display: 'flex',
              width: "450px",
              margin: 0,
              justifyContent: "center",
              alignItems: "center"
            }}>
              <h2 className={classes.cardTitleWhite}>Upcoming Appointments</h2>
            </div>
          </CardHeader>
          <CardBody>
            <p style={{fontSize:"20px"}}> <strong>Name: </strong> Minerva Hooper </p> 
            <p style={{fontSize:"20px"}}> <strong> Date: </strong>Sep 27, 2019</p> 
            <p style={{fontSize:"20px"}}> <strong> Time: </strong>11:45pm</p> 
            <hr/>
            <p style={{fontSize:"20px"}}> <strong> Name: </strong>Sage Rodriguez</p> 
            <p style={{fontSize:"20px"}}> <strong> Date: </strong>Dec 10, 2019</p> 
            <p style={{fontSize:"20px"}}> <strong> Time: </strong>1:40pm</p> 
          </CardBody>
        </Card>
      </GridItem>

    </GridContainer>
  );
}

export default PatientProfileController