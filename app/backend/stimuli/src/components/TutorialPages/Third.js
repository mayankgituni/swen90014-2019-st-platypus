/**************************************************************************
 * Author: Mayank Tomar
 * This component manages the third page of the tutorial.
 *************************************************************************/
import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper'
import pic from '../../assets/media/end_gif.gif'

import { useStopwatch } from 'react-timer-hook';

const Third = (props) => {
  const { seconds, start, reset
  } = useStopwatch({ autoStart: true });
  
  let content = (
    <h2>Bilby's Rocket can Fly!! </h2>
  );
  
  
  if(seconds > 4){
    content = (
      <button onClick={props.takeTest}> Play Now!</button>
    )
  }

  return (
    <div 
    style={{
      padding: '10px',
      textAlign: 'center'
    }}>
      <Paper>
        {content}
      </Paper>
      <Paper>
        <img src={pic} alt="loading..." />
      </Paper>
    </div>
  )
}

export default Third;