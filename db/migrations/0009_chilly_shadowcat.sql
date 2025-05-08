ALTER TABLE "plan" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "plan" CASCADE;--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_plan_id_plan_id_fk";
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "plan_id" DROP NOT NULL;