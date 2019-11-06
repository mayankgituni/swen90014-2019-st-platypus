/**************************************************************************
 * Author: Mayank Tomar
 * This component manages the form input when signing into the system.
 *************************************************************************/
import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import NavBar from '../NavBar'
import FormHandler from '../FormHandler'
import AuthorizeUser from './AuthorizeUser';
import styles from '../../Style/SignInStyle'


const SignIn = (props) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  // Is there any current user logged in
  const [profileInfo, setProfileInfo] = useState({})
  const [isLogined, setIsLogined] = useState(false)

  // Setup the user login info when form is submitted
  const login = (user) => {
    setProfileInfo(user)
    setIsLogined(true)
  }

  // Form input handlers
  let {handleChange, handleSubmit, values} = FormHandler({}, login)

  // If the user wants to login fresh
  let content = (
    <div>
      <NavBar/>
      <Grid container component="main" className={classes.root}>
        <CssBaseline/>
        <Grid item xs={false} sm={4} md={7} className={classes.image}/>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}></Avatar>
            <Typography component="h1" variant="h2">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                onChange={handleChange}
                value={values.email}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus/>
              <TextField
                onChange={handleChange}
                value={values.password}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"/>
              <FormControlLabel
                control={< Checkbox value = "remember" color = "primary" />}
                label="Remember me"/>
              <Button
                type="submit"
                onChange={handleSubmit}
                fullWidth
                variant="contained"
                color="primary"
                style={{
                backgroundColor: "#124059"
              }}
                className={classes.submit}>
                <main>Sign In</main>
              </Button>
              {props.type == "error" && <p style={{color:"red"}}>Invalid Email or Password. Try again!</p>}
              {props.type == "loading" && <h4>Loading... </h4>}
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/SignUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}></Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  )

  // Resetting the sigin page to start fresh
  const resetLogin = (isEnable) => {
    setIsLogined(isEnable)
  }

  // Sending the login information for authentication
  if (isLogined) {
    content = (<AuthorizeUser props={profileInfo} loginDisable={resetLogin}/>)
  }

  return content;
}

export default SignIn