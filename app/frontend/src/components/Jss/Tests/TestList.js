/**************************************************************************
 * Author: Mayank Tomar
 * This component manages the list of test on the webpage
 *************************************************************************/
import React from "react";
import Table from "../../MaterialUi/Jss/Table.js";
import TestButtons from './TestButtons';

const TestList = (props) => {
  
  let tableContent = [];
  let pList = props.testList;
  // List of Tests
  for(let i = 0; i < pList.length; i++){
    const buttonArray = (
      <TestButtons
        refreshTest={props.refreshTest} 
        testInfo={pList[i]}
        userId={props.userId}
        />
    )

    tableContent.push([pList[i].name, pList[i].url_link, pList[i].generate_time, buttonArray])
  }
  
  return (
    <Table
      tableHeaderColor="primary"
      tableHead={[
      "Name",
      "Url_link",
      "Time",
      ""
    ]}
    tableData={tableContent}/>
  );
}

export default TestList