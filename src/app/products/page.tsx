"use client";

import Link from "next/link";
import { useStoreType } from "@/contexts/StoreTypeContext";
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
import { Plus, Search, Filter, MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClothingProduct {
    id: string;
    image: string;
    name: string;
    price: number;
    stock: number;
    status: "in_stock" | "low_stock" | "out_of_stock";
    size: string[];
    color: { name: string; hex: string }[];
}

interface ElectronicsProduct {
    id: string;
    image: string;
    name: string;
    price: number;
    stock: number;
    status: "in_stock" | "low_stock" | "out_of_stock";
    model: string;
    specs: string;
}

const clothingProducts: ClothingProduct[] = [
    {
        id: "1",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
        name: "Classic White Tee",
        price: 29.99,
        stock: 234,
        status: "in_stock",
        size: ["S", "M", "L", "XL"],
        color: [
            { name: "White", hex: "#FFFFFF" },
            { name: "Black", hex: "#000000" },
        ],
    },
    {
        id: "2",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop",
        name: "Blue Denim Jacket",
        price: 149.99,
        stock: 45,
        status: "in_stock",
        size: ["M", "L", "XL"],
        color: [
            { name: "Blue", hex: "#1E40AF" },
            { name: "Light Blue", hex: "#60A5FA" },
        ],
    },
    {
        id: "3",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&h=100&fit=crop",
        name: "Black Slim Jeans",
        price: 79.99,
        stock: 8,
        status: "low_stock",
        size: ["28", "30", "32", "34"],
        color: [{ name: "Black", hex: "#000000" }],
    },
    {
        id: "4",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&h=100&fit=crop",
        name: "Floral Summer Dress",
        price: 89.99,
        stock: 0,
        status: "out_of_stock",
        size: ["XS", "S", "M"],
        color: [
            { name: "Pink", hex: "#EC4899" },
            { name: "Yellow", hex: "#FCD34D" },
        ],
    },
    {
        id: "5",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100&h=100&fit=crop",
        name: "Leather Bomber Jacket",
        price: 249.99,
        stock: 23,
        status: "in_stock",
        size: ["S", "M", "L"],
        color: [
            { name: "Brown", hex: "#92400E" },
            { name: "Black", hex: "#000000" },
        ],
    },
];

const electronicsProducts: ElectronicsProduct[] = [
    {
        id: "1",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop",
        name: "iPhone 15 Pro Max",
        price: 1199.00,
        stock: 89,
        status: "in_stock",
        model: "A3108",
        specs: "256GB, Titanium Blue",
    },
    {
        id: "2",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
        name: "Sony WH-1000XM5",
        price: 349.99,
        stock: 156,
        status: "in_stock",
        model: "WH1000XM5/B",
        specs: "Wireless, Noise Cancelling",
    },
    {
        id: "3",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop",
        name: 'MacBook Pro 14"',
        price: 1999.00,
        stock: 12,
        status: "low_stock",
        model: "MKGR3LL/A",
        specs: "M3 Pro, 18GB RAM, 512GB",
    },
    {
        id: "4",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop",
        name: 'iPad Pro 12.9"',
        price: 1099.00,
        stock: 0,
        status: "out_of_stock",
        model: "MNXF3LL/A",
        specs: "M2 Chip, 256GB, WiFi",
    },
    {
        id: "5",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&h=100&fit=crop",
        name: "Apple Watch Ultra 2",
        price: 799.00,
        stock: 67,
        status: "in_stock",
        model: "MRF53LL/A",
        specs: "49mm, GPS + Cellular",
    },
];

function StatusBadge({ status }: { status: "in_stock" | "low_stock" | "out_of_stock" }) {
    return (
        <Badge
            variant="secondary"
            className={cn(
                "font-medium",
                status === "in_stock" && "bg-success/10 text-success hover:bg-success/10",
                status === "low_stock" && "bg-warning/10 text-warning hover:bg-warning/10",
                status === "out_of_stock" && "bg-destructive/10 text-destructive hover:bg-destructive/10"
            )}
        >
            {status === "in_stock" && "In Stock"}
            {status === "low_stock" && "Low Stock"}
            {status === "out_of_stock" && "Out of Stock"}
        </Badge>
    );
}

function SizeBadges({ sizes }: { sizes: string[] }) {
    return (
        <div className="flex gap-1 flex-wrap">
            {sizes.map((size) => (
                <Badge key={size} variant="outline" className="text-xs font-medium">
                    {size}
                </Badge>
            ))}
        </div>
    );
}

function ColorSwatches({ colors }: { colors: { name: string; hex: string }[] }) {
    return (
        <div className="flex gap-1.5">
            {colors.map((color) => (
                <div
                    key={color.name}
                    className="h-5 w-5 rounded-full border border-border shadow-sm"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                />
            ))}
        </div>
    );
}

function ProductActions() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover">
                <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function Products() {
    const { storeType } = useStoreType();

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Products</h1>
                        <p className="text-muted-foreground">
                            Manage your {storeType === "clothing" ? "fashion" : "electronics"} inventory.
                        </p>
                    </div>
                    <Link href="/products/add">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Product
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <Card className="animate-fade-in">
                    <CardContent className="pt-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input placeholder="Search products..." className="pl-9" />
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

                {/* Products Table */}
                <Card className="animate-fade-in">
                    <CardHeader>
                        <CardTitle>All Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80px]">Image</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Price</TableHead>
                                    {storeType === "clothing" ? (
                                        <>
                                            <TableHead>Size</TableHead>
                                            <TableHead>Color</TableHead>
                                        </>
                                    ) : (
                                        <>
                                            <TableHead>Model</TableHead>
                                            <TableHead>Specs</TableHead>
                                        </>
                                    )}
                                    <TableHead>Stock</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {storeType === "clothing"
                                    ? clothingProducts.map((product) => (
                                        <TableRow key={product.id} className="animate-fade-in">
                                            <TableCell>
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-12 w-12 rounded-lg object-cover"
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">{product.name}</TableCell>
                                            <TableCell>${product.price.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <SizeBadges sizes={product.size} />
                                            </TableCell>
                                            <TableCell>
                                                <ColorSwatches colors={product.color} />
                                            </TableCell>
                                            <TableCell>{product.stock}</TableCell>
                                            <TableCell>
                                                <StatusBadge status={product.status} />
                                            </TableCell>
                                            <TableCell>
                                                <ProductActions />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    : electronicsProducts.map((product) => (
                                        <TableRow key={product.id} className="animate-fade-in">
                                            <TableCell>
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-12 w-12 rounded-lg object-cover"
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">{product.name}</TableCell>
                                            <TableCell>${product.price.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <code className="rounded bg-muted px-2 py-1 text-xs">
                                                    {product.model}
                                                </code>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                                                {product.specs}
                                            </TableCell>
                                            <TableCell>{product.stock}</TableCell>
                                            <TableCell>
                                                <StatusBadge status={product.status} />
                                            </TableCell>
                                            <TableCell>
                                                <ProductActions />
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
