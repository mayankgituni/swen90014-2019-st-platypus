const express = require('express');
const db = require('../../../database/connection/connection.js');
const crypto = require('crypto');
const router = express.Router();

router.post('/test/AddTest/?:userId/?:presetId', (req, res) => {
    var today = new Date();
	var todaydate = today.getFullYear() +'-'+ (today.getMonth()+1) +'-'+ today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = todaydate +' '+ time;
    var preset_id = req.param('presetId');
    var user_id = req.param('userId');
    var md5 = crypto.createHash('md5');
    var date = todaydate.toString();
    var message = date + preset_id + user_id;
    var test_id = md5.update(message, 'utf8').digest('base64');
    var name = req.body.name;
    var description = req.body.description;
    var url_link = "webApp/" + test_id;
    var generate_time = time.toString();
    var last_updated = dateTime.toString();
    
    var sql = `INSERT INTO test (test_id, user_id, name, description, preset_id, url_link, generate_time, last_updated) VALUES ?`;
    var values = [test_id, user_id, name, description, preset_id, url_link, generate_time, last_updated]
    console.log("The values are : ")
    console.log(values)

    db.query(sql, values, (err, result) => {
        if (err) {
            res.redirect('/ErrorPage')
        }    
        console.log(result);
        console.log("Number of records inserted: " + result);
        res.send(url_link);
    })
});

module.exports = router;