"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  User,
  Calendar,
  Edit,
  Trash2,
  Send,
  EyeOff,
  Loader2,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deletePost, publishPost } from "@/lib/actions/post";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

const PostContent = dynamic(() => import("./post-content"), { ssr: false });

interface BlogPostProps {
  tags: {
    name: string;
    id: string;
  }[];
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  slug: string;
  content: string | null;
  published: boolean;
  authorId: string;
  author: {
    name: string | null;
  };
}

export function BlogPost({
  id,
  content,
  title,
  updatedAt,
  published,
  author,
  tags,
}: BlogPostProps) {
  const [open, setOpen] = useState(false);
  const [isPublished, setIsPublished] = useState(published);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deletePost(id);
      if (result.success) {
        router.refresh();
        setOpen(false);
      } else {
        alert(result.error);
      }
    });
  };
  const handleEdit = () => router.push(`/admin/editor/${id}`);

  const handlePublishToggle = async () => {
    setIsPublishing(true);
    const result = await publishPost(id, !published);
    if (result.published) setIsPublished(result.published);
    setIsPublishing(false);
  };

  return (
    <>
      <div className="p col-span-3 grid grid-cols-subgrid divide-x divide-gray-950/5 dark:divide-white/10 relative before:absolute before:top-0 before:h-px before:w-[200vw] before:bg-gray-950/5 dark:before:bg-white/10 before:-left-[100vw] after:absolute after:bottom-0 after:h-px after:w-[200vw] after:bg-gray-950/5 dark:after:bg-white/10 after:-left-[100vw]">
        <div className="px-2 py-4 font-mono text-sm/6 text-gray-500 dark:text-gray-400 max-lg:hidden space-y-3">
          <div className="flex items-center gap-1.5 font-medium tracking-widest uppercase">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(updatedAt!)}</span>
          </div>
          <div className="flex items-center gap-1.5 font-sans normal-case font-medium">
            <User className="h-4 w-4" />
            <span>{author.name}</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-start mb-6">
            {" "}
            <Button
              variant={isPublished ? "outline" : "default"}
              size="sm"
              onClick={handlePublishToggle}
              disabled={isPublishing}
            >
              {isPublishing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : isPublished ? (
                <>
                  {" "}
                  <EyeOff className="mr-1.5 h-4 w-4" /> Unpublish{" "}
                </>
              ) : (
                <>
                  {" "}
                  <Send className="mr-1.5 h-4 w-4" /> Publish{" "}
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit className="mr-1.5 h-4 w-4" /> Edit
            </Button>
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-1.5 h-4 w-4" /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isPending}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isPending}
                    onClick={handleDelete}
                  >
                    {isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Continue"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="max-lg:hidden"></div>

        <div className="px-2 py-4 text-md">
          {" "}
          <div className="max-w-none">
            <div className="mb-4 space-y-2 lg:hidden">
              <div className="flex items-center gap-1.5 font-mono text-sm/6 font-medium tracking-widest text-gray-500 dark:text-gray-400 uppercase">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(updatedAt!)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400">
                <User className="h-4 w-4" />
                <span>{author.name}</span>
              </div>
            </div>

            <Link
              href={`/admin/editor/${id}`}
              className="font-semibold text-xl md:text-2xl text-gray-900 dark:text-white mb-4 font-anton"
            >
              {title}
            </Link>

            {tags && tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="capitalize"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}

            <PostContent content={content} />
          </div>
        </div>
      </div>

      <div className="contents divide-x divide-gray-950/5 dark:divide-white/10">
        <div className="h-16 max-lg:hidden"></div>
        <div className="h-16 max-lg:hidden"></div>
        <div className="h-16"></div>
      </div>
    </>
  );
}
