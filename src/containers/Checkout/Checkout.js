import React, { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: { salad: 0, meat: 0, cheese: 0, macon: 0 }
    }

    componentDidMount() {

        const query = new URLSearchParams(this.props.location.search);
        //my way
        // let chosenIngredients = null;
        // for (let param of query.entries()) {
        //     console.log(param);
        //     if ('ingredients' === param[0]) {
        //         chosenIngredients = JSON.parse(param[1]);
        //         break;
        //     }
        // }
        // this.setState({ ingredients: chosenIngredients });

        let chosenIngredients = {};
        for (let param of query.entries()) {
            //implicitly casting ingredient amount to integer
            //['salad','1']
            chosenIngredients[param[0]] = +param[1];
        }

        console.log('printing chosenIngredients after loop');
        console.log(chosenIngredients);
        this.setState({ ingredients: chosenIngredients });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.state.ingredients} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        )
    }
}

export default Checkout;