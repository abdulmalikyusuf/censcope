import { eq, isNotNull, and } from "drizzle-orm";

import { db } from "@/db";
import { posts as postsTable } from "@/db/schema";
import { NewsCard } from "@/components/post/card";

export const dynamic = "force-dynamic";
export const revalidate = 0; // 0 for no cache, 60 for 1 minute cache

export async function Newsline() {
  const posts = await db.query.posts.findMany({
    where: and(isNotNull(postsTable.content), eq(postsTable.published, true)),
    orderBy: (posts, { desc }) => [desc(posts.updatedAt)],
    columns: { title: true, slug: true, content: true, updatedAt: true },
    limit: 5,
    with: {
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

  const postsWithTags = posts.map((post) => ({
    ...post,
    tags: post.tags.map((p2t) => p2t.tag),
  }));

  return (
    <section
      id="newsline"
      className="flex flex-col py-10 gap-10 px-5% lg:px-10%"
    >
      <div className="w-full flex flex-col lg:flex-row">
        <h2 className="text-base lg:text-3xl first-letter:capitalize">news</h2>

        {/* <div className="flex ml-auto items-center gap-2 text-white">
          <FaArrowLeft className="p-3 cursor-pointer rounded-full bg-black w-10 h-10 active:scale-90 hover:bg-cyan-600 transition-all" />
          <FaArrowRight className="p-3 cursor-pointer rounded-full bg-black w-10 h-10 active:scale-90 hover:bg-cyan-600 transition-all" />
        </div> */}
      </div>

      <article className="-mx-2% lg:-mx-4% w-full flex items-center justify-start gap-4 overflow-auto snap-x snap-mandatory hide-scrollbar">
        {postsWithTags.map((post) => (
          <NewsCard
            key={post.slug}
            content={post.content}
            slug={post.slug}
            title={post.title}
            updatedAt={post.updatedAt}
            tags={post.tags}
          />
        ))}
      </article>
    </section>
  );
}
