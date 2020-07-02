import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import thunk from 'redux-thunk';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchasBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return thunkDispatch => {
        thunkDispatch(purchasBurgerStart);
        axios.post('orders.json/', orderData)
            .then(response => {
                console.log('[store/reducer/orders.purchaseBurgerStart]',response);
                thunkDispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                thunkDispatch(purchaseBurgerFail(error))
            })
    }
}