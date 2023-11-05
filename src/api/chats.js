import { getToken } from "@/api/auth";
export const createChat = async (name, botIdentifier) => {
  const token = getToken();
  let resp = {
    chat: null,
    error: null,
  };
  const chat = await fetch("/api/auth/user/chats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({
      name: name,
      botIdentifier: botIdentifier,
    }),
  })
    .then(async (response) => {
      const body = await response.json();
      if (response.status != 200) {
        resp.error = body.error;
        return;
      }
      return body;
    })
    .catch((error) => {
      console.log(error);
      resp.error = error;
    });

  console.log("chat", chat);
  resp.chat = chat;
  return resp;
};
export const updateChat = async (id, updatedObj) => {
  const token = getToken();
  let resp = {
    chat: null,
    error: null,
  };
  const chat = await fetch(`/api/auth/user/chats/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(updatedObj),
  })
    .then(async (response) => {
      const body = await response.json();
      if (response.status != 200) {
        resp.error = body.error;
        return;
      }

      return body;
    })
    .catch((error) => {
      console.log(error);
      resp.error = error;
    });
  console.log("chat", chat);
  resp.chat = chat;
  return resp;
};
export const apiGetChats = async () => {
  const chats = [];
  const token = getToken();
  await fetch("/api/dialog", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    const body = await response.json();
    if (response.status != 200) {
      return;
    }
    if (!body.dialogs) {
      return;
    }
    if (body.dialogs.length == 0) {
      return;
    }

    chats.push(...body.dialogs);
  });
  return chats;
};
export const apiGetOrCreatePrivateDialog = async (userId) => {
  const token = getToken();
  // POST /api/dialog/private/${userId}
  let dialogId = "";
  let error = null;
  await fetch(`/api/dialog/private/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    if (response.status != 200 && response.status != 201) {
      error = await response.json();
      return;
    }
    const res = await response.json();
    if (!res.dialog._id) {
      error = "Unknown error";
      return;
    }
    console.log("dialog:", res.dialog);
    dialogId = res.dialog._id;
  });
  return {
    dialogId: dialogId,
    error: error,
  };
};
