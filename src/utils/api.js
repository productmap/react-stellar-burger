const url = "https://norma.nomoreparties.space/api";

const headers = {
    // headers: {
    //     "Content-Type": "application/json; charset=UTF-8",
    // },
};

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export async function getIngredients() {
    let res = await fetch(`${url}/ingredients`, {
        method: "GET",
        headers: headers,
    });
    return checkResponse(res);
}

export async function orderBurger(data) {
    const test = {"ingredients": ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa093c"]}
    let res = await fetch(`${url}/orders`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(test),
    });
    // console.log(JSON.stringify(data))
    return checkResponse(res);
}
