"use client";

import { NavLink } from "@/components/NavLink";
import { useStoreType } from "@/contexts/StoreTypeContext";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Store,
  ChevronLeft,
  ChevronRight,
  Shirt,
  Cpu,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Products", url: "/products", icon: Package },
  { title: "Orders", url: "/orders", icon: ShoppingCart },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
];

interface DashboardSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function DashboardSidebar({ mobileOpen, onMobileClose }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { storeType } = useStoreType();

  // Close mobile menu on route change
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen border-r border-border bg-card transition-all duration-300",
          // Desktop: always visible
          "hidden lg:block",
          collapsed ? "lg:w-16" : "lg:w-64",
          // Mobile: slide in/out
          mobileOpen && "block w-64"
        )}
      >
        {/* Mobile Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-3 lg:hidden"
          onClick={onMobileClose}
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg",
                storeType === "clothing" ? "bg-clothing-accent" : "bg-electronics-accent"
              )}>
                {storeType === "clothing" ? (
                  <Shirt className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <Cpu className="h-4 w-4 text-primary-foreground" />
                )}
              </div>
              <span className="font-semibold text-foreground">Commerce Hub</span>
            </div>
          )}
          {collapsed && (
            <div className={cn(
              "mx-auto flex h-8 w-8 items-center justify-center rounded-lg",
              storeType === "clothing" ? "bg-clothing-accent" : "bg-electronics-accent"
            )}>
              <Store className="h-4 w-4 text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-3">
          {navItems.map((item) => (
            <NavLink
              key={item.title}
              href={item.url}
              end={item.url === "/"}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                collapsed && "justify-center px-2 lg:justify-center",
                // On mobile, always show full nav items
                "lg:flex"
              )}
              activeClassName="bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary"
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {(!collapsed || mobileOpen) && <span className={cn(collapsed && "lg:hidden")}>{item.title}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Store Type Indicator */}
        {(!collapsed || mobileOpen) && (
          <div className={cn("absolute bottom-20 left-3 right-3", collapsed && "lg:hidden")}>
            <div className={cn(
              "rounded-lg p-3 transition-colors",
              storeType === "clothing" ? "bg-clothing-accent/10" : "bg-electronics-accent/10"
            )}>
              <div className="flex items-center gap-2">
                {storeType === "clothing" ? (
                  <Shirt className="h-4 w-4 text-clothing-accent" />
                ) : (
                  <Cpu className="h-4 w-4 text-electronics-accent" />
                )}
                <span className="text-xs font-medium text-foreground">
                  {storeType === "clothing" ? "Fashion Store" : "Electronics Store"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Collapse Toggle - Desktop only */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-4 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full border border-border bg-card hover:bg-accent hidden lg:flex"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </aside>
    </>
  );
}

// Export a mobile menu toggle button component
export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden"
      onClick={onClick}
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
}
