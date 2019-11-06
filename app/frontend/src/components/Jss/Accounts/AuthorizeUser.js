/**************************************************************************
 * Author: Mayank Tomar
 * This component takes the input properties as email and passwork and calls
 * api and get user profile information.
 *************************************************************************/
import React from "react";
import SignIn from "./SignIn.js";
import Loader from "../Loader"
import UserProfileController from '../UserProfile/UserProfileController'
import useHttp from '../http'

const AuthorizeUser = (p) => {
  
  // Authenticating and fetching the user information with the backend api
  const [profile, isLoading, error] = useHttp(`/login?email=${p.props.email}&password=${p.props.password}`, [p.props]);

  // Loading while fetching the information
  let content = <Loader message="Signing In"/>
  
  // If user is authenticated and the correct profile is fetched
  if (!isLoading && profile) {
    content = <UserProfileController profile={profile[0]} logout={p.loginDisable}/>
  } else if (!isLoading && !profile) {
    content = <SignIn type="error"/>;
  }

  return content;
}

export default AuthorizeUser