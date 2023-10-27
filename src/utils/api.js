const BASE_URL = "https://norma.nomoreparties.space/api/";

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка ${response.status}`);
};

const checkSuccess = (response) => {
  if (response && response.success) {
    return response;
  }
  return Promise.reject(`Ответ не success: ${response}`);
};

const request = (endpoint, options) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

export const refreshToken = async () => {
  try {
    const response = await request("auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    });

    const { accessToken } = response;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchWithRefresh = async (endpoint, options) => {
  try {
    const response = await fetch(endpoint, options);
    return await checkResponse(response);
  } catch (error) {
    console.log(error);
    if (error.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const response = await fetch(endpoint, options);
      return await checkResponse(response);
    } else {
      return Promise.reject(error);
    }
  }
};

export const apiIngredients = () => {
  return request("ingredients", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
  });
};

export const apiOrder = (ingredientsData) => {
  return request("orders", {
    method: "POST",
    body: JSON.stringify({
      ingredients: ingredientsData.map((el) => el._id),
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
  }).then((response) => {
    return checkResponse(response);
  });
};

export const apiUserReg = (email, password, name) => {
  return request("auth/register", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return checkResponse(res);
  });
};

export const apiUserLogIn = (email, password) => {
  return request("auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return checkResponse(response);
  });
};

export const apiUserLogOut = () => {
  return request("auth/logout", {
    method: "POST",
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return checkResponse(response);
  });
};

export const apiGetUser = () => {
  return fetchWithRefresh(`${BASE_URL}auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
  });
};

export const apiForgotPassword = (email) => {
  return request("password-reset", {
    method: "POST",
    headers: { "Content-Type": "application/json",
    email: email,
    },
  }).then((response) => {
    return checkResponse(response);
  });
};

export const apiResetPassword = (password, token) => {
  return request("password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      password: password,
      token: token,
    },
  }).then((response) => {
    return checkResponse(response);
  });
};

export const apiPostUser = (email, name) => {
  return fetchWithRefresh(`${BASE_URL}auth/user`, {
    method: "PATCH",
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
      email: email,
      name: name,
    }),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
  }).catch((error) => console.log(error));
};
