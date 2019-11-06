/**************************************************************************
 * Author: Mayank Tomar
 * This component manages the preset helper Buttons.
 *************************************************************************/
import React, {useState} from "react";
// @material-ui/core components
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import ExtensionIcon from '@material-ui/icons/Extension';
import 'react-splitter-layout/lib/index.css';
import PublishIcon from '@material-ui/icons/Publish';
import PresetForm from './PresetForm'
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

const PresetButtons = (props) => {

  // Handle delete preset
  const submitDelete = () => {
    const url = `/preset/DeletePreset/${props.researcherId}/${props.presetInfo.preset_id}`;

    fetch(url)
    props.refreshPreset()
  }

  const submitPreview = () => {
  }

  const submitPublish = () => {
    let url;

    if(props.presetInfo.privacy){
      url = `/preset/PublishPreset/${props.researcherId}/${props.presetInfo.preset_id}/0`;
    } else{
      url = `/preset/PublishPreset/${props.researcherId}/${props.presetInfo.preset_id}/1`;
    }
    fetch(url)
    props.refreshPreset()
  }

  const editButton = (
    <PresetForm 
      isEdit={true}
      refreshPreset={props.refreshPreset}
      researcherId={props.researcherId}
      presetInfo={props.presetInfo}
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
      onClick={submitPreview}>
      Preview Test
      <ExtensionIcon/>
    </Button>
  )

  const publishButton = (
    <Button
      variant="contained"
      size="small"
      style={{
      marginLeft: 0,
      color: 'white',
      backgroundColor: "#276691"
      }}
      onClick={submitPublish}>
      Publish
      <PublishIcon/>
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
  
  // A different format of the buttom, we can use this or the let the set ubove render.
  let content = (
 
    <Grid container justify="center" spacing={1}>
      <Grid item >
      {editButton}
      </Grid>
      <Grid item >
      {testButton}
      </Grid>
      <Grid item >
      {publishButton}
      </Grid>
      <Grid item >
      {deleteButton}
      </Grid>
    </Grid>
  )




  return content;
}

export default PresetButtons;