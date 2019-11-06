/**************************************************************************
 * Author: Mayank Tomar
 * This component manages the user profile information.
 *************************************************************************/
import React, { useState } from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// core components
import GridItem from "../../MaterialUi/Jss/Grid/GridItem.js";
import GridContainer from "../../MaterialUi/Jss/Grid/GridContainer.js";
import Card from "../../MaterialUi/Jss/Card/Card.js";
import CardHeader from "../../MaterialUi/Jss/Card/CardHeader.js";
import CardBody from "../../MaterialUi/Jss/Card/CardBody.js";
import CardFooter from "../../MaterialUi/Jss/Card/CardFooter.js";
import UserProfileForm from './UserProfileForm'
import useHttp from "../http";
import Loader from '../Loader'

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
    fontWeight: "400",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const UserProfileInfo = (props) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [isRefresh, setIsRefesh] = useState(false)

  const Refresh = () =>{
    if(isRefresh){
      setIsRefesh(false)
    } else{
      setIsRefesh(true)
    }
  }

  // Authenticating and fetching the user information with the backend api
  const [userProfileInfo, isLoading, error] = useHttp(`/user/profileInfo/${props.email}/${props.password}`, [isRefresh]);
  // Loading while fetching the information
  let content = <Loader message="Fetching Info.."/>
  
  // If user is authenticated and the correct profile is fetched
  if (!isLoading && userProfileInfo) {
      content = (
              <div>
              <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                  <Card>
                    <CardHeader color="info">
                      <h2 className={classes.cardTitleWhite}>MyProfile</h2>
                    </CardHeader>
                    <CardBody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={5}>
                          <h2>{userProfileInfo[0].firstName} {userProfileInfo[0].lastName}</h2>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <h4>Age: {userProfileInfo[0].age}</h4>
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={5}>
                          <h4>Institute:</h4> <p> {userProfileInfo[0].institute}</p>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={5}>
                          <h4>Account Type: </h4> <p> {userProfileInfo[0].type}</p>
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                          <h4>Email: </h4> <p> {userProfileInfo[0].email}</p>
                        </GridItem>
                      </GridContainer>
                        <hr/>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <h4>Description: </h4>
                          <p>{userProfileInfo[0].description}</p>
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                    <CardFooter>
                      <UserProfileForm refreshProfile={Refresh} userProfileInfo={userProfileInfo[0]} />
                    </CardFooter>
                  </Card>
                </GridItem>

              </GridContainer>
            </div>
      );
  } else if (!isLoading && !userProfileInfo) {
    content = <h1>PROFILE INFO NOT FOUND!!</h1>;
  }
  
  return content;
    
}
export default UserProfileInfo;