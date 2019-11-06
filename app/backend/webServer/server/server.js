/* * * * * * * * * 
 * Authored by Mayank Sharma <mayanks1@student.unimelb.edu.au>
 * Modified by 
 *
 * This file is the main node server file used to run the stimuli application.
 * Please do not touch it unless authorised.
 * Please report any bugs to the about email address if found.
 * If modifications are made please fill the modified by row.
 * 
 */

const express               =    require('express');
const morgan                =    require('morgan');
const body                  =    require('body-parser');
const signupRouter          =    require('../api/user/signup.js');
const signinRouter          =    require('../api/user/signin.js');
const loginRouter           =    require('../api/user/login.js');
const editProfileRouter     =    require('../api/user/editprofile.js');
const deleteProfileRouter   =    require('../api/user/deleteprofile.js');
const errorpage             =    require('../api/home/errorpage.js');
const createPatient         =    require('../api/patient/createpatient.js');
const listPatient           =    require('../api/patient/viewpatients.js');
const editPatient           =    require('../api/patient/editpatient.js');
const deletePatient         =    require('../api/patient/deletepatient.js');
const createPreset          =    require('../api/preset/createpreset.js');
const listPreset            =    require('../api/preset/viewpresets.js');
const editPreset            =    require('../api/preset/editpreset.js');
const deletePreset          =    require('../api/preset/deletepreset.js');
const publishPreset         =    require('../api/preset/publishpreset.js');
const createTest            =    require('../api/test/createtest.js');
const listTest              =    require('../api/test/viewtests.js');
const editTest              =    require('../api/test/edittest.js');
const deleteTest            =    require('../api/test/deletetest.js');
const webApp                =    require('../api/webapp/webapp.js');
const PORT                  =    50000;
const app                   =    express();
app.use(body.json());
app.use(body.urlencoded({ extended: true }));
app.use(signupRouter);
app.use(signinRouter);
app.use(deleteProfileRouter);
app.use(loginRouter);
app.use(editProfileRouter);
app.use(errorpage);
app.use(createPatient);
app.use(listPatient);
app.use(editPatient);
app.use(deletePatient);
app.use(publishPreset);
app.use(createPreset);
app.use(listPreset);
app.use(editPreset);
app.use(deletePreset);
app.use(createTest);
app.use(listTest);
app.use(editTest);
app.use(deleteTest);
app.use(webApp);
app.use(morgan('short'));

app.use('/', express.static('../../../frontend/build/'));

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});

console.log("server has started");
console.log("db has started");

module.export = app;