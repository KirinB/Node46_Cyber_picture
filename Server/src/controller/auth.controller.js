import { responseSuccess } from "../common/helpers/response.helper.js";
import { authService } from "../services/auth.service.js";

export const authController = {
  login: async function (req, res, next) {
    try {
      const result = await authService.login(req);
      const response = responseSuccess(result, `Login successfully`);
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  register: async function (req, res, next) {
    try {
      const result = await authService.register(req);
      const response = responseSuccess(result, `Register successfully`);
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  refreshToken: async function (req, res, next) {
    try {
      const result = await authService.refreshToken(req);
      const response = responseSuccess(result, `Refresh token successfully`);
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};
