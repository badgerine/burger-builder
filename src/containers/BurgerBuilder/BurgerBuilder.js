import React, { useState, useEffect } from 'react';
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

export const BurgerBuilder = (props) => {

    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        if (!props.ingredients || !props.buildingBurger || props.burgerPurchased) {
            props.onInitIngredients();
        }
    }, [props.initIngredients, props.buildingBurger, props.burgerPurchased]);

    const checkPurchaseState = (ingredients) => {
        // const ingredients = {...props.ingredients};
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    const purchaseHandler = () => {
        setPurchasing(true);
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const puchaseContinueHandler = () => {
        if (props.isAuthenticated) {
            props.onInitPurchase();
            props.history.push('/checkout');
        } else {
            props.history.push('/auth');
        }
    }

    const disabledInfo = {
        ...props.ingredients
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burgerBuilder = props.error ? <p>Ingredients can't be loaded.</p> : <Spinner />;

    if (props.ingredients) {
        burgerBuilder = (
            <Auxilliary>
                <Burger ingredients={props.ingredients} />
                <BuildControlCollection
                    addIngredient={props.onAddIngredient}
                    removeIngredient={props.onRemoveIngredient}
                    disabled={disabledInfo}
                    price={props.price}
                    purchasable={checkPurchaseState(props.ingredients)}
                    ordered={purchaseHandler} />
            </Auxilliary>
        );
        orderSummary = (<OrderSummary
            ingredients={props.ingredients}
            purchaseCancel={purchaseCancelHandler}
            purchaseContinue={puchaseContinueHandler}
            price={props.price}
            isAuth={props.isAuthenticated} />);

    }

    return (
        <Auxilliary>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burgerBuilder}
        </Auxilliary>
    );
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token,
        buildingBurger: state.burgerBuilder.building,
        burgerPurchased: state.order.purchased
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