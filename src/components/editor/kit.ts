import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import { CharacterCount } from "@tiptap/extension-character-count";
import Image from "@tiptap/extension-image";

import { ImageExtension } from "@/components/editor/extensions/image";
import { Link } from "@/components/editor/extensions/link";
import { ImagePlaceholder } from "@/components/editor/extensions/image-placeholder";
import SearchAndReplace from "@/components/editor/extensions/search-and-replace";

export const extensionKit = [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc",
      },
    },
    // heading: {
    //   levels: [1, 2, 3, 4, 5, 6],
    //   HTMLAttributes: {
    //     class: "tiptap-heading",
    //   },
    // },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
    HTMLAttributes: {
      class: "custom-heading",
    },
  }),
  CharacterCount,
  TextStyle,
  Subscript,
  Superscript,
  Underline,
  Link,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  Image,
  ImageExtension,
  ImagePlaceholder,
  SearchAndReplace,
];
