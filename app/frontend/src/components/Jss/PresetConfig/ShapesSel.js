/**************************************************************************
 * Author: Mayank Tomar
 * This component is used to select shapes in the preset configurations.
 *************************************************************************/
import React, {useState} from "react";
import shapes from '../../Images/stimulus/shapes.json'
const ShapeSel = (props) => {
const [typeSel, setTypeSel] = useState(0);
const dir = "../../Images/stimulus/"

const next = () => {
  setTypeSel(typeSel+1)
}
const [refresh, setRefresh] = useState(false);
let val = "Near"
let Heading = "Select Target"


if(typeSel == 1){
  Heading = "Select Near Distractor"
  val = "Far"
  
} else if(typeSel == 2){
  Heading = "Select Far Distractor"
  
} else if(typeSel > 2){
  props.shapeSelect();
} 

const buttonHandle = (id) => {
  if(typeSel == 0){
    shapes[id-1].type = "TARGET"
  } else if(typeSel == 1){
    shapes[id-1].type = "NEAR"
  }else if(typeSel == 2){
    shapes[id-1].type = "FAR"
  }

  setRefresh(!refresh);
}

return (
  <div>
    <div>
    <h1>{Heading}</h1>
    {
      shapes.map((shape) => {
        return (
          (shape.type == 'NA') && (
            <button onClick={e=>buttonHandle(shape.id)}>
              <img src={require(dir + shape.file)} style={{
                width: 60,
                height: 50,
              }} alt="SHAPE"></img>
            </button>      
          )
        )
      })
    }
    </div>

    <div>
    <button onClick={next}> Select {val} </button>
    </div>

  </div>
)

}

export default ShapeSel