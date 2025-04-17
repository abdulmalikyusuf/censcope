"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Info, Loader2 } from "lucide-react";

import { authenticate } from "@/lib/actions/auth";

export function SigninForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  return (
    <form action={formAction} className="flex flex-col pt-3 md:pt-8">
      <div className="flex flex-col pt-4">
        <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
          <input
            type="email"
            name="email"
            className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
            placeholder="Email"
          />
        </div>
      </div>
      <div className="mb-12 flex flex-col pt-4">
        <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
          <input
            type="password"
            name="password"
            className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
            placeholder="Password"
          />
        </div>
      </div>
      <input type="hidden" name="redirectTo" value={callbackUrl} />

      <button
        aria-disabled={isPending}
        disabled={isPending}
        type="submit"
        className="w-full rounded-lg bg-gray-900 px-4 py-2 flex justify-center items-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"
      >
        {isPending ? <Loader2 className="size-6 animate-spin" /> : "Log in"}
      </button>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <Info className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
}
