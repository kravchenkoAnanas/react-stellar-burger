import {
    SET_USER,
    SET_AUTH_CHECKED,
    TUserActions
} from '../actions/user';
import { IUser } from '../types';

type TUserType = {
    user: IUser | null,
    isAuthChecked: boolean,
}

const initialState: TUserType = {
    user: null,
    isAuthChecked: false
};

export const userReducer = (
    state = initialState,
    action: TUserActions
    ): TUserType => {

    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                user: action.payload
            };
        }
        case SET_AUTH_CHECKED: {
            return {
                ...state,
                isAuthChecked: action.payload
            };
        }
        default: {
            return state;
        }
    }
};
