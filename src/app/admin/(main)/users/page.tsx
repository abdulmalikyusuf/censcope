import { desc } from "drizzle-orm";
import type { Metadata } from "next";

import { db } from "@/db";
import { users } from "@/db/schema";
import UsersContent from "@/components/users/users-content";

export const metadata: Metadata = {
  title: "User management",
};

export default async function UsersPage() {
  const data = await db.select().from(users).orderBy(desc(users.updatedAt));
  return (
    <div className="relative mx-auto mt-24 max-lg:max-w-2xl h-[calc(100vh-6rem)]">
      <UsersContent users={data} />
    </div>
  );
}
