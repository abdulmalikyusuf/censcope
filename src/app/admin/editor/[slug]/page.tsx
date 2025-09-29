import { cache } from "react";
import type { Metadata } from "next";

import { TooltipProvider } from "@/components/ui/tooltip";
import TiptapEditor from "@/components/editor";
import { db } from "@/db";
import { tags as tagsTable } from "@/db/schema";

export const metadata: Metadata = {
  title: "Post Editor",
};

const getData = cache(async (slug: string) => {
  const postsWithTags = await db.query.posts.findFirst({
    where: (posts, { eq }) => eq(posts.id, slug),
    orderBy: (posts, { desc }) => [desc(posts.updatedAt)],
    columns: {
      id: true,
      content: true,
      slug: true,
      title: true,
    },
    with: {
      tags: {
        columns: {}, // Don't need columns from postsToTags itself
        with: {
          tag: {
            // Target the relation in postsToTags schema
            columns: {
              // Select desired columns from the tags table
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  // const result = await db
  //   .select({
  //     id: posts.id,
  //     title: posts.title,
  //     slug: posts.slug,
  //     content: posts.content,
  //     tags: postsToTags.tagId,
  //   })
  //   .from(posts)
  //   .leftJoin(postsToTags, eq(posts.id, postsToTags.postId))
  //   .where(eq(posts.id, slug));

  const tags = await db.select().from(tagsTable);

  return { post: postsWithTags, tags };
});

async function PostsPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;

  const { post, tags } = await getData(slug);

  if (!post) {
    return <div>Blog Post not found</div>;
  }

  return (
    <TooltipProvider>
      <TiptapEditor {...post} allTags={tags} />
    </TooltipProvider>
  );
}

export default PostsPage;
