"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl">
            ResumeAI
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/features">
            <Button variant="ghost">Features</Button>
          </Link>
          <Link href="/templates">
            <Button variant="ghost">Templates</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="ghost">Pricing</Button>
          </Link>
          <ThemeToggle />
          <Link href="/editor">
            <Button>Create Resume</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}