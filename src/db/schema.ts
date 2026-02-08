import {
  pgTable,
  text,
  primaryKey,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { timestamps } from "./columns.helpers";

export const users = pgTable("users", {
  id: text("cuid")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  avatar: text("avatars"),
  name: text("name"),
  password: varchar({ length: 1024 }).notNull(),
  ...timestamps,
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const posts = pgTable("post", {
  id: text("cuid")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content"),
  coverImage: varchar("coverImage", { length: 256 }),
  published: boolean("published").default(false).notNull(),
  authorId: varchar("author_id", { length: 255 }).references(() => users.id, {
    onDelete: "set null",
  }),
  ...timestamps,
});

export const images = pgTable("images", {
  id: text("cuid")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull(),
  url: text("url").notNull(),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  tags: many(postsToTags),
}));

export const tags = pgTable("tag", {
  id: text("cuid")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull().unique(),
});

export const tagsRelations = relations(tags, ({ many }) => ({
  posts: many(postsToTags),
}));

export const postsToTags = pgTable(
  "posts_to_tags",
  {
    postId: text("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey(t.postId, t.tagId),
  })
);

export const postsToTagsRelations = relations(postsToTags, ({ one }) => ({
  post: one(posts, {
    fields: [postsToTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postsToTags.tagId],
    references: [tags.id],
  }),
}));

export const settings = pgTable("settings", {
  key: varchar("key", { length: 255 }).primaryKey(),
  value: text("value").notNull(),
});

export const reports = pgTable("reports", {
  id: text("cuid")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull(),
  fileUrl: text("file_url").notNull(),
  ...timestamps,
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;
export type SelectPost = typeof posts.$inferSelect;
export type InsertTag = typeof tags.$inferInsert;
export type SelectTag = typeof tags.$inferSelect;
export type InsertImage = typeof images.$inferInsert;
export type SelectImage = typeof images.$inferSelect;
export type InsertSetting = typeof settings.$inferInsert;
export type SelectSetting = typeof settings.$inferSelect;
export type InsertReport = typeof reports.$inferInsert;
export type SelectReport = typeof reports.$inferSelect;
