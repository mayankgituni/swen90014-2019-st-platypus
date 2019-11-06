// Not yet completed

const express = require('express');
const router = express.Router();
const db = require('../../../database/connection/connection.js');

router.put('/test/EditTest', (req, res) => {
    var today = new Date();
	var todaydate = today.getFullYear() +'-'+ (today.getMonth()+1) +'-'+ today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = todaydate +' '+ time;
    var test_id = req.body.test_id;
    var name = req.body.name;
    var description = req.body.description;
    var last_updated = dateTime.toString();
    
    console.log(test_id + " " + name + " " + description + " " + last_updated);

    console.log(test_id);
    var sql = `UPDATE test SET name = ?, description = ?, last_updated = ? WHERE test_id = ?`;
    var values = [name, description, last_updated, test_id];

    db.query(sql, values, function (err, result) {
        if (err) {
            res.redirect('/ErrorPage')
        }
        console.log(result);
        console.log("Number of records inserted: " + result.affectedRows);
    });
    res.sendStatus(200).end();    
});

module.exports = router;