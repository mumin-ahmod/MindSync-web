"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/lib/placeholder-data";
import type { NavItem } from "@/types";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
        prefetch={false}
      >
        <Mountain className="h-6 w-6 text-primary" />
        <span className="sr-only">MindSync</span>
      </Link>
      <h1 className="text-xl font-headline font-semibold text-foreground">MindSync</h1>
      <nav className="ml-auto hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {navLinks.map((item: NavItem) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === item.href
                ? "font-semibold text-primary"
                : "text-foreground/60"
            )}
            prefetch={false}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
              prefetch={false}
            >
              <Mountain className="h-6 w-6 text-primary" />
              <span className="sr-only">MindSync</span>
            </Link>
             <h1 className="text-xl font-headline font-semibold text-foreground">MindSync</h1>
            {navLinks.map((item: NavItem) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === item.href
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                )}
                prefetch={false}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
