import * as actionTypes from '../actions/actionTypes';
import * as ingredientPrices from '../../constants/IngredientItems';

const initialstate = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    macon: 0.7
};

const updateTotalPrice = (sum, ingredientId) => {
    // switch (ingredientId) {
    //     case:
    // return {
    //     ...state,
    //     ingredients: state.ingredients.concat(ingredient.id)
    // }
}


const updateIngredient = ingredientId => {

}

const reducer = (state = initialstate, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientId]: state.ingredients[action.ingredientId] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientId]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientId]: state.ingredients[action.ingredientId] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientId]
            };
        default:
            return state;
    }
}

export default reducer;