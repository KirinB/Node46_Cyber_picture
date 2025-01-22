/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `binh_luan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `hinh_id` int DEFAULT NULL,
  `ngay_binh_luan` date DEFAULT NULL,
  `noi_dung` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`binh_luan_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hinh_anh` (
  `hinh_id` int NOT NULL AUTO_INCREMENT,
  `ten_hinh` varchar(255) DEFAULT NULL,
  `duong_dan` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`hinh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `hinh_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `luu_anh` (
  `luu_anh_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `hinh_id` int DEFAULT NULL,
  `ngay_luu` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`luu_anh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `luu_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `luu_anh_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `ho_ten` varchar(255) NOT NULL,
  `tuoi` int DEFAULT NULL,
  `anh_dai_dien` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`, `created_at`, `updated_at`) VALUES
(3, 4, 26, '2025-01-22', 'wow that dep', '2025-01-22 03:09:06', '2025-01-22 03:09:06');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`, `created_at`, `updated_at`) VALUES
(4, 8, 26, '2025-01-22', 'wow that dep!!!!!!', '2025-01-22 03:09:29', '2025-01-22 03:09:29');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`, `created_at`, `updated_at`) VALUES
(5, 7, 26, '2025-01-22', 'wow that dep!!!!!!', '2025-01-22 03:09:35', '2025-01-22 03:09:35');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`, `created_at`, `updated_at`) VALUES
(6, 6, 26, '2025-01-22', 'wow that dep!!!!!!', '2025-01-22 03:09:37', '2025-01-22 03:09:37'),
(7, 4, 26, '2025-01-22', 'Amazinggggg', '2025-01-22 05:32:42', '2025-01-22 05:32:42'),
(8, 4, 26, '2025-01-22', 'Testtt', '2025-01-22 05:33:11', '2025-01-22 05:33:11'),
(9, 4, 24, '2025-01-22', 'Tuyệt vời quá', '2025-01-22 05:38:14', '2025-01-22 05:38:14'),
(10, 4, 24, '2025-01-22', 'Tuyệt vời quá', '2025-01-22 05:38:43', '2025-01-22 05:38:43');

INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`, `created_at`, `updated_at`) VALUES
(11, 'Amazing', '/images/image-1737384229225-35081099.jpg', 'Amazing', 4, '2025-01-20 14:43:49', '2025-01-20 14:43:49');
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`, `created_at`, `updated_at`) VALUES
(12, 'Amazing', '/images/image-1737384235546-580863370.jpg', 'Amazing', 4, '2025-01-20 14:43:56', '2025-01-20 14:43:56');
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`, `created_at`, `updated_at`) VALUES
(13, 'Amazing', '/images/image-1737384239851-829393301.jpg', 'Amazing', 4, '2025-01-20 14:44:00', '2025-01-20 14:44:00');
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`, `created_at`, `updated_at`) VALUES
(14, 'Amazing', '/images/image-1737384244405-912404616.jpg', 'Amazing', 4, '2025-01-20 14:44:04', '2025-01-20 14:44:04'),
(15, 'Amazing', '/images/image-1737384248442-160645495.jpg', 'Amazing', 4, '2025-01-20 14:44:08', '2025-01-20 14:44:08'),
(16, 'Amazing', '/images/image-1737384253141-62278367.jpg', 'Amazing', 4, '2025-01-20 14:44:13', '2025-01-20 14:44:13'),
(17, 'Amazing', '/images/image-1737384256797-570449556.jpg', 'Amazing', 4, '2025-01-20 14:44:17', '2025-01-20 14:44:17'),
(18, 'Amazing', '/images/image-1737384260703-341278647.jpg', 'Amazing', 4, '2025-01-20 14:44:21', '2025-01-20 14:44:21'),
(19, 'Amazing', '/images/image-1737384266436-212944383.jpg', 'Amazing', 4, '2025-01-20 14:44:26', '2025-01-20 14:44:26'),
(20, 'Amazing', '/images/image-1737384270781-296405335.jpg', 'AmazingAmazingAmazing', 4, '2025-01-20 14:44:31', '2025-01-20 14:44:31'),
(21, 'Wow', '/images/image-1737384369800-802146040.jpg', 'wow', 4, '2025-01-20 14:46:10', '2025-01-20 14:46:10'),
(22, 'Naruto', '/images/image-1737384421987-548301940.jpg', 'sasukeeeeeee', 4, '2025-01-20 14:47:02', '2025-01-20 14:47:02'),
(23, 'Kakashi', '/images/image-1737384433412-427054187.jpg', 'Kamui\r\n', 4, '2025-01-20 14:47:13', '2025-01-20 14:47:13'),
(24, 'Pain', '/images/image-1737384444337-511199402.jpg', 'Pain', 4, '2025-01-20 14:47:24', '2025-01-20 14:47:24'),
(25, 'Madaraaaaa', '/images/image-1737498730271-39306342.jpg', 'MadaraaaaaMadaraaaaaMadaraaaaaMadaraaaaa', 4, '2025-01-21 22:32:10', '2025-01-21 22:32:10'),
(26, 'Viego', '/images/image-1737498741925-23025649.jpg', 'ViegoViegoViegoViegoViegoViego', 4, '2025-01-21 22:32:22', '2025-01-21 22:32:22');

INSERT INTO `luu_anh` (`luu_anh_id`, `nguoi_dung_id`, `hinh_id`, `ngay_luu`, `created_at`, `updated_at`) VALUES
(20, 4, 25, '2025-01-22', '2025-01-22 02:00:15', '2025-01-22 02:00:15');
INSERT INTO `luu_anh` (`luu_anh_id`, `nguoi_dung_id`, `hinh_id`, `ngay_luu`, `created_at`, `updated_at`) VALUES
(22, 4, 24, '2025-01-22', '2025-01-22 02:00:22', '2025-01-22 02:00:22');
INSERT INTO `luu_anh` (`luu_anh_id`, `nguoi_dung_id`, `hinh_id`, `ngay_luu`, `created_at`, `updated_at`) VALUES
(30, 4, 26, '2025-01-22', '2025-01-22 05:52:20', '2025-01-22 05:52:20');

INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`, `created_at`, `updated_at`) VALUES
(4, 'admin@gmail.com', '$2b$10$D/rF2uVHoC48HECjxlwnlOI1wsiv.4Sn4v3vuYUSjFu9ZpwvXkZJ.', 'Minh Nhan', 23, '/images/image-1737557397942-778578508.jpg', '2025-01-18 14:01:04', '2025-01-22 23:39:45');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`, `created_at`, `updated_at`) VALUES
(5, 'test@gmail.com', '$2b$10$3QzeLhk/VtN7UZuF9WzwdevXsVzwsbNHMPi6Vt7txGjmm0M8qAJWe', 'Minh Nhan', 27, NULL, '2025-01-19 11:08:28', '2025-01-19 11:08:28');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`, `created_at`, `updated_at`) VALUES
(6, '123@ga.com', '$2b$10$WGjIub4nq41tJ4a30qgpNOeqmjn/KQC0sGhnl6ssyX2Lyb5D92uBW', 'Lý Minh Nhân', 26, NULL, '2025-01-20 03:27:15', '2025-01-20 03:27:15');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`, `created_at`, `updated_at`) VALUES
(7, 'gydo@mailinator.com', '$2b$10$M8IORtJ4RzLltUiNWQAm5eBjlyFpJINdl.cu8UypNEjR.NDlZwTfW', 'Amaya Burch', 84, NULL, '2025-01-20 03:29:41', '2025-01-20 03:29:41'),
(8, 'zoxuju@mailinator.com', '$2b$10$7VPyxPyDdM2ULjwLCRV9BuGIyPhL2GMPoTb0ucsqtAMgr8lqklzFC', 'Martha Poole', 52, NULL, '2025-01-20 03:30:23', '2025-01-20 03:30:23');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;