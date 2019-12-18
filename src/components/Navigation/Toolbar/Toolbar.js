import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItemCollection from '../NavigationItemCollection/NavigationItemCollection';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div onClick={props.openDrawer}>MENU</div>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItemCollection />
        </nav>
    </header>
);

export default toolbar;