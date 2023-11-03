export const registerUser = async (username, mail, password) => {
  const errors = [];
  let isLogin = false;
  console.log("register");
  await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: mail,
      name: username,
      password: password,
    }),
  })
    .then(async (response) => {
      const body = await response.json();
      if (response.status == 400 || response.status == 401) {
        switch (body.message) {
          case "user already exist": {
            errors.push("User already exist");
            break;
          }

          case "no body": {
            errors.push("Empty field for mail or name");
          }
          default: {
            errors.push("Unknown error");
            console.log("Unknown error", body);
          }
        }
        return;
      }
      if (!response.status == 200 && !response.status == 201) {
        errors.push("Unknown error");
        console.log("unknown error", body, response.status);
        return;
      }
      if (body.status !== "success") {
        errors.push("Unknown register error");
        console.log("unknown register error", body, response.status);
        return;
      }

      const jwtToken = body.token;
      localStorage.setItem("token", jwtToken);
      isLogin = true;
    })

    .catch((error) => {
      this.errors.push("Unknown register error");
      console.log("unknown catch error", error);
    });
  return { isLogin, errors };
};
export const loginUser = async (mail, password) => {
  const errors = [];
  let isLogin = false;

  console.log("login");
  await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: mail,
      password: password,
    }),
  }).then(async (response) => {
    const body = await response.json();
    if (response.status == 400) {
      switch (body.message) {
        case "no body": {
          errors.push("Empty field for mail or password");
          break;
        }
        case "user or password incorrect": {
          errors.push("User or password incorrect");
          break;
        }

        default:
          errors.push("Unknown error");
          console.log("Unknown error", body);
          break;
      }
      return;
    }
    if (!response.status == 200 && !response.status == 201) {
      errors.push("Unknown error");
      console.log("unknown error", body, response.status);
      return;
    }
    if (body.status !== "success") {
      errors.push("Unknown login error");
      console.log("unknown login error", body, response.status);
      return;
    }
    const jwtToken = body.token;
    localStorage.setItem("token", jwtToken);
    isLogin = true;
  });
  return { isLogin, errors };
};
export const getToken = () => {
  return localStorage.getItem("token");
};
export const checkAuth = async () => {
  const authResp = {
    isLogin: false,
    errors: [],
  };
  const token = getToken();
  if (!token) {
    authResp.errors.push("No token found");
    return authResp;
  }
  await fetch("/api/auth/check", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .catch((error) => {
      authResp.errors.push("Unknown error");
      console.log("unknown error", error);
    })
    .then(async (response) => {
      if (response.status != 200 && response.status != 201) {
        authResp.errors.push("Unknown error");
        console.log("unknown error", response.status);
        return;
      }

      const body = await response.json();
      if (body.status !== "success") {
        authResp.errors.push("Unknown error");
        console.log("unknown error", body, response.status);
        return;
      }

      authResp.isLogin = true;
    });
  return authResp;
};
