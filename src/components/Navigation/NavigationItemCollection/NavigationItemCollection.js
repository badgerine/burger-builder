import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import classes from './NavigationItemCollection.module.css';

const navigationItemCollection = (props) => (
<ul className={classes.NavigationItemCollection}>
   <NavigationItem link='/' active>Burger Builder</NavigationItem>
   <NavigationItem>Checkout</NavigationItem>
</ul>
);

export default navigationItemCollection;