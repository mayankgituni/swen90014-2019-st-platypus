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

router.get('/user/DeletePatient/?:PractitionerId/?:PatientId', function (req, res) {    
    var practitioner_id = req.param('PractitionerId');
    var patient_id = req.param('PatientId');
    console.log(practitioner_id);
    console.log(patient_id);
    console.log("The put body is: ");
    var sql = `DELETE FROM patient WHERE patient_id = "${patient_id}" AND practitioner_id = "${practitioner_id}"`;

    db.query(sql, (err, result) => {
        if (err) {
            res.redirect('/ErrorPage')
        }
        console.log(result);
    });
    res.sendStatus(200).end();
});

module.exports = router;
