import { Node, mergeAttributes } from "@tiptap/core";

export const Caption = Node.create({
  name: "caption",

  content: "inline*",
  group: "block",
  defining: true,

  parseHTML() {
    return [{ tag: "figcaption" }];
  },

  addAttributes() {
    return {
      class: {
        default: "text-center italic pt-4",
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["figcaption", mergeAttributes(HTMLAttributes), 0];
  },
});
