"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, Filter, MoreHorizontal, Mail, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface Customer {
    id: string;
    name: string;
    email: string;
    avatar: string;
    totalOrders: number;
    totalSpent: number;
    status: "active" | "inactive";
    joinDate: string;
}

const customers: Customer[] = [
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
        totalOrders: 12,
        totalSpent: 1249.87,
        status: "active",
        joinDate: "2023-06-15",
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
        totalOrders: 8,
        totalSpent: 879.45,
        status: "active",
        joinDate: "2023-08-22",
    },
    {
        id: "3",
        name: "Mike Wilson",
        email: "mike@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
        totalOrders: 3,
        totalSpent: 234.99,
        status: "inactive",
        joinDate: "2023-11-10",
    },
    {
        id: "4",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
        totalOrders: 24,
        totalSpent: 3456.78,
        status: "active",
        joinDate: "2023-02-08",
    },
    {
        id: "5",
        name: "Tom Brown",
        email: "tom@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tom",
        totalOrders: 6,
        totalSpent: 567.32,
        status: "active",
        joinDate: "2023-09-30",
    },
];

export default function Customers() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Customers</h1>
                        <p className="text-muted-foreground">
                            Manage your customer relationships.
                        </p>
                    </div>
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Customer
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="animate-fade-in">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-primary/10 p-2">
                                    <Users className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Customers</p>
                                    <p className="text-2xl font-bold">2,341</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="animate-fade-in">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-success/10 p-2">
                                    <User className="h-5 w-5 text-success" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Active This Month</p>
                                    <p className="text-2xl font-bold">892</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="animate-fade-in">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-warning/10 p-2">
                                    <User className="h-5 w-5 text-warning" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">New This Week</p>
                                    <p className="text-2xl font-bold">47</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="animate-fade-in">
                    <CardContent className="pt-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input placeholder="Search customers..." className="pl-9" />
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" className="gap-2">
                                    <Filter className="h-4 w-4" />
                                    Filters
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Customers Table */}
                <Card className="animate-fade-in">
                    <CardHeader>
                        <CardTitle>All Customers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Orders</TableHead>
                                    <TableHead>Total Spent</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {customers.map((customer) => (
                                    <TableRow key={customer.id} className="animate-fade-in">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarImage src={customer.avatar} />
                                                    <AvatarFallback>
                                                        {customer.name.split(" ").map((n) => n[0]).join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium">{customer.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">{customer.email}</TableCell>
                                        <TableCell>{customer.totalOrders}</TableCell>
                                        <TableCell className="font-semibold">${customer.totalSpent.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="secondary"
                                                className={cn(
                                                    "font-medium",
                                                    customer.status === "active"
                                                        ? "bg-success/10 text-success hover:bg-success/10"
                                                        : "bg-muted text-muted-foreground hover:bg-muted"
                                                )}
                                            >
                                                {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">{customer.joinDate}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-popover">
                                                    <DropdownMenuItem>
                                                        <User className="mr-2 h-4 w-4" />
                                                        View Profile
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Mail className="mr-2 h-4 w-4" />
                                                        Send Email
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
