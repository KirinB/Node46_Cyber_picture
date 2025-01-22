import express from "express";
import nguoiDungRouter from "./nguoiDung.router.js";
import authRouter from "./auth.router.js";
import hinhAnhRouter from "./hinhAnh.router.js";
import binhLuanRouter from "./binhLuan.router.js";
import luuAnhRouter from "./luuAnh.router.js";

const rootRouter = express.Router();

rootRouter.use("/nguoi-dung", nguoiDungRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/hinh-anh", hinhAnhRouter);
rootRouter.use("/binh-luan", binhLuanRouter);
rootRouter.use("/luu-anh", luuAnhRouter);

export default rootRouter;
