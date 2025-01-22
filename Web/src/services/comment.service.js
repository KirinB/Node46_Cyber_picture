import { http } from "./config";

export const commentService = {
  getListCommentForPictureId: (id, page = 1, pageSize = 10) => {
    return http.get(
      `/binh-luan/lay-binh-luan-theo-hinh-anh/${id}?page=${page}&pageSize=${pageSize}`
    );
  },
  create: (data) => {
    return http.post(`/binh-luan/`, data);
  },
};
