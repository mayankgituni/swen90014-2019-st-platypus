import React, {useState} from 'react';
import './App.css';
import LevelController from './components/LevelController'
import Input from './components/input.json'

function App() {
  const [trialCount, setTrialCount] = useState(Input.testInfo.TRIAL)
  const [totalResult, setTotalResult] = useState([])

  // Catagorize shapes and make a list of shapes
  let shapesPool = {
    target:[],
    far:[],
    near:[]
  }
  
  Input.shapesInfo.map((shape) => {
    
    if(shape.type == 'TARGET'){
      shapesPool.target.push(shape)
    }
    else if(shape.type == 'FAR'){
      shapesPool.far.push(shape)  
    }
    else if(shape.type == 'NEAR'){
      shapesPool.near.push(shape)
    }
  }) 

  let content = <h1>Done Tests..</h1>;

  if(trialCount > 0){
    console.log("Input:")
    console.log(trialCount)
    content = (
      <div style={{padding:'10px', background:'white'}}>
        <LevelController 
          PRESET_ARG={Input} 
          shapesPool={shapesPool} 
          setTotalResult={setTotalResult}
          setTrialCount={setTrialCount}
          trialCount={trialCount}
        />
      </div>
    );
  } else {
    content = (
      <h1>Test Results uploaded</h1>
    )
    fetch('/WebApp/1', {
      method: 'POST',
      body: JSON.stringify([totalResult])
    })
    console.log("TOTAL RESULT: ")

    console.log(totalResult)
  }

  return content;
}
  
export default App;