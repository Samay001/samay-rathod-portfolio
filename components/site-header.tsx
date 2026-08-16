"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/92 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[740px] items-center justify-between px-5">
        <a href="#home" className="text-sm font-semibold tracking-tight">Samay Rathod</a>
        <nav className="flex items-center gap-1" aria-label="Primary navigation">
          <a className="nav-link" href="#home">Home</a>
          <a className="nav-link" href="#projects">Projects</a>
          <a className="nav-link" href="#contact">Contact</a>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle color theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            <Sun className="hidden size-4 dark:block" />
            <Moon className="size-4 dark:hidden" />
          </Button>
        </nav>
      </div>
    </header>
  );
}
