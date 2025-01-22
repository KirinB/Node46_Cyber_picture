import { BadRequestException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import fs from "fs";
import path from "path";
import { __dirname } from "./../common/middlewares/upload.middleware.js";
export const nguoiDungService = {
  create: async function (req) {
    return `This action create`;
  },

  findAll: async function (req) {
    const listUser = await prisma.nguoi_dung.findMany();
    return listUser;
  },

  findOne: async function (req) {
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

    return { ...userExists, mat_khau: undefined };
  },

  update: async function (req) {
    const { id } = req.params;
    const { hoTen, tuoi } = req.body;
    const file = req.file;

    // Kiểm tra xem người dùng có tồn tại không
    const userExists = await prisma.nguoi_dung.findUnique({
      where: {
        nguoi_dung_id: +id,
      },
    });

    if (!userExists) {
      if (file) {
        // Xóa file vừa upload nếu người dùng không tồn tại
        const filePath = path.join(
          __dirname,
          "../../public/images",
          file.filename
        );
        fs.unlinkSync(filePath);
      }
      throw new BadRequestException("Có gì đó không đúng ! ::002");
    }

    // Nếu có ảnh mới, xóa ảnh cũ (nếu có)
    let filePath = null;
    if (file) {
      if (userExists.anh_dai_dien) {
        const oldFilePath = path.join(
          __dirname,
          "../../public",
          userExists.anh_dai_dien
        );
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath); // Xóa ảnh cũ
        }
      }
      filePath = `/images/${file.filename}`; // Đường dẫn ảnh mới
    }

    // Tạo dữ liệu để cập nhật
    const updateData = {
      ...(hoTen && { ho_ten: hoTen }),
      ...(tuoi && { tuoi: +tuoi }),
      ...(file && { anh_dai_dien: filePath }),
    };

    if (Object.keys(updateData).length === 0) {
      throw new BadRequestException("Không có dữ liệu nào để cập nhật!");
    }

    // Cập nhật thông tin người dùng
    const updatedUser = await prisma.nguoi_dung.update({
      where: {
        nguoi_dung_id: +id,
      },
      data: updateData,
    });

    return { ...updatedUser, mat_khau: undefined }; // Không trả về mật khẩu
  },

  remove: async function (req) {
    return `This action removes a id: ${req.params.id} nguoiDung`;
  },
};
