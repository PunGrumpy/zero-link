CREATE TABLE "link" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" text NOT NULL,
	"clicks" integer DEFAULT 0 NOT NULL,
	"last_clicked" timestamp,
	CONSTRAINT "link_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "link_tag" (
	"link_id" text NOT NULL,
	"tag_id" text NOT NULL,
	CONSTRAINT "link_tag_link_id_tag_id_pk" PRIMARY KEY("link_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "tag" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"color" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "link" ADD CONSTRAINT "link_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "link_tag" ADD CONSTRAINT "link_tag_link_id_link_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."link"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "link_tag" ADD CONSTRAINT "link_tag_tag_id_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tag" ADD CONSTRAINT "tag_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "link_slug_idx" ON "link" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "link_creator_idx" ON "link" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "tag_creator_idx" ON "tag" USING btree ("created_by");