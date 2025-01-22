import multer from "multer";
import path from "path";

import { fileURLToPath } from "url";

// Tạo __dirname
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

// Định nghĩa nơi lưu trữ và tên file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/images")); // Lưu file vào thư mục public/images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname); // Lấy đuôi file (vd: .jpg, .png)
    cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`); // Tạo tên file
  },
});

// Kiểm tra định dạng file
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG are allowed."), false);
  }
};

// Tạo middleware Multer
export const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
  fileFilter,
});
