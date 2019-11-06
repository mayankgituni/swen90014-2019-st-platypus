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

router.get('/user/deleteProfile/?:userId', function (req, res) {    
    var userId = req.param('userId');
    
    console.log("The User is deleted: " + userId);
    
    var sql = `DELETE FROM user WHERE user_id = "${userId}"`;

    db.query(sql, (err, result) => {
        if (err) {
            res.redirect('/ErrorPage')
        }
        console.log(result);
    });
    res.redirect('/SignIn');
});

module.exports = router;