ALTER TABLE "users" RENAME TO "User";--> statement-breakpoint
ALTER TABLE "User" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "User" ADD CONSTRAINT "User_email_unique" UNIQUE("email");