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

export const getData = async (setIngredients, setChosenIngredients) => {
  fetch(`${config.baseUrl}/ingredients`)
    .then(checkResponse)
    .then((dataFromServer) => {
      setIngredients(dataFromServer.data);
      setChosenIngredients([dataFromServer.data[0]]);
    })
    .catch((error) => {
      console.log(`CatchError: ${error}`)
    })
}

export const sendOrder = async (ids, setState) => {
  fetch(`${config.baseUrl}/orders`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        ingredients: ids,
      })
    })
    .then(checkResponse)
    .then((dataFromServer) => {
      if (dataFromServer.success) {
        setState({
          visible: true,
          orderNumber: dataFromServer.order.number
        });
      }
    })
    .catch((error) => {
      console.log(`CatchError: ${error}`)
    })
}