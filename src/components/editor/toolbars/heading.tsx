"use client";

import React, { useCallback, useMemo } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToolbar } from "@/components/editor/toolbars/toolbar-provider";
import { useEditorState } from "@tiptap/react";
import { Level } from "@tiptap/extension-heading";

const HEADING_LEVELS = [1, 2, 3, 4, 5, 6] as const;

type Heading = "p" | `h${(typeof HEADING_LEVELS)[number]}`;

const HeadingToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { editor } = useToolbar();

    const current = useEditorState({
      editor,
      selector: (ctx) => {
        const { editor } = ctx;
        if (editor.isActive("paragraph")) return "p" as Heading;

        const headingLevel = HEADING_LEVELS.find((level) =>
          editor.isActive("heading", { level })
        );
        if (headingLevel) return `h${headingLevel}` as Heading;

        return null;
      },
    });

    const headingOptions = useMemo(
      () => [
        {
          value: "h1",
          label: "Heading 1",
          classNames: "text-3xl font-bold tracking-tight",
        },
        {
          value: "h2",
          label: "Heading 2",
          classNames: "text-2xl font-semibold tracking-tight",
        },
        {
          value: "h3",
          label: "Heading 3",
          classNames: "text-2xl font-semibold tracking-tight",
        },
        {
          value: "h4",
          label: "Heading 4",
          classNames: "text-xl font-semibold tracking-tight",
        },
        {
          value: "h5",
          label: "Heading 5",
          classNames: "text-lg font-medium tracking-tight",
        },
        {
          value: "h6",
          label: "Heading 6",
          classNames: "text-base font-medium tracking-tight",
        },
        {
          value: "p",
          label: "Paragraph",
          classNames: "text-sm tracking-tight",
        },
      ],
      []
    );

    const onSelect = useCallback(
      (value: Heading) => {
        if (value.startsWith("h")) {
          editor
            .chain()
            .focus()
            .setHeading({ level: +value[1] as Level })
            .run();
        } else {
          editor.chain().focus().setParagraph().run();
        }
      },
      [editor]
    );

    const currentLabel =
      headingOptions.find((item) => item.value === current)?.label ||
      "Headings";

    return (
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger
              disabled={!editor.isEditable || !current}
              asChild
            >
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-max font-normal"
                ref={ref}
                {...props}
                data-active={!!current}
                data-heading={current}
              >
                {currentLabel}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Text Headings</TooltipContent>
        </Tooltip>
        <DropdownMenuContent
          loop
          onCloseAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <DropdownMenuGroup className="">
            {headingOptions.map((option) => (
              <DropdownMenuItem
                data-active={option.value === current || undefined}
                data-heading={option.value}
                onSelect={() => onSelect(option.value as Heading)}
                key={option.value}
                className={option.classNames}
              >
                {option.label}

                {option.label === currentLabel && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

HeadingToolbar.displayName = "HeadingToolbar";

export { HeadingToolbar };
