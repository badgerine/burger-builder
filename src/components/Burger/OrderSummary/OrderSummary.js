import React, { Component } from 'react';
import Auxilliary from '../../../containers/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';
import { NavLink } from 'react-router-dom';

class OrderSummary extends Component {
    //this could be a functional component, we did this for lifecycle hook debugging
    componentDidUpdate() {
        console.log('[OrderSummary] componentDidUpdate().')
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => (
                <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
            ));

        return (
            <Auxilliary>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price:  {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType='Danger' click={this.props.purchaseCancel}>CANCEL</Button>
                <NavLink to="/checkout"> <Button btnType='Success' click={this.props.purchaseContinue}>CONTINUE</Button></NavLink>
            </Auxilliary>
        );
    }

}

export default OrderSummary;