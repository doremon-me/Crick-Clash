-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "permissions" SET DEFAULT ARRAY['MANAGE_MATCHES']::"Permission"[];
