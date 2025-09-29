import { db } from "@/db";
import {
  Banner,
  Newline,
  Support,
  Actions,
  Discover,
  SocialMedia,
} from "./(sections)/no-ssr";

export const dynamic = "force-dynamic";
export const revalidate = 0; // 0 for no cache, 60 for 1 minute cache

export default async function Page() {
  const posts = await db.query.posts.findMany({
    orderBy: (posts, { desc }) => [desc(posts.updatedAt)],
    columns: { title: true, slug: true, content: true, updatedAt: true },
    where: (posts, { eq }) => eq(posts.published, true),
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
    <>
      <Banner />
      {postsWithTags.length > 0 && <Newline posts={postsWithTags} />}
      <Support />
      <Actions />
      <Discover />
      <SocialMedia />
    </>
  );
}
