"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Search, Filter, MoreHorizontal, Eye, Package, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

interface Order {
    id: string;
    customer: string;
    email: string;
    date: string;
    total: number;
    items: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    paymentStatus: "paid" | "pending" | "refunded";
}

const orders: Order[] = [
    {
        id: "#ORD-1234",
        customer: "John Doe",
        email: "john@example.com",
        date: "2024-01-15",
        total: 299.97,
        items: 3,
        status: "delivered",
        paymentStatus: "paid",
    },
    {
        id: "#ORD-1233",
        customer: "Jane Smith",
        email: "jane@example.com",
        date: "2024-01-15",
        total: 149.99,
        items: 1,
        status: "shipped",
        paymentStatus: "paid",
    },
    {
        id: "#ORD-1232",
        customer: "Mike Wilson",
        email: "mike@example.com",
        date: "2024-01-14",
        total: 89.99,
        items: 2,
        status: "processing",
        paymentStatus: "paid",
    },
    {
        id: "#ORD-1231",
        customer: "Sarah Johnson",
        email: "sarah@example.com",
        date: "2024-01-14",
        total: 459.98,
        items: 4,
        status: "pending",
        paymentStatus: "pending",
    },
    {
        id: "#ORD-1230",
        customer: "Tom Brown",
        email: "tom@example.com",
        date: "2024-01-13",
        total: 79.99,
        items: 1,
        status: "cancelled",
        paymentStatus: "refunded",
    },
];

function OrderStatusBadge({ status }: { status: Order["status"] }) {
    return (
        <Badge
            variant="secondary"
            className={cn(
                "font-medium",
                status === "delivered" && "bg-success/10 text-success hover:bg-success/10",
                status === "shipped" && "bg-primary/10 text-primary hover:bg-primary/10",
                status === "processing" && "bg-warning/10 text-warning hover:bg-warning/10",
                status === "pending" && "bg-muted text-muted-foreground hover:bg-muted",
                status === "cancelled" && "bg-destructive/10 text-destructive hover:bg-destructive/10"
            )}
        >
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
    );
}

function PaymentBadge({ status }: { status: Order["paymentStatus"] }) {
    return (
        <Badge
            variant="outline"
            className={cn(
                "font-medium",
                status === "paid" && "border-success text-success",
                status === "pending" && "border-warning text-warning",
                status === "refunded" && "border-muted-foreground text-muted-foreground"
            )}
        >
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
    );
}

export default function Orders() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Orders</h1>
                        <p className="text-muted-foreground">
                            Manage and track customer orders.
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="animate-fade-in">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-muted p-2">
                                    <Package className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Pending</p>
                                    <p className="text-2xl font-bold">12</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="animate-fade-in">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-warning/10 p-2">
                                    <Package className="h-5 w-5 text-warning" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Processing</p>
                                    <p className="text-2xl font-bold">28</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="animate-fade-in">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-primary/10 p-2">
                                    <Truck className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Shipped</p>
                                    <p className="text-2xl font-bold">45</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="animate-fade-in">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-success/10 p-2">
                                    <Package className="h-5 w-5 text-success" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Delivered</p>
                                    <p className="text-2xl font-bold">156</p>
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
                                <Input placeholder="Search orders..." className="pl-9" />
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

                {/* Orders Table */}
                <Card className="animate-fade-in">
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Items</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Payment</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id} className="animate-fade-in">
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">{order.customer}</p>
                                                <p className="text-sm text-muted-foreground">{order.email}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>{order.date}</TableCell>
                                        <TableCell>{order.items} items</TableCell>
                                        <TableCell className="font-semibold">${order.total.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <PaymentBadge status={order.paymentStatus} />
                                        </TableCell>
                                        <TableCell>
                                            <OrderStatusBadge status={order.status} />
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-popover">
                                                    <DropdownMenuItem>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Truck className="mr-2 h-4 w-4" />
                                                        Update Status
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
