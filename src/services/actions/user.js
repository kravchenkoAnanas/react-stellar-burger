import { setCookie } from '../../utils/cookie';
import { loginUser, logoutUser, registerUser, refreshUser, updateUser, getUser, catchError } from './../api'

export const SET_USER = 'SET_USER';
export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

export const setAuthChecked = (value) => ({
    type: SET_AUTH_CHECKED,
    payload: value,
});

const clearToken = (token) => {
    return token.replace('Bearer ', '');
}

const updateAccessAndRefreshTokens = (accessToken, refreshToken) => {
    console.log("updateAccessAndRefreshTokens", accessToken, refreshToken);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    // setCookie("token", refreshToken);
    // return {
    //     accessToken: clearToken(accessToken),
    // }
}

export const loginUserAction = (email, password) => {
    return (dispatch) => {
        return loginUser(email, password)
            .then((res) => {
                if (res.success) {
                    // console.log("loginUserAction", res);
                    updateAccessAndRefreshTokens(
                        clearToken(res.accessToken),
                        res.refreshToken
                    )
                    dispatch(setUser(res.user));
                    dispatch(setAuthChecked(true));
                    // console.log("loginUserAction DONE");
                }
            })
            .catch(catchError)
    }
};
    
export const logoutUserAction = () => {
    return (dispatch) => {
        return logoutUser(localStorage.getItem("refreshToken"))
            .then((res) => {
                if (res.success) {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch(setUser(null));
                }
            })
            .catch(catchError)
    }
};

export function registerUserAction(email, password, name) {
    return function(dispatch) {
        return registerUser(email, password, name)
            .then(res => {
                if (res.success) {
                    // console.log("registerUserAction", res);
                    updateAccessAndRefreshTokens(
                        clearToken(res.accessToken),
                        res.refreshToken
                    )
                    dispatch(setUser(res.user));
                    dispatch(setAuthChecked(true));
                    // console.log("registerUserAction DONE");
                }
            })
            .catch(catchError)
    };
};

export function getUserAction() {
    return function(dispatch) {
        return getUser()
            .then(res => {
                dispatch(setUser(res.user));
            })
            .catch(catchError)
    };
};

export function updateUserAction(info) {
    return function(dispatch) {
        updateUser(info)
            .then(res => {
                if (res.success) {
                    dispatch(setUser(res.user));
                }
            })
            .catch(catchError)
    };
};

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUserAction())
              .catch(() => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refreshToken");
                  dispatch(setUser(null));
               })
              .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};
