import express from "express";
import { authController } from "../controller/auth.controller.js";

const authRouter = express.Router();

// Tạo route CRUD
authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.post("/refresh-token", authController.refreshToken);

export default authRouter;
