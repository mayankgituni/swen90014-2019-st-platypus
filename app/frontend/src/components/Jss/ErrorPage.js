/**************************************************************************
 * Author: Mayank Tomar
 * This component show's error when the wrong request is processed.
 *************************************************************************/
import React from 'react';
import NavBar from './NavBar'

// react components for routing our app without refresh
import {makeStyles} from "@material-ui/core/styles";
import LandingStyle from '../Style/LandingStyle'

const useStyles = makeStyles(LandingStyle);

function ErrorPage() {
    const classes = useStyles();
    return (
        <div>
            <NavBar/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h1 style={ {color: 'red'} }> Error respond! These functionality will be implemented in next version!</h1>
        </div>
    );
}

export default ErrorPage;
