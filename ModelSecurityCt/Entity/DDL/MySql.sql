CREATE TABLE `Person`
(
	`Id` INT AUTO_INCREMENT PRIMARY KEY,
	`FirstName` VARCHAR(100) NOT NULL,
	`LastName` VARCHAR(100) NOT NULL,
	`DocumentType` VARCHAR(100) NOT NULL,
	`Document` VARCHAR(100) NOT NULL,
	`DateBorn` datetime,
	`PhoneNumber` VARCHAR(20) NOT NULL,
	`Eps` VARCHAR(20) NOT NULL,
	`Genero` VARCHAR(20) NOT NULL,
	`RelatedPerson` BOOLEAN,
	`IsDeleted` BOOLEAN DEFAULT FALSE
);

CREATE TABLE `User`
(
	`Id` INT AUTO_INCREMENT PRIMARY KEY,
	`Email` VARCHAR(100) NOT NULL,
	`Password` VARCHAR(100) NOT NULL,
	`Active` BOOLEAN NOT NULL,
	`IsDeleted` BOOLEAN DEFAULT FALSE,
	`RegistrationDate` TIMESTAMP,
	`PersonId` INT UNIQUE NOT NULL
);

CREATE TABLE `RolUser`
(
	`Id` INT AUTO_INCREMENT PRIMARY KEY,
	`RolId` INT NOT NULL,
	`UserId` INT NOT NULL,
	`IsDeleted` BOOLEAN NOT NULL
);

CREATE TABLE `Role`
(
	`Id` INT AUTO_INCREMENT PRIMARY KEY,
	`Name` VARCHAR(100) NOT NULL,
	`Description` VARCHAR(100) NOT NULL,
	`IsDeleted` BOOLEAN DEFAULT FALSE
);

CREATE TABLE `RolFormPermission`
(
	`Id` INT AUTO_INCREMENT PRIMARY KEY,
	`RolId` INT NOT NULL,
	`FormId` INT NOT NULL,
	`PermissionId` INT NOT NULL,
	`IsDeleted` BOOLEAN NOT NULL
);

CREATE TABLE `Permission`
(
	`Id` INT AUTO_INCREMENT PRIMARY KEY,
	`Name` VARCHAR(100) NOT NULL,
	`Description` TEXT NOT NULL,
	`IsDeleted` BOOLEAN DEFAULT FALSE
);

CREATE TABLE `Form`
(
	`Id` INT AUTO_INCREMENT PRIMARY KEY,
	`Name` VARCHAR(100) NOT NULL,
	`Description` TEXT NOT NULL,
	`Url` VARCHAR(100) NOT NULL,
	`IsDeleted` BOOLEAN DEFAULT FALSE
);

CREATE TABLE `FormModule`
(
	`Id` INT AUTO_INCREMENT PRIMARY KEY,
	`ModuleId` INT NOT NULL,
	`FormId` INT NOT NULL,
	`IsDeleted` BOOLEAN DEFAULT FALSE
);

CREATE TABLE `Module`
(
	`Id` INT AUTO_INCREMENT PRIMARY KEY,
	`Name` VARCHAR(100) NOT NULL,
	`Description` TEXT NOT NULL,
	`IsDeleted` BOOLEAN NOT NULL
);

-- Relaciones

-- User - Person
ALTER TABLE `User` ADD CONSTRAINT `FK_User_Person` FOREIGN KEY (`PersonId`) REFERENCES `Person`(`Id`);

-- RolUser - User
ALTER TABLE `RolUser` ADD CONSTRAINT `FK_RolUser_User` FOREIGN KEY (`UserId`) REFERENCES `User`(`Id`);

-- RolUser - Rol
ALTER TABLE `RolUser` ADD CONSTRAINT `FK_RolUser_Rol` FOREIGN KEY (`RolId`) REFERENCES `Role`(`Id`);

-- Module - Form
ALTER TABLE `FormModule` ADD CONSTRAINT `FK_FormModule_Module` FOREIGN KEY (`ModuleId`) REFERENCES `Module`(`Id`);
ALTER TABLE `FormModule` ADD CONSTRAINT `FK_FormModule_Form` FOREIGN KEY (`FormId`) REFERENCES `Form`(`Id`);

-- RolFormPermission - Rol - Form - Permission
ALTER TABLE `RolFormPermission` ADD CONSTRAINT `FK_RolFormPermission_Rol` FOREIGN KEY (`RolId`) REFERENCES `Role`(`Id`);
ALTER TABLE `RolFormPermission` ADD CONSTRAINT `FK_RolFormPermission_Form` FOREIGN KEY (`FormId`) REFERENCES `Form`(`Id`);
ALTER TABLE `RolFormPermission` ADD CONSTRAINT `FK_RolFormPermission_Permission` FOREIGN KEY (`PermissionId`) REFERENCES `Permission`(`Id`);
