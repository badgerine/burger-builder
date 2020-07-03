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
                console.log('[store/reducer/orders.purchaseBurgerStart]', response);
                thunkDispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                thunkDispatch(purchaseBurgerFail(error))
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    console.log('fetching orders...');
    return thunkDispatch => {
        thunkDispatch(fetchOrdersStart());
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                console.log('orders fetched successfully.')
                thunkDispatch(fetchOrdersSuccess(fetchedOrders));
            }).catch(err => {
                thunkDispatch(fetchOrdersFail(err));
            });
    }
}