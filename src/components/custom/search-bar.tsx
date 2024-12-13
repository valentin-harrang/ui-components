"use client";

import { Button, ButtonProps } from "@/components/shadcn/button";
import {
  CommandPalette,
  CommandPaletteProps,
} from "@/components/custom/command-palette";
import { cn, isMacPlatform } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { useEffect, useState } from "react";

const searchBarVariants = cva("relative w-full max-w-[600px]", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    fullWidth: {
      true: "w-full",
      false: "w-auto",
    },
  },
  defaultVariants: {
    size: "md",
    fullWidth: true,
  },
});

type SearchBarProps = {
  buttonText?: string;
  buttonShortcut?: string;
  buttonVariant?: ButtonProps["variant"];
  paletteProps?: Omit<CommandPaletteProps, "shortcutKey">;
  className?: string;
} & VariantProps<typeof searchBarVariants>;

const SearchBar = React.forwardRef<HTMLDivElement, SearchBarProps>(
  (
    {
      buttonText = "Search...",
      buttonShortcut = "k",
      buttonVariant = "outline",
      paletteProps = { groups: [] },
      size,
      fullWidth,
      className,
    },
    ref
  ) => {
    const [isMac, setIsMac] = useState(false);

    useEffect(() => {
      setIsMac(isMacPlatform());
    }, []);

    const handleOpenPalette = () => {
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: buttonShortcut, metaKey: true })
      );
    };

    const renderShortcut = (isMac: boolean, shortcut: string) => {
      return isMac ? (
        <>
          <span className="text-xs">⌘</span>
          {shortcut.toUpperCase()}
        </>
      ) : (
        <>
          <span className="text-xs">Ctrl</span>+{shortcut.toUpperCase()}
        </>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(searchBarVariants({ size, fullWidth, className }))}
      >
        <Button
          variant={buttonVariant}
          role="combobox"
          onClick={handleOpenPalette}
          className="relative w-full justify-start text-muted-foreground"
        >
          <span className="hidden lg:inline-flex">{buttonText}</span>
          <span className="inline-flex lg:hidden">{buttonText}</span>
          <kbd className="pointer-events-none absolute right-2 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            {renderShortcut(isMac, buttonShortcut)}
          </kbd>
        </Button>
        <CommandPalette shortcutKey={buttonShortcut} {...paletteProps} />
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export { SearchBar, searchBarVariants };
