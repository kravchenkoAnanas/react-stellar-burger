import { loginUser, logoutUser, registerUser, resetPassword, updateUser, getUser, catchError } from '../api'
import { AppDispatch, AppThunk, IUser } from '../types';

export const SET_USER = 'SET_USER';
export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';

export interface ISetUser {
    readonly type: typeof SET_USER;
    readonly payload: IUser | null;
}
export interface ISetAuthChecked {
    readonly type: typeof SET_AUTH_CHECKED;
    readonly payload: boolean;
}
export type TUserActions = ISetUser | ISetAuthChecked;

export const setUser = (user: IUser | null): ISetUser => ({
    type: SET_USER,
    payload: user,
});

export const setAuthChecked = (value: boolean): ISetAuthChecked => ({
    type: SET_AUTH_CHECKED,
    payload: value,
});

const clearToken = (token: string) => {
    return token.replace('Bearer ', '');
}

const updateAccessAndRefreshTokens = (accessToken: string, refreshToken: string) => {
    console.log("updateAccessAndRefreshTokens", accessToken, refreshToken);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
}

export const loginUserAction: AppThunk = (email: string, password: string) => (dispatch: AppDispatch) => {
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
    const refreshToken: string | null = localStorage.getItem("refreshToken");
    if (refreshToken) {
        logoutUser(refreshToken)
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

export const registerUserAction: AppThunk = (
    email: string,
    password: string,
    name: string
    ) => (dispatch: AppDispatch) => {

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

export const updateUserAction: AppThunk = (info: IUser) => (dispatch: AppDispatch) => {
    updateUser(info)
        .then(res => {
            if (res.success) {
                dispatch(setUser(res.user));
            }
        })
        .catch(catchError)
};

export const resetPasswordAction: AppThunk = (
    password: string,
    token: string
    ) => (dispatch: AppDispatch) => {

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
