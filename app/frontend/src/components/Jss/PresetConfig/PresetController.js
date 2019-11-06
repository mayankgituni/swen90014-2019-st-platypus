/**************************************************************************
 * Author: Mayank Tomar
 * This component acts like a controller manager of the preset child
 * components.
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
import PresetList from './PresetList.js'
import styles from '../../Style/PresetStyle'
import PresetForm from './PresetForm'


const PresetController = (props) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [isRefresh, setIsRefresh] = useState(false)
  

  
  // Refresh the presetsList
  const Refresh = () => {
    if(isRefresh){
      setIsRefresh(false)
    } else {
      setIsRefresh(true)
    }
  }

  // Authenticating and fetching the user information with the backend api
  const [presetList, isLoading, error] = useHttp(`/preset/ListPresets/${props.researcherId}`, [isRefresh]);
  // Loading while fetching the information
  let content = <Loader message="Loading.."/>
  
  // If user is authenticated and the correct profile is fetched
  if (!isLoading && presetList) {
    content = <PresetList refreshPreset={Refresh} presetList={presetList} researcherId={props.researcherId} />
  } else if (!isLoading && !presetList) {
    content = <h1>NO PRESET FOUND!!</h1>;
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
                <h2 className={classes.cardTitleWhite}>Preset List</h2>
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
                <PresetForm isEdit={false} refreshPreset={Refresh} researcherId={props.researcherId}/>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            {content}
            {/* <PresetList /> */}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default PresetController