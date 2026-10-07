-- AlterTable
ALTER TABLE `job` ADD COLUMN `position` VARCHAR(191) NULL,
    ADD COLUMN `thoughts` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `SkillGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SkillGroup_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
