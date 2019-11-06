/* * * * * * * * * 
 * Authored by Mayank Sharma <mayanks1@student.unimelb.edu.au>
 * Modified by
 *
 * This file is used to build the initial database setup.
 * Please do not touch it unless authorised.
 * Please report any bugs to the about email address if found.
 * If modifications are made please fill the modified by row.
 * 
 */

const mysql = require('mysql');

function connectionDatabase() {
    const db = mysql.createConnection({
        host : 'mysql',
        port: '3306',
        user: "root",
        password: "Stimuli@12345"
    })

    // const db = mysql.createConnection({
    //     user: "root",
    //     password: "123454321"
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
