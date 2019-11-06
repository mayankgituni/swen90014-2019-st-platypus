/**************************************************************************
 * Author: Mayank Tomar
 * This component manages publishing of the preset so everyone can see it.
 *************************************************************************/
import React from 'react'
import LiveTvIcon from '@material-ui/icons/LiveTv';

const PublishedTest = (props) => {
  let content;
  // Show is the preset is publically published
  if(props.isPublished){
    content = <LiveTvIcon color="secondary" style={{ fontSize: 30 }} />
  }else{
    content = <LiveTvIcon color="info" style={{ fontSize: 30 }} />
  }

  return content;
}


export default PublishedTest