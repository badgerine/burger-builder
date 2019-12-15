import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItemCollection from '../NavigationItemCollection/NavigationItemCollection';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxilliary from '../../../hoc/Auxilliary'

const sideDrawer = (props) => (
    <Auxilliary >
        <Backdrop />{/*show={props.show} clicked={props.modalClosed}/>*/}
        <div className={classes.SideDrawer}>
            <div className={classes.Logo}>
            {/* <div> */}
                <Logo />
            </div>
            <nav>
                <NavigationItemCollection />
            </nav>
        </div>

    </Auxilliary>
);

export default sideDrawer;