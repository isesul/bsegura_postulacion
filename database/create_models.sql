CREATE DATABASE [BSeguraDB]
GO

USE [BSeguraDB];
GO

CREATE Table Users
(
    Id int identity primary key,
    Name nvarchar(50),
    Email nvarchar(50),
    Age int
);
GO

INSERT INTO [Users] (Name, Email, Age)
VALUES 
    ('Elrond', 'elrond@email.com', 21),
    ('Bronwyn', 'bronwyn@email.com', 22),
    ('Hallbrand', 'hallbrand@email.com', 33),
    ('Isildur', 'isildur@email.com', 45),
    ('Arondir', 'arondir@email.com', 56),
    ('Durin', 'durin@email.com', 67),
    ('Frodo', 'frodo@email.com', 78),
    ('Aragorn', 'aragorn@email.com', 89),
    ('Boromir', 'boromir@email.com', 91),
    ('Legolas', 'legolas@email.com', 12),
    ('Gandalf', 'gandalf@email.com', 23),
    ('Galadriel', 'galadriel@email.com', 34);
GO
