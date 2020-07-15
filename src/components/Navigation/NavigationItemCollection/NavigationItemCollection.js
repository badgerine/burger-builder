import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import classes from './NavigationItemCollection.module.css';

const navigationItemCollection = (props) => (
   <ul className={classes.NavigationItemCollection}>
      <NavigationItem exact link='/'>Burger Builder</NavigationItem>
      {props.isAuthenticated ? <NavigationItem link='/orders'>Orders</NavigationItem> : null}
      {props.isAuthenticated ? <NavigationItem link='/logout'>Logout</NavigationItem>
         : <NavigationItem link='/auth'>Login</NavigationItem>}
   </ul>
);

export default navigationItemCollection;