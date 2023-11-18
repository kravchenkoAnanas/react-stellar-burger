import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "./actions/wsActions";

const config = {
  "baseUrl": "https://norma.nomoreparties.space/api",
  "headers": {
    'Content-Type': 'application/json'
  }
}

export const wsConfig = {
  "url": "wss://norma.nomoreparties.space/orders",
  "actions": {
    wsInit: WS_CONNECTION_START,
    wsClose: WS_CONNECTION_CLOSE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
  }
};

function checkResponse(res: any) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`RejectError: ${res.status}`);
}

export const catchError = (error: any) => {
  console.log(`CatchError: ${error}`)
};

export const getData = async () => {
  return fetch(`${config.baseUrl}/ingredients`)
    .then(checkResponse)
};

export const postOrder = async (ids: any) => {
  const headers = {
    ...config.headers,
    Authorization: 'Bearer ' + localStorage.getItem("accessToken")
  };

  return fetch(`${config.baseUrl}/orders`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        ingredients: ids,
      })
    })
    .then(checkResponse)
};

export const forgotPassword = async (email: any) => {
  return fetch(`${config.baseUrl}/password-reset`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        email: email,
      })
    })
    .then(checkResponse)
};

export const resetPassword = async (password: any, token: any) => {
  return fetch(`${config.baseUrl}/password-reset/reset`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        password: password,
        token: token
      })
    })
    .then(checkResponse)
};

export const registerUser = async (email: any, password: any, name: any) => {
  return fetch(`${config.baseUrl}/auth/register`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    })
    .then(checkResponse)
};

export const loginUser = (email: any, password: any) => {
  return fetch(`${config.baseUrl}/auth/login`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      email: email,
      password: password,
    })
  })
  .then(checkResponse)
}

export const logoutUser = async (refreshToken: any) => {
  return fetch(`${config.baseUrl}/auth/logout`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      token: refreshToken,
    })
  })
  .then(checkResponse)
}

export const refreshUser = async (refreshToken: any) => {
  return fetch(`${config.baseUrl}/auth/token`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      token: refreshToken,
    })
  })
  .then(checkResponse)
}

export const getUser = async () => {
  const headers = {
    ...config.headers,
    Authorization: 'Bearer ' + localStorage.getItem("accessToken")
  };

  return await fetch(`${config.baseUrl}/auth/user`, {
    method: 'GET',
    headers: headers,
  })
  .then(checkResponse)
}

export const updateUser = async (info: any) => {
  const headers = {
    ...config.headers,
    Authorization: 'Bearer ' + localStorage.getItem("accessToken")
  };

  return fetch(`${config.baseUrl}/auth/user`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(info)
  })
  .then(checkResponse)
}
