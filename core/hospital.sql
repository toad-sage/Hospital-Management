-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 04, 2020 at 09:26 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital`
--

-- --------------------------------------------------------

--
-- Table structure for table `DoctorTable`
--

CREATE TABLE `DoctorTable` (
  `DoctorID` int(25) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `DoctorTable`
--

INSERT INTO `DoctorTable` (`DoctorID`, `Name`, `email`, `password`) VALUES
(1, 'Dr. Ritik', 'ritikraj7255@gmail.com', '$2b$10$gvk/0yB7OjYuT6PJZfAexONp3JoN./LpIGGnh4V3AsFdVVooSuYR2'),
(2, 'Dr. Ritika', 'ritika@gmail.com', '$2b$10$vo3yu6j9VzW9dLFE4Bb8Bu9y0ucYu0o5yCnqDsplAYfS9fv9F2F4a'),
(3, 'Dr. Rasmi', 'rashmi@gmail.com', '$2b$10$evqom6Trbp6iCRpJHNoJweCarxGsqe2U45jebSPTVI2d4.fWfAjxW');

-- --------------------------------------------------------

--
-- Table structure for table `MedicineTable`
--

CREATE TABLE `MedicineTable` (
  `MedicineID` int(25) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Quantity` int(25) NOT NULL,
  `ExpiryDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `MedicineTable`
--

INSERT INTO `MedicineTable` (`MedicineID`, `Name`, `Quantity`, `ExpiryDate`) VALUES
(1, 'Acetaminophen', 5, '2021-08-15'),
(2, 'Ativan', 10, '2020-09-13'),
(3, 'Zaleplon', 20, '2020-09-19'),
(4, 'Zantac', 25, '2021-09-19'),
(5, 'Brilinta', 30, '2021-10-20');

-- --------------------------------------------------------

--
-- Table structure for table `PatientsTable`
--

CREATE TABLE `PatientsTable` (
  `PateintID` int(25) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `phone` varchar(20) NOT NULL,
  `DoctorAppointed` int(25) NOT NULL,
  `PharmacistAppointed` int(25) DEFAULT NULL,
  `DateOfAppointment` date NOT NULL,
  `Report` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `PatientsTable`
--

INSERT INTO `PatientsTable` (`PateintID`, `Name`, `email`, `dob`, `phone`, `DoctorAppointed`, `PharmacistAppointed`, `DateOfAppointment`, `Report`) VALUES
(1, 'Roshini', 'roshini@gmail.com', '2000-10-15', '7484855419', 3, 1, '2020-02-22', 'suffering from fever'),
(2, 'Rishav', 'rishav@gmail.com', '2000-11-15', '1234567890', 2, 1, '2020-03-22', 'Suffering From Fever');

-- --------------------------------------------------------

--
-- Table structure for table `PharmacistTable`
--

CREATE TABLE `PharmacistTable` (
  `PharmacistID` int(25) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `PharmacistTable`
--

INSERT INTO `PharmacistTable` (`PharmacistID`, `Name`, `email`, `password`) VALUES
(1, 'Rakesh', 'rakesh@gmail.com', '$2b$10$CJ72nngySSOy/7y2ilAICe4ky0ik1cMhuj6imcK.56wxAQJ3Rhamq');

-- --------------------------------------------------------

--
-- Table structure for table `ReceptionistTable`
--

CREATE TABLE `ReceptionistTable` (
  `ReceptnistID` int(25) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ReceptionistTable`
--

INSERT INTO `ReceptionistTable` (`ReceptnistID`, `Name`, `email`, `password`) VALUES
(1, 'Rishita', 'rishita@gmail.com', '$2b$10$gM5txJKZBII.0YTJJc7EYeBsHY3PxpVYB3fhxHJJxb8s5Tvi51lZO');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `DoctorTable`
--
ALTER TABLE `DoctorTable`
  ADD PRIMARY KEY (`DoctorID`);

--
-- Indexes for table `MedicineTable`
--
ALTER TABLE `MedicineTable`
  ADD PRIMARY KEY (`MedicineID`);

--
-- Indexes for table `PatientsTable`
--
ALTER TABLE `PatientsTable`
  ADD PRIMARY KEY (`PateintID`);

--
-- Indexes for table `PharmacistTable`
--
ALTER TABLE `PharmacistTable`
  ADD PRIMARY KEY (`PharmacistID`);

--
-- Indexes for table `ReceptionistTable`
--
ALTER TABLE `ReceptionistTable`
  ADD PRIMARY KEY (`ReceptnistID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `DoctorTable`
--
ALTER TABLE `DoctorTable`
  MODIFY `DoctorID` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `MedicineTable`
--
ALTER TABLE `MedicineTable`
  MODIFY `MedicineID` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `PatientsTable`
--
ALTER TABLE `PatientsTable`
  MODIFY `PateintID` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `PharmacistTable`
--
ALTER TABLE `PharmacistTable`
  MODIFY `PharmacistID` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ReceptionistTable`
--
ALTER TABLE `ReceptionistTable`
  MODIFY `ReceptnistID` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
