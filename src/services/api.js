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
