"use client";

import { ReactNode, useState, useEffect } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Listen for sidebar collapse changes
  useEffect(() => {
    const checkSidebarWidth = () => {
      const sidebar = document.querySelector('aside');
      if (sidebar) {
        setSidebarCollapsed(sidebar.classList.contains('w-16') || sidebar.classList.contains('lg:w-16'));
      }
    };

    // Create mutation observer to watch for class changes
    const observer = new MutationObserver(checkSidebarWidth);
    const sidebar = document.querySelector('aside');
    if (sidebar) {
      observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
    }

    return () => observer.disconnect();
  }, []);

  // Close mobile menu on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />
      <div className={cn(
        "transition-all duration-300",
        // Desktop: margin based on sidebar width
        sidebarCollapsed ? "lg:ml-16" : "lg:ml-64",
        // Mobile: no margin
        "ml-0"
      )}>
        <DashboardHeader onMobileMenuClick={() => setMobileMenuOpen(true)} />
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
