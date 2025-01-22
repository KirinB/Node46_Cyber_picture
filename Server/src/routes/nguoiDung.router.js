import express from "express";
import { nguoiDungController } from "../controller/nguoiDung.controller.js";
import { upload } from "../common/middlewares/upload.middleware.js";
import { protect } from "../common/middlewares/protect.middleware.js";

const nguoiDungRouter = express.Router();

// Tạo route CRUD
nguoiDungRouter.post("/", nguoiDungController.create);
nguoiDungRouter.get("/", nguoiDungController.findAll);
nguoiDungRouter.get("/:id", nguoiDungController.findOne);
nguoiDungRouter.patch(
  "/:id",
  protect,
  upload.single("image"),
  nguoiDungController.update
);
nguoiDungRouter.delete("/:id", nguoiDungController.remove);

export default nguoiDungRouter;
