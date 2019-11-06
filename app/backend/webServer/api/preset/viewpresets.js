const express = require('express');
const router = express.Router();
const db = require('../../../database/connection/connection.js');

router.get('/preset/ListPresets/?:userId', (req,res) => {
    var user_id = req.param('userId');
    console.log(user_id);
    console.log("user: " + user_id);
    var sql = `SELECT * FROM preset WHERE user_id = "${user_id}"`;

    db.query(sql, (err, result) => {
        if(err) {
            res.redirect('/ErrorPage')
        }
        console.log('All the user get')
        if(result.length == 0){
            res.redirect('/ErrorPage')
        } else {
            res.send(result).end();
        }
    })
});

module.exports = router;