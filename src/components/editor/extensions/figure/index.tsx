import { Node, mergeAttributes } from "@tiptap/core";
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent,
} from "@tiptap/react";
export { Caption } from "./caption";

type Options = { src: string; alt?: string; caption?: string };

export const Figure = Node.create({
  name: "figure",

  group: "block",
  content: "image caption", // image + caption node
  defining: true,

  addCommands: () => {
    return {
      insertFigure:
        (options: Options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: "figure",
            content: [
              {
                type: "image",
                attrs: {
                  src: options.src,
                  alt: options.alt || "",
                },
              },
              {
                type: "caption",
                content: [
                  {
                    type: "text",
                    text:
                      options.caption || "Enter a description for this image…",
                  },
                ],
              },
            ],
          });
        },
      convertToImage:
        () =>
        ({ state, commands }) => {
          const { selection } = state;
          const pos = selection.from;
          const node = state.doc.nodeAt(pos);

          if (node?.type.name !== "figure") return false;

          const imageNode = node.content.firstChild;
          if (imageNode?.type.name !== "image") return false;

          return commands.insertContentAt(
            { from: pos, to: selection.to },
            imageNode.toJSON()
          );
        },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["figure", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(function FigureComponent() {
      return (
        <NodeViewWrapper as="figure" className="my-figure">
          {/* The image node will render here */}
          <NodeViewContent />
          {/* <NodeViewContent as="image" className="image-wrapper" />

          <NodeViewContent as="figcaption" className="text-center italic" /> */}
        </NodeViewWrapper>
      );
    });
  },
});
