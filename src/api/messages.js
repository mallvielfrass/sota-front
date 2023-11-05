import { getToken } from "@/api/auth";
export const apiSendMessage = async (chatId, message) => {
  const token = getToken();
  let resp = {
    message: null,
    error: null,
  };
  await fetch(`/api/message/${chatId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text: message,
    }),
  }).then(async (response) => {
    if (response.status != 200 && response.status != 201) {
      resp.error = await response.json();
      return;
    }
    const res = await response.json();
    const message = res.message;
    if (!message) {
      console.log("err res:", res);
      resp.error = "message not created";
      return;
    }
    if (!message.cId) {
      console.log("err res:", res);
      resp.error = "message id not found";
      return;
    }
    resp.message = message;
  });
  return resp;
};
