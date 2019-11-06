/* * * * * * * * * 
 * Authored by Mayank Sharma <mayanks1@student.unimelb.edu.au>
 * Modified by
 *
 * This router is used to handle login requests.
 * Please do not touch it unless authorised.
 * Please report any bugs to the about email address if found.
 * If modifications are made please fill the modified by row.
 * 
 */

const express = require('express');
const router = express.Router();
const db = require('../../../database/connection/connection.js');

router.put('/user/EditPatient/?:PractitionerId/?:PatientId', function (req, res) {    
    console.log("get request to add new patient profiles");
    var name = req.body.name;
    var email = req.body.email;
    var gender = req.body.gender;
    var age = req.body.age;
    var next_appointment_time = req.body.nextAppointmentTime;
    var practitioner_id = req.param('PractitionerId');
    var patient_id = req.param('PatientId');
    console.log(practitioner_id);
    console.log(patient_id);
    console.log("The put body is: ");
    let sql = "UPDATE patient SET name = ?, email = ?, gender = ?, age = ?, next_appointment_time = ? WHERE practitioner_id = ? AND patient_id = ?";

    let values = [name, email, gender, age, next_appointment_time, practitioner_id, patient_id];

    db.query(sql, values, (err, result) => {
        if (err) {
            res.redirect('/ErrorPage')
        }
        console.log(result);
    });
    res.sendStatus(200).end();
});

module.exports = router;