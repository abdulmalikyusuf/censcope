import { and, eq, ilike } from "drizzle-orm";
import {
  createSearchParamsCache,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

import { db } from "@/db";
import { posts, tags as tagsTable, users } from "@/db/schema";
import { NewsCard } from "./(sections)/news/card";
import Banner from "./(sections)/banner";
import { Filter } from "./(sections)/filter";

enum SortOrder {
  asc = "oldest",
  desc = "newest",
}
const searchParamsCache = createSearchParamsCache({
  q: parseAsString.withDefault(""),
  sort: parseAsStringEnum<SortOrder>(Object.values(SortOrder)).withDefault(
    SortOrder.desc
  ),
  authorId: parseAsString,
  tagId: parseAsString,
});

async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const { authorId, tagId, q, sort } = searchParamsCache.parse(searchParams);

  const whereConditions = [eq(posts.published, true)];

  if (authorId) {
    whereConditions.push(eq(posts.authorId, authorId));
  }
  if (q) {
    whereConditions.push(ilike(posts.title, `%${q}%`));
  }

  let results = await db.query.posts.findMany({
    where: and(...whereConditions),
    orderBy: (posts, { desc, asc }) => [
      sort === "newest" ? desc(posts.updatedAt) : asc(posts.updatedAt),
    ],
    with: {
      author: {
        columns: { name: true },
      },
      tags: {
        columns: {},
        with: {
          tag: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (tagId) {
    results = results.filter((post) => {
      if (!post.tags.length) return false;
      return post.tags.some((ptt) => tagId === ptt.tag.id);
    });
  }

  const authors = await db
    .select({ id: users.id, name: users.name, email: users.email })
    .from(users);
  const tags = await db.select().from(tagsTable);

  const finalPosts = results.map((post) => ({
    ...post,
    tags: post.tags.map((p2t) => p2t.tag),
  }));
  return (
    <>
      <Banner />
      <Filter count={finalPosts.length} tags={tags} authors={authors} />
      <div className="w-full grid gap-6 grid-cols-[repeat(auto-fit,minmax(min(280px,100%),320px))] pb-20 px-5% lg:px-7%">
        {finalPosts.map((post) => (
          <NewsCard
            key={post.id}
            title={post.title}
            slug={post.slug}
            content={post.content}
            tags={post.tags}
            updatedAt={post.updatedAt}
          />
        ))}
      </div>
    </>
  );
}

export default Page;
