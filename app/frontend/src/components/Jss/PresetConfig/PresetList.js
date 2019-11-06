/**************************************************************************
 * Author: Mayank Tomar
 * This component manages the list of presets shown on the page.
 *************************************************************************/
import React from "react";
import Table from "../../MaterialUi/Jss/Table.js";
import PresetButtons from './PresetButtons';
import PublishedTest from './PublishedTest'

const PresetList = (props) => {
  
  let tableContent = [];
  let pList = props.presetList;
  
  // List of presets
  for(let i = 0; i < pList.length; i++){
    const buttonArray = (
      <PresetButtons
        refreshPreset={props.refreshPreset} 
        presetInfo={pList[i]}
        researcherId={props.researcherId}
        />
    )

    let publish = <PublishedTest isPublished={false} />
    if(pList[i].privacy != 0){
      publish = <PublishedTest isPublished={true} />
    }
    tableContent.push([pList[i].name, pList[i].description, publish, buttonArray])
  }
  
  return (
    <Table
      tableHeaderColor="primary"
      tableHead={[
      "Name",
      "Subject",
      "IsPublished",
      ""
    ]}
    tableData={tableContent}/>
  );
}

export default PresetList