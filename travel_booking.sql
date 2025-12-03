-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: travel_booking
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `service_type` enum('TOUR','FLIGHT','HOTEL') NOT NULL,
  `tour_id` bigint DEFAULT NULL,
  `flight_id` bigint DEFAULT NULL,
  `hotel_id` bigint DEFAULT NULL,
  `booking_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('PENDING','CONFIRMED','CANCELLED') DEFAULT 'PENDING',
  `total_price` decimal(38,2) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `service_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_fk` (`user_id`),
  KEY `tour_fk` (`tour_id`),
  KEY `flight_fk` (`flight_id`),
  KEY `hotel_fk` (`hotel_id`),
  CONSTRAINT `fk_flight_booking` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`id`),
  CONSTRAINT `fk_hotel_booking` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`),
  CONSTRAINT `fk_tour_booking` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`),
  CONSTRAINT `fk_user_booking` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `chk_single_service` CHECK (((((case when (`tour_id` is not null) then 1 else 0 end) + (case when (`flight_id` is not null) then 1 else 0 end)) + (case when (`hotel_id` is not null) then 1 else 0 end)) = 1))
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,3,'TOUR',2,NULL,NULL,'2025-11-20 06:37:10','CONFIRMED',2500000.00,'2025-11-20 13:37:10.000000',2),(2,4,'HOTEL',NULL,NULL,1,'2025-11-20 06:37:10','PENDING',1800000.00,'2025-11-20 13:37:10.000000',1),(3,5,'FLIGHT',NULL,3,NULL,'2025-11-20 06:37:10','CONFIRMED',3200000.00,'2025-11-20 13:37:10.000000',3),(4,6,'TOUR',5,NULL,NULL,'2025-11-20 06:37:10','PENDING',2200000.00,'2025-11-20 13:37:10.000000',5),(5,3,'TOUR',7,NULL,NULL,'2025-11-20 06:37:10','CANCELLED',3000000.00,'2025-11-20 13:37:10.000000',7),(6,4,'FLIGHT',NULL,8,NULL,'2025-11-20 06:37:10','CONFIRMED',4100000.00,'2025-11-20 13:37:10.000000',8),(7,6,'FLIGHT',NULL,10,NULL,'2025-11-20 06:37:10','PENDING',4500000.00,'2025-11-20 13:37:10.000000',10),(8,5,'HOTEL',NULL,NULL,4,'2025-11-20 06:37:10','CONFIRMED',2700000.00,'2025-11-20 13:37:10.000000',4),(9,3,'HOTEL',NULL,NULL,3,'2025-11-20 06:37:10','PENDING',1900000.00,'2025-11-20 13:37:10.000000',3);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flights`
--

DROP TABLE IF EXISTS `flights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flights` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `airline` varchar(255) DEFAULT NULL,
  `from_location` varchar(255) NOT NULL,
  `to_location` varchar(255) NOT NULL,
  `departure_time` datetime NOT NULL,
  `arrival_time` datetime NOT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `seats` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('ACTIVE','CANCELLED','FINISHED') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flights`
--

LOCK TABLES `flights` WRITE;
/*!40000 ALTER TABLE `flights` DISABLE KEYS */;
INSERT INTO `flights` VALUES (1,'VietJet Air','Đà Nẵng','Hà Nội','2025-10-24 23:00:00','2025-10-25 00:20:00',990000.00,150,NULL,'CANCELLED'),(2,'Vietnam Airlines','Hà Nội','Thành phố Hồ Chí Minh','2025-10-25 07:00:00','2025-10-25 09:10:00',1550000.00,180,'2025-10-24 04:25:51','ACTIVE'),(3,'Bamboo Airways','Hà Nội','Đà Nẵng','2025-10-26 08:30:00','2025-10-26 09:50:00',1250000.00,160,'2025-10-24 04:25:51','ACTIVE'),(4,'VietJet Air','Thành phố Hồ Chí Minh','Phú Quốc','2025-10-27 13:00:00','2025-10-27 14:10:00',980000.00,150,'2025-10-24 04:25:51','ACTIVE'),(5,'Vietnam Airlines','Hà Nội','Nha Trang','2025-10-28 10:00:00','2025-10-28 11:45:00',1750000.00,170,'2025-10-24 04:25:51','ACTIVE'),(6,'Bamboo Airways','Đà Nẵng','Cần Thơ','2025-10-29 06:45:00','2025-10-29 08:15:00',1450000.00,155,'2025-10-24 04:25:51','ACTIVE'),(7,'VietJet Air 1234565','Đắc Nông','Cà Mau','2025-11-29 09:30:00','2025-11-30 10:25:00',9000000.00,60,'2025-10-24 04:25:51','ACTIVE'),(8,'Vietnam Airlines','Hà Nội','Huế','2025-10-31 12:15:00','2025-10-31 13:30:00',1190000.00,140,'2025-10-24 04:25:51','ACTIVE'),(9,'Bamboo Airways','Hà Nội','Phú Quốc','2025-11-01 15:00:00','2025-11-01 17:10:00',2100000.00,160,'2025-10-24 04:25:51','ACTIVE'),(10,'VietJet Air','Đà Nẵng','Thành phố Hồ Chí Minh','2025-11-02 19:00:00','2025-11-02 20:20:00',990000.00,150,'2025-10-24 04:25:51','ACTIVE'),(11,'VietNam Airline','Cà Mau','TP Hồ Chí Minh','2025-11-22 08:34:00','2025-11-30 08:34:00',600000.00,10,NULL,'ACTIVE');
/*!40000 ALTER TABLE `flights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotel_images`
--

DROP TABLE IF EXISTS `hotel_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotel_images` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_hotel` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `img_url` varchar(2048) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_images_hotels` (`id_hotel`),
  CONSTRAINT `fk_images_hotels` FOREIGN KEY (`id_hotel`) REFERENCES `hotels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotel_images`
--

LOCK TABLES `hotel_images` WRITE;
/*!40000 ALTER TABLE `hotel_images` DISABLE KEYS */;
INSERT INTO `hotel_images` VALUES (1,1,'Lobby View','9ca6a775-ad0e-4c6e-9dc4-8f311bae32e9_muathutrongrung.jpg'),(2,1,'Room Deluxe','Hotel.jpg'),(3,1,'Hotel Exterior','Hotel.jpg'),(4,2,'Lobby View','Hotel.jpg'),(5,2,'Room Superior','Hotel.jpg'),(6,2,'Pool Area','Hotel.jpg'),(7,3,'Restaurant Inside','Hotel.jpg'),(8,3,'Suite Room','Hotel.jpg'),(9,3,'Hotel Exterior','Hotel.jpg'),(10,4,'Reception','Hotel.jpg'),(11,4,'Double Room','Hotel.jpg'),(12,4,'Sky View','Hotel.jpg'),(13,5,'Garden View','Hotel.jpg'),(14,5,'VIP Room','Hotel.jpg'),(15,5,'Swimming Pool','Hotel.jpg');
/*!40000 ALTER TABLE `hotel_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotels`
--

DROP TABLE IF EXISTS `hotels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotels` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text,
  `price_per_night` decimal(38,2) NOT NULL,
  `available_rooms` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `img_url` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'ACTIVE',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotels`
--

LOCK TABLES `hotels` WRITE;
/*!40000 ALTER TABLE `hotels` DISABLE KEYS */;
INSERT INTO `hotels` VALUES (1,'Khách sạn 1234565','Đà Lạt','Gần Nhà',3200000.00,12,'2025-10-24 04:22:58','Hotel.jpg','123 45+','ACTIVE'),(2,'Khách sạn Mường Thanh Luxury Hà Nội','Hà Nội','Nằm ở trung tâm thành phố, gần các địa điểm du lịch nổi tiếng.',2500000.00,3,'2025-10-24 04:22:58','Hotel.jpg','456 Trần Hưng Đạo, Quận 5, TP.HCM','ACTIVE'),(3,'Khách sạn The Grand Hồ Tràm','Vũng Tàu','Resort cao cấp với hồ bơi và casino đẳng cấp quốc tế.',4500000.00,3,'2025-10-24 04:22:58','Hotel.jpg','789 Nguyễn Huệ, Quận 1, TP.HCM','ACTIVE'),(4,'Khách sạn Dalat Palace','Đà Lạt','Khách sạn cổ điển mang phong cách Pháp, gần hồ Xuân Hương.',2700000.00,3,'2025-10-24 04:22:58','Hotel.jpg','25 Nguyễn Văn Linh, Quận 7, TP.HCM','INACTIVE'),(5,'Khách sạn Sunlight Nha Trang','Nha Trang','Khách sạn gần bãi biển, dịch vụ thân thiện và tiện nghi.',1800000.00,3,'2025-10-24 04:22:58','Hotel.jpg','88 Pasteur, Phường Bến Nghé, Quận 1, TP.HCM','ACTIVE');
/*!40000 ALTER TABLE `hotels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'Châu Á',NULL),(2,'Châu Âu',NULL),(3,'Châu Phi',NULL),(4,'Châu Mỹ',NULL),(5,'Châu Úc',NULL),(6,'Miền Tây Nam Bộ',NULL),(7,'Miền Bắc',NULL),(8,'Miền Trung',NULL),(9,'Miền Đông Nam Bộ',NULL);
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `available` bit(1) DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `price` decimal(38,2) NOT NULL,
  `room_number` varchar(255) DEFAULT NULL,
  `hotel_id` bigint DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKp5lufxy0ghq53ugm93hdc941k` (`hotel_id`),
  CONSTRAINT `FKp5lufxy0ghq53ugm93hdc941k` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,_binary '',2,500000.00,'101',1,'BacNinh.jpg'),(2,_binary '',2,800000.00,'102',1,'BacNinh.jpg'),(3,_binary '',4,1200000.00,'201',1,'BacNinh.jpg'),(4,_binary '',2,600000.00,'A1',2,'BacNinh.jpg'),(5,_binary '',3,850000.00,'A2',2,'BacNinh.jpg'),(6,_binary '',4,1500000.00,'B1',2,'BacNinh.jpg'),(7,_binary '',2,600000.00,'A1',2,'BacNinh.jpg'),(8,_binary '',3,850000.00,'A2',2,'BacNinh.jpg'),(9,_binary '',4,1500000.00,'B1',2,'BacNinh.jpg'),(10,_binary '',2,450000.00,'01',3,'BacNinh.jpg'),(11,_binary '',2,700000.00,'02',3,'BacNinh.jpg'),(12,_binary '',3,1100000.00,'03',3,'BacNinh.jpg'),(13,_binary '',2,650000.00,'1A',4,'BacNinh.jpg'),(14,_binary '',2,900000.00,'1B',4,'BacNinh.jpg'),(15,_binary '',4,2000000.00,'2A',4,'BacNinh.jpg'),(16,_binary '',2,400000.00,'R1',5,'BacNinh.jpg'),(17,_binary '',2,600000.00,'R2',5,'BacNinh.jpg'),(18,_binary '',4,1000000.00,'R3',5,'BacNinh.jpg');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_images`
--

DROP TABLE IF EXISTS `tour_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour_images` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_tour` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `img_url` varchar(2048) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tour_image` (`id_tour`),
  CONSTRAINT `fk_tour_image` FOREIGN KEY (`id_tour`) REFERENCES `tours` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_images`
--

LOCK TABLES `tour_images` WRITE;
/*!40000 ALTER TABLE `tour_images` DISABLE KEYS */;
INSERT INTO `tour_images` VALUES (19,2,'Ảnh 1','BacNinh_1.jpg'),(20,2,'Ảnh 2','BacNinh_2.jpg'),(21,2,'Ảnh 3','BacNinh_3.jpg'),(22,3,'Ảnh 1','BacNinh_1.jpg'),(23,3,'Ảnh 2','BacNinh_2.jpg'),(24,3,'Ảnh 3','BacNinh_3.jpg'),(25,4,'Ảnh 1','BacNinh_1.jpg'),(26,4,'Ảnh 2','BacNinh_2.jpg'),(27,4,'Ảnh 3','BacNinh_3.jpg'),(28,5,'Ảnh 1','BacNinh_1.jpg'),(29,5,'Ảnh 2','BacNinh_2.jpg'),(30,5,'Ảnh 3','BacNinh_3.jpg'),(31,6,'Ảnh 1','BacNinh_1.jpg'),(32,6,'Ảnh 2','BacNinh_2.jpg'),(33,6,'Ảnh 3','BacNinh_3.jpg');
/*!40000 ALTER TABLE `tour_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tours`
--

DROP TABLE IF EXISTS `tours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tours` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `seats` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_location` int DEFAULT NULL,
  `location_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tour_location` (`id_location`),
  CONSTRAINT `fk_tour_location` FOREIGN KEY (`id_location`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tours`
--

LOCK TABLES `tours` WRITE;
/*!40000 ALTER TABLE `tours` DISABLE KEYS */;
INSERT INTO `tours` VALUES (2,'Thành phố Hồ Chí Minh - Bắc Ninh','Thành phố Hồ Chí Minh','Trong nước','BacNinh.jpg',5000000.00,'2025-10-09','2025-10-12',10,'2025-09-09 12:16:05',1,0),(3,'Thành phố Hồ Chí Minh - Bình Thuận','Thành phố Hồ Chí Minh','Trong nước','BinhThuan.jpg',3500000.00,'2025-11-05','2025-11-07',20,'2025-09-09 12:24:58',2,0),(4,'Thành phố Hồ Chí Minh - Đà Lạt','Thành phố Hồ Chí Minh','Trong nước','DaLat.jpg',4200000.00,'2025-12-15','2025-12-18',15,'2025-09-09 12:24:58',3,0),(5,'Thành phố Hồ Chí Minh - Lào Cai','Thành phố Hồ Chí Minh','Trong nước','LaoCai.jpg',6800000.00,'2026-01-10','2026-01-14',12,'2025-09-09 12:24:58',4,0),(6,'Thành phố Hồ Chí Minh - Nha Trang','Thành phố Hồ Chí Minh','Trong nước','NhaTrang.webp',3900000.00,'2026-02-20','2026-02-23',25,'2025-09-09 12:24:58',5,0),(7,'Thành phố Hồ Chí Minh - Phú Quốc','Thành phố Hồ Chí Minh','Trong nước','PhuQuoc.jpg',7200000.00,'2026-03-05','2026-03-09',18,'2025-09-09 12:24:58',6,0),(8,'Thành phố Hồ Chí Minh - Quảng Trị','Thành phố Hồ Chí Minh','Trong nước','QuangTri.jpg',5500000.00,'2026-04-12','2026-04-16',14,'2025-09-09 12:24:58',7,0),(9,'Thành phố Hồ Chí Minh - Vũng Tàu','Thành phố Hồ Chí Minh','Trong nước','VungTau.jpg',2800000.00,'2026-05-08','2026-05-09',30,'2025-09-09 12:24:58',8,0),(16,'Bắc Ninh - Quảng Trị','Bắc Ninh','Trong Nước','9480ac99-477e-48f4-8342-764cb75bc1d4_HoangHon1.webp',60000000.00,'2025-10-23','2025-10-28',20,'2025-10-26 16:13:04',9,0),(17,'Quang','Bắc Ninh','Quang Agular','9693cb90-0013-4356-925d-0bdc52322b8f_buildings-1869425_1920.jpg',80000000.00,'2025-10-14','2025-10-30',25,'2025-10-27 07:07:11',4,0);
/*!40000 ALTER TABLE `tours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'thoaiphan','$2a$10$N10A/EppDQEowHdB8YRgPuWDAGWV5l1GgJ5Vn0A1c7lYGFjwc6oly','newuser@gmail.com','0987654321','USER','2025-09-07 16:50:27',''),(4,'admin','$2a$10$0tUHhNIz/RJ6EDYnOPgQueYarXPGw0dErl3iZRherzqsl45gGLv9S','admin123456@gmail.com','0987654324','ADMIN','2025-09-08 15:09:32',''),(5,'huynguyen','$2a$10$l6y.E3UaQ239rX3ZcNTNdemteQsL2Kp7ZB0B4qihs3f9AKOr/ST9u','Huynguyen123456@gmail.com','0987654326','ADMIN','2025-09-08 15:10:11',''),(6,'test','$2a$10$paOkHRHhhsyRsSWiVtEwbOo1.ysx8C.4b228L648u4WknipwMXIg.','phan@gmail.com','0918456885','USER','2025-10-14 08:45:11','');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-03 23:13:56
