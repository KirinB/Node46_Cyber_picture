import { BadRequestException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";

export const binhLuanService = {
  create: async function (req) {
    const { userId, pictureId, content } = req.body;

    if (!userId || !pictureId || !content) {
      throw new BadRequestException("Có gì đó không đúng ! ::001");
    }

    const currentDate = new Date();

    const newComment = await prisma.binh_luan.create({
      data: {
        hinh_id: pictureId,
        nguoi_dung_id: userId,
        noi_dung: content,
        ngay_binh_luan: currentDate,
      },
    });

    return newComment;
  },

  findAll: async function (req) {
    const comments = await prisma.binh_luan.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
    return comments;
  },

  findOne: async function (req) {
    return `This action returns a id: ${req.params.id} binhLuan`;
  },

  update: async function (req) {
    return `This action updates a id: ${req.params.id} binhLuan`;
  },

  remove: async function (req) {
    const { id } = req.params;

    if (isNaN(id) || !Number.isInteger(+id)) {
      throw new BadRequestException("Có gì đó không đúng ! ::001");
    }

    const commentExists = await prisma.binh_luan.findUnique({
      where: {
        binh_luan_id: +id,
      },
    });

    if (!commentExists) {
      throw new BadRequestException(`Bình luận với id ${id} không tồn tại.`);
    }

    await prisma.binh_luan.delete({
      where: {
        binh_luan_id: +id,
      },
    });
    return `Đã xóa bình luận với id: ${id}`;
  },
  getCommentForPicture: async (req) => {
    const { id } = req.params;

    let { page, pageSize } = req.query;
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 10;

    const skip = (page - 1) * pageSize;
    const totalItem = await prisma.binh_luan.count({
      where: {
        hinh_id: +id,
      },
    });

    const totalPage = Math.ceil(totalItem / pageSize);
    const comments = await prisma.binh_luan.findMany({
      take: pageSize,
      skip,
      orderBy: {
        created_at: `desc`,
      },
      where: {
        hinh_id: +id,
      },
      include: {
        nguoi_dung: true,
      },
    });

    comments.forEach((comment) => {
      if (comment.nguoi_dung) {
        comment.nguoi_dung.mat_khau = undefined;
      }
    });

    return {
      page,
      pageSize,
      totalPage,
      totalItem,
      item: comments || [],
    };
  },
};
