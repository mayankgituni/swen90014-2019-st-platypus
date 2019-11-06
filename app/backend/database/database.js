/* * * * * * * * * 
 * Authored by Mayank Sharma <mayanks1@student.unimelb.edu.au>
 * Modified by
 *
 * This file is the database script that needs to be run the first time to create a database.
 * Please do not touch it unless authorised.
 * Please report any bugs to the about email address if found.
 * If modifications are made please fill the modified by row.
 * 
 * NOTE: PLEASE DO NOT TOUCH THE ORDER OF THE DATABASE QUERY. 
 * 
 */

const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = require('../database/connection/dbbuildconnection.js');
const DATABASEDROPDB = `DROP DATABASE IF EXISTS stimuli_db`;
const DATABASECREATEDB = `CREATE DATABASE stimuli_db`;
const DATABASEUSEDB = `USE stimuli_db`;
const CREATEUSERTABLE = `CREATE TABLE user(user_id INT AUTO_INCREMENT, firstName VARCHAR(200), lastName VARCHAR(200) ,email NVARCHAR(320), description VARCHAR(500) ,account VARCHAR(35) UNIQUE, password VARCHAR(100), institute VARCHAR(255), type ENUM('PRACTITIONER', 'RESEARCHER'), age INT, PRIMARY KEY (user_id))`;
const CREATEPATIENTTABLE = `CREATE TABLE patient(practitioner_id INT, patient_id INT AUTO_INCREMENT UNIQUE, name VARCHAR(200), email NVARCHAR(320) UNIQUE, gender ENUM('male', 'female', 'other'), age INT, next_appointment_time VARCHAR(30), PRIMARY KEY (patient_id, practitioner_id), FOREIGN KEY (practitioner_id) REFERENCES user(user_id))`;
const CREATEADMINTABLE = `CREATE TABLE admin(admin_id INT, name VARCHAR(64), email NVARCHAR(320), account VARCHAR(35) UNIQUE, password VARCHAR(100), PRIMARY KEY (admin_id))`;
const CREATEPRESETTABLE = `CREATE TABLE preset(user_id INT, preset_id INT AUTO_INCREMENT UNIQUE, name VARCHAR(50), description VARCHAR(500), dynamic_attributes VARCHAR(320), privacy BOOLEAN, timed BOOLEAN, countdown_times INT, rows INT, nodes_per_row INT, number_of_targets INT, percentage_of_targets DECIMAL(5,2), number_of_trails INT, date VARCHAR(30), single_shape_on_screen BOOLEAN, percentage_of_near_distractor_shapes DECIMAL(5,2), percentage_of_far_distractor_shapes DECIMAL(5,2), PRIMARY KEY (preset_id, user_id), FOREIGN KEY (user_id) REFERENCES user(user_id))`;
const CREATETESTTABLE = `CREATE TABLE test(test_id VARCHAR(300), user_id INT, name VARCHAR(50), description VARCHAR(500), preset_id INT, url_link VARCHAR(200), generate_time VARCHAR(30), last_updated VARCHAR(30), PRIMARY KEY (test_id, preset_id, user_id), FOREIGN KEY (user_id) REFERENCES user(user_id), FOREIGN KEY (preset_id) REFERENCES preset(preset_id))`;
const CREATERESULTTABLE = `CREATE TABLE result(result_id INT, test_id VARCHAR(300), shapes_touched INT, accuracy DECIMAL(5,2), response_time INT, processing_errors INT, correcting_errors INT, comments VARCHAR(200), PRIMARY KEY (result_id), FOREIGN KEY (test_id) REFERENCES test(test_id))`;
const OUTPUTSTRING = 'done..';

dbQuery(DATABASEDROPDB, db, OUTPUTSTRING);
dbQuery(DATABASECREATEDB, db, OUTPUTSTRING);
dbQuery(DATABASEUSEDB, db, OUTPUTSTRING);
dbQuery(CREATEUSERTABLE, db, OUTPUTSTRING);
dbQuery(CREATEPATIENTTABLE, db, OUTPUTSTRING);
dbQuery(CREATEADMINTABLE, db, OUTPUTSTRING);
dbQuery(CREATEPRESETTABLE, db, OUTPUTSTRING);
dbQuery(CREATETESTTABLE, db, OUTPUTSTRING);
dbQuery(CREATERESULTTABLE, db, OUTPUTSTRING);

db.end();

    // Update
    //router.get('/updateage/:id/:age', (req,res) => {
    //    let sql = `UPDATE user SET age = ${req.params.age} WHERE id = ${req.params.id}`;
    //    let query = db.query(sql, (err, result) => {
    //        if(err) throw err;
    //        console.log('User updated..')
    //        res.send(result)
    //    })
    //})

    // Delete
    //router.get('/deleteuser/:id', (req,res) => {
    //    let sql = `DELETE FROM user WHERE id = ${req.params.id}`;
    //    let query = db.query(sql, (err, result) => {
    //        if(err) throw err;
    //        console.log('User Deleted..')
    //        res.send(result)
    //    })
    //})

function dbQuery(sql, db, str) {
    db.query(sql, (err, result) => { 
        if(err) throw err;
        console.log(result)
        console.log(OUTPUTSTRING)
        //res.send(str)
    })
}

code = 0;
process.on('exit', function(code) {
    return console.log(`About to exit with code ${code}`);
});
    //module.exports = router;
