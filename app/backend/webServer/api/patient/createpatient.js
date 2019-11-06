const express = require('express');
const router = express.Router();
const db = require('../../../database/connection/connection.js');

//add patient
router.post('/user/AddPatient/?:PractitionerId', (req,res) => {
	console.log("get request to add new patient profiles");
 	var name = req.body.name;
 	var email = req.body.email;
 	var gender = req.body.gender;
    var age = req.body.age;
    var next_appointment_time = req.body.nextAppointmentTime;
    var practitioner_id = req.param('PractitionerId');
    console.log(practitioner_id);
    var sql = `INSERT INTO patient (practitioner_id, name, email, gender, age, next_appointment_time) VALUES ?`;     
    var values = [
        [practitioner_id, name, email, gender, age, next_appointment_time]
    ];
    db.query(sql, [values], function (err, result) {
        if(err) {
            res.redirect('/ErrorPage')
        }
        console.log("Number of records inserted: " + result.affectedRows);
    });
    res.sendStatus(200).end();
});

module.exports = router;


