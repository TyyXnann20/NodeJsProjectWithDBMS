

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `province` (
  `province_id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `description` varchar(255) NOT NULL,
  `date_modified` datetime NOT NULL,
  `date_added` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `province` (`province_id`, `name`, `description`, `date_modified`, `date_added`) VALUES
(3, 'UK VAT Zone', 'UK VAT', '2010-02-26 22:33:24', '2009-01-06 23:26:25'),
(4, 'UK Shipping', 'UK Shipping Zones', '2010-12-15 15:18:13', '2009-06-23 01:14:53'),
(5, 'Cambodia Provinces Delivery Fee', 'All Cambodia Provinces', '2019-10-24 17:13:30', '2016-12-23 01:52:39'),
(6, 'Phnom Penh', 'Delivery in Phnom Penh', '2019-11-05 14:44:42', '2019-08-03 10:00:22'),
(7, 'Oddar Meancheay (Kerry)', 'Oddar Meancheay', '2019-11-07 14:09:32', '2019-10-24 17:11:46'),
(8, 'Oddar Meancheay (Other )', 'Oddar Meancheay', '2019-11-07 14:09:16', '2019-10-24 17:20:02'),
(9, 'Battambang', 'Battambang', '0000-00-00 00:00:00', '2019-11-07 14:05:05'),
(10, 'Kampong Cham', 'Kampong Cham', '0000-00-00 00:00:00', '2019-11-07 14:05:22'),
(11, 'Kampong Chhnang', 'Kampong Chhnang', '0000-00-00 00:00:00', '2019-11-07 14:05:38'),
(12, 'Kampong Som', 'Kampong Som', '0000-00-00 00:00:00', '2019-11-07 14:05:54'),
(13, 'Kampong Speu', 'Kampong Speu', '0000-00-00 00:00:00', '2019-11-07 14:06:07'),
(14, 'Kampong Thom', 'Kampong Thom', '0000-00-00 00:00:00', '2019-11-07 14:06:19'),
(15, 'Kampot', 'Kampot', '0000-00-00 00:00:00', '2019-11-07 14:06:31'),
(16, 'Kandal', 'Kandal', '0000-00-00 00:00:00', '2019-11-07 14:06:44'),
(17, 'Kaoh Kong', 'Kaoh Kong', '0000-00-00 00:00:00', '2019-11-07 14:06:58'),
(18, 'Keb', 'Keb', '0000-00-00 00:00:00', '2019-11-07 14:07:10'),
(19, 'Kratie', 'Kratie', '0000-00-00 00:00:00', '2019-11-07 14:07:21'),
(20, 'Mondul Kiri', 'Mondul Kiri', '0000-00-00 00:00:00', '2019-11-07 14:07:33'),
(21, 'Pailin', 'Pailin', '0000-00-00 00:00:00', '2019-11-07 14:09:47'),
(22, 'Preah Seihanu', 'Preah Seihanu (Kompong Som or Sihanoukville)', '0000-00-00 00:00:00', '2019-11-07 14:10:22'),
(23, 'Preah Vihear', 'Preah Vihear', '0000-00-00 00:00:00', '2019-11-07 14:10:36'),
(24, 'Prey Veng', 'Prey Veng', '0000-00-00 00:00:00', '2019-11-07 14:10:54'),
(25, 'Pursat', 'Pursat', '0000-00-00 00:00:00', '2019-11-07 14:11:11'),
(26, 'Ratanak Kiri', 'Ratanak Kiri', '0000-00-00 00:00:00', '2019-11-07 14:11:27'),
(27, 'Siemreap', 'Siemreap', '0000-00-00 00:00:00', '2019-11-07 14:11:40'),
(28, 'Stung Treng', 'Stung Treng', '0000-00-00 00:00:00', '2019-11-07 14:11:53'),
(29, 'Svay Rieng', 'Svay Rieng', '0000-00-00 00:00:00', '2019-11-07 14:12:08'),
(30, 'Takeo', 'Takeo', '0000-00-00 00:00:00', '2019-11-07 14:12:25'),
(31, 'Banteay Meanchey', 'Banteay Meanchey', '0000-00-00 00:00:00', '2019-11-07 14:12:34');


ALTER TABLE `province`
  ADD PRIMARY KEY (`province_id`);

ALTER TABLE `province`
  MODIFY `province_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

