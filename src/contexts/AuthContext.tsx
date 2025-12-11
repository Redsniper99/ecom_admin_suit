"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "admin" | "developer";

export interface User {
    username: string;
    role: UserRole;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
    isAuthenticated: boolean;
    isDeveloper: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials
const USERS = {
    admin: { password: "admin123", role: "admin" as UserRole },
    developer: { password: "dev123", role: "developer" as UserRole },
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Check for saved session
        if (typeof window !== "undefined") {
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                try {
                    setUser(JSON.parse(savedUser));
                } catch {
                    localStorage.removeItem("user");
                }
            }
        }
    }, []);

    const login = (username: string, password: string): boolean => {
        const userConfig = USERS[username as keyof typeof USERS];

        if (userConfig && userConfig.password === password) {
            const loggedInUser: User = {
                username,
                role: userConfig.role,
            };
            setUser(loggedInUser);
            localStorage.setItem("user", JSON.stringify(loggedInUser));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated: !!user,
                isDeveloper: user?.role === "developer",
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
