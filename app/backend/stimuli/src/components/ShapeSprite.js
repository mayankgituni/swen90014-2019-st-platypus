/**************************************************************************
 * Author: Mayank Tomar
 * This component manages the shapes sprite object on the react-konva
 * library.
 *************************************************************************/
import React, {useState, useEffect} from 'react';
import {Layer, Image, Group, Rect, Text} from 'react-konva';

const ShapeSprite = (props) => {

  // Init all the hooks state variable for the shapeSprite
  const [bColor, setColor] = useState("");
  const [clicks, setClicks] = useState(0);
  const [shapeInfo, setImageInfo] = useState({});
  const [spriteImg, setSpriteImg] = useState(null);
  
  // Count all the touches on the shape
  const handleTouch = () => {
    setClicks(clicks+1);

    if(bColor == ''){
      setColor('black');
    } else {
      setColor('');
    }
  }

  // Aggregate results
  const SetResults = () => {
    // console.log("Posting results..")

    // When the shape is selected.
    if((bColor == 'black') && (clicks > 0)){

      if(shapeInfo.type == 'TARGET'){
        props.setResults(prevState => {
          return {
            ...prevState,
            tPos: prevState.tPos + 1
          }
        })
      } else {
        props.setResults(prevState => {
          return {
            ...prevState,
            fNeg: prevState.fNeg + 1
          }
        })
      }

    } else{
      if(shapeInfo.type == 'TARGET'){
        props.setResults(prevState => {
          return {
            ...prevState,
            fPos: prevState.fPos + 1
          }
        })
      } else {
        props.setResults(prevState => {
          return {
            ...prevState,
            tNeg: prevState.tNeg + 1
          }
        })
      }
    }
  }

  const LoadShapeData = () => {
    // Setting up the Shape information
    const shapeInfo = {
      "x": props.imageInfo.x,
      "y": props.imageInfo.y ,
      "width": props.imageInfo.width,
      "height": props.imageInfo.height,
      "type": props.imageInfo.type
    }
  
    setImageInfo(shapeInfo);
    setColor('');
    setClicks(0);
  }


  // To render the image one time when it loads.
  useEffect(() => {
    
    if(props.postResults){
      SetResults();
    } else{
      // Wont run in the first iteration; only after the level is over.
      const img = new window.Image();
      img.src = require("../assets/stimulus/"+ props.imageInfo.imgSrc)

      img.onload = () => {
        setSpriteImg(img)
        LoadShapeData();
      }
    }
    
    return () => {
      console.log('Unmounting ShapeSprite: ' + shapeInfo.type)
    }
  }, [props.shapeMatrix, props.postResults])
  
  
  let content = (
    <Group>
    <Text
      // text={shapeInfo.type}
      x={shapeInfo.x}
      y={shapeInfo.y}
      width={shapeInfo.width} 
      height={shapeInfo.height}
    />
      
      <Image
        image={spriteImg}
        stroke={bColor}
        x={shapeInfo.x}
        y={shapeInfo.y}
        width={shapeInfo.width} 
        height={shapeInfo.height}
        // onTap={handleTouch}
        onClick={handleTouch}
      />

    </Group>
  );
  
  return content;
}

export default ShapeSprite;