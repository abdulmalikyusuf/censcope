import { and, eq, gte, lte, ilike } from "drizzle-orm";
import {
  createSearchParamsCache,
  parseAsIsoDate,
  parseAsString,
  parseAsArrayOf
} from 'nuqs/server'

import { BlogPost } from "@/components/post/post";
import { db } from "@/db";
import { BlogFilters } from "@/components/post/post-filters";
// import { CreatePostButton } from "@/components/create-post-button";
import { posts, tags as tagsTable, users } from "@/db/schema";

const searchParamsCache = createSearchParamsCache({
  q: parseAsString.withDefault(''),
  from: parseAsIsoDate,
  to: parseAsIsoDate,
  authorId: parseAsString,
  tags: parseAsArrayOf(parseAsString).withDefault([])
})


async function PostsPage(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const { authorId, tags: tagIds, from, to, q } = searchParamsCache.parse(searchParams)

  const whereConditions = [];

  if (authorId) {
    whereConditions.push(eq(posts.authorId, authorId));
  }

  if (from) {
    whereConditions.push(gte(posts.updatedAt, from));
  }

  if (to) {
    whereConditions.push(lte(posts.updatedAt, to));
  }
  if (q) {
    whereConditions.push(ilike(posts.title, `%${q}%`));
  }

  let results = await db.query.posts.findMany({
    where: and(...whereConditions),
    orderBy: (posts, { desc }) => [desc(posts.updatedAt)],
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

  // If tagIds are provided, filter results manually
  if (tagIds?.length) {
    results = results.filter((post) => {
      if (!post.tags.length) return false
      return post.tags.some((ptt) => tagIds.includes(ptt.tag.id))
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
    <div className="relative mx-auto mt-24 max-lg:max-w-2xl">
      <div className="relative flex justify-between items-start before:absolute before:top-0 before:h-px before:w-[200vw] before:bg-gray-950/5 dark:before:bg-white/10 before:-left-[100vw] after:absolute after:bottom-0 after:h-px after:w-[200vw] after:bg-gray-950/5 dark:after:bg-white/10 after:-left-[100vw]">
        <h1 className="mx-2 text-6xl tracking-tighter text-balance sm:text-7xl lg:text-8xl">
          Blog Posts
        </h1>

        {/* <CreatePostButton /> */}
      </div>
      <div className="mt-10 relative before:absolute before:top-0 before:h-px before:w-[200vw] before:bg-gray-950/5 dark:before:bg-white/10 before:-left-[100vw] after:absolute after:bottom-0 after:h-px after:w-[200vw] after:bg-gray-950/5 dark:after:bg-white/10 after:-left-[100vw]">
        <p className="mx-2 text-lg">
          Stories that spark insight.
        </p>
      </div>
      <BlogFilters tags={tags} authors={authors} />

      <div className="mt-12 mb-46 grid grid-cols-1 lg:grid-cols-[24rem_2.5rem_minmax(0,1fr)]">
        {finalPosts.map((post) => (
          <BlogPost
            key={post.id}
            {...post}
            author={post.author}
            published={post.published}
            tags={post.tags}
          />
        ))}
      </div>
    </div>
  );
}

export default PostsPage;
