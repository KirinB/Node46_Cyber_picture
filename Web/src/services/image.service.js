import { http } from "./config";

export const imageService = {
  upload: (formData, tokenAccess) => {
    return http.post("/hinh-anh/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${tokenAccess}`,
      },
    });
  },
  getListUploadedForUser: (userId, tokenAccess) => {
    return http.get(`/hinh-anh/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${tokenAccess}`,
      },
    });
  },
  getImageForId: (id) => {
    return http.get(`/hinh-anh/${id}`);
  },
};
