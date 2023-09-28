CREATE DATABASE [WordleApp]
GO

USE [WordleApp]
GO

--DONT TOUCH
--USE master
--DROP DATABASE [FoodApp]
--GO

CREATE TABLE [USERS] (
  [user_id] integer IDENTITY(1,1) PRIMARY KEY,
  [user_email] nvarchar(255) UNIQUE,
)
GO

CREATE TABLE [EVENTS] (
  [event_id] integer IDENTITY(1,1) PRIMARY KEY,
  [word] VARCHAR(5) UNIQUE,
  [active] bit
)
GO

CREATE TABLE [EVENTRESPONSES]
(
  [response_id] INTEGER IDENTITY(1,1) PRIMARY KEY,
  [event_id] INTEGER,
  [user_id] INTEGER,
  [duration] TIME(0)
)
GO

ALTER TABLE [EVENTRESPONSES] ADD FOREIGN KEY ([event_id]) REFERENCES [EVENTS] ([event_id])

ALTER TABLE [EVENTRESPONSES] ADD FOREIGN KEY ([user_id]) REFERENCES [USERS] ([user_id])
GO



INSERT INTO [dbo].[USERS]
           ([user_email])
     VALUES
           ('jklol@gmail.com'),
		   ('kekw@gmail.com'),
		   ('PogO@gamil.com')
GO


INSERT INTO [dbo].[EVENTS]([word],[active]) 
            VALUES
            ('JAMEL',1)


SELECT * FROM USERS

SELECT * FROM EVENTRESPONSES

SELECT * FROM EVENTS