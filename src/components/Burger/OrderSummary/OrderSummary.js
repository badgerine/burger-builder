import React, { Component } from 'react';
import Auxilliary from '../../../containers/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //this could be a functional component, we did this for lifecycle hook debugging

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
                <Button btnType='Success' click={this.props.purchaseContinue}>{this.props.isAuth ? "CONTINUE" : "SIGN IN TO CONTINUE"}</Button>
            </Auxilliary>
        );
    }

}

export default OrderSummary;