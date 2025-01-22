import express from "express";
import { luuAnhController } from "../controller/luuAnh.controller.js";
import { protect } from "../common/middlewares/protect.middleware.js";

const luuAnhRouter = express.Router();

// Tạo route CRUD
luuAnhRouter.post("/", protect, luuAnhController.create);
luuAnhRouter.get("/", luuAnhController.findAll);
luuAnhRouter.get("/:id(\\d+)", luuAnhController.findOne);
luuAnhRouter.patch("/:id", luuAnhController.update);
luuAnhRouter.delete("/", protect, luuAnhController.remove);
luuAnhRouter.get("/user/:id", luuAnhController.getSaveImageForUser);

export default luuAnhRouter;
