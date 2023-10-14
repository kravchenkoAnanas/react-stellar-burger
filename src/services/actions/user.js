import { loginUser, registerUser, refreshUser, updateUser, getUser, catchError } from './../api'

export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';
export const LOGOUT = 'LOGOUT';
export const REFRESH = 'REFRESH';
export const GET = 'GET';
export const UPDATE = 'UPDATE';

export function loginUserAction(email, password) {
    return function(dispatch) {
        loginUser(email, password)
            .then(res => {
                if (res.success) {
                    dispatch({
                        type: LOGIN,
                        data: res,
                    })
                }
            })
            .catch(catchError)
    };
};

export function registerUserAction(email, password, name) {
    return function(dispatch) {
        registerUser(email, password, name)
            .then(res => {
                if (res.success) {
                    dispatch({
                        type: REGISTER,
                        data: res,
                    })
                }
            })
            .catch(catchError)
    };
};

export function refreshUserAction(token) {
    return function(dispatch) {
        refreshUser(token)
            .then(res => {
                if (res.success) {
                    dispatch({
                        type: REFRESH,
                        data: res,
                    })
                }
            })
            .catch(catchError)
    };
};

export function getUserAction(token) {
    return function(dispatch) {
        getUser(token)
            .then(res => {
                if (res.success) {
                    console.log("getUser", res);
                    dispatch({
                        type: GET,
                        data: res,
                    })
                }
            })
            .catch(catchError)
    };
};

export function updateUserAction(token, info) {
    return function(dispatch) {
        updateUser(token, info)
            .then(res => {
                if (res.success) {
                    console.log("updateUser", res);
                    dispatch({
                        type: UPDATE,
                        data: res,
                    })
                }
            })
            .catch(catchError)
    };
};
