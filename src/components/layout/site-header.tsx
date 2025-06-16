
"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Bell, Settings } from "lucide-react";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <SidebarTrigger className="md:hidden" />
          <Link href="/" className="hidden md:block">
            <h1 className="text-xl font-headline font-semibold">
              <span className="bg-gradient-to-r from-[#E573A5] to-[#73D2E5] text-transparent bg-clip-text">
                SolCraft
              </span>
            </h1>
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Settings" asChild>
            <Link href="/settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
