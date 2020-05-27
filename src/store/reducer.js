import * as actionTypes from './actions';
import * as ingredientPrices from '../constants/IngredientItems';

const initialstate = {
    ingredients: {
        salad: 0,
        macon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
}

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
                }
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientId]: state.ingredients[action.ingredientId] - 1
                }
            };
        default:
            return state;
    }
}

export default reducer;