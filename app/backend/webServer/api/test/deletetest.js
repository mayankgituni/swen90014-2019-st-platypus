const express = require('express');
const router = express.Router();
const db = require('../../../database/connection/connection.js');

router.post('/test/DeleteTest', (req,res) => {
    var test_id = req.body.test_id;
    console.log(test_id);
    var sql =  `DELETE FROM test WHERE test_id = "${test_id}"`;
    
    db.query(sql, (err, result) => {
        if (err) {
            res.redirect('/ErrorPage')
        }
        console.log(result);
    });
    res.sendStatus(200).end();
});

module.exports = router;