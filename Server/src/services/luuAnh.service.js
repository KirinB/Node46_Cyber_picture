import {
  BadRequestException,
  UnauthorizationException,
} from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";

export const luuAnhService = {
  create: async function (req) {
    const { userId, pictureId } = req.body;
    if ((!userId, !pictureId)) {
      throw new BadRequestException("Có gì đó không đúng ! ::001");
    }

    if (req.user.nguoi_dung_id !== userId) {
      throw new UnauthorizationException("Có gì đó không đúng ! ::003");
    }

    const saveImageExists = await prisma.luu_anh.findFirst({
      where: {
        nguoi_dung_id: userId,
        hinh_id: pictureId,
      },
    });

    if (saveImageExists) {
      throw new BadRequestException("Có gì đó không đúng ! ::002");
    }

    const currentDate = new Date();

    await prisma.luu_anh.create({
      data: {
        hinh_id: pictureId,
        nguoi_dung_id: userId,
        ngay_luu: currentDate,
      },
    });

    return `Đã lưu ảnh này`;
  },

  findAll: async function (req) {
    return `This action returns all saveImage`;
  },

  findOne: async function (req) {
    return `This action returns a id: ${req.params.id} saveImage`;
  },

  update: async function (req) {
    return `This action updates a id: ${req.params.id} saveImage`;
  },

  remove: async function (req) {
    let { userid, pictureid } = req.headers;

    userid = +userid;
    pictureid = +pictureid;

    if ((!userid, !pictureid)) {
      throw new BadRequestException("Có gì đó không đúng ! ::001");
    }

    if (req.user.nguoi_dung_id !== userid) {
      throw new UnauthorizationException("Có gì đó không đúng ! ::003");
    }

    const userExists = await prisma.nguoi_dung.findUnique({
      where: {
        nguoi_dung_id: userid,
      },
    });

    if (!userExists) {
      throw new BadRequestException("Có gì đó không đúng ! ::002");
    }

    const saveImageExists = await prisma.luu_anh.findFirst({
      where: {
        hinh_id: pictureid,
        nguoi_dung_id: userExists.nguoi_dung_id,
      },
    });

    if (!saveImageExists) {
      throw new BadRequestException("Có gì đó không đúng ! ::002");
    }

    await prisma.luu_anh.delete({
      where: {
        luu_anh_id: saveImageExists.luu_anh_id,
        nguoi_dung_id: saveImageExists.nguoi_dung_id,
      },
    });

    return `Đã xóa lưu ảnh này`;
  },

  getSaveImageForUser: async (req) => {
    const { id } = req.params;

    if (isNaN(id) || !Number.isInteger(+id)) {
      throw new BadRequestException("Có gì đó không đúng ! ::001");
    }

    const saveIamges = await prisma.luu_anh.findMany({
      where: {
        nguoi_dung_id: +id,
      },
      orderBy: {
        created_at: `desc`,
      },
      include: {
        hinh_anh: true,
      },
    });

    return saveIamges;
  },
};
