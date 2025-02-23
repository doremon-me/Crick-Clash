/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('ADMIN_ADMIN', 'MANAGE_USER', 'MANAGE_MATCHES');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "permissions" "Permission"[] DEFAULT ARRAY['MANAGE_USER']::"Permission"[],

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_id_key" ON "Admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_number_key" ON "Admin"("number");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
