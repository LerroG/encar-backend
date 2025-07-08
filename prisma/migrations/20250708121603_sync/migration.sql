/*
  Warnings:

  - You are about to drop the column `name` on the `series` table. All the data in the column will be lost.
  - Added the required column `eng_name` to the `series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `korean_name` to the `series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `series` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "series" DROP COLUMN "name",
ADD COLUMN     "eng_name" TEXT NOT NULL,
ADD COLUMN     "korean_name" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;
