import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import classes from './NavigationItemCollection.module.css';

const navigationItemCollection = (props) => (
   <ul className={classes.NavigationItemCollection}>
      <NavigationItem exact link='/'>Burger Builder</NavigationItem>
      <NavigationItem link='/orders'>Orders</NavigationItem>
      {props.isAuthenticated
         ? <NavigationItem link='/auth'>Logout</NavigationItem>
         : <NavigationItem link='/auth'>Login</NavigationItem>}
   </ul>
);

export default navigationItemCollection;