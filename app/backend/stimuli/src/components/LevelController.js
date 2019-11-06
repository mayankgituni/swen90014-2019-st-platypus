/**************************************************************************
 * Author: Mayank Tomar
 * This component is the controller of the levels.
 *************************************************************************/
import React, {useState} from 'react';
import { useStopwatch } from 'react-timer-hook';
import Levels from './Levels';
import TutorialPage from './TutorialPage';

const InitResults = {
  userID:1,
  trial: 0,
  clicks: 0, // total click
  tPos: 0,   // correct target selection
  fPos: 0,   // target not selected
  fNeg: 0,   // correct distractor selection
  tNeg: 0,   // distractor not selected
  cfNeg: 0,  // un-selecting distractor
  ctPos: 0,  // un-selecting target
  wrong_dir: false,
  last_x: -1,
  last_y: -1
}

const LevelController = (props) => {
  
  // Init
  const [results, setResults] = useState(InitResults)
  const [levelCount, setLevelCount] = useState(props.PRESET_ARG.testInfo.LEVEL)
  const [postResults, setPostResults] = useState(false);
  const { seconds, minutes, hours, days, start, pause, reset
  } = useStopwatch({ autoStart: false });
  const [testOver, setTestOver] = useState(false);
  const [testType, setTestType] = useState('Running');
  

  // Maybe we will do it
  const UpdateResults = () => {
    if(!postResults){
      setPostResults(true)
    }
  }

  const tutorialTest = () => {
    setTestType('Tutorial')
  }

  const exitTest = () => {
    console.log("Exiting...")
    props.setTotalResult(oldResult => 
        [...oldResult, results]
      );
      
      props.setTrialCount(0);
    }
    
  const takeTest = () => {
    console.log("TakeTest...")
    props.setTotalResult(oldResult => 
      [...oldResult, results]
    );

    props.setTrialCount(oldCount => 
        oldCount - 1
    );

    setTestOver(false);
    setTestType('Running');
    if(props.PRESET_ARG.testInfo.IS_TIMED){
    }
    start()
  }
  let content = (<h1> No Test Available </h1>);
  
  if(props.PRESET_ARG.testInfo.IS_TIMED){
    // Start the timer
  }
  
  start()
  // Checking for new level load parameters and exiting at the right time.
  if(levelCount > 0) {
    if(props.PRESET_ARG.testInfo.IS_TIMED){
      // Posting the results
      if(seconds == (props.PRESET_ARG.testInfo.TIMEOUT + props.PRESET_ARG.testInfo.TRANSITION_DURATION +1)){
        setPostResults(false)
        setLevelCount(levelCount-1);
        reset();
        
      }else if(seconds == props.PRESET_ARG.testInfo.TIMEOUT){
        UpdateResults();
      }
    } else{
      if(seconds == 1){
        reset()
      }
    }
  } else {
    pause();
    setTestOver(true);
    setTestType('Over');
    setLevelCount(props.PRESET_ARG.testInfo.LEVEL);
    
    console.log("Final results: ")
    console.log(results)
  }

  // Get the content if the test is not over.
  if(testType == "Running"){
    if(seconds >= props.PRESET_ARG.testInfo.TIMEOUT){
      content = (
        <h2>Loading nextLevel...
            {props.PRESET_ARG.testInfo.TIMEOUT + props.PRESET_ARG.testInfo.TRANSITION_DURATION-seconds+1}
        </h2>
      )
    } else{
      content = (
        <Levels
          levelCount={levelCount}
          postResults={postResults}
          setResults={setResults}
          PRESET_ARG={props.PRESET_ARG}
          shapesPool={props.shapesPool}
          setLevelCount={setLevelCount}
          reset={reset}
          UpdateResults={UpdateResults}
          setPostResults={setPostResults}
        />
      )
    }
  } else if(testType == 'Over'){
    content = (
      <div>
        <h2> Test Over! </h2>
        <h3>Test trials Remaining: {props.trialCount-1}</h3>
        <button onClick={takeTest}>
          Retake Test!
        </button>
  
        <button onClick={exitTest}>
          Exit
        </button>

        <button onClick={tutorialTest}>
          Tutorial + Test
        </button>
      </div>
    )
  } else if(testType == 'Tutorial'){
    content = (
      <TutorialPage takeTest={takeTest} />
    )
  }
  
  return content;
}

export default LevelController;