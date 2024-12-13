"use client";

import { SearchBar } from "@/components/custom/search-bar";
import {
  LayoutDashboard,
  Settings,
} from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 items-center justify-center min-h-screen">
      <SearchBar
        paletteProps={{
          dialogTitle: "Quick Access",
          commandEmptyText: "Nothing found here!",
          groups: [
            {
              heading: "Navigation",
              items: [
                {
                  label: "Go to Dashboard",
                  icon: LayoutDashboard,
                },
                {
                  label: "Open Settings",
                  icon: Settings,
                },
              ],
            },
          ],
        }}
      />
    </main>
  );
}
