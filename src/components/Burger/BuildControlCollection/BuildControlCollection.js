import React from 'react';
import './BuildControlCollection.module.css';
import classes from './BuildControlCollection.module.css';
import BuildControl from '../BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControlCollection = (props) => (
    <div className={classes.BuildControlCollection}>
        {controls.map(
            ctrl => <BuildControl key={ctrl.label} label={ctrl.label} />
        )}
    </div>
)

export default buildControlCollection;