import { http } from "./config";

const authService = {
  login: (data) => {
    return http.post("/auth/login", data);
  },
  register: (data) => {
    return http.post("/auth/register", data);
  },
  refreshToken: (tokens) => {
    return http.post(
      "/auth/refresh-token",
      {},
      {
        headers: {
          Authorization: `Bearer ${tokens.refreshToken}`,
          "x-access-token": `${tokens.accessToken}`,
        },
      }
    );
  },
};

export default authService;
