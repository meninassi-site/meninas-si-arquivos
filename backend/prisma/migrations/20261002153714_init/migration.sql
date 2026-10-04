-- CreateTable
CREATE TABLE `admin` (
    `id_admin` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `admin_username_key`(`username`),
    UNIQUE INDEX `admin_email_key`(`email`),
    PRIMARY KEY (`id_admin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `member` (
    `id_member` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `photo` MEDIUMBLOB NULL,
    `biography` TEXT NULL,
    `contact_email` VARCHAR(45) NULL,
    `class_name` VARCHAR(45) NULL,
    `lattes` TEXT NULL,
    `linkedin` TEXT NULL,
    `admin_id_admin` INTEGER NOT NULL,

    PRIMARY KEY (`id_member`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event` (
    `id_event` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `event_description` TEXT NULL,
    `organizer` VARCHAR(45) NULL,
    `location` VARCHAR(45) NULL,
    `lenght_time` INTEGER NULL,
    `cover_photo` MEDIUMBLOB NULL,
    `registration_link` TEXT NULL,
    `data_occurence` DATE NULL,
    `time_occurence` TIME(0) NULL,
    `admin_id_admin` INTEGER NOT NULL,

    PRIMARY KEY (`id_event`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `workshop` (
    `id_workshop` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `event_description` TEXT NULL,
    `lacturer` VARCHAR(45) NULL,
    `location` VARCHAR(45) NULL,
    `lenght_time` INTEGER NULL,
    `cover_photo` BLOB NULL,
    `registration_link` TEXT NULL,
    `data_occurence` DATE NULL,
    `time_occurence` TIME(0) NULL,
    `admin_id_admin` INTEGER NOT NULL,

    PRIMARY KEY (`id_workshop`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `short_course` (
    `id_short_course` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `event_description` TEXT NULL,
    `lacturer` VARCHAR(45) NULL,
    `location` VARCHAR(45) NULL,
    `lenght_time` INTEGER NULL,
    `cover_photo` BLOB NULL,
    `registration_link` TEXT NULL,
    `data_occurence` DATE NULL,
    `time_occurence` TIME(0) NULL,
    `admin_id_admin` INTEGER NOT NULL,

    PRIMARY KEY (`id_short_course`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `member` ADD CONSTRAINT `member_admin_id_admin_fkey` FOREIGN KEY (`admin_id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_admin_id_admin_fkey` FOREIGN KEY (`admin_id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workshop` ADD CONSTRAINT `workshop_admin_id_admin_fkey` FOREIGN KEY (`admin_id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `short_course` ADD CONSTRAINT `short_course_admin_id_admin_fkey` FOREIGN KEY (`admin_id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;
