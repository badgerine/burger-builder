import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const auth = (email, password) => {
    return thunkDispatch => {
        thunkDispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxnnN6zCLt0sub4-A1e3PhHFJ1kpg_54g', authData)
            .then(response => {
                console.log(response);
                thunkDispatch(authSuccess(response));
            })
            .catch(error => {
                console.log(error);
                thunkDispatch(authFail());
            });
    }
}