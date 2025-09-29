"use client";

import * as React from "react";
import { format } from "date-fns";
import { User, Calendar as CalendarIcon, X, Search } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useQueryStates } from "nuqs";
import { useDebouncedCallback } from "use-debounce";

import {
  dateParser,
  authorIdParser,
  tagIdsParser,
  qParser,
} from "@/lib/parsers";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TagInput } from "@/components/editor/tag-input";
import { SelectTag, SelectUser } from "@/db/schema";

type Author = Pick<SelectUser, "email" | "name" | "id">;

interface BlogFiltersProps {
  tags: SelectTag[];
  authors: Author[];
}

export function BlogFilters({ tags, authors }: BlogFiltersProps) {
  const [render, setRender] = React.useState(true); // This serves to clear the initialSelectedTags by rerendering the TagInput component, thereby re-initializing the initialSelectedTags props
  const [filtersQ, setFilters] = useQueryStates(
    {
      from: dateParser,
      to: dateParser,
      authorId: authorIdParser,
      tags: tagIdsParser,
      q: qParser,
    },
    {
      history: "replace", // 'replace' avoids polluting browser history on every change
      shallow: false, // Set true if updates shouldn't trigger router events (like data fetching), default is true
    }
  );

  // State to track if filters are currently applied (different from initial)
  const [isFiltered, setIsFiltered] = React.useState(false);

  React.useEffect(() => {
    // Check if any filter is active
    const active =
      filtersQ.tags.length > 0 ||
      !!filtersQ.authorId ||
      !!filtersQ.from ||
      !!filtersQ.q;
    setIsFiltered(active);
  }, [filtersQ]);

  const handleAuthorChange = (authorId: string) => {
    setFilters({ authorId: authorId === "all" ? null : authorId });
  };
  const handleInputChange = (value: string) => {
    setFilters({ q: value ?? null });
  };

  const debounced = useDebouncedCallback(handleInputChange, 1000);

  const handleDateChange = (range: DateRange | undefined) => {
    setFilters((prev) => ({
      ...prev,
      ...(range?.to ? { to: range?.to } : {}),
      ...(range?.from ? { from: range?.from } : {}),
    }));
  };

  const handleTagChange = React.useCallback(
    (tagIds: string[]) => {
      if (!render) setRender(true);
      setFilters({
        tags: tagIds,
      });
    },
    [setFilters, render]
  );

  const clearFilters = () => {
    setFilters({
      from: null,
      to: null,
      authorId: null,
      q: null,
      tags: null, // Setting to null removes the param from URL
    });
    setRender(false);
  };

  return (
    <div className="mt-10 relative before:absolute before:top-0 before:h-px before:w-[200vw] before:bg-gray-950/5 dark:before:bg-white/10 before:-left-[100vw] after:absolute after:bottom-0 after:h-px after:w-[200vw] after:bg-gray-950/5 dark:after:bg-white/10 after:-left-[100vw]">
      <div className="mx-2 flex gap-10">
        <div className="flex flex-nowrap gap-4">
          <div className="max-w-[368px] lg:min-w-[368px] flex-1">
            <div className="group relative">
              <div className="pointer-events-none absolute left-4 flex h-full items-center">
                <Search className="size-4 text-gray-950/50 group-focus-within:text-gray-950 dark:text-white/50 dark:group-focus-within:text-white" />
              </div>
              <input
                autoComplete="blog_title"
                aria-label="Blog Post Title"
                className="block w-full appearance-none rounded-3xl bg-white py-2 pr-3 pl-10 text-sm/6 text-gray-950 outline -outline-offset-1 outline-gray-950/8 placeholder:text-sm/6 placeholder:text-gray-950/50 focus:outline-gray-950 dark:bg-white/10 dark:text-white/50 dark:outline-white/15 dark:placeholder:text-white/50 dark:focus:outline-white"
                placeholder="Search for blog post title..."
                type="text"
                name="blog_title"
                defaultValue={filtersQ.q ?? ""}
                onChange={(e) => debounced(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date-range"
                  variant={"outline"}
                  className={cn(
                    "w-fit justify-start text-left font-normal",
                    !filtersQ && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  {filtersQ?.from ? (
                    filtersQ.to ? (
                      <>
                        {format(filtersQ.from, "LLL dd, yy")} -{" "}
                        {format(filtersQ.to, "LLL dd, yy")}
                      </>
                    ) : (
                      format(filtersQ.from, "LLL dd, yy")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={filtersQ.from ?? undefined}
                  selected={{
                    from: filtersQ.from ?? undefined,
                    to: filtersQ.to ?? undefined,
                  }}
                  onSelect={handleDateChange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <Select
              value={filtersQ.authorId ?? "all"}
              onValueChange={handleAuthorChange}
            >
              <SelectTrigger
                id="author-select"
                className="w-fit text-muted-foreground justify-start text-left font-normal"
              >
                <User className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select author" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Authors</SelectItem>
                {authors.map((author) => (
                  <SelectItem key={author.id} value={author.id}>
                    {author.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="w-fit sm:col-span-2 lg:col-span-1 xl:col-span-2">
              <TagInput
                availableTags={tags}
                initialSelectedTags={tags.filter((tag) =>
                  filtersQ.tags.includes(tag.id)
                )}
                key={String(render)}
                onChange={handleTagChange}
                placeholder="Filter by tags..."
              />
            </div>
          </div>

          {isFiltered && (
            <div className="mt-4 flex justify-end">
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
