/**************************************************************************
 * Author: Mayank Tomar
 * This component manages the matrix calculations of the level and create the 
 * level usuing the parameters.
 *************************************************************************/
import React, {useState, useEffect} from 'react';
import ShapeGrid from './ShapeGrid';
import { checkPropTypes } from 'prop-types';

const genRandom = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const shuffleList = (arra1) => {
  var ctr = arra1.length, temp, index;

// While there are elements in the array
  while (ctr > 0) {
// Pick a random index
      index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
      ctr--;
// And swap the last element with it
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
  }
  return arra1;
}

const generateShapesList = (testInfo, shapesPool) => {
  // Initilize the shape variables
  let nTarget = testInfo.TARGET;
  let nFar = testInfo.FAR;
  let nNear = testInfo.NEAR;
  // Get the list of Target from the list
  let shapeArr = []
  
  // Get the targets, near and far shapes from the shapespool and make list of shapes that will be used
  for(let i = 0; i < testInfo.ROW; i++){
    
    let nextPos = 0;
    for(let j = 0; j < testInfo.FRAME_WIDTH*4; j += nextPos){
      
      let shape = null;
      if(nTarget > 0){
        shape = JSON.parse(JSON.stringify(shapesPool.target[genRandom(shapesPool.target.length)]))
        nTarget -= 1;
      }else if(nNear > 0){
        shape = JSON.parse(JSON.stringify(shapesPool.near[genRandom(shapesPool.near.length)]))
        nNear -= 1;
      } else if(nFar > 0){
        shape = JSON.parse(JSON.stringify(shapesPool.far[genRandom(shapesPool.far.length)]))
        nFar -= 1;
      }else if (nFar == 0){
        break;
      }

      if(shape != null){
        nextPos += testInfo.SPACE_SHAPES + shape.width;
        if(nextPos < testInfo.FRAME_WIDTH){
          shapeArr.push(shape);
        }
      }
    }
  }

  // Return shuffled list
  return (shuffleList(shapeArr));
}

const Levels = (props) => {
  // Calculating the size of the stage.
  const [shapeMatrix, setShapeMatrix] = useState([])
  const stageWidth = props.PRESET_ARG.testInfo.FRAME_WIDTH;
  const stageHeight = props.PRESET_ARG.testInfo.ROW * props.PRESET_ARG.testInfo.SHAPE_HEIGHT;

  // Update everytime the levelChanges
  useEffect(() => {
    console.log("\n*********************************************");
    console.log("Current Level: " + props.levelCount);

    if(!props.postResults){
      loadNextLevel();
    }
    
    return () => {
      // console.log('Unmounting Levels')
    }
  }, [props.levelCount, props.postResults])

  const gotoNextLevel = () =>{

    props.UpdateResults();
    props.setLevelCount(oldLeveles => 
      oldLeveles - 1  
    );

    props.reset()

    props.setPostResults(false);
  }

  // Load the next level and create a shapes matrix.
  const loadNextLevel = () => {
    
    const testInfo = props.PRESET_ARG.testInfo;
    let screenMatrix = [];

    // Generate shapes list with all with preset requirements.
    let shapeList = generateShapesList(testInfo, props.shapesPool)
    
    let index = 0;
    // Make a shapes matrix by calculating the xPos, yPos positions for the given level.
    for(let i = 0; i < testInfo.ROW; i++){

      let row = [];
      let nextPos = 0;
      for(let j = 0; j < testInfo.FRAME_WIDTH*4; j += nextPos) {
        
        if(index < shapeList.length) {

          nextPos += testInfo.SPACE_SHAPES + shapeList[index].width;
          // Get the next shape in the shuffeled array
          if(nextPos < testInfo.FRAME_WIDTH) {
            let shape = JSON.parse(JSON.stringify(shapeList[index++]));
            shape.xPos = nextPos - (testInfo.SPACE_SHAPES + shape.width);
            shape.yPos = i * props.PRESET_ARG.testInfo.SHAPE_HEIGHT;
            row.push(shape);
          }
        } else {
          nextPos = testInfo.FRAME_WIDTH;
          // If FillEveything=true
          // Create a shape
          // Calc nextPos
          // Check it can fit? then add it

        }
      }

      screenMatrix.push(row)
    }
    
    // Update the hook state of shapeMatrix
    setShapeMatrix(screenMatrix);
  }
  
  let content = (
    <div
      style={{
        background:props.PRESET_ARG.testInfo.BACKGROUND,
        padding: props.PRESET_ARG.testInfo.PADDING + 'px'
      }}
    >
    <div>
      <h2>Levels: {props.PRESET_ARG.testInfo.LEVEL-props.levelCount +1 }
      {
        !props.PRESET_ARG.testInfo.IS_TIMED &&  
        (<button onClick={gotoNextLevel}>Next >></button>)
      }
      </h2>
      
    </div>
      {
        (shapeMatrix.length > 0)? (
          <ShapeGrid 
            levelCount={props.levelCount}
            setResults={props.setResults}
            timeout={props.PRESET_ARG.testInfo.TIMEOUT}
            levels={props.PRESET_ARG.testInfo.LEVEL}
            shapeMatrix={shapeMatrix}
            shapeHeight={props.PRESET_ARG.testInfo.SHAPE_HEIGHT}
            stageWidth={stageWidth}
            stageHeight={stageHeight}
            border={props.PRESET_ARG.testInfo.BORDER}
            postResults={props.postResults}
          />
        ) : (<h2>Loading..</h2>)
      }
    </div>
  );

  return content;
}

export default Levels;