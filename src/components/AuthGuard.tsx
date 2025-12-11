"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Small delay to check localStorage
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isLoading && !isAuthenticated && pathname !== "/login") {
            router.push("/login");
        }
    }, [isAuthenticated, isLoading, pathname, router]);

    // Show nothing while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">Loading...</div>
            </div>
        );
    }

    // If on login page, render children regardless of auth status
    if (pathname === "/login") {
        return <>{children}</>;
    }

    // If not authenticated, show nothing (redirect will happen)
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">Redirecting...</div>
            </div>
        );
    }

    return <>{children}</>;
}
