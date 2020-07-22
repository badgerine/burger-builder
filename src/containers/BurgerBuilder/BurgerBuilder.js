import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

    const ingredients = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token);
    const buildingBurger = useSelector(state => state.burgerBuilder.building);
    const burgerPurchased = useSelector(state => state.order.purchase);

    const dispatch = useDispatch();
    const onAddIngredient = (ingredient) => dispatch(actions.addIngredient(ingredient));
    const onRemoveIngredient = (ingredient) => dispatch(actions.removeIngredient(ingredient));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());

    useEffect(() => {
        if (!buildingBurger || burgerPurchased) {
            onInitIngredients();
        }

    }, [onInitIngredients, buildingBurger, burgerPurchased]);


    const checkPurchaseState = (ingredients) => {
        // const ingredients = {...ingredients};
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
        if (isAuthenticated) {
            onInitPurchase();
            props.history.push('/checkout');
        } else {
            props.history.push('/auth');
        }
    }

    const disabledInfo = {
        ...ingredients
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burgerBuilder = error ? <p>Ingredients can't be loaded.</p> : <Spinner />;

    if (ingredients) {
        burgerBuilder = (
            <Auxilliary>
                <Burger ingredients={ingredients} />
                <BuildControlCollection
                    addIngredient={onAddIngredient}
                    removeIngredient={onRemoveIngredient}
                    disabled={disabledInfo}
                    price={price}
                    purchasable={checkPurchaseState(ingredients)}
                    ordered={purchaseHandler} />
            </Auxilliary>
        );
        orderSummary = (<OrderSummary
            ingredients={ingredients}
            purchaseCancel={purchaseCancelHandler}
            purchaseContinue={puchaseContinueHandler}
            price={price}
            isAuth={isAuthenticated} />);

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

export default withErrorHandler(BurgerBuilder, axios);