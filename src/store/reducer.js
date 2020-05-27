import * as actionTypes from './actions';
import * ingredientPrices from '../constants/IngredientPrices';

const initialstate = {
    ingredients: {},
    totalPrice: 4
}

const updateTotalPrice = (sum, ingredientId) => {
    switch(ingredientId){
        case: 
    }
    return {
        ...state,
        ingredients: state.ingredients.concat(ingredient.id)
    }
}


const updateIngredient = ingredientId => {

}

const reducer = (state = initialstate, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:

            return;
        case actionTypes.REMOVE_INGREDIENT:
            return;
    }
    return state;
}

export default reducer;