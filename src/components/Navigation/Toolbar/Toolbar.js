import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItemCollection from '../NavigationItemCollection/NavigationItemCollection';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <Logo/>
        <nav>
            <NavigationItemCollection/>
        </nav>
    </header>
);

export default toolbar;