/**************************************************************************
 * Author: Mayank Tomar
 * This component manages the tutorial pages
 *************************************************************************/
import React, {useState} from 'react';
import First from './TutorialPages/First'
import Second from './TutorialPages/Second'
import Third from './TutorialPages/Third'

const TutorialPage = (props) => {
  const [pageNo, setPageNo] = useState(0);
  let totalPages = 3;

  const nextPage = () => {
    if(pageNo < totalPages-1){
      setPageNo(pageNo+1)
    }
  }
  const backPage = () => {
    if(pageNo > 0){
      setPageNo(pageNo-1)
    }
  }

  let page = {};

  if(pageNo == 0){
    page = (
      <First nextPage={nextPage}/>
    )
  } else if(pageNo == 1){
    page = (
      <Second nextPage={nextPage}/>
    )
  } else if(pageNo == 2){
    page = (
      <Third takeTest={props.takeTest}/>
    )
  }
  
  let content = (
    <div>
      <div>
        <button onClick={props.takeTest}>
          Take Test!
        </button>
        <br/>
        {
          (pageNo > 0) && (<button onClick={backPage}>
           backPage
          </button>)
        }
        <button onClick={nextPage}>
        nextPage >>
        </button>
      </div>
      <hr/>
      <p>{page}</p>
    </div>
  )

  return content;
}

export default TutorialPage;