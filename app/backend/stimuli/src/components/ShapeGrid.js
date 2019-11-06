/**************************************************************************
 * Author: Mayank Tomar
 * This component manages the shapes grid on the react-konva component
 *************************************************************************/
import React, {useState, useEffect} from 'react'
import {Layer, Stage, Group, Rect, Shape} from 'react-konva';
import ShapeSprite from './ShapeSprite';

const ShapeGrid = (props) => {

  const [node, setnode] = useState(null);
  const [shapeMatrix, setShapeMatrix] = useState(null);
   
  
  // Count all the taps
  const totalClick = () => {
    props.setResults(prevState => {
      return {
        ...prevState, 
        clicks: prevState.clicks + 1
      }
    })
  }

  
  useEffect(() => {
    // Clearing the stage
    if(node != null){
      node.clear();
    }
    
    if(!props.postResults){
      setShapeMatrix(props.shapeMatrix)
    }

    return () => {
      // console.log("Unmounting Shapes Grid")
    }
  },[props.shapeMatrix, props.postResults])

 

  let content = (
    <Stage
        ref={node => {
          setnode(node);
        }}
        width={props.stageWidth}
        height={props.stageHeight} 
        onTap={totalClick}
        style={{
          border: props.border + 'px solid black',
          width: props.stageWidth+'px',
          height: props.stageHeight+'px'
        }}
      >
      <Layer>
        <Group>
          {
            shapeMatrix && shapeMatrix.map((shapRow)=>{
              return (
                shapRow.map((shape)=>{
                  return(
                    <ShapeSprite
                      levelCount={props.levelCount}
                      setResults={props.setResults}
                      results={props.results}
                      timeout={props.timeout}
                      levels={props.levels}
                      postResults={props.postResults}
                      shapeMatrix={shapeMatrix}
                      imageInfo={{
                        imgSrc: shape.file,
                        x:shape.xPos,
                        y:shape.yPos,
                        width:shape.width,
                        height:props.shapeHeight,
                        type: shape.type
                      }}
                    />
                  )
                })
              )
            })
          }
        </Group>
      </Layer>
    </Stage>
  )

  return content;
}

export default ShapeGrid