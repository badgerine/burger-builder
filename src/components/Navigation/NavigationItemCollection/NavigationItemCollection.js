import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import classes from './NavigationItemCollection.module.css';

const navigationItemCollection = (props) => (
   <ul className={classes.NavigationItemCollection}>
      <NavigationItem link='/'>Burger Builder</NavigationItem>
      <NavigationItem link='/orders'>Orders</NavigationItem>
   </ul>
);

export default navigationItemCollection;