
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/types";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar, // Import useSidebar
} from "@/components/ui/sidebar";
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
} from "lucide-react";

const navItems: NavItem[] = [
  { title: "Home", href: "/dashboard", icon: Home },
  { title: "My Portfolio", href: "/profile", icon: User },
  { title: "Swap", href: "/swap", icon: Replace },
  { title: "Deposit and Send", href: "/deposit-send", icon: ArrowRightLeft },
  { title: "Launchtoken", href: "/launchtoken", icon: Rocket },
  { title: "Staking", href: "/staking", icon: Database },
  { title: "More", href: "/more", icon: MoreHorizontal },
  { title: "Support", href: "/support", icon: HelpCircle },
  { title: "About", href: "/about", icon: Info },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { state: sidebarState, isMobile } = useSidebar(); // Get sidebar state and isMobile

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={item.href} asChild>
                <SidebarMenuButton
                  isActive={pathname === item.href || (item.href !== "/dashboard" && item.href !== "/" && pathname.startsWith(item.href))}
                  disabled={item.disabled}
                  className={cn(item.disabled && "cursor-not-allowed opacity-50")}
                >
                  <item.icon />
                  {/* Conditionally render text based on sidebar state for non-mobile, or always on mobile */}
                  { (sidebarState === "expanded" || isMobile) && <span>{item.title}</span> }
                </SidebarMenuButton>
              </Link>
            </TooltipTrigger>
            {/* Show tooltip only when sidebar is collapsed AND not on mobile */}
            { sidebarState === "collapsed" && !isMobile && (
              <TooltipContent side="right" align="center">
                {item.title}
              </TooltipContent>
            )}
          </Tooltip>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
