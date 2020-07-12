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

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime => {
    return thunkDispatch => {
        setTimeout(() => {
            thunkDispatch(logout());
        }, expirationTime);
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
        console.log('[auth.auth()] signUp=', isSignUp);
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxnnN6zCLt0sub4-A1e3PhHFJ1kpg_54g';
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxnnN6zCLt0sub4-A1e3PhHFJ1kpg_54g';
        }

        axios.post(url, authData)
            .then(response => {
                console.log('[auth.auth()] after post...', response);
                const expiryDurationMS = response.data.expiresIn * 1000;
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expiryDate', calculateExpiryDate(expiryDurationMS));
                localStorage.setItem('userId', response.data.localId);
                thunkDispatch(authSuccess(response.data.idToken, response.data.localId));
                thunkDispatch(checkAuthTimeout(expiryDurationMS));
            })
            .catch(error => {
                console.log(error);
                thunkDispatch(authFail(error.response.data.error));
            });
    }
}

export const authCheckState = () => {
    return thunkDispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            thunkDispatch(logout());
        } else {
            const expiryDate = new Date(localStorage.getItem('expiryDate'));
            if (expiryDate > new Date()) {
                const userId = localStorage.getItem('userId');
                thunkDispatch(authSuccess(token, userId));
                thunkDispatch(checkAuthTimeout(expiryDate.getTime() - new Date().getTime()));
            } else {
                thunkDispatch(logout());
            }

        }
    }
}

const calculateExpiryDate = (expiryTime) => {
    const expiryDate = new Date(new Date().getTime() + expiryTime);
    console.log('[auth.calculateExpiryDate]expiryDate=', expiryDate);
    return expiryDate;
}