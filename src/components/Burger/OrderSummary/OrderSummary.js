import React, {Component} from 'react';
import Aux1 from '../../../hoc/Auxi/Aux1';
import classes from './OrderSummary.module.css';
import { Route,Link } from 'react-router-dom';


class OrderSummary extends Component {
    render () {
        const ingredientSummary =
         Object.keys(this.props.ingredients)
        .map(igKey => {
        return (
        <li>
            <span style=
            {{textTransform: 'capitalize'}}>
            {igKey}
            </span>:
            {this.props.ingredients[igKey]}
         </li>);
    });

        return(
            <Aux1>
            <h3>Your Order</h3>
            <p>A delicious burger with:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout</p>
            <p ><strong>Total price to be paid: {this.props.price}</strong> </p>   
            <button className = {[classes.Button,classes.Danger].join(' ')} 
            onClick = {this.props.clicked}>CANCEL</button>
            <button className = {[classes.Button,classes.Success].join(' ')}
            onClick = {this.props.alert}></button>
            
            {/* <Route path = "checkout" exact render = {() => 
            <h1>Checkout Please</h1>} /> */}
            </Aux1>
        );
    }
    
};

export default OrderSummary;