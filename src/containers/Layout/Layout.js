import React, { useState } from 'react';
import { connect } from 'react-redux';
import Auxilliary from '../Auxilliary/Auxilliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerOpenedHandler = () => {
        setShowSideDrawer(true);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }//this method should replace sideDrawerClosedHandler and sideDrawerOpenedHandler.

    return (
        <Auxilliary>
            <Toolbar openDrawer={sideDrawerOpenedHandler} isAuthenticated={props.token} />
            <SideDrawer
                open={showSideDrawer}
                closeDrawer={sideDrawerClosedHandler}
                isAuthenticated={props.token} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxilliary>
    );
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(Layout);