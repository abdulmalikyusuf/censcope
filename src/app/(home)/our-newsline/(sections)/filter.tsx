"use client";

import { useDebouncedCallback } from "use-debounce";
import { parseAsString, useQueryState, useQueryStates } from "nuqs";

import { SelectTag } from "@/db/schema";
import { authorIdParser, qParser } from "@/lib/parsers";
import { X } from "lucide-react";

interface FilterProps {
  count: number;
  authors: {
    id: string;
    name: string | null;
    email: string;
  }[];
  tags: SelectTag[];
}

export function Filter({ count, tags, authors }: FilterProps) {
  const [filtersQ, setFilters] = useQueryStates(
    {
      authorId: authorIdParser,
      tagId: parseAsString.withDefault("").withOptions({ shallow: false }),
      q: qParser,
    },
    {
      history: "replace",
      shallow: false,
    }
  );

  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("asc").withOptions({ shallow: false })
  );

  const handleInputChange = (value: string) => {
    setFilters({ q: value ?? null });
  };

  const debounced = useDebouncedCallback(handleInputChange, 1000);

  return (
    <div className="w-full flex flex-col gap-4 bg-white py-10 px-5% lg:px-15%">
      <div className="w-full p-6 px-5% rounded-md bg-cyan-600/10 flex gap-2 flex-col items-center">
        <h3 className="text-lg font-titillium">Refine your search:</h3>

        <div className="w-full grid grid-cols-fit-16 gap-6">
          <div>
            <label
              htmlFor="searchText"
              className="block text-sm font-medium text-gray-700"
            >
              Search
            </label>
            <input
              type="text"
              id="searchText"
              className="bg-white rounded py-2 px-3 border border-gray-100 outline-gray-100 w-full"
              placeholder="Enter search term"
              defaultValue={filtersQ.q ?? ""}
              onChange={(e) => debounced(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="filterByAuthor"
              className="block text-sm font-medium text-gray-700"
            >
              Filter by Author
            </label>
            <select
              id="filterByAuthor"
              className="bg-white rounded py-2 border border-gray-100 outline-gray-100 w-full"
              value={filtersQ.authorId ?? ""}
              onChange={(e) =>
                setFilters({
                  authorId: !!e.target.value ? e.target.value : null,
                })
              }
            >
              <option value="">All Authors</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="filterByTag"
              className="block text-sm font-medium text-gray-700"
            >
              Filter by Tag
            </label>
            <select
              id="filterByTag"
              className="bg-white rounded py-2 border border-gray-100 outline-gray-100 w-full capitalize"
              value={filtersQ.tagId ?? ""}
              onChange={(e) => setFilters({ tagId: e.target.value })}
            >
              <option value="">All Tags</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id} className="">
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
          {(filtersQ.tagId || !!filtersQ.authorId || !!filtersQ.q) &&
          <div className="flex items-end h-full justify-end">
            <button
              type="button"
              className="font-medium text-gray-700 inline-flex gap-2 items-center"
              onClick={() =>
                setFilters({ q: null, tagId: null, authorId: null })
              }
            >
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </button>
          </div>
          }
        </div>
      </div>

      <div className="flex flex-wrap gap-10 items-center justify-between w-full">
        <b className="">{count} news</b>
        <select
          className="w-60 py-2 rounded-md bg-white border border-gray-200 outline-gray-200"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option hidden>Sort by</option>
          <option value="desc">Sort from most recent to oldest</option>
          <option value="asc">Sort from oldest to most recent</option>
        </select>
      </div>
    </div>
  );
}
