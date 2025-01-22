import { http } from "./config";

export const userService = {
  getUserforId: (id) => {
    return http.get(`/nguoi-dung/${id}`);
  },
  updateUserforId: (id, formData, tokenAccess) => {
    return http.patch(`/nguoi-dung/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${tokenAccess}`,
      },
    });
  },
};
