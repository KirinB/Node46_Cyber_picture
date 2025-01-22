import express from "express";
import { binhLuanController } from "../controller/binhLuan.controller.js";

const binhLuanRouter = express.Router();

// Tạo route CRUD
binhLuanRouter.post("/", binhLuanController.create);
binhLuanRouter.get("/", binhLuanController.findAll);
binhLuanRouter.get("/:id(\\d+)", binhLuanController.findOne);
binhLuanRouter.patch("/:id", binhLuanController.update);
binhLuanRouter.delete("/:id", binhLuanController.remove);
binhLuanRouter.get(
  "/lay-binh-luan-theo-hinh-anh/:id",
  binhLuanController.getCommentForPicture
);

export default binhLuanRouter;
