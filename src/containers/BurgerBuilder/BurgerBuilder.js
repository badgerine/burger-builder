import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auxilliary from '../Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControlCollection from '../../components/Burger/BuildControlCollection/BuildControlCollection';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('https://burger-builder-ed94e.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error =>
        //         this.setState({ error: true }));
    }

    checkPurchaseState = (ingredients) => {
        // const ingredients = {...this.props.ingredients};
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
            return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    puchaseContinueHandler = () => {
        // alert('You continued');


        //my way
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?ingredients='+JSON.stringify(this.props.ingredients)
        // });

        const queryParams = [];
        for (let i in this.props.ingredients) {
            console.log(i);
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
        }
        queryParams.push('price=' + this.props.price);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });


    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burgerBuilder = this.state.error ? <p>Ingredients can't be loaded.</p> : <Spinner />;

        if (this.props.ingredients) {
            burgerBuilder = (
                <Auxilliary>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControlCollection
                        addIngredient={this.props.onAddIngredient}
                        removeIngredient={this.props.onRemoveIngredient}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.checkPurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler} />
                </Auxilliary>
            );
            orderSummary = (<OrderSummary
                ingredients={this.props.ingredients}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.puchaseContinueHandler}
                price={this.props.price} />);

        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Auxilliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burgerBuilder}
            </Auxilliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredient) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientId: ingredient}),
        onRemoveIngredient: (ingredient) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientId: ingredient}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));