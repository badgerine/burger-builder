import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';
const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const setLoading = (state, value) => {
    return updateObject(state, { loading: value });
}

const setPurchased = (state, value) => {
    return updateObject(state, { purchased: value });
}

const puchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId })
    return updateObject(state, {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return setPurchased(state, false);
        case actionTypes.PURCHASE_BURGER_START: return setLoading(state, true);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return puchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return setLoading(state, false);
        case actionTypes.FETCH_ORDERS_START: return setLoading(state, true);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return setLoading(state, false);
        default: return state;
    }
};

export default reducer;