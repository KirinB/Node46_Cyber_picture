import {
  ACCESS_TOKEN_EXPIRED,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRED,
  REFRESH_TOKEN_SECRET,
} from "../common/constant/app.constant.js";
import {
  BadRequestException,
  UnauthorizationException,
} from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authService = {
  register: async (req) => {
    const { email, password, name, age } = req.body;

    if (!email && !password && !name && !age) {
      throw new BadRequestException("Có gì đó không đúng ! ::001");
    }

    const userExists = await prisma.nguoi_dung.findFirst({
      where: {
        email,
      },
    });

    if (userExists) throw new BadRequestException("Tài khoản đã tồn tại");

    const passHash = bcrypt.hashSync(password, 10);

    const newUser = await prisma.nguoi_dung.create({
      data: {
        email,
        mat_khau: passHash,
        ho_ten: name,
        tuoi: +age,
      },
    });

    return { ...newUser, mat_khau: undefined };
  },

  login: async function (req) {
    const { email, password } = req.body;

    if (!email && !password) {
      throw new BadRequestException("Có gì đó không đúng ! ::001");
    }

    const userExists = await prisma.nguoi_dung.findFirst({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new BadRequestException("Tài khoản chưa tồn tại !");
    }

    const isSuccess = bcrypt.compareSync(password, userExists.mat_khau);

    if (!isSuccess) {
      throw new BadRequestException("Email hoặc mật khẩu không đúng !");
    }

    const tokens = authService.createTokens(userExists.nguoi_dung_id);

    return { user: { ...userExists, mat_khau: undefined }, tokens };
  },

  createTokens: (userId) => {
    if (!userId) throw new BadRequestException("Có gì đó không đúng ::002");
    const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRED,
    });
    const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRED,
    });
    return {
      accessToken,
      refreshToken,
    };
  },
  refreshToken: async (req) => {
    const refreshToken = req.headers.authorization?.split(" ")[1];

    if (!refreshToken) {
      throw new UnauthorizationException(
        "Vui lòng cung cấp token để tiếp tục sử dụng"
      );
    }

    const accessToken = req.headers[`x-access-token`];

    if (!accessToken) {
      throw new UnauthorizationException(
        "Vui lòng cung cấp token để tiếp tục sử dụng"
      );
    }

    const decodeRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    const decodeAccessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET, {
      ignoreExpiration: true,
    });

    // console.log({ decodeRefreshToken, decodeAccessToken });

    if (decodeRefreshToken.userId !== decodeAccessToken.userId) {
      throw new UnauthorizationException("Cặp token không hợp lệ");
    }

    const userExits = await prisma.nguoi_dung.findUnique({
      where: {
        nguoi_dung_id: decodeAccessToken.userId,
      },
    });

    if (!userExits) throw new UnauthorizationException("User không tồn tại");

    const tokens = authService.createTokens(userExits.nguoi_dung_id);

    return tokens;
  },
};
