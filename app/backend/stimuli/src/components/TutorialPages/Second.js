/**************************************************************************
 * Author: Mayank Tomar
 * This component manages the second page of the tutorial.
 *************************************************************************/
import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper'
import pic from '../../assets/media/p2_char.png'
import eg1 from '../../assets/media/eg1.png'
import selected from '../../assets/media/selected.png'
import unselected from '../../assets/media/unselected.png'

import { useStopwatch } from 'react-timer-hook';

const Second = (props) => {
  const { seconds, start, reset
  } = useStopwatch({ autoStart: true });
  
  let content = (
    <h2>You will be asked to select the targets which will help Bilby’s rocket.</h2>
  );
  let i = 4;
  if(seconds == i*1){
    content = (<div>
      <h2>
        Whenever you see these PowerPacks, tap them to collect.<br/>
        If you’ve collected a PowerPack, it will be selected.
      </h2>
      <br/>
      <img src={unselected} alt="loading..." />
    </div>)

  } else if(seconds == i*2){
    content = (<div>
      <h2>
        Just like this.
      </h2>
      <br/>
      <img src={selected} alt="loading..." />
    </div>)
  } else if(seconds == i*3){
    content = (<div>
      <h2>
        Once you have selected all the PowerPacks.
      </h2>
      <br/>
      <img src={eg1} alt="loading..." />
    </div>)

  } else if(seconds == i*4){
    reset();
    props.nextPage();
  }

  return (
    <div 
    style={{
      padding: '10px',
      textAlign: 'center'
    }}>
      <Paper>
        <img src={pic} alt="loading..." />
      </Paper>
      <Paper>
        {content}
      </Paper>
    </div>
  )
}

export default Second;