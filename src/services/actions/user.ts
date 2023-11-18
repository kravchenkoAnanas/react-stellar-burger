import { loginUser, logoutUser, registerUser, resetPassword, updateUser, getUser, catchError } from '../api'
import { AppDispatch, AppThunk } from '../types';

export const SET_USER = 'SET_USER';
export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';

export interface ISetUser {
    readonly type: typeof SET_USER;
    readonly payload: any;
}
export interface ISetAuthChecked {
    readonly type: typeof SET_AUTH_CHECKED;
    readonly payload: any;
}
export type TUserActions = ISetUser | ISetAuthChecked;

export const setUser = (user: any): ISetUser => ({
    type: SET_USER,
    payload: user,
});

export const setAuthChecked = (value: any): ISetAuthChecked => ({
    type: SET_AUTH_CHECKED,
    payload: value,
});

const clearToken = (token: any) => {
    return token.replace('Bearer ', '');
}

const updateAccessAndRefreshTokens = (accessToken: any, refreshToken: any) => {
    console.log("updateAccessAndRefreshTokens", accessToken, refreshToken);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
}

export const loginUserAction: AppThunk = (email: any, password: any) => (dispatch: AppDispatch) => {
    loginUser(email, password)
        .then((res) => {
            if (res.success) {
                updateAccessAndRefreshTokens(
                    clearToken(res.accessToken),
                    res.refreshToken
                )
                dispatch(setUser(res.user));
                dispatch(setAuthChecked(true));
            }
        })
        .catch(catchError)
};

export const logoutUserAction: AppThunk = () => (dispatch: AppDispatch) => {
    logoutUser(localStorage.getItem("refreshToken"))
        .then((res) => {
            if (res.success) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                dispatch(setUser(null));
            }
        })
        .catch(catchError)
};

export const registerUserAction: AppThunk = (email: any, password: any, name: any) => (dispatch: AppDispatch) => {
    registerUser(email, password, name)
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

export const updateUserAction: AppThunk = (info: any) => (dispatch: AppDispatch) => {
    updateUser(info)
        .then(res => {
            if (res.success) {
                dispatch(setUser(res.user));
            }
        })
        .catch(catchError)
};

export const resetPasswordAction: AppThunk = (password: any, token: any) => (dispatch: AppDispatch) => {
    resetPassword(password, token)
        .then(res => {
            if (res.success) {
                // console.log(resetPasswordAction, res);
                dispatch(setUser(res.user));
            }
        })
        .catch(catchError)
};

export const checkUserAuth: AppThunk = () => (dispatch: AppDispatch) => {
    if (localStorage.getItem("accessToken")) {
        getUser()
            .then(res => {
                dispatch(setUser(res.user));
            })
            .catch(catchError)
            .catch(() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                dispatch(setUser(null));
            })
            .finally(() => dispatch(setAuthChecked(true)))
    } else {
        dispatch(setAuthChecked(true));
    }
};
