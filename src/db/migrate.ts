import "dotenv/config";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { Client as PgClient } from "pg";
import * as newSchema from "./schema";
import * as oldSchema from "./old-schema";

export async function runMigrate() {
  console.log("🚀 Starting migration...");

  // 🔹 Connect to old DB
  const oldClient = new PgClient({
    connectionString: process.env.POSTGRES_URL,
  });
  await oldClient.connect();
  const oldDb = drizzlePg(oldClient, { schema: oldSchema });

  // 🔹 Connect to new DB
  const newClient = new PgClient({
    connectionString: process.env.DATABASE_URL,
  });
  await newClient.connect();
  const newDb = drizzlePg(newClient, { schema: newSchema });

  // 1. Migrate Users
  const oldUsers = await oldDb.select().from(oldSchema.users);
  const existingUsers = await newDb
    .select({ email: newSchema.users.email, id: newSchema.users.id })
    .from(newSchema.users);
  const existingEmails = new Set(existingUsers.map((u) => u.email));
  const newUsers = oldUsers.filter((u) => !existingEmails.has(u.email));

  if (newUsers.length) {
    await newDb
      .insert(newSchema.users)
      .values(newUsers.map((u) => ({ ...u, password: "" })))
      .onConflictDoNothing();
    console.log(`✅ Migrated ${newUsers.length} users`);
  }

  // 2. Migrate Tags
  const tags = await oldDb.select().from(oldSchema.tags);
  if (tags.length) {
    await newDb.insert(newSchema.tags).values(tags).onConflictDoNothing();
    console.log(`✅ Migrated ${tags.length} tags`);
  }

  // 3. Migrate Posts
  const posts = await oldDb.select().from(oldSchema.posts);
  const validUserIds = new Set(existingUsers.map((u) => u.id));

  const remappedPosts = posts.map((p) => ({
    ...p,
    authorId:
      p.authorId && validUserIds.has(p.authorId)
        ? p.authorId
        : validUserIds.values().next().value,
  }));
  if (posts.length) {
    await newDb
      .insert(newSchema.posts)
      .values(remappedPosts)
      .onConflictDoNothing();
    console.log(`✅ Migrated ${posts.length} posts`);
  }

  // 4. Migrate Images
  const images = await oldDb.select().from(oldSchema.images);
  if (images.length) {
    await newDb.insert(newSchema.images).values(images).onConflictDoNothing();
    console.log(`✅ Migrated ${images.length} images`);
  }

  // 5. Migrate PostsToTags (join table)
  const postsToTags = await oldDb.select().from(oldSchema.postsToTags);
  if (postsToTags.length) {
    await newDb
      .insert(newSchema.postsToTags)
      .values(postsToTags)
      .onConflictDoNothing();
    console.log(`✅ Migrated ${postsToTags.length} post-tag relations`);
  }

  console.log("🎉 Migration complete!");
  process.exit(0);
}

if (process.env.MIGRATE_DB && JSON.parse(process.env.MIGRATE_DB)) {
  console.log("MIGRATE_DB is set. Running migrations...");
  runMigrate().catch((err) => {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  });
}
