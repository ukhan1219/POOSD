
-- mariadb -u yourusername -p < startDatabase.sql

-- create the database
CREATE DATABASE IF NOT EXISTS connectify;
USE connectify;

-- create the 'users' table
CREATE TABLE IF NOT EXISTS users (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `dateCreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `dateLastLoggedin` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `firstName` VARCHAR(50) NOT NULL DEFAULT '',
    `lastName` VARCHAR(50) NOT NULL DEFAULT '',
    `username` VARCHAR(50) NOT NULL DEFAULT '',
    `password` VARCHAR(50) NOT NULL DEFAULT '',
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB;

-- create the 'contacts' table
CREATE TABLE IF NOT EXISTS contacts (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL DEFAULT '',
    `phone` VARCHAR(50) NOT NULL DEFAULT '',
    `email` VARCHAR(50) NOT NULL DEFAULT '',
    `userID` INT NOT NULL DEFAULT 0,
    `dateCreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`userID`) REFERENCES users(`ID`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- insert sample data into 'users' table
INSERT INTO users (firstName, lastName, username, password) VALUES
('John', 'Doe', 'johndoe', 'password123'),
('Jane', 'Smith', 'janesmith', 'password456'),
('user1', 'l1', 'user1', 'password1'),
('user2', 'l2', 'user2', 'password2'),
('user3', 'l3', 'user3', 'password3'),
('user4', 'l4', 'user4', 'password4'),
('user5', 'l5', 'user5', 'password5');


-- insert sample data into 'contacts' table
INSERT INTO contacts (name, phone, email, userID) VALUES
('David Green', '555-9876', 'david.green@example.com', 1),
('Emily Black', '555-4321', 'emily.black@example.com', 1),
('Frank Blue', '555-1111', 'frank.blue@example.com', 2),
('Grace Pink', '555-2222', 'grace.pink@example.com', 2),
('Harry Gray', '555-3333', 'harry.gray@example.com', 3),
('Isabel Gold', '555-4444', 'isabel.gold@example.com', 3),
('Jack Silver', '555-5555', 'jack.silver@example.com', 3),
('Kelly Bronze', '555-6666', 'kelly.bronze@example.com', 4),
('Liam Copper', '555-7777', 'liam.copper@example.com', 4),
('Mia Platinum', '555-8888', 'mia.platinum@example.com', 4),
('Noah Steel', '555-9999', 'noah.steel@example.com', 4),
('Olivia Iron', '555-0000', 'olivia.iron@example.com', 5),
('Paul Lead', '555-1235', 'paul.lead@example.com', 5),
('Quincy Zinc', '555-6789', 'quincy.zinc@example.com', 5),
('Rachel Mercury', '555-2345', 'rachel.mercury@example.com', 1),
('Sam Copper', '555-9877', 'sam.copper@example.com', 2),
('Tina Silver', '555-8766', 'tina.silver@example.com', 3),
('Uma Gold', '555-7654', 'uma.gold@example.com', 4),
('Victor Black', '555-6543', 'victor.black@example.com', 5),
('Wendy White', '555-5432', 'wendy.white@example.com', 1),
('Xander Green', '555-4329', 'xander.green@example.com', 2),
('Yara Blue', '555-3219', 'yara.blue@example.com', 3),
('Zane Red', '555-2109', 'zane.red@example.com', 4),
('Ava Silver', '555-1098', 'ava.silver@example.com', 5),
('Blake Gray', '555-9878', 'blake.gray@example.com', 1);


-- display data
SELECT * FROM users;
SELECT * FROM contacts;
