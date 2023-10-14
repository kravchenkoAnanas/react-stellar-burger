import {
    LOGIN,
    REGISTER,
    LOGOUT,
    REFRESH,
    GET
} from './../actions/user';
import { setCookie } from '../../utils/cookie';


const initialState = {
    accessToken: '',
    name: '',
    email: ''
};

const clearToken = (token) => {
    return token.replace('Bearer ', '');
}

const updateAccessAndRefreshTokens = (accessToken, refreshToken) => {
    console.log("updateAccessAndRefreshTokens refreshToken", refreshToken);
    setCookie("token", refreshToken);
    return {
        accessToken: clearToken(accessToken),
    }
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return updateAccessAndRefreshTokens(
                action.data.accessToken,
                action.data.refreshToken
            )
        }
        case REGISTER: {
            return updateAccessAndRefreshTokens(
                action.data.accessToken,
                action.data.refreshToken
            )
        }
        case LOGOUT: {
            return state;
        }
        case REFRESH: {
            console.log(
                "USER REFRESH action.data.accessToken.replace('Bearer ', '')=",
                clearToken(action.data.accessToken)
            )
            return {
                ...state,
                accessToken: clearToken(action.data.accessToken),
            }
        }
        case GET: {
            console.log("USER GET action=", action);
            // console.log("USER GET name=", action.data.user.name);
            // console.log("USER GET email=", action.data.user.email);
            return {
                ...state,
                name: action.data.user.name,
                email: action.data.user.email,
            }
        }
        default: {
            return state;
        }
    }
};
