/* eslint-disable @next/next/no-img-element */
"use client";

import { useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";

type GalleryItemProps = {
  id: string;
  url: string;
  title: string;
};
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteGallery } from "@/lib/actions/images";

export function GalleryItem({ id, url, title }: GalleryItemProps) {
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteGallery(id);
    });
  };
  return (
    <li
      key={id}
      className="group relative max-sm:line-y sm:max-lg:nth-[2n+1]:line-y lg:max-xl:nth-[3n+1]:line-y xl:nth-[4n+1]:line-y"
    >
      <div className="block transition hover:bg-gray-950/2.5">
        <div className="p-2">
          <img
            src={url}
            className="aspect-[1062/720] rounded-md outline outline-gray-950/10 sm:rounded-xl lg:rounded-xl"
            width="240"
            height="200"
            alt=""
          />
        </div>
        <p className="px-4 py-2 text-sm/6 font-medium sm:px-2">{title}</p>
      </div>
      <div className="absolute right-8 top-4 hidden group-hover:block">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="" size="icon" variant="destructive">
              {pending ? <Loader2 className="animate-spin" /> : <Trash2 />}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                image from all posts.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <Button disabled={pending} onClick={handleDelete}>
                {pending ? "Deleting..." : "Continue"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </li>
  );
}
