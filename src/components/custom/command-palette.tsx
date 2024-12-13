"use client";

import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn/command";
import { DialogTitle } from "@/components/shadcn/dialog";
import { VisuallyHidden } from "@/components/custom/visually-hidden";

type CommandItemData = {
  label: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onSelect?: () => void;
};

type CommandGroupData = {
  heading: string;
  items: CommandItemData[];
};

export type CommandPaletteProps = {
  groups: CommandGroupData[];
  onCommandSelect?: (label: string) => void;
  placeholder?: string;
  shortcutKey?: string;
  includeEmptyState?: boolean;
  dialogTitle?: string;
  commandEmptyText?: string;
};

export function CommandPalette({
  groups,
  onCommandSelect,
  placeholder = "Type a command or search...",
  shortcutKey = "k",
  includeEmptyState = true,
  dialogTitle = "Command Palette",
  commandEmptyText = "No results found.",
}: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === shortcutKey && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [shortcutKey]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <VisuallyHidden>
        <DialogTitle>{dialogTitle}</DialogTitle>
      </VisuallyHidden>
      <CommandInput placeholder={placeholder} />
      <CommandList>
        {includeEmptyState && <CommandEmpty>{commandEmptyText}</CommandEmpty>}
        {groups.map((group) => (
          <CommandGroup key={group.heading} heading={group.heading}>
            {group.items.map((item) => (
              <CommandItem
                key={item.label}
                onSelect={() => {
                  setOpen(false);
                  item.onSelect?.();
                  onCommandSelect?.(item.label);
                }}
              >
                {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
