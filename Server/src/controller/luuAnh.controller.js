import { responseSuccess } from "../common/helpers/response.helper.js";
import { luuAnhService } from "../services/luuAnh.service.js";

export const luuAnhController = {
  create: async function (req, res, next) {
    try {
      const result = await luuAnhService.create(req);
      const response = responseSuccess(result, `Create luuAnh successfully`);
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  findAll: async function (req, res, next) {
    try {
      const result = await luuAnhService.findAll(req);
      const response = responseSuccess(result, `Get all luuAnhs successfully`);
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  findOne: async function (req, res, next) {
    try {
      const result = await luuAnhService.findOne(req);
      const response = responseSuccess(
        result,
        `Get luuAnh #${req.params.id} successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  update: async function (req, res, next) {
    try {
      const result = await luuAnhService.update(req);
      const response = responseSuccess(
        result,
        `Update luuAnh #${req.params.id} successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  remove: async function (req, res, next) {
    try {
      const result = await luuAnhService.remove(req);
      const response = responseSuccess(
        result,
        `Remove luuAnh #${req.params.id} successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  getSaveImageForUser: async function (req, res, next) {
    try {
      const result = await luuAnhService.getSaveImageForUser(req);
      const response = responseSuccess(
        result,
        `getSaveImageForUser luuAnh #${req.params.id} successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};
