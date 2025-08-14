"use client";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useEmblaCarousel from "embla-carousel-react";

import { NewsCard } from "@/components/post/card";
import Button from "@/components/primary/button";
import { usePrevNextButtons } from "@/hooks/use-embla-buttons";

export default function Newline({ posts }: { posts: CombinedPostArray }) {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  return (
    <section id="newline" className="flex flex-col py-10 gap-10">
      <header className="w-full flex flex-col lg:flex-row px-5% lg:px-15%">
        <div className="flex flex-1 flex-col gap-2 items-start">
          <h2 className="heading-5 md:heading-3 first-letter:capitalize">
            our latest news
          </h2>
          <p className="md:text-lg">
            Find out about our
            <span className="text-lg text-cyan-600"> field actions </span>
            through our reports, news, events,…
          </p>
        </div>

        <div className="flex ml-auto items-center gap-2 text-white">
          <button
            type="button"
            className="p-3 cursor-pointer rounded-full bg-black w-10 h-10 active:scale-90 hover:bg-cyan-600 transition-all disabled:bg-gray-500"
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
          >
            <FaArrowLeft className="" />
          </button>
          <button
            type="button"
            className="p-3 cursor-pointer rounded-full bg-black w-10 h-10 active:scale-90 hover:bg-cyan-600 transition-all disabled:bg-gray-500"
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
          >
            <FaArrowRight className="" />
          </button>
        </div>
      </header>
      <div className="overflow-hidden" ref={emblaRef}>
        <article className="w-full pl-4 md:pl-6 lg:pl-10 grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] auto-cols-[320px] grid-flow-col items-center justify-start gap-4 snap-x snap-mandatory hide-scrollbar">
          <div className="basis-80 flex-none snap-start hidden lg:flex" />
          {posts.map((post, id) => (
            <NewsCard
              key={id}
              content={post.content}
              slug={post.slug}
              title={post.title}
              updatedAt={post.updatedAt}
              tags={post.tags}
            />
          ))}
        </article>
      </div>

      <Button
        onClick={() => router.push("/our-newsline")}
        withIcon
        withShadow
        title="See all news"
        shadowClassName="duration-300 bg-cyan-600"
        iconClassName="duration-300 text-cyan-600 group-hover:text-white"
        containerClassName="duration-500 border-2 border-black hover:border-transparent hover:text-white self-center"
      />
    </section>
  );
}
