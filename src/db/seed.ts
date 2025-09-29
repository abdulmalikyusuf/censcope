import "dotenv/config";
import { users } from "./schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

async function main() {
  const { SEED_EMAIL, SEED_NAME, SEED_PASSWORD, DATABASE_URL } = process.env;

  if (!SEED_EMAIL || !SEED_NAME || !SEED_PASSWORD || !DATABASE_URL) {
    console.error("Missing environment variables for seeding.");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool);

  try {
    console.log("Starting database seeding...");

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, SEED_EMAIL))
      .limit(1);

    if (existingUser.length > 0) {
      console.log("Seed user already exists. Skipping seeding.");
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(SEED_PASSWORD, 10);

    // Insert new user
    await db.insert(users).values({
      email: SEED_EMAIL,
      name: SEED_NAME,
      password: hashedPassword,
    });

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

if (process.env.MIGRATE_DB && JSON.parse(process.env.MIGRATE_DB)) {
  main().catch((err) => {
    console.error("❌ Seeding data failed:", err);
    process.exit(1);
  });
}
