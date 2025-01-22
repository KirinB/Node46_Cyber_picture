import express from "express";
import { hinhAnhController } from "../controller/hinhAnh.controller.js";
import { upload } from "../common/middlewares/upload.middleware.js";
import { protect } from "../common/middlewares/protect.middleware.js";

const hinhAnhRouter = express.Router();

// Tạo route CRUD
hinhAnhRouter.post(
  "/",
  protect,
  upload.single("image"),
  hinhAnhController.create
);
hinhAnhRouter.get("/", hinhAnhController.findAll);
hinhAnhRouter.get("/:id(\\d+)", hinhAnhController.findOne);
hinhAnhRouter.patch("/:id", hinhAnhController.update);
hinhAnhRouter.delete("/:id", hinhAnhController.remove);
hinhAnhRouter.get("/user/:id", protect, hinhAnhController.getImageForUser);
hinhAnhRouter.get("/phan-trang/", hinhAnhController.findWithPagination);

export default hinhAnhRouter;
