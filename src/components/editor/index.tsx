"use client";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ImageExtension } from "@/components/editor/extensions/image";
import { Link } from "@/components/editor/extensions/link";
import { ImagePlaceholder } from "@/components/editor/extensions/image-placeholder";
import SearchAndReplace from "@/components/editor/extensions/search-and-replace";
import { AlignmentTooolbar } from "@/components/editor/toolbars/alignment";
import { BoldToolbar } from "@/components/editor/toolbars/bold";
import { BulletListToolbar } from "@/components/editor/toolbars/bullet-list";
import { ColorHighlightToolbar } from "@/components/editor/toolbars/color-and-highlight";
import { ImagePlaceholderToolbar } from "@/components/editor/toolbars/image-placeholder-toolbar";
import { ItalicToolbar } from "@/components/editor/toolbars/italic";
import { LinkToolbar } from "@/components/editor/toolbars/link/button";
import { OrderedListToolbar } from "@/components/editor/toolbars/ordered-list";
import { RedoToolbar } from "@/components/editor/toolbars/redo";
import { SearchAndReplaceToolbar } from "@/components/editor/toolbars/search-and-replace-toolbar";
import { ToolbarProvider } from "@/components/editor/toolbars/toolbar-provider";
import { UnderlineToolbar } from "@/components/editor/toolbars/underline";
import { UndoToolbar } from "@/components/editor/toolbars/undo";
import { HeadingToolbar } from "@/components/editor/toolbars/heading";
import { Color } from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, type Extension, useEditor } from "@tiptap/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import StarterKit from "@tiptap/starter-kit";
import { zodResolver } from "@hookform/resolvers/zod";
import {toast} from "sonner"

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

const extensions = [
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
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {
        class: "tiptap-heading",
      },
    },
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
  TextStyle,
  Subscript,
  Superscript,
  Underline,
  Link,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  ImageExtension,
  ImagePlaceholder,
  SearchAndReplace,
];

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

function TiptapEditor({ title, content, id, tags, allTags }: TiptapEditorProps) {
  const [pending, setPending] = useState(false)
  const editor = useEditor({
    extensions: extensions as Extension[],
    content,
    immediatelyRender: false,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { title },
  });
  if (!editor) {
    return null;
  }

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setPending(true)
    const formdata = new FormData();
    // If title is different from current, this is to prevent unique_constraint when deriving slug due to same title
    if(values.title!==title) formdata.set("title", values.title);
    if (values.tags)
      values.tags.forEach((tag) => {
        formdata.append("tags", tag);
      });
    formdata.set("content", editor.getHTML());
    formdata.set("postId", id!);

    const data = {
      title: values.title,
      content: editor.getHTML(),
      tags: values.tags,
    };
    console.log(data);
    const res = await updatePost(formdata);
    toast(res.message)
    console.log(res);
    setPending(false)

  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-4 h-full"
      >
        <header className="sticky top-0 z-20 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
          <BorderTrail />
          <div className="flex w-full items-center py-2 px-2 justify-between border-b bg-background">
            <SidebarTrigger />
            <Button type="submit" disabled={pending}>{pending ?
              <Loader2 className="mr-2 size-4 animate-spin"/>
            : <Save className="size-4"/>}Save</Button>
          </div>
        </header>

        <h2 className="text-lg font-semibold mb-4">Post Details</h2>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Post Title</FormLabel>
              <FormControl>
                <Input placeholder="Blog Post Title (1)" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
                  initialSelectedTags={tags.map(t=>t.tag)}
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
          <div className="flex items-center gap-2 pt-2 sticky top-0 z-10 bg-background">
            <ToolbarProvider editor={editor}>
              <UndoToolbar type="button"/>
              <RedoToolbar type="button"/>
              <Separator orientation="vertical" className="h-7" />
              <HeadingToolbar type="button"/>
              <BoldToolbar type="button"/>
              <ItalicToolbar type="button"/>
              <LinkToolbar type="button"/>
              <UnderlineToolbar type="button"/>
              <BulletListToolbar type="button"/>
              <OrderedListToolbar type="button"/>
              <AlignmentTooolbar />
              <ImagePlaceholderToolbar type="button"/>
              <ColorHighlightToolbar />
              <SearchAndReplaceToolbar />
            </ToolbarProvider>
          </div>
          <EditorContent
            className="outline-none [&>.tiptap.ProseMirror]:px-10 [&>.tiptap.ProseMirror]:py-5 -z-10 min-h-[18rem] !h-full !font-[var(--font-sans)]"
            editor={editor}
          />
        </div>
      </form>
    </Form>
  );
}

export default TiptapEditor;
