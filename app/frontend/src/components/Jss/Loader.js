/**************************************************************************
 * Author: Mayank Tomar
 * This component is a loader that is render when any request requires waiting.
 *************************************************************************/
import React from 'react'
import {BallBeat} from 'react-pure-loaders';

// Loader to show the items loading
const Loader = (props) => {
  return (
    <main>
      <div
        style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <BallBeat color={'#124059'} loading="true"/>
      </div>
      <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '55%',
        transform: 'translate(-50%, -50%)'
      }}>
        <h2>
          {props.message}
        </h2>
      </div>
    </main>
  )
}

export default Loader