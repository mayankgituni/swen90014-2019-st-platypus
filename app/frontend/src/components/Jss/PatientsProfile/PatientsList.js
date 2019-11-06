/**************************************************************************
 * Author: Mayank Tomar
 * This component manages the list of the patient on the patients profile page.
 *************************************************************************/
import React from "react";
// @material-ui/core components
import Table from "../../MaterialUi/Jss/Table.js";
import PatientButtons from './PatientButtons';

export default function PatientsList(props) {

  // Making the list to display
  let tableContent = [];
  let pList = props.patientsList;
  for(let i = 0; i < pList.length; i++){
    let buttonArray = (
      <PatientButtons
        refreshPatients={props.refreshPatients} 
        patientInfo={pList[i]} 
        practitionerId={props.practitionerId}
      />
    )
    tableContent.push([pList[i].name, pList[i].email, pList[i].age, buttonArray])
  }
  
  return (
    <Table
      tableHeaderColor="primary"
      tableHead={[
      "Name",
      "Email",
      "Age",
      ""
    ]}
      tableData={tableContent}/>
  );
}