import { responseSuccess } from "../common/helpers/response.helper.js";
import { nguoiDungService } from "../services/nguoiDung.service.js";

export const nguoiDungController = {
  create: async function (req, res, next) {
    try {
      const result = await nguoiDungService.create(req);
      const response = responseSuccess(result, `Create user successfully`);
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  findAll: async function (req, res, next) {
    try {
      const result = await nguoiDungService.findAll(req);
      const response = responseSuccess(result, `Get all user successfully`);
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  findOne: async function (req, res, next) {
    try {
      const result = await nguoiDungService.findOne(req);
      const response = responseSuccess(
        result,
        `Get user #${req.params.id} successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  update: async function (req, res, next) {
    try {
      const result = await nguoiDungService.update(req);
      const response = responseSuccess(
        result,
        `Update user #${req.params.id} successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  remove: async function (req, res, next) {
    try {
      const result = await nguoiDungService.remove(req);
      const response = responseSuccess(
        result,
        `Remove user #${req.params.id} successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};
