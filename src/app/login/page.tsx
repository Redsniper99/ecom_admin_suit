"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Store, User, Code, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Simulate brief loading
        await new Promise((resolve) => setTimeout(resolve, 500));

        const success = login(username, password);

        if (success) {
            router.push("/");
        } else {
            setError("Invalid username or password");
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-6">
                {/* Logo */}
                <div className="flex flex-col items-center gap-2 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                        <Store className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">Commerce Hub</h1>
                    <p className="text-muted-foreground">E-Commerce Admin Dashboard</p>
                </div>

                {/* Login Card */}
                <Card className="shadow-xl border-border/50">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-xl">Sign in</CardTitle>
                        <CardDescription>
                            Enter your credentials to access the dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="pr-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Signing in..." : "Sign in"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Demo Credentials Card */}
                <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Code className="h-4 w-4 text-primary" />
                            Demo Credentials
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {/* Admin Credentials */}
                        <div className="rounded-lg border border-border bg-card p-3 space-y-1">
                            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                <User className="h-4 w-4 text-muted-foreground" />
                                Admin Account
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <span className="text-muted-foreground">Username:</span>{" "}
                                    <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">admin</code>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Password:</span>{" "}
                                    <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">admin123</code>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                • Can view all features but cannot change store type
                            </p>
                        </div>

                        {/* Developer Credentials */}
                        <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 space-y-1">
                            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                <Code className="h-4 w-4 text-primary" />
                                Developer Account
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <span className="text-muted-foreground">Username:</span>{" "}
                                    <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">developer</code>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Password:</span>{" "}
                                    <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">dev123</code>
                                </div>
                            </div>
                            <p className="text-xs text-primary mt-1">
                                • Full access including store type configuration
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
