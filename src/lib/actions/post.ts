"use server";

import { revalidatePath } from "next/cache";
import { createId } from "@paralleldrive/cuid2";
import { eq, like, sql } from "drizzle-orm";

import { db } from "@/db";
import { InsertPost, posts, postsToTags } from "@/db/schema";
import { slugify } from "../utils";
import { auth } from "../auth";

export async function createPost() {
  console.log("Creating a new post...");
  try {
    // 1. Count existing "Untitled Post #" posts
    const untitledPostCountResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(posts)
      .where(like(posts.title, "Untitled Post %"));

    const untitledPostCount = untitledPostCountResult[0]?.count ?? 0;

    // 2. Generate the new title
    const title = `Untitled Post #${+untitledPostCount + 1}`;

    // 3. Generate the slug
    const slug = `${slugify(title)}-${createId()}`;

    const session = await auth();

    if (!session || !session.user) {
      return { message: "Could not authenticate user. Please sign in." };
    }

    const newPost = await db
      .insert(posts)
      .values({
        title,
        authorId: session.user.id,
        slug,
      })
      .returning();

    // 4. Return the newly created post
    return newPost[0];
  } catch (error) {
    console.error("Error creating post:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to create post");
  }
}

export async function updatePost(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const postId = formData.get("postId") as string;

    const tagsFormDataValue = formData.getAll("tags");

    // Convert FormDataEntryValue[] to string[] (important type check)
    const tagIds: string[] = tagsFormDataValue
      .map((tag) => (typeof tag === "string" ? tag : "")) // Handle potential File entries if needed, though unlikely for hidden inputs
      .filter((tag) => tag !== "");

    if (!content) {
      return { message: "Content is required." };
    }
    const session = await auth();

    if (!session || !session.user) {
      return { message: "Could not authenticate user. Please sign in." };
    }

    const result = await db.transaction(async (tx) => {
      let currentPostId = postId; // Use existing ID for updates
      let currentPostSlug: string;

      // 1. Create or Update the Post
      if (currentPostId) {
        const dataToUpdate: Partial<InsertPost> = { content };
        console.log(title);
        if (typeof title === "string") {
          dataToUpdate.title = title;
          dataToUpdate.slug = slugify(title);
        }

        const post = await tx
          .update(posts)
          .set(dataToUpdate)
          .where(eq(posts.id, currentPostId))
          .returning({ slug: posts.slug });

        currentPostSlug = post[0].slug;
      } else {
        const newPostResult = await tx
          .insert(posts)
          .values({
            title,
            content,
            slug: slugify(title),
            authorId: session.user.id,
          })
          .returning({ newId: posts.id, slug: posts.slug });

        currentPostId = newPostResult[0].newId;
        currentPostSlug = newPostResult[0].slug;
      }

      if (!currentPostId) {
        throw new Error("Failed to create or find post ID.");
      }

      // 3. Manage Associations in postsToTags (Sync links)
      //    a. Delete existing associations for this post
      await tx.delete(postsToTags).where(eq(postsToTags.postId, currentPostId));

      //    b. Insert new associations if there are tags to link
      if (tagIds.length > 0) {
        const newPostsToTags = tagIds.map((tagId) => ({
          postId: currentPostId!, // We ensured currentPostId is set
          tagId: tagId,
        }));

        await tx.insert(postsToTags).values(newPostsToTags);
      }

      return { postId: currentPostId, slug: currentPostSlug };
    });

    if (result.postId) {
      revalidatePath(`/admin/editor/${result.postId}`);
      revalidatePath(`/blog/${result.slug}`); // Revalidate public post page
    }

    return {
      success: true,
      postId: result.postId,
      message: `Post ${postId ? "updated" : "created"} successfully!`,
    };
  } catch (error) {
    console.error({ error });
    console.error("Error creating post:", error);
    return { message: "Failed to create post. Please try again." };
  }
}

export async function publishPost(postId: string, state: boolean) {
  try {
    const result = await db
      .update(posts)
      .set({
        published: state,
      })
      .where(eq(posts.id, postId))
      .returning({ slug: posts.slug, published: posts.published });
    // revalidatePath(".");
    return { success: true, published: result.at(0)?.published };
  } catch (error) {
    console.error("Failed to publish post:", error);
    return { success: false, error: "Failed to publish post." };
  }
}
export async function deletePost(postId: string) {
  try {
    await db.delete(posts).where(eq(posts.id, postId));
    return { success: true };
  } catch (error) {
    console.error("Failed to delete post:", error);
    return { success: false, error: "Failed to delete post." };
  }
}
