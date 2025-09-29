"use client";

import { forwardRef, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";
import { FaSpinner } from "react-icons/fa";

import { createPost } from "@/lib/actions/post";

export const CreatePostButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const router = useRouter();
  const [state, action, pending] = useActionState(createPost, null);

  useEffect(() => {
    if (state && "id" in state) {
      router.push(`/admin/editor/${state.id}`);
    }
  }, [state, router]);

  return (
    <form action={action}>
      <button
        type="submit"
        disabled={pending}
        className={
          className ??
          "inline-flex items-center gap-x-2 rounded-md bg-black px-3.5 py-2.5 text-sm font-medium text-white shadow-sm"
        }
        ref={ref}
        {...props}
      >
        {pending ? (
          <FaSpinner className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        ) : (
          <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        )}
        {children ?? "New Post"}
      </button>
    </form>
  );
});

CreatePostButton.displayName = "CreatePostButton";
