-- phpMyAdmin SQL Dump
-- version OVH
-- https://www.phpmyadmin.net/
--
-- Hôte : ***REMOVED***.mysql.db
-- Généré le : ven. 25 juin 2021 à 15:19
-- Version du serveur :  5.6.50-log
-- Version de PHP : 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : ***REMOVED***
--

CREATE TABLE progression
(
    date  date   NOT NULL,
    score int(3) NOT NULL COMMENT 'En pourcentage',
    PRIMARY KEY (date)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

CREATE TABLE theme
(
    id    int(4)                                 NOT NULL AUTO_INCREMENT,
    name  varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
    image varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

CREATE TABLE card
(
    id    int(4) NOT NULL AUTO_INCREMENT,
    score int(1) NOT NULL,
    theme int(4) NOT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

CREATE TABLE question
(
    id    int(4) NOT NULL AUTO_INCREMENT,
    text  varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    image varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FOREIGN KEY (id) REFERENCES card (id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

CREATE TABLE answer
(
    id    int(4) NOT NULL AUTO_INCREMENT,
    text  varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    image varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FOREIGN KEY (id) REFERENCES question (id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;


COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;

# DROP TABLE progression;
# DROP TABLE theme;
# DROP TABLE answer;
# DROP TABLE question;
# DROP TABLE card;
#
# COMMIT;
