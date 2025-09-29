import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // allows self-signed certs
  },
});

export const db = drizzle(pool, { schema });
// const client = postgres(process.env.DATABASE_URL as string, { ssl: "require" });
// export const db = drizzle(client, { schema, casing: "snake_case" });
