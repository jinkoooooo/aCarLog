import React from "react";
import {User} from "../../model/User";

export interface UserAuth {
    accessToken: string,
    refreshToken: string,
    isAuth: boolean,
    user: User|null,
}

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

interface UserLoginAction {
    type: typeof USER_LOGIN,
    payload: UserAuth
}

interface UserLogoutAction {
    type: typeof USER_LOGOUT
}

export type UserAuthActionTypes = UserLoginAction | UserLogoutAction;

export function setCurrentUserInfo(userAuth:UserAuth) : UserAuthActionTypes {
    return {
        type: USER_LOGIN,
        payload: userAuth
    };
}

export function userLogout() : UserAuthActionTypes {
    return {
        type: USER_LOGOUT
    };
}

//
//  상태 초기값 설정
const initialState: UserAuth = {
    accessToken: "",
    refreshToken: "",
    isAuth: false,
    user: null,
}

export function userAuthReducer(state= initialState, action : UserAuthActionTypes) : UserAuth {

    switch (action.type) {
        case USER_LOGIN: return {
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
            isAuth: true,
            user: action.payload.user
        }
        case USER_LOGOUT: return initialState;
        default:
            return state;
    }
}