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

router.put('/EditProfile', function (req, res) {
    var firstName=req.body.firstName;
    var lastName=req.body.lastName;
    var email=req.body.email;
    var description=req.body.description;
    var password=req.body.password;
    var institute=req.body.institute;
    var type=req.body.type;
    var age=req.body.age;

    console.log("The put body is: ")
    console.log(firstName + " " + lastName + " " + email + " " + description + " " + password + " " + institute + " " + type + " " + age);
    let sql = "UPDATE user SET firstName = ?, lastName = ?, description = ?, password = ?, institute = ?, type = ?, age = ? WHERE email = ?";

    let values = [firstName, lastName, description, password, institute, type, age, email];
        
    db.query(sql, values, (err, result) => {
        if (err) {
            res.redirect('/ErrorPage')
        }
        console.log(result);
        console.log("Number of records inserted: " + result.affectedRows);
    });
    res.sendStatus(200).end();
});

module.exports = router;