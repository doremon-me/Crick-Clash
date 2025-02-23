-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "permissions" SET DEFAULT ARRAY['ADMIN_ADMIN']::"Permission"[];
