/*
  Warnings:

  - You are about to drop the column `Name` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Shop` table. All the data in the column will be lost.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Name` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `UserPlay` table. All the data in the column will be lost.
  - You are about to drop the `_FoodsToTags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Record` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `name` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RecordStatus" AS ENUM ('LIKE', 'DISLIKE', 'EAT');

-- DropForeignKey
ALTER TABLE "UserPlay" DROP CONSTRAINT "UserPlay_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_FoodsToTags" DROP CONSTRAINT "_FoodsToTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_FoodsToTags" DROP CONSTRAINT "_FoodsToTags_B_fkey";

-- AlterTable
ALTER TABLE "Food" DROP COLUMN "Name",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "shop_id" TEXT;

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "Name",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Record" DROP COLUMN "status",
ADD COLUMN     "status" "RecordStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "Name",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
DROP COLUMN "Name",
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Tag_id_seq";

-- AlterTable
ALTER TABLE "UserPlay" DROP COLUMN "status",
ALTER COLUMN "user_id" DROP NOT NULL;

-- DropTable
DROP TABLE "_FoodsToTags";

-- CreateTable
CREATE TABLE "_foodsToTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_foodsToTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_foodsToTags_B_index" ON "_foodsToTags"("B");

-- AddForeignKey
ALTER TABLE "UserPlay" ADD CONSTRAINT "UserPlay_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "Shop"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_foodsToTags" ADD CONSTRAINT "_foodsToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_foodsToTags" ADD CONSTRAINT "_foodsToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
