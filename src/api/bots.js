import { getToken } from "@/api/auth";
export const getBots = async () => {
  const bots = [];
  const token = getToken();
  await fetch("/api/auth/user/bots", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  }).then(async (response) => {
    const body = await response.json();
    if (response.status != 200) {
      return;
    }
    if (!body.bots) {
      return;
    }
    if (body.bots.length == 0) {
      return;
    }
    bots.push(...body.bots);
  });
  return bots;
};
