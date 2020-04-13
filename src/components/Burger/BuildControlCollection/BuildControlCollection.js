import React from 'react';
import './BuildControlCollection.module.css';
import classes from './BuildControlCollection.module.css';
import BuildControl from '../BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Macon', type: 'macon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControlCollection = (props) => (
    <div className={classes.BuildControlCollection}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(
            ctrl => <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                add={() => props.addIngredient(ctrl.type)} 
                remove={() => props.removeIngredient(ctrl.type)}
                disabled = {props.disabled[ctrl.type]}
                />
        )}
        <button disabled={!(props.purchasable)} className={classes.OrderButton} onClick={props.ordered}>ORDER NOW</button>
    </div>
)

export default buildControlCollection;