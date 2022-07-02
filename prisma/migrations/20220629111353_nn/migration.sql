/*
  Warnings:

  - You are about to drop the column `authorId` on the `todo` table. All the data in the column will be lost.
  - Added the required column `userId` to the `todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "todo" DROP CONSTRAINT "todo_authorId_fkey";

-- AlterTable
ALTER TABLE "todo" DROP COLUMN "authorId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "isdone" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
