/*
  Warnings:

  - You are about to drop the column `authorId` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `article_id` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `type_id` on the `Media` table. All the data in the column will be lost.
  - Added the required column `author` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `article` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Article` DROP FOREIGN KEY `Article_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Article` DROP FOREIGN KEY `Article_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `Media` DROP FOREIGN KEY `Media_article_id_fkey`;

-- DropForeignKey
ALTER TABLE `Media` DROP FOREIGN KEY `Media_type_id_fkey`;

-- AlterTable
ALTER TABLE `Article` DROP COLUMN `authorId`,
    DROP COLUMN `category_id`,
    ADD COLUMN `author` INTEGER NOT NULL,
    ADD COLUMN `category` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Media` DROP COLUMN `article_id`,
    DROP COLUMN `type_id`,
    ADD COLUMN `article` INTEGER NOT NULL,
    ADD COLUMN `type` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_category_fkey` FOREIGN KEY (`category`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_author_fkey` FOREIGN KEY (`author`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_article_fkey` FOREIGN KEY (`article`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_type_fkey` FOREIGN KEY (`type`) REFERENCES `Media_Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
