import React, { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: { salad: 0, meat: 0, cheese: 0, bacon: 0 }
    }

    componentDidMount(){

        const query = new URLSearchParams(this.props.location.search);
        let chosenIngredients = null;

        for(let param of query.entries()){
            console.log(param);
            if('ingredients' === param[0]){
                chosenIngredients = JSON.parse(param[1]);
                this.setState({ingredients: chosenIngredients});
                break;
            }
        }
        
        
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler= () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    checkoutCancelled = {this.checkoutCancelledHandler}
                    checkoutContinued = {this.checkoutContinuedHandler}
                    ingredients={this.state.ingredients} />
            </div>
        )
    }
}

export default Checkout;