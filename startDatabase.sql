
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
('Jane', 'Smith', 'janesmith', 'password456');

-- insert sample data into 'contacts' table
INSERT INTO contacts (name, phone, email, userID) VALUES
('Alice Johnson', '555-1234', 'alice.johnson@example.com', 1),
('Bob Brown', '555-5678', 'bob.brown@example.com', 1),
('Carol White', '555-8765', 'carol.white@example.com', 2);

-- display data
SELECT * FROM users;
SELECT * FROM contacts;
