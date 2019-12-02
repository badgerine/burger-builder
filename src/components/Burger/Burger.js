import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            console.log('igKey:'+igKey);
            console.log(props.ingredients);
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                console.log(props.ingredients[igKey]);
                console.log('map((_, i):'+i)
                return <BurgerIngredient key={igKey + i} type={igKey}/>
            })
        })
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;