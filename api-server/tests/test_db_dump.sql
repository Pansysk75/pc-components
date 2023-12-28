CREATE DATABASE  IF NOT EXISTS `test_pc_components_database` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `test_pc_components_database`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: test_pc_components_database
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `build`
--

DROP TABLE IF EXISTS `build`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `build` (
  `Build_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `date_created` date NOT NULL,
  `Username` varchar(100) NOT NULL,
  `CPU_id` int unsigned NOT NULL,
  `MOBO_id` int unsigned NOT NULL,
  `RAM_id` int unsigned NOT NULL,
  `GPU_id` int unsigned,
  `PSU_id` int unsigned NOT NULL,
  `Case_id` int unsigned NOT NULL,
  PRIMARY KEY (`Build_id`),
  KEY `fk_Build_User_idx` (`Username`),
  KEY `fk_Build_CPU1_idx` (`CPU_id`),
  KEY `fk_Build_MOBO1_idx` (`MOBO_id`),
  KEY `fk_Build_RAM1_idx` (`RAM_id`),
  KEY `fk_Build_GPU1_idx` (`GPU_id`),
  KEY `fk_Build_PSU1_idx` (`PSU_id`),
  KEY `fk_Build_Case1_idx` (`Case_id`),
  CONSTRAINT `fk_Build_Case1` FOREIGN KEY (`Case_id`) REFERENCES `case` (`Case_id`),
  CONSTRAINT `fk_Build_CPU1` FOREIGN KEY (`CPU_id`) REFERENCES `cpu` (`CPU_id`),
  CONSTRAINT `fk_Build_GPU1` FOREIGN KEY (`GPU_id`) REFERENCES `gpu` (`GPU_id`),
  CONSTRAINT `fk_Build_MOBO1` FOREIGN KEY (`MOBO_id`) REFERENCES `mobo` (`MOBO_id`),
  CONSTRAINT `fk_Build_PSU1` FOREIGN KEY (`PSU_id`) REFERENCES `psu` (`PSU_id`),
  CONSTRAINT `fk_Build_RAM1` FOREIGN KEY (`RAM_id`) REFERENCES `ram` (`RAM_id`),
  CONSTRAINT `fk_Build_User` FOREIGN KEY (`Username`) REFERENCES `user` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `build`
--

LOCK TABLES `build` WRITE;
/*!40000 ALTER TABLE `build` DISABLE KEYS */;
INSERT INTO `build` VALUES (0,'QuantumDream','2015-11-23','TechEnthusiast42',0,0,2,0,2,0),(1,'EliteDominance','2016-11-23','PCMasterRace',1,0,4,2,7,5),(2,'TurboGamingBeast','2005-12-23','GamerGeek88',5,0,4,3,6,4),(3,'MegaRigX','2006-12-23','HardwareFanatic',5,0,2,4,1,1),(4,'CodeCruncher','2019-11-23','ByteBuster99',2,1,0,5,3,1),(5,'FutureTechWorkstation','2020-11-23','SiliconSavvy',3,1,1,4,1,2),(6,'WizardryStation','2007-12-23','CircuitWizard23',3,1,0,6,5,3),(7,'TechExplorerPro','2008-12-23','ComponentExplorer',2,1,1,1,2,5),(8,'EliteDominance2','2016-11-23','TechEnthusiast42',1,0,4,2,7,5);
/*!40000 ALTER TABLE `build` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `build_has_storage`
--

DROP TABLE IF EXISTS `build_has_storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `build_has_storage` (
  `Build_id` int unsigned NOT NULL,
  `Storage_id` int unsigned NOT NULL,
  PRIMARY KEY (`Build_id`,`Storage_id`),
  KEY `fk_Build_has_Storage_Storage1_idx` (`Storage_id`),
  KEY `fk_Build_has_Storage_Build1_idx` (`Build_id`),
  CONSTRAINT `fk_Build_has_Storage_Build1` FOREIGN KEY (`Build_id`) REFERENCES `build` (`Build_id`),
  CONSTRAINT `fk_Build_has_Storage_Storage1` FOREIGN KEY (`Storage_id`) REFERENCES `storage` (`Storage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `build_has_storage`
--

LOCK TABLES `build_has_storage` WRITE;
/*!40000 ALTER TABLE `build_has_storage` DISABLE KEYS */;
INSERT INTO `build_has_storage` VALUES (0,0),(1,1),(6,1),(0,2),(2,3),(3,4),(7,4),(4,5),(5,6),(3,7),(7,7);
/*!40000 ALTER TABLE `build_has_storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case`
--

DROP TABLE IF EXISTS `case`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `case` (
  `Case_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `mobo_form_factor` enum('ATX','Micro ATX','Mini ITX','Extended ATX','SSI') NOT NULL,
  `width` int unsigned DEFAULT NULL,
  `height` int unsigned DEFAULT NULL,
  `length` int unsigned DEFAULT NULL,
  `max_gpu_length` int unsigned NOT NULL,
  `Manufacturer_name` varchar(100) NOT NULL,
  PRIMARY KEY (`Case_id`),
  KEY `fk_Case_Manufacturer1_idx` (`Manufacturer_name`),
  CONSTRAINT `fk_Case_Manufacturer1` FOREIGN KEY (`Manufacturer_name`) REFERENCES `manufacturer` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case`
--

LOCK TABLES `case` WRITE;
/*!40000 ALTER TABLE `case` DISABLE KEYS */;
INSERT INTO `case` VALUES (0,'Cougar MX410 Mesh-G RGB Gaming Midi Tower','ATX',210,455,380,300,'COUGAR'),(1,'Be Quiet Pure Base 500DX Gaming Midi Tower','ATX',232,463,450,369,'Be Quiet'),(2,'Lian Li PC-011 Dynamic XL (ROG Certified) Gaming Full Tower','Extended ATX',285,513,471,446,'Lian Li '),(3,'Corsair 4000D Airflow Gaming Midi Tower','ATX',230,466,453,360,'Corsair'),(4,'Kolink Void Gaming Midi Tower','ATX',190,430,400,310,'Kolink'),(5,'Be Quiet Pure Base 500 FX Gaming Midi Tower','ATX',232,463,450,369,'Be Quiet');
/*!40000 ALTER TABLE `case` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cpu`
--

DROP TABLE IF EXISTS `cpu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cpu` (
  `CPU_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `num_physical_cores` int unsigned NOT NULL,
  `num_logical_cores` int unsigned DEFAULT NULL,
  `base_freq` int unsigned NOT NULL,
  `max_freq` int unsigned DEFAULT NULL,
  `socket` enum('AM3','1700','AM4','AM5','1200','1151','1151 rev 2','2066','3647','BGA1296','LGA4677') NOT NULL,
  `release_date` date DEFAULT NULL,
  `tdp` int unsigned DEFAULT NULL,
  `has_integrated_graphics` bit(1) NOT NULL,
  `Manufacturer_name` varchar(100) NOT NULL,
  PRIMARY KEY (`CPU_id`),
  KEY `fk_CPU_Manufacturer1_idx` (`Manufacturer_name`),
  CONSTRAINT `fk_CPU_Manufacturer1` FOREIGN KEY (`Manufacturer_name`) REFERENCES `manufacturer` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cpu`
--

LOCK TABLES `cpu` WRITE;
/*!40000 ALTER TABLE `cpu` DISABLE KEYS */;
INSERT INTO `cpu` VALUES (0,'AMD Ryzen 5 5600G',6,12,4,4,'AM4','2021-01-01',65,_binary '','AMD'),(1,'AMD Ryzen 5 5600X',6,12,4,5,'AM4','2020-01-01',65,_binary '\0','AMD'),(2,'Intel Core i9-13900K',24,32,2,6,'1700','2022-01-01',125,_binary '','INTEL'),(3,'Intel Core i5-13600K',14,20,3,5,'1700','2022-01-01',125,_binary '','INTEL'),(4,'AMD Ryzen 7 7800X3D',8,16,4,5,'AM5','2023-01-01',120,_binary '','AMD'),(5,'AMD Ryzen 7 5800X',8,16,4,5,'AM4','2020-01-01',105,_binary '\0','AMD');
/*!40000 ALTER TABLE `cpu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gpu`
--

DROP TABLE IF EXISTS `gpu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gpu` (
  `GPU_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `vram` int unsigned NOT NULL,
  `pcie_gen` enum('PCI Express x8 3.0','PCI Express x16 3.0','PCI Express x8 4.0','PCI Express x16 4.0') DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `length` int unsigned NOT NULL,
  `min_psu_wattage` int unsigned NOT NULL,
  `memory_type` enum('GDDR4','GDDR5','GDDR6','GDDR6X') DEFAULT NULL,
  `Manufacturer_name` varchar(100) NOT NULL,
  PRIMARY KEY (`GPU_id`),
  KEY `fk_GPU_Manufacturer1_idx` (`Manufacturer_name`),
  CONSTRAINT `fk_GPU_Manufacturer1` FOREIGN KEY (`Manufacturer_name`) REFERENCES `manufacturer` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gpu`
--

LOCK TABLES `gpu` WRITE;
/*!40000 ALTER TABLE `gpu` DISABLE KEYS */;
INSERT INTO `gpu` VALUES (0,'Gigabyte GeForce RTX 3060',16,'PCI Express x16 4.0',NULL,242,550,'GDDR6','Gigabyte'),(1,'Sapphire Radeon RX 6600',8,'PCI Express x8 4.0',NULL,193,500,'GDDR6','AMD'),(2,'Gigabyte GeForce RTX 4070',12,'PCI Express x16 4.0',NULL,300,700,'GDDR6X','Gigabyte'),(3,'Sapphire Radeon RX 7900 XTX',24,'PCI Express x16 4.0',NULL,320,800,'GDDR6','AMD'),(4,'Gigabyte GeForce RTX 4090',24,'PCI Express x16 4.0',NULL,238,850,'GDDR6X','Gigabyte'),(5,'ASRock ARC A770',8,'PCI Express x16 4.0',NULL,305,700,'GDDR6','ASRock'),(6,'Gigabyte GeForce GTX 1660',6,'PCI Express x16 3.0',NULL,224,450,'GDDR5','Gigabyte');
/*!40000 ALTER TABLE `gpu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manufacturer`
--

DROP TABLE IF EXISTS `manufacturer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manufacturer` (
  `Name` varchar(100) NOT NULL,
  `website` varchar(100) DEFAULT NULL,
  `twitter_account` varchar(100) DEFAULT NULL,
  `instagram_account` varchar(100) DEFAULT NULL,
  `year_founded` year DEFAULT NULL,
  PRIMARY KEY (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturer`
--

LOCK TABLES `manufacturer` WRITE;
/*!40000 ALTER TABLE `manufacturer` DISABLE KEYS */;
INSERT INTO `manufacturer` VALUES ('AMD','https://www.amd.com\n','https://www.twitter.com/AMD\n','https://www.instagram.com/amd\n',1969),('ASRock','https://www.asrock.com\n','https://www.twitter.com/ASRockInfo\n','https://www.instagram.com/asrock_official\n',2002),('Asus','https://www.asus.com\n','https://www.twitter.com/ASUS\n','https://www.instagram.com/asus\n',1989),('Be Quiet','https://www.bequiet.com\n','https://www.twitter.com/bequietofficial\n','https://www.instagram.com/bequiet_official\n',2001),('Corsair','https://www.corsair.com\n','https://www.twitter.com/CORSAIR\n','https://www.instagram.com/corsair\n',1994),('COUGAR','https://www.cougargaming.com\n','https://www.twitter.com/CougarGaming\n','https://www.instagram.com/cougargaming_official\n',2007),('Crucial','https://www.crucial.com\n','https://www.twitter.com/crucialmemory\n','https://www.instagram.com/crucial_memory\n',1996),('G.SKILL','https://www.gskill.com\n','https://www.twitter.com/GSkillTech\n','https://www.instagram.com/gskillgaming\n',1989),('Gigabyte','https://www.gigabyte.com\n','https://www.twitter.com/GIGABYTE_USA\n','https://www.instagram.com/gigabyte_official\n',1986),('INTEL','https://www.intel.com\n','https://www.twitter.com/intel\n','https://www.instagram.com/intel\n',1968),('Kingston','https://www.kingston.com\n','https://www.twitter.com/KingstonTech\n','https://www.instagram.com/kingstontechnology\n',1987),('Kolink','https://www.kolink.eu\n','https://www.twitter.com/kolink\n','https://www.instagram.com/kolink\n',2002),('Lian Li ','https://www.lian-li.com\n','https://www.twitter.com/LianLiHQ\n','https://www.instagram.com/lianlihq\n',1983),('MSI','https://www.msi.com\n','https://www.twitter.com/msiUSA\n','https://www.instagram.com/msi_global\n',1986),('Nvidia','https://www.nvidia.com\n','https://www.twitter.com/nvidia\n','https://www.instagram.com/nvidia\n',1993),('Samsung','https://www.samsung.com\n','https://www.twitter.com/Samsung\n','https://www.instagram.com/samsung\n',1938),('Seagate','https://www.seagate.com\n','https://www.twitter.com/Seagate\n','https://www.instagram.com/seagate\n',1979),('Thermaltake','https://www.thermaltake.com\n','https://www.twitter.com/Thermaltake\n','https://www.instagram.com/thermaltakeusa\n',1999),('Viper','https://www.viper.patriotmemory.com\n','https://www.twitter.com/viper\n','https://www.instagram.com/viper\n',1987),('Western Digital','https://www.westerndigital.com\n','https://www.twitter.com/WesternDigital\n','https://www.instagram.com/westerndigital\n',1970);
/*!40000 ALTER TABLE `manufacturer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mobo`
--

DROP TABLE IF EXISTS `mobo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mobo` (
  `MOBO_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `ddr_generation` enum('DDR1','DDR2','DDR3','DDR4','DDR5','DDR6') NOT NULL,
  `form_factor` enum('ATX','Micro ATX','Mini ITX','Extended ATX','SSI') NOT NULL,
  `socket` enum('AM3','1700','AM4','AM5','1200','1151','1151 rev 2','2066','3647','BGA1296','LGA4677') NOT NULL,
  `num_memory_slots` int unsigned NOT NULL,
  `Manufacturer_name` varchar(100) NOT NULL,
  PRIMARY KEY (`MOBO_id`),
  KEY `fk_MOBO_Manufacturer1_idx` (`Manufacturer_name`),
  CONSTRAINT `fk_MOBO_Manufacturer1` FOREIGN KEY (`Manufacturer_name`) REFERENCES `manufacturer` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mobo`
--

LOCK TABLES `mobo` WRITE;
/*!40000 ALTER TABLE `mobo` DISABLE KEYS */;
INSERT INTO `mobo` VALUES (0,'MSI MPG B550 Gaming Plus','DDR4','ATX','AM4',4,'MSI'),(1,'Gigabyte Z790 Gaming X AX (rev. 1.0) Wi-Fi Motherboard','DDR5','ATX','1700',4,'Gigabyte'),(2,'Gigabyte B650M Gaming X AX (rev. 1.x) Wi-Fi','DDR5','Micro ATX','AM5',4,'Gigabyte'),(3,'MSI Z490-A Pro Motherboard','DDR4','ATX','1200',4,'MSI'),(4,'Asus Pro WS W790E-SAGE SE','DDR5','Extended ATX','LGA4677',8,'Asus');
/*!40000 ALTER TABLE `mobo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `psu`
--

DROP TABLE IF EXISTS `psu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `psu` (
  `PSU_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `form_factor` enum('ATX','EPS','PS2','SFX','TFX','M-ATX','Flex ATX') NOT NULL,
  `wattage` int unsigned NOT NULL,
  `modularity` enum('Modular','Semi-Modular','Non-Modular') NOT NULL,
  `efficiency_certification` enum('80 PLUS Standard','80 PLUS Bronze','80 PLUS Silver','80 PLUS Gold','80 PLUS Platinum','80 PLUS Titanium') DEFAULT NULL,
  `Manufacturer_name` varchar(100) NOT NULL,
  PRIMARY KEY (`PSU_id`),
  KEY `fk_PSU_Manufacturer1_idx` (`Manufacturer_name`),
  CONSTRAINT `fk_PSU_Manufacturer1` FOREIGN KEY (`Manufacturer_name`) REFERENCES `manufacturer` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `psu`
--

LOCK TABLES `psu` WRITE;
/*!40000 ALTER TABLE `psu` DISABLE KEYS */;
INSERT INTO `psu` VALUES (0,'Be Quiet System Power 10','ATX',650,'Non-Modular','80 PLUS Bronze','Be Quiet'),(1,'Corsair RMx Series RM850x','ATX',850,'Modular','80 PLUS Gold','Corsair'),(2,'Be Quiet Straight Power 11','ATX',750,'Modular','80 PLUS Platinum','Be Quiet'),(3,'Corsair CV Series CV550','ATX',550,'Non-Modular','80 PLUS Bronze','Corsair'),(4,'Thermaltake Smart SE','EPS',730,'Semi-Modular','80 PLUS Bronze','Thermaltake'),(5,'Be Quiet System Power 9 CM','ATX',700,'Semi-Modular','80 PLUS Bronze','Be Quiet'),(6,'Corsair AX Series AX1600i','EPS',1600,'Modular','80 PLUS Titanium','Corsair'),(7,'Be Quiet Dark Power Pro 12','EPS',1200,'Modular','80 PLUS Titanium','Be Quiet');
/*!40000 ALTER TABLE `psu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ram`
--

DROP TABLE IF EXISTS `ram`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ram` (
  `RAM_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `num_modules` int unsigned NOT NULL,
  `max_freq` int unsigned NOT NULL,
  `total_capacity` int unsigned NOT NULL,
  `ddr_generation` enum('DDR1','DDR2','DDR3','DDR4','DDR5','DDR6') NOT NULL,
  `Manufacturer_name` varchar(100) NOT NULL,
  PRIMARY KEY (`RAM_id`),
  KEY `fk_RAM_Manufacturer1_idx` (`Manufacturer_name`),
  CONSTRAINT `fk_RAM_Manufacturer1` FOREIGN KEY (`Manufacturer_name`) REFERENCES `manufacturer` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ram`
--

LOCK TABLES `ram` WRITE;
/*!40000 ALTER TABLE `ram` DISABLE KEYS */;
INSERT INTO `ram` VALUES (0,'Kingston Fury Beast',2,6000,32,'DDR5','Kingston'),(1,'G.Skill Trident Z5 RGB',2,6400,64,'DDR5','G.SKILL'),(2,'Corsair Vengeance RGB Pro',4,3200,64,'DDR4','Corsair'),(3,'Patriot Viper 3',2,1600,16,'DDR3','Viper'),(4,'G.Skill Ripjaws V',2,3200,16,'DDR4','G.SKILL');
/*!40000 ALTER TABLE `ram` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storage`
--

DROP TABLE IF EXISTS `storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storage` (
  `Storage_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `capacity` int unsigned NOT NULL,
  `type` enum('HDD','SSD') NOT NULL,
  `connectivity` enum('PCI Express 3.0','PCI Express 4.0','PCI Express 5.0','SAS 3.0','SATA III') NOT NULL,
  `form_factor` enum('2.5''','3.5''','mSATA','PCle Card','Blade','M.2 2280','M.2 22110','M.2 2260','M.2 2242') NOT NULL,
  `Manufacturer_name` varchar(100) NOT NULL,
  PRIMARY KEY (`Storage_id`),
  KEY `fk_Storage_Manufacturer1_idx` (`Manufacturer_name`),
  CONSTRAINT `fk_Storage_Manufacturer1` FOREIGN KEY (`Manufacturer_name`) REFERENCES `manufacturer` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storage`
--

LOCK TABLES `storage` WRITE;
/*!40000 ALTER TABLE `storage` DISABLE KEYS */;
INSERT INTO `storage` VALUES (0,'Samsung 970 Evo Plus SSD',1024,'SSD','PCI Express 3.0','M.2 2280','Samsung'),(1,'Samsung 870 Evo SSD',500,'SSD','SATA III','2.5\'','Samsung'),(2,'Western Digital Blue',2000,'HDD','SATA III','3.5\'','Western Digital'),(3,'Seagate Barracuda',2000,'HDD','SATA III','3.5\'','Seagate'),(4,'Samsung 990 Pro SSD',4000,'SSD','PCI Express 4.0','M.2 2280','Samsung'),(5,'Corsair MP700 SSD',1000,'SSD','PCI Express 5.0','M.2 2280','Corsair'),(6,'Crucial BX500 SSD',500,'SSD','SATA III','2.5\'','Crucial'),(7,'Seagate Skyhawk +Rescue',8000,'HDD','SATA III','3.5\'','Seagate');
/*!40000 ALTER TABLE `storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `Username` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('BuildMaestro','maestro@email.com'),('ByteBlitzer98','byteblitzer@email.com'),('ByteBuster99','bytebuster99@email.com'),('CircuitCraftsman87','circuitcraftsman@email.com'),('CircuitWizard23','wizard23@email.com'),('CodeCraftsman','code@email.com'),('ComponentExplorer','explorer@email.com'),('CyberExplorer44','cyberexplorer@email.com'),('DataDynamo76','datadynamo@email.com'),('GamerGeek88','gamer88@email.com'),('GamingGuru17','gamingguru@email.com'),('HardwareFanatic','hardwarefan@email.com'),('MegaTechGeek23','megatechgeek@email.com'),('PCMasterRace','pcmaster@email.com'),('PixelPioneer55','pixelpioneer@email.com'),('QuantumCoder21','quantumcoder@email.com'),('SiliconSavvy','savvy@email.com'),('SystemBuilderPro','systempro@email.com'),('TechEnthusiast42','tech42@email.com'),('TechSavvyUser','techsavvy@email.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_has_favorite_build`
--

DROP TABLE IF EXISTS `user_has_favorite_build`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_has_favorite_build` (
  `Username` varchar(100) NOT NULL,
  `Build_id` int unsigned NOT NULL,
  PRIMARY KEY (`Username`,`Build_id`),
  KEY `fk_User_has_Build_Build1_idx` (`Build_id`),
  KEY `fk_User_has_Build_User1_idx` (`Username`),
  CONSTRAINT `fk_User_has_Build_Build1` FOREIGN KEY (`Build_id`) REFERENCES `build` (`Build_id`),
  CONSTRAINT `fk_User_has_Build_User1` FOREIGN KEY (`Username`) REFERENCES `user` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_favorite_build`
--

LOCK TABLES `user_has_favorite_build` WRITE;
/*!40000 ALTER TABLE `user_has_favorite_build` DISABLE KEYS */;
INSERT INTO `user_has_favorite_build` VALUES ('ByteBuster99',0),('CircuitWizard23',0),('PixelPioneer55',0),('QuantumCoder21',0),('SiliconSavvy',0),('TechEnthusiast42',0),('ComponentExplorer',1),('PCMasterRace',1),('TechSavvyUser',1),('DataDynamo76',2),('MegaTechGeek23',2),('SystemBuilderPro',2),('TechEnthusiast42',2),('CircuitCraftsman87',3),('GamerGeek88',3),('HardwareFanatic',3),('SiliconSavvy',3),('BuildMaestro',4),('HardwareFanatic',4),('MegaTechGeek23',4),('CodeCraftsman',5),('GamerGeek88',5),('GamingGuru17',5),('PixelPioneer55',5),('ByteBlitzer98',6),('HardwareFanatic',6),('QuantumCoder21',6),('ByteBuster99',7),('CyberExplorer44',7),('SystemBuilderPro',7);
/*!40000 ALTER TABLE `user_has_favorite_build` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_rates_build`
--

DROP TABLE IF EXISTS `user_rates_build`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_rates_build` (
  `Username` varchar(100) NOT NULL,
  `Build_id` int unsigned NOT NULL,
  `rating` int NOT NULL,
  `date` date NOT NULL,
  `comment` text,
  PRIMARY KEY (`Username`,`Build_id`),
  KEY `fk_User_has_Build_Build2_idx` (`Build_id`),
  KEY `fk_User_has_Build_User2_idx` (`Username`),
  CONSTRAINT `fk_User_has_Build_Build2` FOREIGN KEY (`Build_id`) REFERENCES `build` (`Build_id`),
  CONSTRAINT `fk_User_has_Build_User2` FOREIGN KEY (`Username`) REFERENCES `user` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_rates_build`
--

LOCK TABLES `user_rates_build` WRITE;
/*!40000 ALTER TABLE `user_rates_build` DISABLE KEYS */;
INSERT INTO `user_rates_build` VALUES ('BuildMaestro',4,4,'2025-11-23','Perfect for video editing and graphic design   '),('ByteBlitzer98',5,5,'2016-12-23','Upgradable components for future expansions     '),('ByteBuster99',3,5,'2030-11-23','Excellent performance, handles any game smoothly'),('ByteBuster99',7,4,'2007-01-24','Sleek design with RGB lighting for a stylish setup'),('CircuitCraftsman87',5,4,'2007-01-24','Optimal airflow design for temperature control   '),('CircuitCraftsman87',6,4,'2019-12-23','Excellent value for the performance offered    '),('CircuitWizard23',1,3,'2017-12-23','Smooth multitasking and quick application load'),('CodeCraftsman',5,5,'2028-11-23','Silent operation while handling heavy workloads'),('ComponentExplorer',3,5,'2007-01-24','Budget-friendly option for casual gamers       '),('CyberExplorer44',7,3,'2017-12-23','Impressive rendering speeds for 3D modeling     '),('GamerGeek88',1,3,'2019-12-23',' Good value for gaming on a budget '),('GamerGeek88',5,5,'2010-01-24','Ideal for content creators and streamers       '),('GamingGuru17',4,4,'2007-01-24','Handles VR gaming smoothly with minimal lag      '),('HardwareFanatic',2,5,'2016-12-23','Quiet and powerful for work and gaming'),('HardwareFanatic',6,4,'2017-12-23','Reliable and efficient for everyday tasks      '),('MegaTechGeek23',7,3,'2010-01-24','Solid build for entry-level gaming enthusiasts   '),('PCMasterRace',0,3,'2028-11-23','Great for multitasking, speedy SSD'),('PCMasterRace',4,3,'2030-11-23','4K gaming powerhouse with stunning visuals     '),('PixelPioneer55',4,4,'2017-12-23','Ultra-quiet operation, perfect for shared spaces  '),('QuantumCoder21',6,3,'2010-01-24','Great balance of power and energy efficiency     '),('SiliconSavvy',2,4,'2010-01-24','Impressive gaming performance with high FPS    '),('SiliconSavvy',4,5,'2016-12-23','Efficient cooling system, stays cool under pressure'),('SystemBuilderPro',6,4,'2030-11-23','Fast boot times and quick application response  '),('TechEnthusiast42',0,4,'2025-11-23','Great build!'),('TechEnthusiast42',7,3,'2016-12-23','Superb build quality and reliable components   '),('TechSavvyUser',5,3,'2030-11-23','Compact build without sacrificing performance    ');
/*!40000 ALTER TABLE `user_rates_build` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/  /*!50003 TRIGGER `User_rates_Build_BEFORE_INSERT` BEFORE INSERT ON `user_rates_build` FOR EACH ROW BEGIN
    -- Check if the inserted value is between 1 and 5
    IF NEW.rating < 1 OR NEW.rating > 5 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Rating must be between 1 and 5';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/  /*!50003 TRIGGER `User_rates_Build_BEFORE_UPDATE` BEFORE UPDATE ON `user_rates_build` FOR EACH ROW BEGIN
	-- Check if the inserted value is between 1 and 5
    IF NEW.rating < 1 OR NEW.rating > 5 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Rating must be between 1 and 5';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `view_build_stats`
--

DROP TABLE IF EXISTS `view_build_stats`;
/*!50001 DROP VIEW IF EXISTS `view_build_stats`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_build_stats` AS SELECT 
 1 AS `Build_id`,
 1 AS `Build_name`,
 1 AS `Username`,
 1 AS `average_rating`,
 1 AS `number_of_ratings`,
 1 AS `times_added_to_favorites`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_user_stats`
--

DROP TABLE IF EXISTS `view_user_stats`;
/*!50001 DROP VIEW IF EXISTS `view_user_stats`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_user_stats` AS SELECT 
 1 AS `Username`,
 1 AS `count_builds`,
 1 AS `count_ratings`,
 1 AS `user_popularity`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `view_build_stats`
--

/*!50001 DROP VIEW IF EXISTS `view_build_stats`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50001 VIEW `view_build_stats` AS select `build`.`Build_id` AS `Build_id`,`build`.`name` AS `Build_name`,`build`.`Username` AS `Username`,coalesce(`avg_rating`.`average_rating`,0) AS `average_rating`,coalesce(`rating_count`.`number_of_ratings`,0) AS `number_of_ratings`,coalesce(`favorites_count`.`times_added_to_favorites`,0) AS `times_added_to_favorites` from (((`build` left join (select `user_rates_build`.`Build_id` AS `Build_id`,avg(`user_rates_build`.`rating`) AS `average_rating` from `user_rates_build` group by `user_rates_build`.`Build_id`) `avg_rating` on((`build`.`Build_id` = `avg_rating`.`Build_id`))) left join (select `user_rates_build`.`Build_id` AS `Build_id`,count(`user_rates_build`.`rating`) AS `number_of_ratings` from `user_rates_build` group by `user_rates_build`.`Build_id`) `rating_count` on((`build`.`Build_id` = `rating_count`.`Build_id`))) left join (select `user_has_favorite_build`.`Build_id` AS `Build_id`,count(`user_has_favorite_build`.`Username`) AS `times_added_to_favorites` from `user_has_favorite_build` group by `user_has_favorite_build`.`Build_id`) `favorites_count` on((`build`.`Build_id` = `favorites_count`.`Build_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_user_stats`
--

/*!50001 DROP VIEW IF EXISTS `view_user_stats`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50001 VIEW `view_user_stats` AS select `user`.`Username` AS `Username`,coalesce(`count_user_builds`.`count_builds`,0) AS `count_builds`,coalesce(`count_user_ratings`.`count_ratings`,0) AS `count_ratings`,coalesce(`count_user_popularity`.`user_popularity`,0) AS `user_popularity` from (((`user` left join (select `user`.`Username` AS `Username`,count(`build`.`Build_id`) AS `count_builds` from (`user` left join `build` on((`user`.`Username` = `build`.`Username`))) group by `user`.`Username`) `count_user_builds` on((`user`.`Username` = `count_user_builds`.`Username`))) left join (select `user`.`Username` AS `Username`,count(`user_rates_build`.`rating`) AS `count_ratings` from (`user` left join `user_rates_build` on((`user`.`Username` = `user_rates_build`.`Username`))) group by `user`.`Username`) `count_user_ratings` on((`user`.`Username` = `count_user_ratings`.`Username`))) left join (select `user`.`Username` AS `Username`,count(`user_has_favorite_build`.`Username`) AS `user_popularity` from ((`user` left join `build` on((`user`.`Username` = `build`.`Username`))) left join `user_has_favorite_build` on((`build`.`Build_id` = `user_has_favorite_build`.`Build_id`))) group by `user`.`Username`) `count_user_popularity` on((`user`.`Username` = `count_user_popularity`.`Username`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-17 22:42:11
