import express from "express";
import cors from "cors";
import { handleError } from "./common/helpers/error.helper.js";
import rootRouter from "./routes/root.router.js";
import path from "path";
import { __dirname } from "./common/middlewares/upload.middleware.js";
import { HOST, PORT } from "./common/constant/app.constant.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

console.log(__dirname);

app.use("/images", express.static(path.join(__dirname, "../../public/images")));

app.use(rootRouter);

app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server is running at port ${HOST}:${PORT}`);
});
