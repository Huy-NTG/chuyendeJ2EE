-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Dec 01, 2025 at 11:41 AM
-- Server version: 8.0.43
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travel_booking`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `service_type` enum('TOUR','FLIGHT','HOTEL') NOT NULL,
  `tour_id` bigint DEFAULT NULL,
  `flight_id` bigint DEFAULT NULL,
  `hotel_id` bigint DEFAULT NULL,
  `booking_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('PENDING','CONFIRMED','CANCELLED') DEFAULT 'PENDING',
  `total_price` decimal(38,2) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `service_id` bigint NOT NULL
) ;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `service_type`, `tour_id`, `flight_id`, `hotel_id`, `booking_date`, `status`, `total_price`, `updated_at`, `service_id`) VALUES
(1, 3, 'TOUR', 2, NULL, NULL, '2025-11-20 06:37:10', 'CONFIRMED', 2500000.00, '2025-11-20 13:37:10.000000', 2),
(2, 4, 'HOTEL', NULL, NULL, 1, '2025-11-20 06:37:10', 'PENDING', 1800000.00, '2025-11-20 13:37:10.000000', 1),
(3, 5, 'FLIGHT', NULL, 3, NULL, '2025-11-20 06:37:10', 'CONFIRMED', 3200000.00, '2025-11-20 13:37:10.000000', 3),
(4, 6, 'TOUR', 5, NULL, NULL, '2025-11-20 06:37:10', 'PENDING', 2200000.00, '2025-11-20 13:37:10.000000', 5),
(5, 3, 'TOUR', 7, NULL, NULL, '2025-11-20 06:37:10', 'CANCELLED', 3000000.00, '2025-11-20 13:37:10.000000', 7),
(6, 4, 'FLIGHT', NULL, 8, NULL, '2025-11-20 06:37:10', 'CONFIRMED', 4100000.00, '2025-11-20 13:37:10.000000', 8),
(7, 6, 'FLIGHT', NULL, 10, NULL, '2025-11-20 06:37:10', 'PENDING', 4500000.00, '2025-11-20 13:37:10.000000', 10),
(8, 5, 'HOTEL', NULL, NULL, 4, '2025-11-20 06:37:10', 'CONFIRMED', 2700000.00, '2025-11-20 13:37:10.000000', 4),
(9, 3, 'HOTEL', NULL, NULL, 3, '2025-11-20 06:37:10', 'PENDING', 1900000.00, '2025-11-20 13:37:10.000000', 3);

-- --------------------------------------------------------

--
-- Table structure for table `flights`
--

CREATE TABLE `flights` (
  `id` bigint NOT NULL,
  `airline` varchar(255) DEFAULT NULL,
  `from_location` varchar(255) NOT NULL,
  `to_location` varchar(255) NOT NULL,
  `departure_time` datetime NOT NULL,
  `arrival_time` datetime NOT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `seats` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('ACTIVE','CANCELLED','FINISHED') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `flights`
--

INSERT INTO `flights` (`id`, `airline`, `from_location`, `to_location`, `departure_time`, `arrival_time`, `price`, `seats`, `created_at`, `status`) VALUES
(1, 'VietJet Air', 'Đà Nẵng', 'Hà Nội', '2025-10-24 23:00:00', '2025-10-25 00:20:00', 990000.00, 150, NULL, 'ACTIVE'),
(2, 'Vietnam Airlines', 'Hà Nội', 'Thành phố Hồ Chí Minh', '2025-10-25 07:00:00', '2025-10-25 09:10:00', 1550000.00, 180, '2025-10-24 04:25:51', 'ACTIVE'),
(3, 'Bamboo Airways', 'Hà Nội', 'Đà Nẵng', '2025-10-26 08:30:00', '2025-10-26 09:50:00', 1250000.00, 160, '2025-10-24 04:25:51', 'ACTIVE'),
(4, 'VietJet Air', 'Thành phố Hồ Chí Minh', 'Phú Quốc', '2025-10-27 13:00:00', '2025-10-27 14:10:00', 980000.00, 150, '2025-10-24 04:25:51', 'ACTIVE'),
(5, 'Vietnam Airlines', 'Hà Nội', 'Nha Trang', '2025-10-28 10:00:00', '2025-10-28 11:45:00', 1750000.00, 170, '2025-10-24 04:25:51', 'ACTIVE'),
(6, 'Bamboo Airways', 'Đà Nẵng', 'Cần Thơ', '2025-10-29 06:45:00', '2025-10-29 08:15:00', 1450000.00, 155, '2025-10-24 04:25:51', 'ACTIVE'),
(7, 'VietJet Air 1234565', 'Đắc Nông', 'Cà Mau', '2025-11-29 09:30:00', '2025-11-30 10:25:00', 9000000.00, 60, '2025-10-24 04:25:51', 'ACTIVE'),
(8, 'Vietnam Airlines', 'Hà Nội', 'Huế', '2025-10-31 12:15:00', '2025-10-31 13:30:00', 1190000.00, 140, '2025-10-24 04:25:51', 'ACTIVE'),
(9, 'Bamboo Airways', 'Hà Nội', 'Phú Quốc', '2025-11-01 15:00:00', '2025-11-01 17:10:00', 2100000.00, 160, '2025-10-24 04:25:51', 'ACTIVE'),
(10, 'VietJet Air', 'Đà Nẵng', 'Thành phố Hồ Chí Minh', '2025-11-02 19:00:00', '2025-11-02 20:20:00', 990000.00, 150, '2025-10-24 04:25:51', 'ACTIVE'),
(11, 'VietNam Airline', 'Cà Mau', 'TP Hồ Chí Minh', '2025-11-22 08:34:00', '2025-11-30 08:34:00', 600000.00, 10, NULL, 'ACTIVE'),
(12, 'aaaa', 'aaa', 'aaa', '2025-12-01 15:55:00', '2025-12-02 15:55:00', 2222.00, 222, NULL, 'ACTIVE');

-- --------------------------------------------------------

--
-- Table structure for table `hotels`
--

CREATE TABLE `hotels` (
  `id` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text,
  `available_rooms` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `img_url` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `hotels`
--

INSERT INTO `hotels` (`id`, `name`, `location`, `description`, `available_rooms`, `created_at`, `img_url`, `address`) VALUES
(1, 'Khách sạn InterContinental Đà Nẵng', 'Đà Nẵng', 'Khách sạn 5 sao sang trọng nhìn ra biển, phù hợp cho nghỉ dưỡng cao cấp.', 3, '2025-10-24 04:22:58', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBKCKrz5yKmFJCosglRJoG0AKMQBo_Up0l6Q&s', '123 Lê Lợi, Quận 1, TP.HCM'),
(2, 'Khách sạn Mường Thanh Luxury Hà Nội', 'Hà Nội', 'Nằm ở trung tâm thành phố, gần các địa điểm du lịch nổi tiếng.', 3, '2025-10-24 04:22:58', 'https://firsthotel.com.vn/wp-content/uploads/2019/06/M%E1%BA%B7t-ti%E1%BB%81n-First-Wing.jpg', '456 Trần Hưng Đạo, Quận 5, TP.HCM'),
(3, 'Khách sạn The Grand Hồ Tràm', 'Vũng Tàu', 'Resort cao cấp với hồ bơi và casino đẳng cấp quốc tế.', 3, '2025-10-24 04:22:58', 'https://firsthotel.com.vn/wp-content/uploads/2019/06/M%E1%BA%B7t-ti%E1%BB%81n-First-Wing.jpg', '789 Nguyễn Huệ, Quận 1, TP.HCM'),
(4, 'Khách sạn Dalat Palace', 'Đà Lạt', 'Khách sạn cổ điển mang phong cách Pháp, gần hồ Xuân Hương.', 3, '2025-10-24 04:22:58', 'https://firsthotel.com.vn/wp-content/uploads/2019/06/M%E1%BA%B7t-ti%E1%BB%81n-First-Wing.jpg', '25 Nguyễn Văn Linh, Quận 7, TP.HCM'),
(5, 'Khách sạn Sunlight Nha Trang', 'Nha Trang', 'Khách sạn gần bãi biển, dịch vụ thân thiện và tiện nghi.', 3, '2025-10-24 04:22:58', 'https://firsthotel.com.vn/wp-content/uploads/2019/06/M%E1%BA%B7t-ti%E1%BB%81n-First-Wing.jpg', '88 Pasteur, Phường Bến Nghé, Quận 1, TP.HCM');

-- --------------------------------------------------------

--
-- Table structure for table `hotel_images`
--

CREATE TABLE `hotel_images` (
  `id` bigint NOT NULL,
  `id_hotel` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `img_url` varchar(2048) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `hotel_images`
--

INSERT INTO `hotel_images` (`id`, `id_hotel`, `name`, `img_url`) VALUES
(1, 1, 'Lobby View', 'lobby_view_1.jpg'),
(2, 1, 'Room Deluxe', 'room_deluxe_1.webp'),
(3, 1, 'Hotel Exterior', 'exterior_1.jpg'),
(4, 2, 'Lobby View', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHkRJkBxjhhRVzg2dDMW78-WPPaSbA20Fy2w&s'),
(5, 2, 'Room Superior', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHkRJkBxjhhRVzg2dDMW78-WPPaSbA20Fy2w&s'),
(6, 2, 'Pool Area', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHkRJkBxjhhRVzg2dDMW78-WPPaSbA20Fy2w&s'),
(7, 3, 'Restaurant Inside', 'restaurant_inside_3.jpg'),
(8, 3, 'Suite Room', 'suite_room_3.webp'),
(9, 3, 'Hotel Exterior', 'exterior_3.jpg'),
(10, 4, 'Reception', 'reception_4.webp'),
(11, 4, 'Double Room', 'double_room_4.jpg'),
(12, 4, 'Sky View', 'sky_view_4.jpg'),
(13, 5, 'Garden View', 'garden_view_5.jpg'),
(14, 5, 'VIP Room', 'vip_room_5.webp'),
(15, 5, 'Swimming Pool', 'swimming_pool_5.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `name`, `description`) VALUES
(1, 'Châu Á', NULL),
(2, 'Châu Âu', NULL),
(3, 'Châu Phi', NULL),
(4, 'Châu Mỹ', NULL),
(5, 'Châu Úc', NULL),
(6, 'Miền Tây Nam Bộ', NULL),
(7, 'Miền Bắc', NULL),
(8, 'Miền Trung', NULL),
(9, 'Miền Đông Nam Bộ', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` bigint NOT NULL,
  `available` bit(1) DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `price` decimal(38,2) NOT NULL,
  `room_number` varchar(255) DEFAULT NULL,
  `hotel_id` bigint DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `available`, `capacity`, `price`, `room_number`, `hotel_id`, `image_url`) VALUES
(1, b'1', 2, 500000.00, '101', 1, NULL),
(2, b'1', 2, 800000.00, '102', 1, NULL),
(3, b'1', 4, 1200000.00, '201', 1, NULL),
(4, b'1', 2, 600000.00, 'A1', 2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz9aIE2GG8khVUdIKW6SfI0RyMVq2EpIyOHg&s'),
(5, b'1', 3, 850000.00, 'A2', 2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQagITagdYt8yxIr6WcsxKbxENlJfx4w47uCg&s'),
(6, b'1', 4, 1500000.00, 'B1', 2, NULL),
(7, b'1', 2, 600000.00, 'A1', 2, NULL),
(8, b'1', 3, 850000.00, 'A2', 2, NULL),
(9, b'1', 4, 1500000.00, 'B1', 2, NULL),
(10, b'1', 2, 450000.00, '01', 3, NULL),
(11, b'1', 2, 700000.00, '02', 3, NULL),
(12, b'1', 3, 1100000.00, '03', 3, NULL),
(13, b'1', 2, 650000.00, '1A', 4, NULL),
(14, b'1', 2, 900000.00, '1B', 4, NULL),
(15, b'1', 4, 2000000.00, '2A', 4, NULL),
(16, b'1', 2, 400000.00, 'R1', 5, NULL),
(17, b'1', 2, 600000.00, 'R2', 5, NULL),
(18, b'1', 4, 1000000.00, 'R3', 5, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tours`
--

CREATE TABLE `tours` (
  `id` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `seats` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_location` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tours`
--

INSERT INTO `tours` (`id`, `name`, `location`, `description`, `image_url`, `price`, `start_date`, `end_date`, `seats`, `created_at`, `id_location`) VALUES
(2, 'Thành phố Hồ Chí Minh - Bắc Ninh', 'Thành phố Hồ Chí Minh', 'Trong nước', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq1r52EZcDmyoAvlZeUsF5cL8TqNSgPgtMCA&s', 5000000.00, '2025-10-09', '2025-10-12', 10, '2025-09-09 12:16:05', 9),
(3, 'Thành phố Hồ Chí Minh - Bình Thuận', 'Thành phố Hồ Chí Minh', 'Trong nước', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq1r52EZcDmyoAvlZeUsF5cL8TqNSgPgtMCA&s', 3500000.00, '2025-11-05', '2025-11-07', 20, '2025-09-09 12:24:58', 9),
(4, 'Thành phố Hồ Chí Minh - Đà Lạt', 'Thành phố Hồ Chí Minh', 'Trong nước', 'DaLat.jpg', 4200000.00, '2025-12-15', '2025-12-18', 15, '2025-09-09 12:24:58', 9),
(5, 'Thành phố Hồ Chí Minh - Lào Cai', 'Thành phố Hồ Chí Minh', 'Trong nước', 'LaoCai.jpg', 6800000.00, '2026-01-10', '2026-01-14', 12, '2025-09-09 12:24:58', 9),
(6, 'Thành phố Hồ Chí Minh - Nha Trang', 'Thành phố Hồ Chí Minh', 'Trong nước', 'NhaTrang.webp', 3900000.00, '2026-02-20', '2026-02-23', 25, '2025-09-09 12:24:58', 9),
(7, 'Thành phố Hồ Chí Minh - Phú Quốc', 'Thành phố Hồ Chí Minh', 'Trong nước', 'PhuQuoc.jpg', 7200000.00, '2026-03-05', '2026-03-09', 18, '2025-09-09 12:24:58', 9),
(8, 'Thành phố Hồ Chí Minh - Quảng Trị', 'Thành phố Hồ Chí Minh', 'Trong nước', 'QuangTri.jpg', 5500000.00, '2026-04-12', '2026-04-16', 14, '2025-09-09 12:24:58', 9),
(9, 'Thành phố Hồ Chí Minh - Vũng Tàu', 'Thành phố Hồ Chí Minh', 'Trong nước', 'VungTau.jpg', 2800000.00, '2026-05-08', '2026-05-09', 30, '2025-09-09 12:24:58', 9),
(16, 'Bắc Ninh - Quảng Trị', 'Bắc Ninh', 'Trong Nước', '9480ac99-477e-48f4-8342-764cb75bc1d4_HoangHon1.webp', 60000000.00, '2025-10-23', '2025-10-28', 20, '2025-10-26 16:13:04', NULL),
(17, 'Quang', 'Bắc Ninh', 'Quang Agular', '9693cb90-0013-4356-925d-0bdc52322b8f_buildings-1869425_1920.jpg', 80000000.00, '2025-10-14', '2025-10-30', 25, '2025-10-27 07:07:11', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tour_images`
--

CREATE TABLE `tour_images` (
  `id` bigint NOT NULL,
  `id_tour` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `img_url` varchar(2048) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tour_images`
--

INSERT INTO `tour_images` (`id`, `id_tour`, `name`, `img_url`) VALUES
(19, 2, 'Ảnh 1', 'BacNinh_1.jpg'),
(20, 2, 'Ảnh 2', 'BacNinh_2.jpg'),
(21, 2, 'Ảnh 3', 'BacNinh_3.jpg'),
(22, 3, 'Ảnh 1', 'BacNinh_1.jpg'),
(23, 3, 'Ảnh 2', 'BacNinh_2.jpg'),
(24, 3, 'Ảnh 3', 'BacNinh_3.jpg'),
(25, 4, 'Ảnh 1', 'BacNinh_1.jpg'),
(26, 4, 'Ảnh 2', 'BacNinh_2.jpg'),
(27, 4, 'Ảnh 3', 'BacNinh_3.jpg'),
(28, 5, 'Ảnh 1', 'BacNinh_1.jpg'),
(29, 5, 'Ảnh 2', 'BacNinh_2.jpg'),
(30, 5, 'Ảnh 3', 'BacNinh_3.jpg'),
(31, 6, 'Ảnh 1', 'BacNinh_1.jpg'),
(32, 6, 'Ảnh 2', 'BacNinh_2.jpg'),
(33, 6, 'Ảnh 3', 'BacNinh_3.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `phone`, `role`, `created_at`, `name`) VALUES
(3, 'thoaiphan', '$2a$10$N10A/EppDQEowHdB8YRgPuWDAGWV5l1GgJ5Vn0A1c7lYGFjwc6oly', 'newuser@gmail.com', '0987654321', 'USER', '2025-09-07 16:50:27', ''),
(4, 'admin', '$2a$10$0tUHhNIz/RJ6EDYnOPgQueYarXPGw0dErl3iZRherzqsl45gGLv9S', 'admin123456@gmail.com', '0987654324', 'ADMIN', '2025-09-08 15:09:32', ''),
(5, 'huynguyen', '$2a$10$l6y.E3UaQ239rX3ZcNTNdemteQsL2Kp7ZB0B4qihs3f9AKOr/ST9u', 'Huynguyen123456@gmail.com', '0987654326', 'USER', '2025-09-08 15:10:11', ''),
(6, 'test', '$2a$10$paOkHRHhhsyRsSWiVtEwbOo1.ysx8C.4b228L648u4WknipwMXIg.', 'phan@gmail.com', '0918456885', 'USER', '2025-10-14 08:45:11', ''),
(7, 'BabyNuki', '$2a$10$Oo8dQFFjnmnfPfc1FoflJuj/HQJ2srIEh0KICVLEhw5R3gX0Y4F8C', 'ngkietbaby19@gmail.com', '0798980217', 'USER', '2025-12-01 04:17:22', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id_fk` (`user_id`),
  ADD KEY `tour_fk` (`tour_id`),
  ADD KEY `flight_fk` (`flight_id`),
  ADD KEY `hotel_fk` (`hotel_id`);

--
-- Indexes for table `flights`
--
ALTER TABLE `flights`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hotel_images`
--
ALTER TABLE `hotel_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_images_hotels` (`id_hotel`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKp5lufxy0ghq53ugm93hdc941k` (`hotel_id`);

--
-- Indexes for table `tours`
--
ALTER TABLE `tours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tour_location` (`id_location`);

--
-- Indexes for table `tour_images`
--
ALTER TABLE `tour_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tour_image` (`id_tour`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `flights`
--
ALTER TABLE `flights`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `hotels`
--
ALTER TABLE `hotels`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `hotel_images`
--
ALTER TABLE `hotel_images`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tours`
--
ALTER TABLE `tours`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tour_images`
--
ALTER TABLE `tour_images`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `fk_flight_booking` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`id`),
  ADD CONSTRAINT `fk_hotel_booking` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`),
  ADD CONSTRAINT `fk_tour_booking` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`),
  ADD CONSTRAINT `fk_user_booking` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `hotel_images`
--
ALTER TABLE `hotel_images`
  ADD CONSTRAINT `fk_images_hotels` FOREIGN KEY (`id_hotel`) REFERENCES `hotels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `FKp5lufxy0ghq53ugm93hdc941k` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`);

--
-- Constraints for table `tours`
--
ALTER TABLE `tours`
  ADD CONSTRAINT `fk_tour_location` FOREIGN KEY (`id_location`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tour_images`
--
ALTER TABLE `tour_images`
  ADD CONSTRAINT `fk_tour_image` FOREIGN KEY (`id_tour`) REFERENCES `tours` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
