/**************************************************************************
 * Author: Mayank Tomar
 * This component manages the test Buttons in test sections.
 *************************************************************************/
import React, {useState} from "react";
// @material-ui/core components
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import ExtensionIcon from '@material-ui/icons/Extension';
import 'react-splitter-layout/lib/index.css';
import PublishIcon from '@material-ui/icons/Publish';
import TestForm from './TestForm'
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

const TestButtons = (props) => {
  
  const submitDelete = () => {
    const url = `/test/DeleteTest`;
    let content = {"test_id":props.testInfo.test_id}

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(content),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    props.refreshTest()
  }

  const submitTest = () => {
    console.log("SubmitTest:")
  }

  const editButton = (
    <TestForm 
      isEdit={true}
      refreshTest={props.refreshTest}
      userId={props.userId}
      testInfo={props.testInfo}
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
      onClick={submitTest}>
      Send Test
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

  let content = (
    <Grid container justify="center" spacing={2}>
      <Grid item >
      {editButton}
      </Grid>
      <Grid item >
      {testButton}
      </Grid>
      <Grid item >
      {deleteButton}
      </Grid>
    </Grid>
  )

  return content;
}

export default TestButtons;