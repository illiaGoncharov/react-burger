const api = "https://norma.nomoreparties.space/api/";

export const refreshToken = async () => {
  try {
    const response = await fetch(`${api}auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    });

    if (!response.ok) {
      return Promise.reject("Failed to refresh token");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch (error) {
    return Promise.reject(error);
  }
};

const fetchWithRefresh = async (url, options, attempts = 2) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok && response.status === 401 && attempts > 0) {
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        options.headers.authorization = newAccessToken;
        return fetchWithRefresh(url, options, attempts - 1);
      } else {
        return Promise.reject("Failed to refresh token");
      }
    }

    if (!response.ok) {
      return Promise.reject("Request failed");
    }

    return response.json();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const apiIngredients = () => {
  return fetchWithRefresh(api + "ingredients", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
  });
};

export const apiOrder = (ingredientsData) => {
  return fetchWithRefresh(api + "orders", {
    method: "POST",
    body: JSON.stringify({
      ingredients: ingredientsData.map((el) => el._id),
    }),
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken"),
    },
  });
};

export const apiUserReg = (email, password, name) => {
  return fetchWithRefresh(api + "auth/register", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const apiUserLogIn = (email, password) => {
  return fetchWithRefresh(api + "auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const apiUserLogOut = () => {
  return fetchWithRefresh(api + "auth/logout", {
    method: "POST",
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const apiGetUser = () => {
  return fetchWithRefresh(api + "auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
  });
};

export const apiForgotPassword = (email) => {
  return fetchWithRefresh(api + "password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: email,
    },
  });
};

export const apiResetPassword = (password, token) => {
  return fetchWithRefresh(api + "password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      password: password,
      token: token,
    },
  });
};

export const apiPostUser = (email, name) => {
  return fetchWithRefresh(api + "auth/user", {
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
  });
};
