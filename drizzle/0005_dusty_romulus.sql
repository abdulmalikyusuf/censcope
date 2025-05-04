ALTER TABLE "post" DROP CONSTRAINT "post_author_id_users_cuid_fk";
--> statement-breakpoint
ALTER TABLE "posts_to_tags" DROP CONSTRAINT "posts_to_tags_post_id_post_cuid_fk";
--> statement-breakpoint
ALTER TABLE "posts_to_tags" DROP CONSTRAINT "posts_to_tags_tag_id_tag_cuid_fk";
--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_author_id_users_cuid_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("cuid") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_to_tags" ADD CONSTRAINT "posts_to_tags_post_id_post_cuid_fk" FOREIGN KEY ("post_id") REFERENCES "public"."post"("cuid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_to_tags" ADD CONSTRAINT "posts_to_tags_tag_id_tag_cuid_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("cuid") ON DELETE cascade ON UPDATE no action;