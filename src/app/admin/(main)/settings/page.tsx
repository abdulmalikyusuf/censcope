import type { Metadata } from "next";
import Image from "next/image";
import { getBackgroundImageUrl } from "@/lib/actions/settings";
import { BackgroundImageForm } from "./background-form";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  const backgroundUrl = await getBackgroundImageUrl();

  return (
    <div className="relative mx-auto mt-24 max-lg:max-w-2xl">
      <div className="line-y px-4 py-2 sm:px-2">
        <h2 className="max-w-3xl text-3xl font-medium tracking-tight text-pretty md:text-[2.5rem]/14">
          Site settings
        </h2>
        <p className="mt-4 max-w-2xl text-base/7 text-gray-600">
          Change the home page background image. It will be shown in the hero section on the main site.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Home page background image</h3>
          {backgroundUrl ? (
            <div className="relative rounded-lg overflow-hidden border border-gray-200 max-w-2xl aspect-video bg-gray-100">
              <Image
                src={backgroundUrl}
                alt="Current background"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <p className="text-sm text-gray-500">No custom background set. Default hero image is used.</p>
          )}
          <BackgroundImageForm />
        </div>
      </div>
    </div>
  );
}
