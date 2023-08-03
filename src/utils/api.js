const url = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export default function getIngredients() {
  return fetch(`${url}/ingredients`).then(checkResponse);
}
