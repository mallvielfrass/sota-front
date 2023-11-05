import { getToken } from "./auth";

export const apiGetUsers = async (limit, offset) => {
  const users = [];
  const token = getToken();
  await fetch("/api/user", {
    method: "GET",
    params: {
      limit: limit,
      offset: offset,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    const body = await response.json();
    if (response.status != 200) {
      return;
    }
    if (!body.users) {
      return;
    }
    if (body.users.length == 0) {
      return;
    }
    users.push(...body.users);
  });
  return users;
};
export const apiGetUser = async (id) => {
  let user = {};
  let error = null;
  const token = getToken();
  await fetch(`/api/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    const body = await response.json();
    if (response.status != 200) {
      error = body.error;

      return;
    }
    if (!body.user) {
      error = "Unknown error";
      return;
    }
    user = body.user;
  });
  return {
    user: user,
    error: error,
  };
};
