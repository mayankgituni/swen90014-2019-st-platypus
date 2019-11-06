const express = require('express');
const router = express.Router();
const db = require('../../../database/connection/connection.js');

router.get('/preset/PublishPreset/?:UserId/?:PresetId/?:input', (req,res) => {
    var user_id = req.param('UserId');
    var preset_id = req.param('PresetId');
    var input = req.param('input');
    console.log(user_id);
    console.log(preset_id);
    var sql = `UPDATE preset SET privacy=${input} WHERE user_id = "${user_id}" AND preset_id = "${preset_id}"`;
    // var values = [input, user_id, preset_id];
    db.query(sql, (err, result) => {
        if (err) {
          res.redirect('/ErrorPage')
    }
    console.log(result);
        
    });
    res.sendStatus(200).end();
});

module.exports = router;