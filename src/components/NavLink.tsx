"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
  end?: boolean;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, className, activeClassName, children, end = false }, ref) => {
    const pathname = usePathname();

    // Check if the current path matches this link
    const isActive = end
      ? pathname === href
      : pathname === href || pathname.startsWith(href + "/");

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
      >
        {children}
      </Link>
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
