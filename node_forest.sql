-- MySQL dump 10.13  Distrib 8.0.12, for Linux (x86_64)
--
-- Host: localhost    Database: node_forest
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `admin` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'testing','f1e8e3f2df1a28cacc953cca3f0168f5');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location` varchar(50) DEFAULT NULL,
  `path` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Sahara Desert',NULL),(2,'North Canada',NULL),(3,'Taklimakan',NULL),(4,'Inner Mongolia grassland',NULL);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `photo` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `upload_date` datetime DEFAULT NULL,
  `path` varchar(200) DEFAULT NULL,
  `tree_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `photo_tree__fk` (`tree_id`),
  CONSTRAINT `photo_tree__fk` FOREIGN KEY (`tree_id`) REFERENCES `tree` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo`
--

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` VALUES (1,'2018-08-23 00:00:00','../img/tree1.jpg',1),(2,'2018-08-03 00:00:00','../img/tree2.jpg',2),(3,'2018-08-27 00:00:00','../img/tree1.jpg',3),(4,'2018-08-18 00:00:00','../img/tree3.jpg',4),(5,'2018-08-16 00:00:00','../img/tree3.jpg',1),(6,'2018-10-06 00:00:00','server/uploads/2018-10-06T08:54:55.159Z46495182.jpg',1),(7,'2018-10-06 00:00:00','server/uploads/2018-10-06T08:57:14.054Z46495182.jpg',1),(8,'2018-10-06 00:00:00','server/uploads/2018-10-06T09:00:22.323Z46495182.jpg',1),(9,'2018-10-06 00:00:00','server/uploads/2018-10-06T09:01:54.913Z46495182.jpg',1),(10,'2018-10-09 18:09:09','server/uploads/2018-10-09T07:09:09.858ZInner Mongolia grassland.jpg',1);
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postcard_app`
--

DROP TABLE IF EXISTS `postcard_app`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `postcard_app` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `address` varchar(100) DEFAULT NULL,
  `post_code` varchar(10) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `apply_date` date DEFAULT NULL,
  `receive_date` date DEFAULT NULL,
  `tree_id` int(10) NOT NULL,
  `message` varchar(200) DEFAULT NULL,
  `recipient` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postcard_app_tree_id_fk` (`tree_id`),
  CONSTRAINT `postcard_app_tree_id_fk` FOREIGN KEY (`tree_id`) REFERENCES `tree` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postcard_app`
--

LOCK TABLES `postcard_app` WRITE;
/*!40000 ALTER TABLE `postcard_app` DISABLE KEYS */;
INSERT INTO `postcard_app` VALUES (1,'1341dasfafs','2342','SUBMITTED','2018-10-09',NULL,1,NULL,'we2'),(2,'difjapodjf','1231','SUBMITTED','2018-10-09',NULL,1,'I tried','recipent');
/*!40000 ALTER TABLE `postcard_app` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `species`
--

DROP TABLE IF EXISTS `species`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `species` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `species` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `species`
--

LOCK TABLES `species` WRITE;
/*!40000 ALTER TABLE `species` DISABLE KEYS */;
INSERT INTO `species` VALUES (1,'White birch'),(2,'Cherry tree'),(3,'Poplar'),(4,'Pine'),(5,'Ginkgo Tree');
/*!40000 ALTER TABLE `species` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `staff` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'staff','f6b6aad4e094c7d2dedef4d5cf5822c1','staff@uts.edu.au','7688980','UTS Building 11'),(2,'Beilll','2222','beilling@gmail.com','908098089808','Town hall'),(3,'eric','6bea86ac5bec762a1e18327feed60396','email@email.com',NULL,NULL);
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tree`
--

DROP TABLE IF EXISTS `tree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tree` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `height` double DEFAULT NULL,
  `species` varchar(20) DEFAULT NULL,
  `sayings` varchar(200) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `owner_id` int(10) NOT NULL,
  `staff_id` int(10) DEFAULT NULL,
  `health` varchar(20) DEFAULT NULL,
  `last_edit` datetime DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tree_user__fk` (`owner_id`),
  KEY `tree_staff__fk` (`staff_id`),
  KEY `tree_location__fk` (`location_id`),
  CONSTRAINT `tree_location__fk` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`),
  CONSTRAINT `tree_staff__fk` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`),
  CONSTRAINT `tree_user__fk` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tree`
--

LOCK TABLES `tree` WRITE;
/*!40000 ALTER TABLE `tree` DISABLE KEYS */;
INSERT INTO `tree` VALUES (1,20.1,'White birch','Protecting the environment is everyone’s responsibility','Ahihi',1,2,'','2018-08-27 00:00:00',1),(2,15.66,'Cherry tree','I love Canada','Puppy',1,1,'Weak','2018-08-26 00:00:00',2),(3,77.88,'White birch','For the tribe','Jinping Xi',3,1,'Good','2018-08-27 00:00:00',3),(4,50.7,'Poplar','Expecto Patronum','Patronus Charm',2,1,'Good','2018-08-28 00:00:00',4),(7,0.5,'Poplar','Tebieman','Given',1,3,'GOOD','2018-10-09 18:23:17',1),(8,15,'White birch','Tried','Baby',1,1,'GOOD','2018-10-09 21:03:23',4),(9,15,'White birch','asdfa','dsfa',1,1,'GOOD','2018-10-09 21:10:31',1);
/*!40000 ALTER TABLE `tree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tree_app`
--

DROP TABLE IF EXISTS `tree_app`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tree_app` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `apply_date` datetime DEFAULT NULL,
  `species` varchar(20) DEFAULT NULL,
  `sayings` varchar(200) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `tree_id` int(10) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL,
  `staff_id` int(10) DEFAULT NULL,
  `complete_date` datetime DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `reason` varchar(200) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tree_app_tree__fk` (`tree_id`),
  KEY `tree_app_user_id_fk` (`user_id`),
  KEY `tree_app_staff_id_fk` (`staff_id`),
  KEY `tree_app_location__fk` (`location_id`),
  CONSTRAINT `tree_app_location__fk` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`),
  CONSTRAINT `tree_app_staff_id_fk` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `tree_app_tree__fk` FOREIGN KEY (`tree_id`) REFERENCES `tree` (`id`),
  CONSTRAINT `tree_app_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tree_app`
--

LOCK TABLES `tree_app` WRITE;
/*!40000 ALTER TABLE `tree_app` DISABLE KEYS */;
INSERT INTO `tree_app` VALUES (1,'2018-10-09 11:32:50','White birch','Tried','Patty','APPROVED',1,1,1,'2018-10-09 01:12:43',20,'Very good',1),(2,'2018-10-09 12:41:44','White birch','Ok','Test','SUBMITTED',NULL,1,2,NULL,20,NULL,2),(3,'2018-10-09 12:44:44','Poplar','Tebieman','Given','APPROVED',7,1,3,'2018-10-09 18:23:17',20,'',3),(4,'2018-10-09 20:18:18','White birch','Tried','Baby','APPROVED',8,1,1,'2018-10-09 21:03:23',20,'',2),(5,'2018-10-09 21:00:14','White birch','asdfa','dsfa','APPROVED',9,1,1,'2018-10-09 21:10:31',20,'',1),(6,'2018-10-09 21:01:32','White birch','Say something','Tried','SUBMITTED',NULL,1,1,NULL,20,NULL,3);
/*!40000 ALTER TABLE `tree_app` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `balance` double DEFAULT '0',
  `address` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test','70664c664af04ecb370378420fb76270','might_103@yeah.net',100,'UTS Library','12345678'),(2,'ahihi','6caac9179499d83988122e19792229c9','eatonjiangtonlei@gmail.com',0,'Central park','6666666'),(3,'eaton','e026e56b060f3027847fd1149e8af91e','eatonjiangtonlei@gmail.com',0,NULL,NULL),(4,'ton','d5cf2d085865d7dd82869bb63c13367d','might_103@yeah.net',0,NULL,NULL),(15,'asdfasdf','d462b934122830fd6a2696b625fd48e1','asdf@asdf.com',0,NULL,NULL),(16,'test','70664c664af04ecb370378420fb76270','asdf@asdf.com',0,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-09 22:33:41
