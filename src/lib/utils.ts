import type { Editor } from "@tiptap/core";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number | Date): string {
  const date = input instanceof Date ? input : new Date(input);

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime(seconds: number) {
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

export const NODE_HANDLES_SELECTED_STYLE_CLASSNAME =
  "node-handles-selected-style";

export function isValidUrl(url: string) {
  return /^https?:\/\/\S+$/.test(url);
}

export function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters except for -
    .replace(/--+/g, "-"); // Replace multiple - with single -
}

export const duplicateContent = (editor: Editor) => {
  const { view } = editor;
  const { state } = view;
  const { selection } = state;

  editor
    .chain()
    .insertContentAt(
      selection.to,
      selection.content().content.firstChild?.toJSON(),
      {
        updateSelection: true,
      }
    )
    .focus(selection.to)
    .run();
};

export function getUrlFromString(str: string) {
  if (isValidUrl(str)) {
    return str;
  }
  try {
    if (str.includes(".") && !str.includes(" ")) {
      return new URL(`https://${str}`).toString();
    }
  } catch {
    return null;
  }
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function generateSummary(html: string | null): string {
  try {
    if (!document) return "waiting to render on the client";
    if (!html) return "Blog post doesn't contain a content.";
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const paragraphs = tempDiv.querySelectorAll("p");

    if (!paragraphs || paragraphs.length === 0) {
      return "Blog post doesn't contain a content.";
    }

    let longestParagraph = paragraphs[0];

    if (!longestParagraph.textContent) {
      return "Blog post doesn't contain a content.";
    }
    let maxLength = longestParagraph.textContent.length;

    for (let i = 1; i < paragraphs.length; i++) {
      const currentParagraph = paragraphs[i];
      const currentLength = currentParagraph.textContent?.length;

      if (currentLength && currentLength > maxLength) {
        maxLength = currentLength;
        longestParagraph = currentParagraph;
      }
    }

    return longestParagraph.textContent
      ? longestParagraph.textContent
      : "Blog post doesn't contain a content.";
  } catch {
    return "Ooops! An error occurred while generating blog post content preview text.";
  }
}

export function getFirstImageSrc(htmlString: string): string | null {
  // Method 1: Using Regular Expressions (Less Robust)
  const regex = /<img\s+[^>]*?src="([^"]*)"/i;
  const match = htmlString.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  // Method 2: Using DOMParser (More Robust for Browser Environments)
  if (typeof DOMParser !== "undefined") {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const firstImage = doc.querySelector("img");

    if (firstImage && firstImage.getAttribute("src")) {
      return firstImage.getAttribute("src");
    }
  }

  return null; // Return null if no image is found
}

export function getSupabaseImagePath(partialPath: string) {
  const BUCKET_NAME =
    process.env.SUPABASE_BUCKET_NAME ??
    process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME;
  const SUPABASE_URL =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  // check if the path is a valid URL
  if (isValidUrl(partialPath.trim())) {
    return partialPath; // Return the URL as is
  }
  // If not, construct the URL using the base URL and the partial path
  if (!SUPABASE_URL || !BUCKET_NAME) {
    throw new Error("Supabase URL or bucket name is not defined");
  }

  if (partialPath.startsWith("/")) {
    partialPath = partialPath.substring(1); // Remove leading slash
  }
  if (partialPath.endsWith("/")) {
    partialPath = partialPath.slice(0, -1); // Remove trailing slash
  }
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${partialPath}`;
}
