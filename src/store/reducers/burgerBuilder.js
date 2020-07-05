import * as actionTypes from '../actions/actionTypes';
import * as ingredientPrices from '../../constants/IngredientItems';
import { updateObject } from '../utility';

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
            const updatedIngredient = { [action.ingredientId]: state.ingredients[action.ingredientId] + 1 };
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientId]
            }
            return updateObject(state, updatedState);
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIng = { [action.ingredientId]: state.ingredients[action.ingredientId] - 1 };
            const updatedIngs = updateObject(state.ingredients, updatedIng);
            const updatedSt = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientId]
            }
            return updateObject(state, updatedState);
        case actionTypes.SET_INGREDIENTS:
            const resetState = {
                ingredients: {
                    salad: action.ingredients.salad,
                    macon: action.ingredients.macon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 4,
                error: false
            };
            return updateObject(state, resetState);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, { error: true });
        default:
            return state;
    }
}

export default reducer;