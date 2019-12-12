import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItemCollection from '../NavigationItemCollection/NavigationItemCollection';
import classes from './SideDrawer.module.css';

const sideDrawer = (props) => (
    <div className={classes.SideDrawer}>
        <div className={classes.Logo}>
            <Logo />
        </div>

        <nav>
            <NavigationItemCollection />
        </nav>
    </div>
);

export default sideDrawer;