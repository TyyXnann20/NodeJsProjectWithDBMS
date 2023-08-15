-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 14, 2023 at 04:02 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecm_gala_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `firstname` varchar(60) NOT NULL,
  `lastname` varchar(60) NOT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `tel` varchar(16) DEFAULT NULL,
  `email` varchar(120) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_id`, `firstname`, `lastname`, `gender`, `dob`, `tel`, `email`, `is_active`) VALUES
(19, 'MR', 'Sina.jpg', 0, '1999-01-22', '096666666', 'bona@gmail.com', 1),
(20, 'MR', 'Sina', 0, '1999-01-22', '096666666', 'bona@gmail.com', 1),
(21, 'MR', 'Join', 0, '1999-01-22', '096666666', 'bona@gmail.com', 1),
(22, 'MR', 'Som', 0, '1999-01-22', '096666666', 'bona@gmail.com', 1),
(23, 'Mrs', 'Channa', 0, '1999-01-22', '096666666', 'bona@gmail.com', 1),
(24, 'Mrs', 'Join', 0, '1999-01-22', '08888888', 'join@gmail.com', 1),
(26, 'Bona', 'Chan', 0, '1999-01-22', '096689055', 'channa@gmail.com', 1),
(27, 'San', 'Ya', 0, '1999-01-22', '099999999', 'dyvannak1997@gmail.com', 1),
(28, 'AA', 'BB', 0, '2000-02-04', '0999999999', 'dyvannak1997@gmail.com', 1),
(29, 'Som', 'Dara', 1, '1983-01-08', '', '', 1),
(31, 'AA', 'AA', 1, '2023-03-14', '', '', 1),
(32, 'BB', 'BB', 1, '2023-03-14', '099999', '', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
