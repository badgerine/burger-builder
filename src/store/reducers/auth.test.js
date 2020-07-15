import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    beforeEach(() => {
    });

    it('should return the initial state', () => {
        //expected initial state : token, userId, error, loading
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false
        })
    });

    it('should store the token upon successful login', () => {
        //expected initial state : token, userId, error, loading
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: "testToken",
            userId: "testUserId"
        })).toEqual({
            token: "testToken",
            userId: "testUserId",
            error: null,
            loading: false
        })
    });

});

