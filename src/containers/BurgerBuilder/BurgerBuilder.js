import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auxilliary from '../Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControlCollection from '../../components/Burger/BuildControlCollection/BuildControlCollection';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
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
        if(this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    puchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burgerBuilder = this.props.error ? <p>Ingredients can't be loaded.</p> : <Spinner />;

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
                        ordered={this.purchaseHandler} 
                        isAuth={this.props.isAuthenticated}/>
                </Auxilliary>
            );
            orderSummary = (<OrderSummary
                ingredients={this.props.ingredients}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.puchaseContinueHandler}
                price={this.props.price} />);

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
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredient) => dispatch(actions.addIngredient(ingredient)),
        onRemoveIngredient: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));