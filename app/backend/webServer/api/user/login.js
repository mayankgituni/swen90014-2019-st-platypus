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

router.get('/login', (req,res) => {
  var email = req.param('email');
  var password = req.param('password');
  console.log("Email: " + email + " and password: " + password);
  let sql = `SELECT * FROM user WHERE email="${email}" AND password="${password}"`;
  console.log(sql);
  
    db.query(sql, (err, result) => {
      if(err) {
        res.redirect('/ErrorPage')
      }
      console.log('All the user get')
      if(result.length == 0){
        res.redirect('/ErrorPage')
      } else{
        res.send(result).end();
      }
    })
  });

  router.get('/user/profileInfo/:email/:password', (req,res) => {
    var email = req.param('email');
    var password = req.param('password');
    console.log("Email: " + email + " and password: " + password);
    let sql = `SELECT * FROM user WHERE email="${email}" AND password="${password}"`;
    console.log(sql);
    
    db.query(sql, (err, result) => {
      if(err) {
        res.redirect('/ErrorPage')
      }
      console.log('All the user get')
      if(result.length == 0){
        res.redirect('/ErrorPage')
      } else{
        res.send(result).end();
      }
    })
  });

module.exports = router;