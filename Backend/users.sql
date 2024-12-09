-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 09, 2024 at 04:24 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blog_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `last_password_change` timestamp NOT NULL DEFAULT current_timestamp(),
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`, `updated_at`, `last_password_change`, `image`) VALUES
(1, 'testuser', 'testuser@example.com', '$2a$10$.cqUwE7sfFcwjaR2PdVlFugpCOWmmOF.RmwLwRNXoaAAZwMUwXVWy', '2024-12-07 11:06:09', '2024-12-07 11:06:09', '2024-12-07 11:06:09', NULL),
(2, 'testuser1', 'testuser1@example.com', '$2a$10$w7inbBkYPdGBdZyXBXtBo.NKdTZNiabp.l7uedOiItT.GMyCteNBy', '2024-12-07 14:18:05', '2024-12-07 14:18:05', '2024-12-07 14:18:05', NULL),
(3, 'dassd', 'anishthapa9039@gmail.com', '$2a$10$pzwlbKlEwb6KmHE0rMzTIOl6Kmgp7K2o7t2XTaQ/Asf/npdrrjYvm', '2024-12-08 06:00:59', '2024-12-08 06:00:59', '2024-12-08 06:00:59', NULL),
(4, 'asdfsa', 'gfdsg@gmail.com', '$2a$10$NUWoB83uqStrMZg2sH8/VeKUNYCPNxRndETlNsXkwP8K0yzuSW4tC', '2024-12-08 06:04:00', '2024-12-08 06:04:00', '2024-12-08 06:04:00', NULL),
(5, 'anish', 'abc@gmail.com', '$2a$10$.jKARJ/pKDhKVKSRm1bq5eTrSGgUqrtw.iuGE21o3PJKjzTgNgjV2', '2024-12-08 07:10:32', '2024-12-08 07:18:20', '2024-12-08 07:18:20', NULL),
(6, 'pass', 'pass@gmail.com', '$2a$10$E3XCCwnbsD7eBBcwC/ZWYeYssyYlq1sRJHOyi8wsgp0HjSxAY/DjG', '2024-12-08 07:19:54', '2024-12-08 08:49:29', '2024-12-08 08:49:29', '1733646286757.jpg'),
(7, 'aaa', 'aaa@gmail.com', '$2a$10$3JcemEOpUYOy2mRMNy2xs.9JpoU.vY2X1FJ.LlxghwWz81VoQnPLu', '2024-12-08 08:50:08', '2024-12-09 02:09:46', '2024-12-08 13:29:47', '1733710186339.jpg'),
(8, 'aaas', 'sasa@gmail.com', '$2a$10$ttLR3RyWtVt/nnOET8FJluMyx5KcIM2up9HF5w6w2xoAOkx3rbOe2', '2024-12-08 11:11:01', '2024-12-08 11:11:01', '2024-12-08 11:11:01', NULL),
(15, 'cdssa', 'cdssad@gmail.com', '$2a$10$QDPiBrP9x/EN/ncrKTNn/OhfUs.uwOgUOC8xrgPbnL8GRM2LuW11G', '2024-12-08 13:30:40', '2024-12-08 13:30:40', '2024-12-08 13:30:40', NULL),
(17, 'wewew', 'oee@gmail.com', '$2a$10$Kq4R/38Vc7yscNGIrh7iNuOxZjbeY5zkzQmyokbhvKHvMPa8vbSwi', '2024-12-08 13:32:29', '2024-12-08 13:32:29', '2024-12-08 13:32:29', NULL),
(18, 'asas', 'asas@gmail.com', '$2a$10$A3XG9Yfa6O1L2fInJ.y3x.JyMXSZrz.5AqfLneO5mMKK1a.YSctYu', '2024-12-08 13:34:14', '2024-12-08 13:34:14', '2024-12-08 13:34:14', NULL);

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
