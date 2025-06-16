
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/types";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { 
  Home, 
  User, 
  Replace, 
  ArrowRightLeft, 
  Rocket, 
  Database, 
  MoreHorizontal, 
  HelpCircle, 
  Info,
  Settings // Added Settings back as it was removed in a previous step but might be intended
} from "lucide-react";

const navItems: NavItem[] = [
  { title: "Home", href: "/", icon: Home },
  { title: "My Portfolio", href: "/profile", icon: User },
  { title: "Swap", href: "/swap", icon: Replace },
  { title: "Deposit and Send", href: "/deposit-send", icon: ArrowRightLeft },
  { title: "Launchtoken", href: "/launchtoken", icon: Rocket },
  { title: "Staking", href: "/staking", icon: Database },
  { title: "More", href: "/more", icon: MoreHorizontal },
  { title: "Support", href: "/support", icon: HelpCircle },
  { title: "About", href: "/about", icon: Info },
  // Removed settings from here as it's in the top header
  // { title: "Settings", href: "/settings", icon: Settings, disabled: false },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} asChild>
            <SidebarMenuButton
              isActive={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
              tooltip={item.title}
              disabled={item.disabled}
              className={cn(item.disabled && "cursor-not-allowed opacity-50")}
            >
              <item.icon />
              <span>{item.title}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
