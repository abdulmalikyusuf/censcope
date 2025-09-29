import type { Metadata } from "next";

import { UploadImage } from "@/components/gallery/upload-image";
import { db } from "@/db";
import { images as imagesTable } from "@/db/schema";
import { GalleryItem } from "@/components/gallery/item";

export const metadata: Metadata = {
  title: "Gallery",
};

async function GalleryPage() {
  const images = await db.select().from(imagesTable);

  return (
    <div className="relative mx-auto mt-24 max-lg:max-w-2xl">
      <div className="line-y px-4 py-2 sm:px-2">
        <h2 className="max-w-3xl text-3xl font-medium tracking-tight text-pretty md:text-[2.5rem]/14">
          Images don’t just decorate — they communicate
        </h2>
        <p className="mt-4 max-w-2xl text-base/7 text-gray-600">
          Great content doesn’t stop at well-written words. Images add context,
          emotion, and clarity — helping readers connect, pause, and remember.
          Whether it’s a photo, diagram, or visual metaphor, the right image can
          turn a good post into a great one. Use them to enhance storytelling,
          break up text, and bring your ideas to life.
        </p>
      </div>

      <UploadImage />

      <div className="relative mt-16 lg:mt-20">
        <div className="pointer-events-none absolute inset-0 z-10 grid grid-cols-1 gap-10 max-sm:hidden sm:grid-cols-2 sm:max-md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          <div className="border-r border-gray-950/5"></div>
          <div className="border-l border-gray-950/5 lg:border-x"></div>
          <div className="border-l border-gray-950/5 max-lg:hidden xl:border-x"></div>
          <div className="border-l border-gray-950/5 max-xl:hidden"></div>
        </div>
        <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:max-md:gap-x-5 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((image) => (
            <GalleryItem
              key={image.id}
              id={image.id}
              url={image.url}
              title={image.title}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GalleryPage;
