-- MySQL dump 10.13  Distrib 5.7.23, for Linux (x86_64)
--
-- Host: localhost    Database: node_forest
-- ------------------------------------------------------
-- Server version	5.7.23-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photo` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `upload_date` date DEFAULT NULL,
  `path` varchar(200) DEFAULT NULL,
  `tree_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `photo_tree__fk` (`tree_id`),
  CONSTRAINT `photo_tree__fk` FOREIGN KEY (`tree_id`) REFERENCES `tree` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo`
--

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` VALUES (1,'2018-08-23','../img/tree1.jpg',1),(2,'2018-08-03','../img/tree2.jpg',2),(3,'2018-08-27','../img/tree1.jpg',3),(4,'2018-08-18','../img/tree3.jpg',4),(5,'2018-08-16','../img/tree3.jpg',1);
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postcard_app`
--

DROP TABLE IF EXISTS `postcard_app`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `postcard_app` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `address` varchar(100) DEFAULT NULL,
  `post_code` varchar(10) DEFAULT NULL,
  `status` int(10) DEFAULT NULL,
  `apply_date` date DEFAULT NULL,
  `receive_date` date DEFAULT NULL,
  `tree_id` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `postcard_app_tree_id_fk` (`tree_id`),
  CONSTRAINT `postcard_app_tree_id_fk` FOREIGN KEY (`tree_id`) REFERENCES `tree` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postcard_app`
--

LOCK TABLES `postcard_app` WRITE;
/*!40000 ALTER TABLE `postcard_app` DISABLE KEYS */;
/*!40000 ALTER TABLE `postcard_app` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'staff_dog','1111','staff@uts.edu.au','7688980','UTS Building 11'),(2,'Beilll','2222','beilling@gmail.com','908098089808','Town hall');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tree`
--

DROP TABLE IF EXISTS `tree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tree` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `height` double DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `location_image` varchar(100) DEFAULT NULL,
  `species` varchar(20) DEFAULT NULL,
  `sayings` varchar(200) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `owner_id` int(10) NOT NULL,
  `staff_id` int(10) DEFAULT NULL,
  `health` varchar(20) DEFAULT NULL,
  `last_edit` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tree_user__fk` (`owner_id`),
  KEY `tree_staff__fk` (`staff_id`),
  CONSTRAINT `tree_staff__fk` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`),
  CONSTRAINT `tree_user__fk` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tree`
--

LOCK TABLES `tree` WRITE;
/*!40000 ALTER TABLE `tree` DISABLE KEYS */;
INSERT INTO `tree` VALUES (1,20.1,'Sahara Desert',NULL,'White birch','Protecting the environment is everyone’s responsibility','Ahihi',1,1,'Good','2018-08-27'),(2,15.66,'North Canada',NULL,'Cherry tree','I love Canada','Puppy',1,2,'Weak','2018-08-26'),(3,77.88,'Taklimakan',NULL,'White birch','For the tribe','Jinping Xi',2,2,'Good','2018-08-27'),(4,50.7,'Inner Mongolia grassland',NULL,'Poplar','Expecto Patronum','Patronus Charm',1,2,'Good','2018-08-28');
/*!40000 ALTER TABLE `tree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tree_app`
--

DROP TABLE IF EXISTS `tree_app`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tree_app` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `apply_date` date DEFAULT NULL,
  `species` varchar(20) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `sayings` varchar(200) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `status` int(10) DEFAULT NULL,
  `tree_id` int(10) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL,
  `staff_id` int(10) DEFAULT NULL,
  `complete_date` date DEFAULT NULL,
  `amount` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tree_app_tree__fk` (`tree_id`),
  KEY `tree_app_user_id_fk` (`user_id`),
  KEY `tree_app_staff_id_fk` (`staff_id`),
  CONSTRAINT `tree_app_staff_id_fk` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `tree_app_tree__fk` FOREIGN KEY (`tree_id`) REFERENCES `tree` (`id`),
  CONSTRAINT `tree_app_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tree_app`
--

LOCK TABLES `tree_app` WRITE;
/*!40000 ALTER TABLE `tree_app` DISABLE KEYS */;
/*!40000 ALTER TABLE `tree_app` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `balance` double DEFAULT '0',
  `address` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test','1234','might_103@yeah.net',100,'UTS Library','12345678'),(2,'ahihi','111','eatonjiangtonlei@gmail.com',0,'Central park','6666666');
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

-- Dump completed on 2018-08-28 12:58:10
