const express = require('express');
const router = express.Router();
const db = require('../../../database/connection/connection.js');

router.get('/user/ListPatients/?:practitionerId', (req,res) => {
    var practitioner_id = req.param('practitionerId');
    console.log(practitioner_id);
    console.log("practitioner: " + practitioner_id);
    let sql = `SELECT * FROM patient WHERE practitioner_id = "${practitioner_id}"`;

    db.query(sql, (err, result) => {
        if(err) {
            res.redirect('/ErrorPage')
        }
        console.log('All the user get')
        if(result.length == 0){
            res.redirect('/ErrorPage')
        } else{
            res.send(result).end();
        }
    })
});

module.exports = router;