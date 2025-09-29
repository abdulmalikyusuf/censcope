"use client";

import { useState } from "react";
import { ChevronLeft, Loader2, Save } from "lucide-react";
import NextLink from "next/link";
import {
  EditorContent,
  type Extension,
  useEditor,
  useEditorState,
} from "@tiptap/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Separator } from "@/components/ui/separator";
import { BorderTrail } from "@/components/motion-primitives/border-trail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updatePost } from "@/lib/actions/post";
import { TagInput } from "./tag-input";
import { SelectTag } from "@/db/schema";
import { extensionKit } from "./kit";
import ToolbarBlock from "./toolbars";

const FormSchema = z.object({
  tags: z
    .string({
      required_error: "Please select a tag.",
    })
    .array()
    .optional(),
  title: z.string({
    required_error: "Please provide a title.",
  }),
});

interface PostAttributes {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  tags: {
    tag: {
      name: string;
      id: string;
    };
  }[];
}

interface TiptapEditorProps extends PostAttributes {
  allTags: SelectTag[];
}

function TiptapEditor({
  title,
  content,
  id,
  tags,
  allTags,
}: TiptapEditorProps) {
  const [pending, setPending] = useState(false);
  const editor = useEditor({
    extensions: extensionKit as Extension[],
    content,
    immediatelyRender: false,
    // editorProps: {
    //   transformPastedHTML(html) {
    //     // Prevent double <figure><figcaption> wrappers
    //     return html
    //       .replace(/<figure[^>]*>/g, "<figure>")
    //       .replace(/<\/figure>/g, "</figure>")
    //       .replace(/<figcaption[^>]*>/g, "<figcaption>")
    //       .replace(/<\/figcaption>/g, "</figcaption>");
    //   },
    // },
  });

  const counter = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        characterCount: ctx.editor?.storage.characterCount.characters() ?? 0,
        wordCount: ctx.editor?.storage.characterCount.words() ?? 0,
      };
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { title },
  });
  if (!editor) {
    return null;
  }

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setPending(true);
    const formdata = new FormData();
    // If title is different from current, this is to prevent unique_constraint when deriving slug due to same title
    if (values.title !== title) formdata.set("title", values.title);
    if (values.tags)
      values.tags.forEach((tag) => {
        formdata.append("tags", tag);
      });
    formdata.set("content", editor.getHTML());
    formdata.set("postId", id!);

    const res = await updatePost(formdata);
    toast(res.message);
    setPending(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-4 h-full"
      >
        <div className="sticky top-0 z-20 border-b border-black/5 dark:border-white/10">
          <BorderTrail />
          <div className="bg-white dark:bg-gray-950 flex justify-between items-center">
            <div className="flex h-12 items-center justify-between gap-8 px-4 sm:px-6">
              <div className="flex items-center gap-4">
                <NextLink
                  className="text-sm/6 text-gray-950 dark:text-white inline-flex items-center gap-0.5"
                  href="/admin"
                >
                  <ChevronLeft className="size-4" />
                  <span className="">Back to Posts</span>
                </NextLink>
                <Separator orientation="vertical" className="h-7" />
                <h1 className="text-lg font-semibold">
                  Censcope Blog Post Editor
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1 items-end">
                <p className="text-xs/6 !leading-none text-gray-950 dark:text-white">
                  {counter?.characterCount} characters
                </p>
                <p className="text-xs/6 !leading-none text-gray-950 dark:text-white">
                  {counter?.wordCount} words
                </p>
              </div>
              <Button type="submit" disabled={pending}>
                {pending ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <Save className="size-4" />
                )}
                <span className="">Save</span>
              </Button>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4">Post Details</h2>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Post Title</FormLabel>
              <FormControl>
                <Input placeholder="Blog Post (1)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="max-w-80">
              <FormLabel>Blog Post Tags</FormLabel>
              <FormControl>
                <TagInput
                  availableTags={allTags}
                  onChange={field.onChange}
                  placeholder="Add or create tags..."
                  initialSelectedTags={tags.map((t) => t.tag)}
                  maxTags={5}
                />
              </FormControl>
              <FormDescription>
                This helps you find your post later.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div
          onClick={() => {
            editor?.chain().focus().run();
          }}
          className="cursor-text bg-background p-2 pt-0 border-2 rounded-md h-[calc(100dvh-80px)] overflow-y-auto relative"
        >
          <ToolbarBlock editor={editor} />
          <EditorContent
            className="outline-none [&>.tiptap.ProseMirror]:px-10 [&>.tiptap.ProseMirror]:py-5 [&>.ProseMirror]:min-h-[18rem] -z-10 !font-[var(--font-sans)]"
            editor={editor}
          />
        </div>
      </form>
    </Form>
  );
}

export default TiptapEditor;
