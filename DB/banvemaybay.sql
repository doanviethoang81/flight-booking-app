-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th4 08, 2025 lúc 07:27 AM
-- Phiên bản máy phục vụ: 9.1.0
-- Phiên bản PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `banvemaybay`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chuyen_bay`
--

DROP TABLE IF EXISTS `chuyen_bay`;
CREATE TABLE IF NOT EXISTS `chuyen_bay` (
  `id` int NOT NULL AUTO_INCREMENT,
  `san_bay_di` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `san_bay_den` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ngay_gio_di` datetime DEFAULT NULL,
  `ngay_gio_den` datetime DEFAULT NULL,
  `hang_bay` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `chuyen_bay`
--

INSERT INTO `chuyen_bay` (`id`, `san_bay_di`, `san_bay_den`, `ngay_gio_di`, `ngay_gio_den`, `hang_bay`) VALUES
(1, 'Nội bài', 'Pleiku', '2025-03-07 00:00:00', '2025-03-08 02:00:00', 'Bamboo'),
(12, 'SGN', 'PQC', '2025-03-05 17:00:00', '2025-03-05 19:00:00', 'VJ'),
(13, 'SGN', 'PQC', '2025-03-06 09:10:00', '2025-03-06 12:10:00', 'VJ'),
(14, 'PQC', 'SGN', '2025-03-07 09:10:00', '2025-03-07 12:10:00', 'VJ'),
(15, 'SGN', 'HAN', '2025-04-03 06:20:00', '2025-04-03 08:25:00', 'VJ'),
(16, 'HAN', 'SGN', '2025-04-05 22:10:00', '2025-04-06 00:20:00', 'VJ'),
(17, 'SGN', 'HAN', '2025-04-08 16:25:00', '2025-04-08 18:35:00', 'W2');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khach_hang`
--

DROP TABLE IF EXISTS `khach_hang`;
CREATE TABLE IF NOT EXISTS `khach_hang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ho` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ten` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ngay_sinh` date DEFAULT NULL,
  `danh_xung` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `loai_khach_hang` enum('Người lớn','Trẻ em','Em bé') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `so_ho_chieu` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ngay_het_han` date DEFAULT NULL,
  `quoc_gia_cap` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `khach_hang`
--

INSERT INTO `khach_hang` (`id`, `ho`, `ten`, `ngay_sinh`, `danh_xung`, `loai_khach_hang`, `so_ho_chieu`, `ngay_het_han`, `quoc_gia_cap`) VALUES
(1, 'Đoàn', 'Hoàng', '2000-03-19', 'Ông', 'Người lớn', '67656784', '2025-03-31', 'Việt Nam'),
(2, 'Nguyễn', 'Hào', '2020-03-11', 'Ông', 'Người lớn', '76865432', '2025-05-22', 'Việt Nam'),
(3, 'Văn', 'Long', '2020-03-22', 'Ông', 'Em bé', '98987675', '2025-07-17', 'Việt Nam'),
(41, 'Quoc Hao', 'Nguyen', '2025-03-05', 'Ông', 'Người lớn', '12345678', '2025-03-23', 'Việt Nam'),
(42, 'Phuc Thinh', 'Nguyen', '2025-03-25', 'Ông', 'Người lớn', '12346678', '2025-03-23', 'Việt Nam'),
(43, 'Việt Hoàng', 'Đoàn ', '2025-04-07', 'Ông', 'Người lớn', '99999999', '2026-03-23', 'Việt Nam'),
(44, 'Việt Hoàng', 'Đoàn ', '2025-04-07', 'Ông', 'Người lớn', '12345678', '2025-03-23', 'Việt Nam'),
(45, 'Quoc Hao', 'Nguyen', '2025-03-05', 'Ông', 'Người lớn', '12345678', '2025-03-23', 'Việt Nam'),
(46, 'Phuc Thinh', 'Nguyen', '2025-03-25', 'Ông', 'Người lớn', '12346678', '2025-03-23', 'Việt Nam'),
(47, 'Quoc Hao', 'Nguyen', '2025-03-05', 'Ông', 'Người lớn', '12345678', '2025-03-23', 'Việt Nam'),
(48, 'Phuc Thinh', 'Nguyen', '2025-03-25', 'Ông', 'Người lớn', '12346678', '2025-03-23', 'Việt Nam'),
(49, 'Việt Hoàng', 'Đoàn ', '2025-04-07', 'Ông', 'Người lớn', '12345678', '2025-03-23', 'Việt Nam'),
(50, 'Việt Hoàng', 'Đoàn ', '2025-04-07', 'Ông', 'Người lớn', '12345678', '2025-03-23', 'Việt Nam'),
(51, 'Quoc Hao', 'Nguyen', '2025-03-05', 'Ông', 'Người lớn', '12345678', '2025-03-23', 'Việt Nam'),
(52, 'Phuc Thinh', 'Nguyen', '2025-03-25', 'Ông', 'Người lớn', '12346678', '2025-03-23', 'Việt Nam'),
(53, 'Quoc Hao', 'Nguyen', '2025-03-05', 'Ông', 'Người lớn', '12345678', '2025-03-23', 'Việt Nam'),
(54, 'Phuc Thinh', 'Nguyen', '2025-03-25', 'Ông', 'Người lớn', '12346678', '2025-03-23', 'Việt Nam'),
(55, 'Việt Hoàng', 'Đoàn ', '2025-04-07', 'Ông', 'Người lớn', '12345678', '2025-03-23', 'Việt Nam'),
(56, 'Việt Hoàng', 'Đoàn ', '2025-04-07', 'Ông', 'Người lớn', '12345678', '2025-03-23', 'Việt Nam'),
(57, 'Quoc Hao', 'Nguyen', '2025-03-05', 'Ông', 'Người lớn', '12345678', '2025-03-23', 'Việt Nam'),
(58, 'Phuc Thinh', 'Nguyen', '2025-03-25', 'Ông', 'Người lớn', '12346678', '2025-03-23', 'Việt Nam'),
(59, 'Quoc Hao', 'Nguyen', '2025-03-05', 'Ông', 'Người lớn', '12345678', '2025-03-23', 'Việt Nam'),
(60, 'Phuc Thinh', 'Nguyen', '2025-03-25', 'Ông', 'Người lớn', '12346678', '2025-03-23', 'Việt Nam'),
(61, 'Việt Hoàng', 'Đoàn ', '2025-04-07', 'Ông', 'Người lớn', '12345678', '2025-03-23', 'Việt Nam'),
(62, 'Quoc Hao', 'Nguyen', '2025-03-05', 'Ông', 'Người lớn', '12345678', '2025-03-23', 'Việt Nam'),
(63, 'Phuc Thinh', 'Nguyen', '2025-03-25', 'Ông', 'Người lớn', '12346678', '2025-03-23', 'Việt Nam'),
(64, 'Quoc Hao', 'Nguyen', '2025-03-05', 'Ông', 'Người lớn', '12345678', '2025-03-23', 'Việt Nam'),
(65, 'Phuc Thinh', 'Nguyen', '2025-03-25', 'Ông', 'Người lớn', '12346678', '2025-03-23', 'Việt Nam'),
(66, 'Việt Hoàng', 'Đoàn ', '2025-04-07', 'Ông', 'Người lớn', '12345678', '2025-03-23', 'Việt Nam'),
(67, 'Quoc Hao', 'Nguyen', '2025-03-05', 'Ông', 'Người lớn', '12345678', '2025-03-23', 'Việt Nam'),
(68, 'Phuc Thinh', 'Nguyen', '2025-03-25', 'Ông', 'Người lớn', '12346678', '2025-03-23', 'Việt Nam'),
(69, 'Quoc Hao', 'Nguyen', '2025-03-05', 'Ông', 'Người lớn', '12345678', '2025-03-23', 'Việt Nam'),
(70, 'Phuc Thinh', 'Nguyen', '2025-03-25', 'Ông', 'Người lớn', '12346678', '2025-03-23', 'Việt Nam'),
(71, 'Việt Hoàng', 'Đoàn ', '2025-04-07', 'Ông', 'Người lớn', '12345678', '2025-03-23', 'Việt Nam'),
(72, 'Việt Hoàng', 'Đoàn ', '2025-04-07', 'Ông', 'Người lớn', '12345678', '2025-03-23', 'Việt Nam'),
(73, 'Hoa', 'Nguyễn', '2000-03-30', 'Bà', 'Người lớn', '88899977', '2025-04-25', 'Việt Nam'),
(74, 'Hoa', 'Nguyễn', '2000-03-30', 'Bà', 'Người lớn', '88899977', '2025-04-25', 'Việt Nam'),
(75, 'Văn A', 'Nguyễn ', '2025-04-05', 'Ông', 'Người lớn', '89087867', '2025-05-01', 'Việt Nam'),
(76, 'Thị Hoa', 'Nguyễn ', '2000-04-07', 'Bà', 'Người lớn', '45676897', '2025-03-23', 'Việt Nam');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoidat_roles`
--

DROP TABLE IF EXISTS `nguoidat_roles`;
CREATE TABLE IF NOT EXISTS `nguoidat_roles` (
  `nguoidat_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`nguoidat_id`,`role_id`),
  KEY `role_id` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `nguoidat_roles`
--

INSERT INTO `nguoidat_roles` (`nguoidat_id`, `role_id`) VALUES
(13, 1),
(18, 1),
(19, 2),
(20, 2),
(21, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoi_dat`
--

DROP TABLE IF EXISTS `nguoi_dat`;
CREATE TABLE IF NOT EXISTS `nguoi_dat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ho` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ten` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `so_dien_thoai` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activation_code_expiry` datetime(6) DEFAULT NULL,
  `activation_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `enable` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `nguoi_dat`
--

INSERT INTO `nguoi_dat` (`id`, `ho`, `ten`, `so_dien_thoai`, `email`, `activation_code_expiry`, `activation_code`, `password`, `provider`, `enable`) VALUES
(1, 'Doan', 'Hoang', '0333756188', 'hoang@gmail.com', NULL, NULL, NULL, NULL, NULL),
(2, 'Nguyễn', 'Lộc', '0999888777', 'loc@gmail.com', NULL, NULL, NULL, NULL, NULL),
(9, 'Phan', 'Quang', '0937027877', 'phanquang.work@gmail.com', NULL, NULL, NULL, NULL, NULL),
(13, NULL, 'Việt Hoàng', NULL, 'h@gmail.com', '2025-04-02 17:35:14.623800', NULL, '$2a$10$5/gnnA7oD1eoyW7c/1aRsOX9blAj5o4/Mzw0ImwrFxjfCFDuWd3ye', 'LOCAL', b'1'),
(16, 'Nguyễn Văn', 'Hoàng', '0999888111', 'a@gmail.com', NULL, NULL, NULL, NULL, NULL),
(17, 'Nguyễn', 'Quang', '0111222333', 'hoangdoanviet81@gmail.com', NULL, NULL, NULL, NULL, NULL),
(18, 'Đoàn', 'Việt Hoàng', '0909999453', 'admin@gmail.com', '2025-04-02 18:41:43.790520', NULL, '$2a$10$8NIcI.ZZIReiOEd0DKjyu.JKB5peTQBz3ExN03qxuDsiCH6XM3N7y', 'LOCAL', b'1'),
(19, 'Việt', 'Hoàng Đoàn', NULL, 'doanviethoang110503@gmail.com', NULL, NULL, '$2a$10$d90tO5AAGA5zYLTfzQfwfOnJWpPJpn7v4f4Tl03BTueOPeWiwqliu', 'GOOGLE', b'1'),
(20, NULL, 'Hoang Doan', NULL, 'hoangdoanviet11@gmail.com', NULL, NULL, NULL, 'GOOGLE', b'1'),
(21, NULL, 'Hào', NULL, 'doanviethoangvvv123@gmail.com', '2025-04-06 17:33:37.756673', NULL, '$2a$10$pTgnJs8/wXCGbuZdr15KJeRKzzq6sEnpIKfLqv.DvkTNmUB1oyJVu', 'LOCAL', b'1'),
(22, 'Nguyễn', 'Văn A', '0345267678', 'hoang@gmail.com', NULL, NULL, NULL, NULL, NULL),
(23, 'Nguyễn Thị', 'Hoa', '0999454542', 'hoa@gmail.com', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieu_dat_ve`
--

DROP TABLE IF EXISTS `phieu_dat_ve`;
CREATE TABLE IF NOT EXISTS `phieu_dat_ve` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_ve` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_thong_tin_dat_ve` int DEFAULT NULL,
  `id_khach_hang` int DEFAULT NULL,
  `id_chuyen_bay` int DEFAULT NULL,
  `ngay_dat` date DEFAULT NULL,
  `hang_ve` enum('Phổ thông','Thương gia','Hạng nhất') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gia_ve` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ma_ve` (`ma_ve`),
  KEY `id_thong_tin_dat_ve` (`id_thong_tin_dat_ve`),
  KEY `id_khach_hang` (`id_khach_hang`),
  KEY `id_chuyen_bay` (`id_chuyen_bay`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `phieu_dat_ve`
--

INSERT INTO `phieu_dat_ve` (`id`, `ma_ve`, `id_thong_tin_dat_ve`, `id_khach_hang`, `id_chuyen_bay`, `ngay_dat`, `hang_ve`, `gia_ve`) VALUES
(1, '1', 1, 1, 1, '2025-01-05', 'Phổ thông', 500000.00),
(3, '2', 1, 2, 1, '2025-02-05', 'Phổ thông', 600000.00),
(4, '3', 1, 3, 1, '2025-03-05', 'Phổ thông', 700000.00),
(5, '4', 2, 1, 1, '2025-02-07', 'Thương gia', 1000000.00),
(47, '03975054', 25, 41, 13, '2025-02-17', 'Phổ thông', 1260000.00),
(48, '09667257', 26, 41, 13, '2025-03-17', 'Phổ thông', 1260000.00),
(49, '03634152', 27, 41, 13, '2025-03-17', 'Phổ thông', 1260000.00),
(50, '09449414', 28, 41, 13, '2025-03-17', 'Phổ thông', 1260000.00),
(51, '06888340', 29, 41, 13, '2025-03-17', 'Phổ thông', 1260000.00),
(100, '06523107', 54, 61, 13, '2025-04-03', 'Phổ thông', 2260000.00),
(101, '07206171', 55, 62, 14, '2025-04-03', 'Phổ thông', 1260000.00),
(102, '05689135', 55, 63, 14, '2025-04-03', 'Phổ thông', 1260000.00),
(103, '05022601', 55, 64, 13, '2025-04-03', 'Phổ thông', 1260000.00),
(104, '03407047', 55, 65, 13, '2025-04-03', 'Phổ thông', 1260000.00),
(105, '04763917', 56, 66, 13, '2025-04-03', 'Phổ thông', 2260000.00),
(106, '07185322', 57, 67, 14, '2025-04-03', 'Phổ thông', 1260000.00),
(107, '04406992', 57, 68, 14, '2025-04-03', 'Phổ thông', 1260000.00),
(108, '02952063', 57, 69, 13, '2025-04-03', 'Phổ thông', 1260000.00),
(109, '00482733', 57, 70, 13, '2025-04-03', 'Phổ thông', 1260000.00),
(110, '08475836', 58, 71, 13, '2025-04-03', 'Phổ thông', 2260000.00),
(111, '01850302', 59, 72, 13, '2025-04-03', 'Phổ thông', 2260000.00),
(112, '03613573', 60, 73, 16, '2025-04-03', 'Phổ thông', 1761000.00),
(113, '04528393', 60, 74, 15, '2025-04-03', 'Phổ thông', 1761000.00),
(114, '07221064', 61, 75, 17, '2025-04-08', 'Phổ thông', 2151000.00),
(115, '06204517', 62, 76, 13, '2025-04-08', 'Phổ thông', 2260000.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `image_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `created_at`, `image_url`) VALUES
(7, 'TOUR TRUNG QUỐC HẤP DẪN ĐANG CHỜ ĐÓN BẠN!', '**TOUR TRUNG QUỐC HẤP DẪN ĐANG CHỜ ĐÓN BẠN!**\r\n\r\nTrung Quốc - nơi hội tụ đầy đủ tinh hoa văn hóa, ẩm thực, du lịch và cũng là điểm đến đã đốn tim không biết bao nhiêu du khách đã từng ghé thăm đất nước này. Những ai chưa đi sẽ ao ước muốn đi, còn những ai đã đi rồi sẽ nhớ mãi những kỷ niệm đẹp nơi đây. Du lịch tour Trung Quốc quả thật là một chuyến đi bạn nên trải nghiệm trong năm nay. Hãy cùng Zoom Travel khám phá hết vẻ đẹp của “Đất nước tỷ dân” này nhé!\r\n![](https://zoomtravel.vn/upload/images/Thi%E1%BA%BFt%20k%E1%BA%BF%20ch%C6%B0a%20c%C3%B3%20t%C3%AAn%20-%202023-10-23T152154_215.png)\r\nTrung Quốc là đất nước láng giềng rộng lớn của Việt Nam nên nếu đi du lịch đến đây sẽ không mất quá nhiều thời gian di chuyển của bạn. Chắc hẳn, đã không ít lần bạn say mê những khung cảnh thiên nhiên hay những điểm tham quan độc đáo từng xuất hiện trên phim ảnh. Đúng rồi đấy, Trung Quốc có rất nhiều địa điểm tham quan nổi tiếng gắn liền với lịch sử lâu đời và những quang cảnh thiên nhiên hùng vĩ. Phải nói nơi đây được khai thác du lịch rất tốt nên đã thu hút rất đông du khách tham gia tour Trung Quốc mỗi năm. \r\n\r\nQuốc gia này không những được thiên nhiên ưu ái hết mực mà còn được tạo hóa ban tặng cho những thắng cảnh đẹp tựa thiên đường. Với 4 mùa rõ rệt Xuân, Hạ, Thu, Đông mỗi mùa Trung Quốc lại mang một vẻ đẹp khác nhau. Trong suốt tour Trung Quốc bạn sẽ được trải nghiệm qua những địa điểm mang vẻ đẹp tự nhiên có cũng mang giá trị lịch sử có. Trung Quốc được biết đến như một quốc gia nổi bật với những tòa nhà chọc trời của cuộc sống hiện đại. Bên cạnh đó, vẫn còn có những công trình kiến trúc đã tồn tại được hàng trăm năm khiến du khách không khỏi tò mò muốn đến đây khám phá. \r\n\r\n**Thời điểm đi tour Trung Quốc**\r\nVào bất kỳ tháng nào trong năm bạn cũng có thể đi du lịch tour Trung Quốc bởi nơi đây có khí hậu đặc trưng của 4 mùa. Vào mùa nào Trung Quốc cũng thu hút không ít khách du lịch từ khắp nơi đổ về. \r\n![](https://zoomtravel.vn/upload/images/Thi%E1%BA%BFt%20k%E1%BA%BF%20ch%C6%B0a%20c%C3%B3%20t%C3%AAn%20(98).png)\r\n\r\nMùa xuân (tháng 3 - tháng 5): Thời tiết Trung Quốc thường khá dễ chịu và rất ấm áp. Lúc này mọi vật từ cây cối cho đến cảnh vật đều khoác lên mình một màu sắc mới, tràn đầy sức sống. Vào mùa này, bạn có thể lựa chọn những tour Trung Quốc đến những thành phố như Côn Minh, Hàng Châu hay Phượng Hoàng Cổ Trấn. Nơi đây sẽ cho bạn được đắm chìm trong thiên đường hoa với sắc hồng nhẹ nhàng của hoa hải đường, sắc trắng tinh khôi của hoa mận hay sắc đỏ thắm đượm của hoa đào đỏ. \r\n\r\n', '2025-03-30 18:38:50', '21e408d6-af5f-4e7a-9553-e116137f8045_Thiết kế chưa có tên - 2023-10-23T152154_215.png'),
(13, 'sfsd', 'adsfsd', '2025-04-02 11:48:03', NULL),
(14, 'adsfasdf', 'ádfds', '2025-04-02 11:48:11', '8576a349-6af7-4869-b6cf-5e7d6b6e7e72_Screenshot 2024-05-09 002441.png'),
(15, 'sadfasdf', 'ádfasdf', '2025-04-02 11:48:42', '16437b39-aaf2-4ff9-a71e-00ae4d5da747_chuoi.jpg'),
(16, 'adf', 'ádf', '2025-04-02 21:34:09', NULL),
(17, 'ádfadsf', 'ấdfsadf', '2025-04-02 21:34:13', NULL),
(18, '2', '23', '2025-04-02 21:34:17', NULL),
(21, '234234', '4234', '2025-04-02 21:34:28', NULL),
(23, 'Mỹ: Áp thuế 46% đối với 90% hàng hóa nhập khẩu từ Việt Nam', 'Tổng thống Mỹ Donald Trump chiều 2-4 (giờ địa phương) đã công bố áp mức thuế cơ bản 10% đối với hàng nhập khẩu từ tất cả các quốc gia và vùng lãnh thổ trên thế giới và mức thuế quan cao hơn đối với hàng chục quốc gia có thặng dư thương mại với Mỹ.\r\nPhát biểu tại Vườn Hồng trong khuôn viên Nhà Trắng, Tổng thống Trump đã chỉ trích những gì ông mà cho là thuế nhập khẩu “cao hơn nhiều” đối với hàng hóa từ Mỹ so với mức thuế mà nền kinh tế lớn nhất thế giới áp dụng cho các nước khác đối với hàng xuất khẩu của mình.\r\nNgoài mức thuế cơ bản 10%, chính quyền Trump cũng sẽ áp dụng thuế đối ứng đối với các quốc gia khác mà Nhà Trắng coi là có sự mất cân bằng thương mại với Mỹ. Mức thuế này sẽ bằng một nửa mức thuế mà các quốc gia đó áp dụng cho hàng xuất khẩu của Mỹ.\r\n![https://file3.qdnd.vn/data/images/0/2025/04/03/upload_2080/5.jpeg?dpi=150&quality=100&w=870](https://)', '2025-04-02 21:37:09', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'ROLE_ADMIN'),
(2, 'ROLE_USER');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thong_tin_dat_ve`
--

DROP TABLE IF EXISTS `thong_tin_dat_ve`;
CREATE TABLE IF NOT EXISTS `thong_tin_dat_ve` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_nguoi_dat` int DEFAULT NULL,
  `loai_thanh_toan` enum('momo','vnpay') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trang_thai_thanh_toan` enum('Thành công','Thất bại','Chờ thanh toán') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tong_tien` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_nguoi_dat` (`id_nguoi_dat`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `thong_tin_dat_ve`
--

INSERT INTO `thong_tin_dat_ve` (`id`, `id_nguoi_dat`, `loai_thanh_toan`, `trang_thai_thanh_toan`, `tong_tien`) VALUES
(1, 1, 'vnpay', 'Thành công', 1800000.00),
(2, 2, 'vnpay', 'Thành công', 1000000.00),
(4, 1, 'momo', 'Thất bại', 1000000.00),
(14, 9, 'vnpay', 'Thành công', 100000.00),
(15, 9, 'vnpay', 'Chờ thanh toán', 100000.00),
(18, 9, 'vnpay', 'Chờ thanh toán', 100000.00),
(19, 9, 'vnpay', 'Thất bại', 100000.00),
(20, 9, 'vnpay', 'Thành công', 100000.00),
(21, 9, 'vnpay', 'Chờ thanh toán', 100000.00),
(22, 9, 'vnpay', 'Chờ thanh toán', 100000.00),
(23, 9, 'vnpay', 'Chờ thanh toán', 100000.00),
(24, 9, 'vnpay', 'Chờ thanh toán', 100000.00),
(25, 9, 'vnpay', 'Thất bại', 100000.00),
(26, 9, 'vnpay', 'Chờ thanh toán', 100000.00),
(27, 9, 'vnpay', 'Chờ thanh toán', 200000.00),
(28, 9, 'vnpay', 'Chờ thanh toán', 200000.00),
(29, 9, 'vnpay', 'Chờ thanh toán', 200000.00),
(54, 16, 'vnpay', 'Thành công', 2260000.00),
(55, 17, 'vnpay', 'Thành công', 200000.00),
(56, 16, 'vnpay', 'Thành công', 2260000.00),
(57, 17, 'vnpay', 'Thành công', 200000.00),
(58, 16, 'vnpay', 'Thành công', 2260000.00),
(59, 16, 'vnpay', 'Thành công', 2260000.00),
(60, 17, 'vnpay', 'Thành công', 3522000.00),
(61, 22, 'vnpay', 'Chờ thanh toán', 2151000.00),
(62, 23, 'vnpay', 'Thành công', 2260000.00);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `nguoidat_roles`
--
ALTER TABLE `nguoidat_roles`
  ADD CONSTRAINT `nguoidat_roles_ibfk_1` FOREIGN KEY (`nguoidat_id`) REFERENCES `nguoi_dat` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `nguoidat_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `phieu_dat_ve`
--
ALTER TABLE `phieu_dat_ve`
  ADD CONSTRAINT `phieu_dat_ve_ibfk_1` FOREIGN KEY (`id_thong_tin_dat_ve`) REFERENCES `thong_tin_dat_ve` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `phieu_dat_ve_ibfk_2` FOREIGN KEY (`id_khach_hang`) REFERENCES `khach_hang` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `phieu_dat_ve_ibfk_3` FOREIGN KEY (`id_chuyen_bay`) REFERENCES `chuyen_bay` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `thong_tin_dat_ve`
--
ALTER TABLE `thong_tin_dat_ve`
  ADD CONSTRAINT `thong_tin_dat_ve_ibfk_1` FOREIGN KEY (`id_nguoi_dat`) REFERENCES `nguoi_dat` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
