/**************************************************************************
 * Author: Mayank Tomar
 * This component is test controller that manages the child components of the
 * test.
 *************************************************************************/
import React, {useState} from "react";
// nodejs library that concatenates classes
import {fade, makeStyles} from "@material-ui/core/styles";
// core components
import GridItem from "../../MaterialUi/Jss/Grid/GridItem.js";
import GridContainer from "../../MaterialUi/Jss/Grid/GridContainer.js";
import Card from "../../MaterialUi/Jss/Card/Card.js";
import CardHeader from "../../MaterialUi/Jss/Card/CardHeader.js";
import CardBody from "../../MaterialUi/Jss/Card/CardBody.js";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
// Material components
import useHttp from '../http'
import Loader from "../Loader"
import TestList from './TestList.js'
import styles from '../../Style/PresetStyle'
import TestForm from './TestForm'


const TestController = (props) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [isRefresh, setIsRefresh] = useState(false)
  

  
  // Refresh the TestsList
  const Refresh = () => {
    if(isRefresh){
      setIsRefresh(false)
    } else {
      setIsRefresh(true)
    }
  }

  // Authenticating and fetching the user information with the backend api
  const [testList, isLoading, error] = useHttp(`/test/ListTests/${props.userId}`, [isRefresh]);
  // Loading while fetching the information
  let content = <Loader message="Loading.."/>
  
  // If user is authenticated and the correct Test is fetched
  if (!isLoading && testList) {
    content = <TestList refreshTest={Refresh} testList={testList} userId={props.userId} />
  } else if (!isLoading && !testList) {
    content = <h1>NO Test FOUND!!</h1>;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={10}>
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
                <h2 className={classes.cardTitleWhite}>Test List</h2>
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
                <TestForm isEdit={false} refreshTest={Refresh} userId={props.userId}/>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            {content}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default TestController