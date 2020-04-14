import React, { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: { salad: 0, meat: 0, cheese: 0, macon: 0 },
        price: 0
    }

    //changed from componentDidMount so that we populate the ingredients so that the burger can render successfully in the CheckoutSummary component
    componentWillMount() {

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
        let price = null;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                //implicitly casting ingredient amount to integer
                //['salad','1']
                chosenIngredients[param[0]] = +param[1];
            }
        }


        console.log('printing chosenIngredients after loop');
        console.log(chosenIngredients);
        this.setState({ ingredients: chosenIngredients, totalPrice: price });
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
                {/* <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData} /> */}
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props} />)} />
            </div>
        )
    }
}

export default Checkout;