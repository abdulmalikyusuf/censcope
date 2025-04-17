"use client";

import { generateSummary } from "@/lib/utils";

export function PostContent({ content }: { content: string | null }) {
  return (
    <div className="prose prose-base dark:prose-invert max-w-none mt-4 !font-inter">
      {generateSummary(content)}
    </div>
  );
}

export default PostContent;
