import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const auth = (email, password, isSignUp) => {
    return thunkDispatch => {
        thunkDispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        console.log('[auth.auth()] signUp=',isSignUp);
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxnnN6zCLt0sub4-A1e3PhHFJ1kpg_54g';
        if(!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxnnN6zCLt0sub4-A1e3PhHFJ1kpg_54g';
        }
        
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                thunkDispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch(error => {
                console.log(error);
                thunkDispatch(authFail());
            });
    }
}