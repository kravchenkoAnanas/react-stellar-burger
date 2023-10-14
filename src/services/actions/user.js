import { loginUser, registerUser, updateUser, catchError } from './../api'

export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';
export const LOGOUT = 'LOGOUT';
export const REFRESH = 'REFRESH';

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

export function updateUserAction(token) {
    return function(dispatch) {
        updateUser(token)
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
