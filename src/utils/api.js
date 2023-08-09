const url = "https://norma.nomoreparties.space/api";
const headers = {
    "Content-Type": "application/json; charset=UTF-8"
};

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export async function getIngredients() {
    const res = await fetch(`${url}/ingredients`, {
        method: "GET",
        headers: headers,
    });
    return checkResponse(res);
}

export async function orderBurger(data) {
    const res = await fetch(`${url}/orders`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ingredients: data}),
    });
    return checkResponse(res);
}
