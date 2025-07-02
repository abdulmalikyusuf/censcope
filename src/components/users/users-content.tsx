"use client";

import { useState, useTransition } from "react";
import { User, Pencil, Trash2, Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { getSupabaseImagePath } from "@/lib/utils";
import { SelectUser } from "@/db/schema";
import { UsersForm } from "@/components/users/form";
import { deleteUser } from "@/lib/actions/users";

function UsersContent({ users }: { users: SelectUser[] }) {
  const [selectedUser, setSelectedUser] = useState<null | SelectUser>(null);
  const [open, setOpen] = useState(false);

  const [isDeleting, startTransition] = useTransition();

  const handleDelete = async (userId: string) => {
    startTransition(async () => {
      try {
        const result = await deleteUser(userId);

        if (result.success) {
          setSelectedUser(null);
          toast.info(result.message);
          setOpen(false);
        }
        if (!result.success) toast.error(result.message);
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    });
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-y-8 lg:h-full pb-12">
      <div className="col-span-2 border-b border-gray-900/10 px-6 lg:h-full lg:overflow-y-auto">
        <h2 className="text-base/7 font-semibold text-gray-900">
          Put a face to your story
        </h2>
        <p className="mt-1 text-sm/6 text-gray-600 max-w-xs">
          Adding a photo makes your presence more personal and relatable.
          Whether you&apos;re sharing ideas, publishing posts, or collaborating
          with others, a profile image helps people recognize and remember you.
          It’s a small detail that makes a big difference in how you&apos;re
          seen.
        </p>
        <div className="flex flex-col gap-2 mt-10 max-lg:max-h-[50vh] overflow-auto">
          {users.map((user) => {
            console.log(user.name);
            return (
              <div
                key={user.id}
                data-active={selectedUser?.id === user.id ? true : false}
                className="group relative flex items-center justify-between gap-4 px-4 py-3 rounded-lg transition-colors duration-150 ease-in-out hover:bg-gray-50 data-[active=true]:bg-gray-100"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex-shrink-0 flex justify-center items-center size-12 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-gray-300">
                    {/* Prevent shrinking */}
                    {user.avatar ? (
                      <Image
                        // Ensure the key changes if the image URL can change for the same user ID
                        // key={user.avatar} // Optional: uncomment if avatar URL can change dynamically
                        src={getSupabaseImagePath(user.avatar)}
                        alt={`${user.name}'s avatar`}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                        priority={false}
                      />
                    ) : (
                      <User className="size-7 text-gray-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-600 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 opacity-0 transition-opacity duration-150 ease-in-out group-hover:opacity-100 focus-within:opacity-100">
                  <button
                    type="button"
                    onClick={() => setSelectedUser(user)}
                    className="p-1.5 rounded text-gray-500 hover:text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                    aria-label={`Edit user ${user.name}`}
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUser(user);
                      setOpen(true);
                    }}
                    className="p-1.5 rounded text-gray-500 hover:text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                    aria-label={`Delete user ${user.name}`}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            );
          })}
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  user and restrict their access.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  disabled={isDeleting}
                  onClick={() => handleDelete(selectedUser?.id as string)}
                >
                  {isDeleting ? (
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
      <div className="col-span-3 lg:h-full lg:overflow-y-auto relative group">
        {selectedUser && (
          <div className="hidden group-hover:block absolute top-4 right-8">
            <button
              type="button"
              className="text-sm/6 leading-6 text-gray-900"
              onClick={() => setSelectedUser(null)}
            >
              Clear
            </button>
          </div>
        )}
        <UsersForm user={selectedUser} key={selectedUser?.id} />
      </div>
    </div>
  );
}

export default UsersContent;
