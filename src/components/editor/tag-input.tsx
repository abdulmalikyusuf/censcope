"use client";

import * as React from "react";
import { X, Check, PlusCircle, Tags } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { createTag } from "@/lib/actions/tag";
import { SelectTag } from "@/db/schema";
import { toast } from "sonner";

interface TagInputProps {
  availableTags: SelectTag[];
  initialSelectedTags?: SelectTag[];
  onChange: (selectedTags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

export function TagInput({
  availableTags,
  initialSelectedTags = [],
  onChange,
  placeholder = "Select or create tags...",
  maxTags,
}: TagInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [selectedTags, setSelectedTags] =
    React.useState<SelectTag[]>(initialSelectedTags);
  const [isCreating, setIsCreating] = React.useState(false);

  const handleSelectTag = React.useCallback(
    (tag: SelectTag) => {
      setInputValue("");
      if (maxTags && selectedTags.length >= maxTags) return;
      setSelectedTags((prev) => {
        if (prev.some((t) => t.id === tag.id)) {
          return prev;
        }
        onChange([...prev, tag].map((t) => t.id));
        return [...prev, tag];
      });
    },
    [maxTags, selectedTags.length, onChange]
  );

  React.useEffect(() => {
    onChange(selectedTags.map(tag=>tag.id))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedTags])


  const handleRemoveTag = React.useCallback((tagToRemove: SelectTag) => {
    setSelectedTags((prev) => {
      return prev.filter((tag) => tag.id !== tagToRemove.id)
    });
  }, []);

  const handleCreateTag = React.useCallback(async () => {
    if (!inputValue.trim() || isCreating) return;

    const existingTag = availableTags.find(
      (t) => t.name.toLowerCase() === inputValue.trim().toLowerCase()
    );
    if (existingTag) {
      handleSelectTag(existingTag);
      setInputValue("");
      return;
    }
    setIsCreating(true);

    try {
      const newTag = await createTag(inputValue.trim());
      if (newTag) {
        if (!selectedTags.some((t) => t.id === newTag.id)) {
          handleSelectTag(newTag);
        }
        // Optionally add to availableTags state locally if not handled by external state update
        // setAvailableTags(prev => [...prev, newTag]);
      }
      setInputValue("");
      toast.error("Tag created");
    } catch {
      toast.error("Failed to create tag");
    }
    setIsCreating(false);
  }, [inputValue, isCreating, availableTags, handleSelectTag, selectedTags]);

  // Filter available tags based on input and exclude already selected ones
  const filteredAvailableTags = React.useMemo(() => {
    const lowerInputValue = inputValue.toLowerCase();
    return availableTags.filter(
      (tag) =>
        !selectedTags.some((selected) => selected.id === tag.id) &&
        tag.name.toLowerCase().includes(lowerInputValue)
    );
  }, [availableTags, selectedTags, inputValue]);

  const exactMatchExists = React.useMemo(() => {
    return availableTags.some(
      (tag) => tag.name.toLowerCase() === inputValue.trim().toLowerCase()
    );
  }, [availableTags, inputValue]);

  const showCreateOption =
    inputValue.trim() && !exactMatchExists && !isCreating;

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        // Prevent default form submission if inside a form
        e.preventDefault();
        if (showCreateOption) {
          handleCreateTag();
        } else {
          // Try selecting the first filtered tag if available
          if (filteredAvailableTags.length > 0) {
            handleSelectTag(filteredAvailableTags[0]);
          }
        }
      } else if (
        e.key === "Backspace" &&
        inputValue === "" &&
        selectedTags.length > 0
      ) {
        // Remove last tag on backspace when input is empty
        handleRemoveTag(selectedTags[selectedTags.length - 1]);
      }
    },
    [
      showCreateOption,
      handleCreateTag,
      filteredAvailableTags,
      handleSelectTag,
      inputValue,
      selectedTags,
      handleRemoveTag,
    ]
  );

  return (
    <div className="relative w-full font-cavet">
      <div
        className={cn(
          "mb-2 flex flex-wrap gap-1 absolute bottom-full right-0",
          selectedTags.length === 0 && "hidden"
        )}
      >
        {selectedTags.map((tag) => (
          <Badge
            key={tag.id}
            variant="secondary"
            className="group gap-1 pr-1 !font-inter capitalize"
          >
            {tag.name}
            <button
              aria-label={`Remove ${tag.name}`}
              onClick={() => handleRemoveTag(tag)}
              className="rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-1"
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        ))}
      </div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className="w-full justify-start text-muted-foreground hover:text-muted-foreground"
            disabled={!!maxTags && selectedTags.length >= maxTags}
          >
            <Tags className="mr-2 h-4 w-4 shrink-0" />
            {maxTags && selectedTags.length >= maxTags
              ? `Reached maximum number of allowable tags (${maxTags})`
              : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          align="start"
        >
          <Command
            shouldFilter={false}
            /* We handle filtering manually */ onKeyDown={handleKeyDown}
          >
            <CommandInput
              ref={inputRef}
              placeholder={placeholder}
              value={inputValue}
              onValueChange={setInputValue}
              disabled={!!maxTags && selectedTags.length >= maxTags}
            />
            <CommandList>
              <ScrollArea className="max-h-[250px]">
                <CommandEmpty>
                  {isLoadingAvailableTags
                    ? "Loading..."
                    : showCreateOption
                    ? " " /* Hide empty when create is shown */
                    : "No tags found."}
                </CommandEmpty>

                {showCreateOption && (
                  <CommandGroup heading="Create New Tag">
                    <CommandItem
                      value={`__create__${inputValue.trim()}`}
                      onSelect={handleCreateTag}
                      className="cursor-pointer"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create &ldquo;{inputValue.trim()}&rdquo;
                    </CommandItem>
                  </CommandGroup>
                )}

                {showCreateOption && filteredAvailableTags.length > 0 && (
                  <CommandSeparator />
                )}

                {filteredAvailableTags.length > 0 && (
                  <CommandGroup heading="Available Tags">
                    {filteredAvailableTags.map((tag) => (
                      <CommandItem
                        key={tag.id}
                        value={tag.name}
                        onSelect={() => handleSelectTag(tag)}
                        className="cursor-pointer capitalize"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedTags.some((t) => t.id === tag.id)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {tag.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {maxTags && (
        <p className="mt-1 text-xs text-muted-foreground text-right">
          {selectedTags.length} / {maxTags} tags selected
        </p>
      )}
    </div>
  );
}

// Helper to simulate loading state if needed
const isLoadingAvailableTags = false; // Replace with actual loading state if tags are fetched async
