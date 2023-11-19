import { IMessage, IUser } from "../types";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_CLOSE: 'WS_CONNECTION_CLOSE' = 'WS_CONNECTION_CLOSE';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
export const WS_USER_NAME_UPDATE: 'WS_USER_NAME_UPDATE' = 'WS_USER_NAME_UPDATE';

export interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
}
export interface IWSConnectionClose {
    readonly type: typeof WS_CONNECTION_CLOSE;
}
export interface IWSConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWSConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWSConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWSGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    payload: IMessage;
}
export interface IWSSendMessage {
    readonly type: typeof WS_SEND_MESSAGE;
}
export interface IWSUserNameUpdate {
    readonly type: typeof WS_USER_NAME_UPDATE;
    payload: IUser;
}
export type TWsActions =
    | IWSConnectionStart
    | IWSConnectionClose
    | IWSConnectionSuccess
    | IWSConnectionError
    | IWSConnectionClosed
    | IWSGetMessage
    | IWSSendMessage
    | IWSUserNameUpdate;
