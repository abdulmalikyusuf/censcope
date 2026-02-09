import { eq, isNotNull, ilike, and, count } from "drizzle-orm";
import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

import { db } from "@/db";
import { posts, tags as tagsTable, users } from "@/db/schema";
import { NewsCard } from "@/components/post/card";
import Banner from "./(sections)/banner";
import { Filter } from "./(sections)/filter";
import { Pagination } from "./(sections)/pagination";
import { newsMetadata } from "@/config/metadata";

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
  page: parseAsInteger.withDefault(1),
});

export const metadata = newsMetadata;
export const dynamic = "force-dynamic";

async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const { authorId, tagId, q, sort, page } = searchParamsCache.parse(searchParams);

  const limit = 4;
  const offset = (page - 1) * limit;

  // Build conditions
  const whereConditions = [eq(posts.published, true), isNotNull(posts.content)];
  if (authorId) whereConditions.push(eq(posts.authorId, authorId));
  if (q) whereConditions.push(ilike(posts.title, `%${q}%`));

  // Fetch paginated posts
  let results = await db.query.posts.findMany({
    where: and(...whereConditions),
    orderBy: (posts, { desc, asc }) => [
      sort === "newest" ? desc(posts.updatedAt) : asc(posts.updatedAt),
    ],
    columns: {
      title: true, coverImage: true, slug: true, updatedAt: true
    },
    with: {
      author: { columns: { name: true } },
      tags: {
        columns: {},
        with: {
          tag: { columns: { id: true, name: true } },
        },
      },
    },
    limit,
    offset,
  });

  // Filter by tagId (if needed)
  if (tagId) {
    results = results.filter((post) =>
      post.tags.some((ptt) => tagId === ptt.tag.id)
    );
  }

  const [{ totalCount }] = await db
    .select({ totalCount: count() })
    .from(posts)
    .where(and(...whereConditions));

  const totalPages = Math.ceil(totalCount / limit);

  // Fetch all authors/tags for filters (optional)
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
      <div className="pb-12 lg:pb-20 max-w-7xl [1520px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="flex justify-center w-full"> */}
        <div className="w-full grow-0 flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 [repeat(auto-fit,minmax(min(280px,100%),320px))]">
          {finalPosts.map((post) => (
            <NewsCard
              key={post.slug}
              postTitle={post.title}
              slug={post.slug}
              tags={post.tags}
              coverImage={post.coverImage}
              updatedAt={post.updatedAt}
              className="w-[320px]"
            />
          ))}
        </div>
        {/* </div> */}
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}

export default Page;
