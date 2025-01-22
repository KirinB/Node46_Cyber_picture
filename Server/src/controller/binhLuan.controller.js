import { responseSuccess } from "../common/helpers/response.helper.js";
import { binhLuanService } from "../services/binhLuan.service.js";

export const binhLuanController = {
  create: async function (req, res, next) {
    try {
      const result = await binhLuanService.create(req);
      const response = responseSuccess(result, `Create binhLuan successfully`);
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  findAll: async function (req, res, next) {
    try {
      const result = await binhLuanService.findAll(req);
      const response = responseSuccess(
        result,
        `Get all binhLuans successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  findOne: async function (req, res, next) {
    try {
      const result = await binhLuanService.findOne(req);
      const response = responseSuccess(
        result,
        `Get binhLuan #${req.params.id} successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  update: async function (req, res, next) {
    try {
      const result = await binhLuanService.update(req);
      const response = responseSuccess(
        result,
        `Update binhLuan #${req.params.id} successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  remove: async function (req, res, next) {
    try {
      const result = await binhLuanService.remove(req);
      const response = responseSuccess(
        result,
        `Remove binhLuan #${req.params.id} successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  getCommentForPicture: async function (req, res, next) {
    try {
      const result = await binhLuanService.getCommentForPicture(req);
      const response = responseSuccess(result, `Lay Binh luan theo anh`);
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};
