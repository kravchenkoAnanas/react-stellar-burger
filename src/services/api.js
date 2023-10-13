const config = {
  "baseUrl": "https://norma.nomoreparties.space/api",
  "headers": {
    'Content-Type': 'application/json'
  }
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`RejectError: ${res.status}`);
}

export const catchError = (error) => {
  console.log(`CatchError: ${error}`)
};

export const getData = async () => {
  return fetch(`${config.baseUrl}/ingredients`)
    .then(checkResponse)
};

export const postOrder = async (ids) => {
  return fetch(`${config.baseUrl}/orders`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        ingredients: ids,
      })
    })
    .then(checkResponse)
};

export const forgotPassword = async (email) => {
  return fetch(`${config.baseUrl}/password-reset`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        email: email,
      })
    })
    .then(checkResponse)
};

export const resetPassword = async (password, token) => {
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

export const registerUser = async (email, password, name) => {
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
