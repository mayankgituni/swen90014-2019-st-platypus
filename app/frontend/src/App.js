import React from 'react';
import './App.css';
import NavBar from './components/Jss/NavBar'

// react components for routing our app without refresh
import {makeStyles} from "@material-ui/core/styles";
import GridItem from "./components/MaterialUi/Jss/Grid/GridItem";
import LandingStyle from './components/Style/LandingStyle'
const useStyles = makeStyles(LandingStyle);

function App() {
    const classes = useStyles();

    return (
        <div>
            <NavBar/>
            <div className={classes.section}>
                <GridItem md={20} className={classes.textCenter}>
                
                </GridItem>
            </div>
        </div>
    );
}

export default App;
