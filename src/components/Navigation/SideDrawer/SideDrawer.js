import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItemCollection from '../NavigationItemCollection/NavigationItemCollection';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxilliary from '../../../containers/Auxilliary/Auxilliary'

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Auxilliary >
            <Backdrop show={props.open} clicked={props.closeDrawer} />
            <div className={attachedClasses.join(' ')} onClick={props.closeDrawer}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItemCollection isAuthenticated={props.isAuthenticated} />
                </nav>
            </div>
        </Auxilliary>
    );
}

export default sideDrawer;