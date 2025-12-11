"use client";

import { useStoreType, StoreType } from "@/contexts/StoreTypeContext";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Shirt, Cpu, Store, Bell, Shield, Lock, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Settings() {
    const { storeType, setStoreType } = useStoreType();
    const { isDeveloper, user } = useAuth();

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-4xl">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Settings</h1>
                    <p className="text-muted-foreground">
                        Manage your store preferences and configuration.
                    </p>
                </div>

                {/* Store Type Selection */}
                <Card className="animate-fade-in">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="flex items-center gap-2">
                                    <Store className="h-5 w-5" />
                                    Store Type
                                    {!isDeveloper && (
                                        <Badge variant="outline" className="ml-2 text-muted-foreground">
                                            <Lock className="h-3 w-3 mr-1" />
                                            Developer Only
                                        </Badge>
                                    )}
                                </CardTitle>
                                <CardDescription>
                                    Choose your store type to customize the dashboard experience. This affects product attributes, metrics, and display options.
                                </CardDescription>
                            </div>
                            {isDeveloper && (
                                <Badge className="bg-primary/10 text-primary border-0">
                                    <Code className="h-3 w-3 mr-1" />
                                    Developer Access
                                </Badge>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {!isDeveloper && (
                            <Alert>
                                <Lock className="h-4 w-4" />
                                <AlertDescription>
                                    Only developers can change the store type. You are logged in as <strong>{user?.username}</strong> with <strong>{user?.role}</strong> role.
                                </AlertDescription>
                            </Alert>
                        )}

                        <RadioGroup
                            value={storeType}
                            onValueChange={(value) => isDeveloper && setStoreType(value as StoreType)}
                            className={cn("grid gap-4 md:grid-cols-2", !isDeveloper && "opacity-60 pointer-events-none")}
                            disabled={!isDeveloper}
                        >
                            {/* Clothing Option */}
                            <Label
                                htmlFor="clothing"
                                className={cn(
                                    "rounded-lg border-2 p-4 transition-all",
                                    isDeveloper ? "cursor-pointer hover:bg-accent" : "cursor-not-allowed",
                                    storeType === "clothing"
                                        ? "border-clothing-accent bg-clothing-accent/5"
                                        : "border-border"
                                )}
                            >
                                <div className="flex items-start gap-4">
                                    <RadioGroupItem value="clothing" id="clothing" className="mt-1" disabled={!isDeveloper} />
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-clothing-accent">
                                                <Shirt className="h-5 w-5 text-primary-foreground" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-foreground">Clothing / Fashion</p>
                                                <p className="text-sm text-muted-foreground">Apparel &amp; accessories</p>
                                            </div>
                                        </div>
                                        <div className="pt-2 text-sm text-muted-foreground">
                                            <p className="font-medium text-foreground mb-1">Product attributes:</p>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Size variants (XS, S, M, L, XL)</li>
                                                <li>Color swatches</li>
                                                <li>Material information</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Label>

                            {/* Electronics Option */}
                            <Label
                                htmlFor="electronics"
                                className={cn(
                                    "rounded-lg border-2 p-4 transition-all",
                                    isDeveloper ? "cursor-pointer hover:bg-accent" : "cursor-not-allowed",
                                    storeType === "electronics"
                                        ? "border-electronics-accent bg-electronics-accent/5"
                                        : "border-border"
                                )}
                            >
                                <div className="flex items-start gap-4">
                                    <RadioGroupItem value="electronics" id="electronics" className="mt-1" disabled={!isDeveloper} />
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-electronics-accent">
                                                <Cpu className="h-5 w-5 text-primary-foreground" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-foreground">Electronics / Gadgets</p>
                                                <p className="text-sm text-muted-foreground">Tech &amp; devices</p>
                                            </div>
                                        </div>
                                        <div className="pt-2 text-sm text-muted-foreground">
                                            <p className="font-medium text-foreground mb-1">Product attributes:</p>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Model numbers</li>
                                                <li>Technical specifications</li>
                                                <li>Storage &amp; memory options</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Label>
                        </RadioGroup>
                    </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card className="animate-fade-in">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            Notifications
                        </CardTitle>
                        <CardDescription>
                            Configure how you receive alerts and updates.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-foreground">Order notifications</Label>
                                <p className="text-sm text-muted-foreground">Get notified when new orders come in</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-foreground">Low stock alerts</Label>
                                <p className="text-sm text-muted-foreground">Alert when products are running low</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-foreground">Customer messages</Label>
                                <p className="text-sm text-muted-foreground">Notifications for customer inquiries</p>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>

                {/* Security Settings */}
                <Card className="animate-fade-in">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Security
                        </CardTitle>
                        <CardDescription>
                            Manage your account security settings.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-foreground">Two-factor authentication</Label>
                                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                            </div>
                            <Switch />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-foreground">Session timeout</Label>
                                <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
