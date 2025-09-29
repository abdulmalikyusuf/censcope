/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  NODE_HANDLES_SELECTED_STYLE_CLASSNAME,
  cn,
  isValidUrl,
} from "@/lib/utils";
import {
  type CommandProps,
  type Editor,
  Node,
  type NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  mergeAttributes,
} from "@tiptap/react";
import { ImageIcon, Link, Upload } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { SelectImage } from "@/db/schema";

export interface ImagePlaceholderOptions {
  HTMLAttributes: Record<string, unknown>;
  onDrop: (files: File[], editor: Editor) => void;
  onDropRejected?: (files: File[], editor: Editor) => void;
  onEmbed: (url: string, editor: Editor) => void;
  allowedMimeTypes?: Record<string, string[]>;
  maxFiles?: number;
  maxSize?: number;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imagePlaceholder: {
      /**
       * Inserts an image placeholder
       */
      insertImagePlaceholder: () => ReturnType;
    };
  }
}

export const ImagePlaceholder = Node.create<ImagePlaceholderOptions>({
  name: "image-placeholder",

  addOptions() {
    return {
      HTMLAttributes: {},
      onDrop: () => {},
      onDropRejected: () => {},
      onEmbed: () => {},
    };
  },

  group: "block",

  parseHTML() {
    return [{ tag: `div[data-type="${this.name}"]` }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImagePlaceholderComponent, {
      className: NODE_HANDLES_SELECTED_STYLE_CLASSNAME,
    });
  },

  addCommands() {
    return {
      insertImagePlaceholder: () => (props: CommandProps) => {
        return props.commands.insertContent({
          type: "image-placeholder",
        });
      },
    };
  },
});

function ImagePlaceholderComponent(props: NodeViewProps) {
  const { editor, extension, selected } = props;

  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState(false);

  const [images, setImages] = useState<SelectImage[]>([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/images");
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        console.log(data);
        setImages(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  const handleInsertEmbed = (e: FormEvent) => {
    e.preventDefault();
    const valid = isValidUrl(url);
    if (!valid) {
      setUrlError(true);
      return;
    }
    if (url !== "") {
      editor.chain().focus().setImage({ src: url }).run();
      extension.options.onEmbed(url, editor);
    }
  };

  return (
    <NodeViewWrapper className="w-full">
      <Popover modal open={open}>
        <PopoverTrigger
          onClick={() => {
            setOpen(true);
          }}
          asChild
          className="w-full"
        >
          <div
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-md bg-accent p-2 py-3 text-sm text-accent-foreground transition-colors hover:bg-secondary",
              selected && "bg-primary/10 hover:bg-primary/20"
            )}
          >
            <ImageIcon className="h-6 w-6" />
            Add an image
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-[450px] px-0 py-2"
          onPointerDownOutside={() => {
            setOpen(false);
          }}
          onEscapeKeyDown={() => {
            setOpen(false);
          }}
        >
          <Tabs defaultValue="upload" className="px-3">
            <TabsList>
              <TabsTrigger className="px-2 py-1 text-sm" value="upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </TabsTrigger>
              <TabsTrigger className="px-2 py-1 text-sm" value="url">
                <Link className="mr-2 h-4 w-4" />
                Embed link
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <div className="max-h-[80vh] h-[280px] mt-1 px-3 pt-3">
                <div className="items-start justify-center rounded-lg bg-muted text-muted-foreground grid grid-cols-3 [repeat(auto-fit,112px)] gap-2 h-full p-2 overflow-y-scroll">
                  {images?.map((image) => (
                    <div
                      key={image.id}
                      onClick={() => {
                        editor
                          .chain()
                          .focus()
                          .setImage({ src: image.url })
                          .run();
                      }}
                      className="px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 m-1 relative flex aspect-square cursor-pointer items-center justify-center rounded-md"
                    >
                      <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
                        <img
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          src={image.url}
                          alt=""
                          className="object-cover object-center"
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="url">
              <form onSubmit={handleInsertEmbed}>
                <Input
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    if (urlError) {
                      setUrlError(false);
                    }
                  }}
                  placeholder="Paste the image link..."
                />
                {urlError && (
                  <p className="py-1.5 text-xs text-danger-11">
                    Please enter a valid URL
                  </p>
                )}
                <Button
                  onClick={handleInsertEmbed}
                  type="button"
                  size="sm"
                  className="my-2 h-8 w-full p-2 text-xs"
                >
                  Embed Image
                </Button>
                <p className="text-center text-xs text-gray-11">
                  Works with any image from the web
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
    </NodeViewWrapper>
  );
}
