-- AlterTable
ALTER TABLE `Article` MODIFY `title` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Category` MODIFY `label` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Media` MODIFY `url` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Media_Type` MODIFY `label` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Tag` MODIFY `label` VARCHAR(255) NOT NULL,
    MODIFY `icon` VARCHAR(255) NULL,
    MODIFY `color` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `first_name` VARCHAR(255) NOT NULL,
    MODIFY `last_name` VARCHAR(255) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `role` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `slot` INTEGER NOT NULL,
    `alcool` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `companion_id` INTEGER NULL,
    `order` INTEGER NOT NULL,
    `code` VARCHAR(255) NOT NULL,
    `pdf` BLOB NOT NULL,
    `event_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_Id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_companion_id_fkey` FOREIGN KEY (`companion_id`) REFERENCES `Reservation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_order_fkey` FOREIGN KEY (`order`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_user_Id_fkey` FOREIGN KEY (`user_Id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
