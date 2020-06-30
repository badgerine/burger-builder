import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientId: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientId: name
    }
}

export const initIngredients = () => {
    return thunkDispatch => {
        axios.get('https://burger-builder-ed94e.firebaseio.com/ingredients.json')
            .then(response => {
                thunkDispatch(setIngredients(response.data))
            })
            .catch(error => {
                thunkDispatch(fetchIngredientsFailed());
            });
    }
}

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}


const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}