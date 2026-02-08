import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { isNotNull, and } from "drizzle-orm";

import { db } from "@/db";
import { getBackgroundImageUrl } from "@/lib/actions/settings";
import { Banner } from "./(sections)/banner";
import { Support } from "./(sections)/support";
import Newline from "./(sections)/newsline";
import { Actions } from "./(sections)/actions";
import { Discover } from "./(sections)/discover";
import { SocialMedia } from "./(sections)/socialmedia";
import { ExecutiveDirector } from "./(sections)/executive-director";
import { CTAButtons } from "./(sections)/cta-buttons";
import { homeMetadata } from '@/config/metadata';

export const dynamic = "force-dynamic";
export const revalidate = 0; // 0 for no cache, 60 for 1 minute cache

export const metadata = homeMetadata

export default async function Page() {
  const posts = await db.query.posts.findMany({
    orderBy: (posts, { desc }) => [desc(posts.updatedAt)],
    columns: { title: true, slug: true, coverImage: true, updatedAt: true },
    where: (posts, { eq }) => and(eq(posts.published, true), isNotNull(posts.content)),
    with: {
      tags: {
        columns: {},
        with: {
          tag: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  const postsWithTags = posts.map((post) => ({
    ...post,
    tags: post.tags.map((p2t) => p2t.tag),
  }));
  const backgroundImageUrl = await getBackgroundImageUrl();

  return (
    <>
      <Banner backgroundImageUrl={backgroundImageUrl} />
      {postsWithTags.length > 0 && <Newline posts={postsWithTags} />}
      <CTAButtons />
      <ExecutiveDirector />
      <Support />
      <Actions />
      <Discover />
      <SocialMedia />


      <div className="maxw-7xlmx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 lg:gap-6 items-stretch bg-white">
          <div className="px-8 py-6 md:py-10 md:px-12 relative flex flex-col items-start justify-center gap-6 bg-cyan-600 text-white max-w-4xl mx-auto">
            <div className="z-10 flex flex-col gap-1 justify-start">
              <h3 className="heading-6 md:heading-4 first-letter:capitalize font-bold">
                CENSCOPE
              </h3>
              <p className="md:text-lg !leading-none capitalize mt-1">
                NO.03 OFF SHEHU LAMINU WAY, BEHIND DOCTORS&apos; QUARTERS, OLD
                GRA, MAIDUGURI, BORNO STATE
              </p>
              <Link
                href="/news"
                className="group relative transition-all mt-2 self-start border-2 border-current hover:border-transparent text-white hover:text-black"
              >
                <span className="top-0 left-0 h-full w-0 absolute transition-all group-hover:w-full bg-white" />
                <span className="z-10 relative flex items-center justify-center transition-all px-7 py-3 gap-4">
                  <b className="transition-all">See all news</b>
                  <FaArrowRight className="ytransition-all" />
                </span>
              </Link>
            </div>
            <div className="flex flex-1 flex-col gap-1 items-start text-sm lg:text-base">
              <p className="">
                Centre for Social Cohesion, Peace and Empowerment helps civilian
                victims, marginalized or excluded by the effects of conflict,
                climate related disasters and economic crises.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
