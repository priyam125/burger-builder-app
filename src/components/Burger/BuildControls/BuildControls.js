import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl'; 

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className = {classes.BuildControls}>
        <div>Total Price: <strong>{props.price}</strong> </div>
        {controls.map(ctrl => (
            <BuildControl key = {ctrl.label}
            label = {ctrl.label}
            added = {() => props.ingredientAdded(ctrl.type)}
            removed = {() => props.ingredientDeducted(ctrl.type)}
            disabled = {props.disabled[ctrl.type]} />
        ))}
        <button className = {classes.OrderButton} 
        disabled = {!props.purchasable}
        onClick = {props.ordered}>PROCEED TO CHECKOUT</button>
    </div>
);

export default buildControls;