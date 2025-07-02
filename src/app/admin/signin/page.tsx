import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

import { SigninForm } from "@/components/signin-form";

export default function LoginPage() {
  return (
    <div className="flex flex-wrap w-full">
      <div className="flex w-full flex-col md:w-1/2">
        <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
          <div className="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900">
            {" "}
            Censcope .{" "}
          </div>
        </div>
        <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
          <p className="text-left text-3xl font-bold">Welcome back</p>
          <p className="mt-2 text-left text-gray-500">
            To continue, please enter your details.
          </p>
          <Suspense>
            <SigninForm />
          </Suspense>
          <div className="py-12 text-center hidden">
            <p className="whitespace-nowrap text-gray-600">
              Don&apos;t have an account?
              <Link
                href="#"
                className="underline-offset-4 font-semibold text-gray-900 underline"
              >
                Sign up for free.
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
        <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
          <p className="mb-8 text-3xl font-semibold leading-10">
            The best and most beautiful things in the world cannot be seen or
            even touched - they must be felt with the heart.
          </p>
          <p className="mb-4 text-3xl font-semibold">Helen Keller</p>
        </div>
        <Image
          width={720}
          height={880}
          alt="We work 10x faster than our compeititors and stay consistant. While
            they're bogged won with techincal debt, we're realeasing
            new features."
          className="-z-0 absolute top-0 h-full w-full object-cover opacity-90"
          src="https://images.unsplash.com/photo-1565301660306-29e08751cc53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
      </div>
    </div>
  );
}
