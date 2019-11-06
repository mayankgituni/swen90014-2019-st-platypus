const express = require('express');
const router = express.Router();
const db = require('../../../database/connection/connection.js');

router.get('/preset/DeletePreset/?:UserId/?:PresetId', (req,res) => {
    var user_id = req.param('UserId');
    var preset_id = req.param('PresetId');
    console.log(user_id);
    console.log(preset_id);
    var sql = `DELETE FROM preset WHERE user_id = "${user_id}" AND preset_id = "${preset_id}"`;

    db.query(sql, (err, result) => {
        if (err) {
          res.redirect('/ErrorPage')
    }
    console.log(result);
        
    });
    res.sendStatus(200).end();
});

module.exports = router;