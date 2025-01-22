import { ACCESS_TOKEN_SECRET } from "../constant/app.constant.js";
import { UnauthorizationException } from "../helpers/error.helper.js";
import prisma from "../prisma/init.prisma.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      throw new UnauthorizationException("Có gì đó không đúng ! ::004");
    }

    const decode = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

    const user = await prisma.nguoi_dung.findUnique({
      where: {
        nguoi_dung_id: decode.userId,
      },
    });

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
