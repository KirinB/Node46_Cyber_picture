import { BadRequestException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import { __dirname } from "../common/middlewares/upload.middleware.js";
import path from "path";
import fs from "fs";

export const hinhAnhService = {
  create: async function (req) {
    const { title, description, userId } = req.body;
    const file = req.file;
    console.log({ title, description, userId, file });

    if (!file || !title || !description || !userId) {
      if (file) {
        const filePath = path.join(
          __dirname,
          "../../public/images",
          file.filename
        );
        fs.unlinkSync(filePath);
      }
      throw new BadRequestException("Có gì đó không đúng ! ::001");
    }

    const userExists = await prisma.nguoi_dung.findUnique({
      where: {
        nguoi_dung_id: +userId,
      },
    });

    if (!userExists) {
      if (file) {
        const filePath = path.join(
          __dirname,
          "../../public/images",
          file.filename
        );
        fs.unlinkSync(filePath);
      }
      throw new BadRequestException("Có gì đó không đúng ! ::002");
    }

    const filePath = `/images/${file.filename}`;

    await prisma.hinh_anh.create({
      data: {
        ten_hinh: title,
        mo_ta: description,
        nguoi_dung_id: +userId,
        duong_dan: filePath,
      },
    });

    return "Upload hình ảnh thành công!";
  },

  findAll: async function (req) {
    const pictures = await prisma.hinh_anh.findMany({
      orderBy: {
        created_at: `desc`,
      },
    });
    return pictures;
  },

  findOne: async function (req, next) {
    const { id } = req.params;

    const pictureExists = await prisma.hinh_anh.findUnique({
      where: {
        hinh_id: +id,
      },
      include: {
        nguoi_dung: true,
      },
    });

    if (!pictureExists) {
      throw new BadRequestException("Có gì đó không đúng ! ::002");
    }

    pictureExists.nguoi_dung.mat_khau = undefined;

    return pictureExists;
  },

  update: async function (req) {
    return `This action updates a id: ${req.params.id} hinhAnh`;
  },

  remove: async function (req) {
    return `This action removes a id: ${req.params.id} hinhAnh`;
  },

  findWithPagination: async (req) => {
    let { page, pageSize } = req.query;
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 10;

    const skip = (page - 1) * pageSize;
    const totalItem = await prisma.hinh_anh.count();
    const totalPage = Math.ceil(totalItem / pageSize);
    const picture = await prisma.hinh_anh.findMany({
      take: pageSize,
      skip,
      orderBy: {
        created_at: `desc`,
      },
    });

    return {
      page,
      pageSize,
      totalPage,
      totalItem,
      items: picture || [],
    };
  },
  getImageForUser: async (req) => {
    const { id } = req.params;

    if (isNaN(id) || !Number.isInteger(+id)) {
      throw new BadRequestException("Có gì đó không đúng ! ::001");
    }

    const userExists = await prisma.nguoi_dung.findUnique({
      where: {
        nguoi_dung_id: +id,
      },
    });

    if (!userExists) {
      throw new BadRequestException("Có gì đó không đúng ! ::002");
    }

    const images = await prisma.hinh_anh.findMany({
      where: {
        nguoi_dung_id: userExists.nguoi_dung_id,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return images;
  },
};
