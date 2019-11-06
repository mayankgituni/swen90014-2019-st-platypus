/**************************************************************************
 * Author: Mayank Tomar
 * This component manages the first page of the tutorial
 *************************************************************************/
import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper'
import pic from '../../assets/media/p1_gif.gif'
import pic2 from '../../assets/media/targets.png'
import pic3 from '../../assets/media/disctactors.png'
import { textAlign } from '@material-ui/system';

const First = (props) => {
  const [count, setCount] = useState(0);
  
  const next = () => {
    setCount(count+1)

  }

  let content
  
  if(count == 0){
    content = (
      <h2>
            Hi there!! Can you help us? <br/>
            Bilby is a space explorer.
            She wants to fly home.<br/>
            But Bilby needs PowerPacks to fuel her rocket.
            Find the PowerPacks for Bilby’s rocket!
      </h2>
    )    
  }else if(count == 1){
    content = (
      <div>
        <h3>
            In this game, you will see PowerPacks <br/>
            but Be careful! Not all PowerPacks can power Bilby’s rocket.
        </h3>
      </div>
    )
  }else if(count == 2){
    content = (
      <div>
        <h2>
            These are good PowerPacks!! Don't forget to get them. <br/>
        </h2>
        <img src={pic2} alt="loading..." />
      </div>
    )
  } else if(count == 3){
    content = (
      <div>
        <h2>
            These are dangerous PowerPacks!! DO NOT TOUCH THEM!<br/>
        </h2>
        <img src={pic3} alt="loading..." />
      </div>
    )
  }else if(count > 3) {
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
        <button onClick={next}>Next </button>
      </Paper>
    </div>
  )
}

export default First;