import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItemCollection from '../NavigationItemCollection/NavigationItemCollection';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle openDrawer={props.openDrawer} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItemCollection isAuthenticated={props.isAuthenticated} />
        </nav>
    </header>
);

export default toolbar;