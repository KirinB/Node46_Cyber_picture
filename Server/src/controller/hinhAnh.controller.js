import { responseSuccess } from "../common/helpers/response.helper.js";
import { hinhAnhService } from "../services/hinhAnh.service.js";

export const hinhAnhController = {
  create: async function (req, res, next) {
    try {
      const result = await hinhAnhService.create(req);
      const response = responseSuccess(result, `Create image successfully`);
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  findAll: async function (req, res, next) {
    try {
      const result = await hinhAnhService.findAll(req);
      const response = responseSuccess(result, `Get all image successfully`);
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  findOne: async function (req, res, next) {
    try {
      const result = await hinhAnhService.findOne(req, next);
      const response = responseSuccess(
        result,
        `Get image #${req.params.id} successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  update: async function (req, res, next) {
    try {
      const result = await hinhAnhService.update(req);
      const response = responseSuccess(
        result,
        `Update image #${req.params.id} successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  remove: async function (req, res, next) {
    try {
      const result = await hinhAnhService.remove(req);
      const response = responseSuccess(
        result,
        `Remove image #${req.params.id} successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  findWithPagination: async function (req, res, next) {
    try {
      const result = await hinhAnhService.findWithPagination(req);
      const response = responseSuccess(
        result,
        `Find with pagination successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  getImageForUser: async function (req, res, next) {
    try {
      const result = await hinhAnhService.getImageForUser(req);
      const response = responseSuccess(
        result,
        `Get image for user successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};
