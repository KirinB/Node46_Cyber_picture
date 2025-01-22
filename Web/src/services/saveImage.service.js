import { http } from "./config";

export const saveImage = {
  create: (data, token) => {
    return http.post("/luu-anh", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  remove: (userId, pictureId, token) => {
    return http.delete(`/luu-anh/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        userId,
        pictureId,
      },
    });
  },

  getListSaveImageForUserId: (userId) => {
    return http.get(`/luu-anh/user/${userId}`);
  },
};
