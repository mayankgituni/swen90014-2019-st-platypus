/* * * * * * * * * 
 * Authored by Mayank Sharma <mayanks1@student.unimelb.edu.au>
 * Modified by
 *
 * This file is used in conjunction with server.js to establish database connections.
 * and to send any queries to the database.
 * Please do not touch it unless authorised.
 * Please report any bugs to the about email address if found.
 * If modifications are made please fill the modified by row.
 * 
 */

const mysql = require('mysql');

function connectionDatabase() {
    const db = mysql.createConnection({
        host : 'mysql',
        user: "root",
        password: "Stimuli@12345",
        port: '3306',
        database: "stimuli_db"
    })


    // const db = mysql.createConnection({
    //     user: "root",
    //     password: "123454321",
    //     database: "stimuli_db"
    // })
      
    db.connect((err) => {
        if(err){
            throw err;
        }
        console.log("MySql connected...")
    });
    return db;
}

module.exports = connectionDatabase();
