CREATE TABLE IF NOT EXISTS "settings" (
	"key" varchar(255) PRIMARY KEY NOT NULL,
	"value" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "reports" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"file_url" text NOT NULL,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone
);
