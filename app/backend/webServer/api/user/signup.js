/* * * * * * * * * 
 * Authored by Mayank Sharma <mayanks1@student.unimelb.edu.au>
 * Modified by
 *
 * This router is used to handle signup requests.
 * Please do not touch it unless authorised.
 * Please report any bugs to the about email address if found.
 * If modifications are made please fill the modified by row.
 * 
 */

const express = require('express');
const router = express.Router();
const db = require('../../../database/connection/connection.js');

router.post('/SignUp', function(req,res){
    var firstName=req.body.firstName;
    var lastName=req.body.lastName;
    var email=req.body.email;
    var password=req.body.password;
    var type=req.body.type;
    var institute=req.body.institute;

    var sql = "INSERT INTO user (firstName, lastName, email, password, type, institute) VALUES ?";
    var values = [
      [firstName, lastName, email, password, type, institute]
    ];
    db.query(sql, [values], function (err, result) {
      if (err) {
        res.redirect('/ErrorPage')
      }
      console.log("Number of records inserted: " + result.affectedRows);
    });
    res.redirect('/SignIn')
  });

  module.exports = router;
