import { db } from "@/db";
import {
  Banner,
  Newline,
  Support,
  Actions,
  Discover,
  SocialMedia,
} from "./(sections)/no-ssr";

export default async function Page() {
  const posts = await db.query.posts.findMany({
    orderBy: (posts, { desc }) => [desc(posts.updatedAt)],
    columns: { title: true, slug: true, content: true, updatedAt: true },
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
      <Newline posts={postsWithTags} />
      <Support />
      <Actions />
      <Discover />
      <SocialMedia />
    </>
  );
}
