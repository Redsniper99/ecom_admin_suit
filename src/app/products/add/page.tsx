"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
    Package,
    Image as ImageIcon,
    Plus,
    X,
    Upload,
    DollarSign,
    Box,
    Tag,
    Cpu,
    HardDrive,
    Monitor,
    Zap
} from "lucide-react";
import { useState } from "react";

export default function AddProduct() {
    const [images, setImages] = useState<string[]>([]);
    const [variants, setVariants] = useState([{ size: "", storage: "", price: "" }]);
    const [specifications, setSpecifications] = useState([{ key: "", value: "" }]);

    const addVariant = () => {
        setVariants([...variants, { size: "", storage: "", price: "" }]);
    };

    const removeVariant = (index: number) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    const addSpecification = () => {
        setSpecifications([...specifications, { key: "", value: "" }]);
    };

    const removeSpecification = (index: number) => {
        setSpecifications(specifications.filter((_, i) => i !== index));
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-5xl">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Add New Product</h1>
                        <p className="text-sm text-muted-foreground">
                            Create a new electronic product listing
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="sm:size-default">Save as Draft</Button>
                        <Button size="sm" className="sm:size-default">Publish Product</Button>
                    </div>
                </div>

                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="h-5 w-5" />
                            Basic Information
                        </CardTitle>
                        <CardDescription>
                            Essential product details and identification
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="product-name">Product Name *</Label>
                                <Input
                                    id="product-name"
                                    placeholder="e.g., iPhone 15 Pro Max"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="brand">Brand *</Label>
                                <Input
                                    id="brand"
                                    placeholder="e.g., Apple, Samsung, Sony"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="model">Model Number</Label>
                                <Input
                                    id="model"
                                    placeholder="e.g., A2894"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="version">Version/Generation</Label>
                                <Input
                                    id="version"
                                    placeholder="e.g., Gen 2, v3.0"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category *</Label>
                                <Select>
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="smartphones">Smartphones</SelectItem>
                                        <SelectItem value="laptops">Laptops</SelectItem>
                                        <SelectItem value="tablets">Tablets</SelectItem>
                                        <SelectItem value="smartwatches">Smartwatches</SelectItem>
                                        <SelectItem value="headphones">Headphones</SelectItem>
                                        <SelectItem value="cameras">Cameras</SelectItem>
                                        <SelectItem value="gaming">Gaming Consoles</SelectItem>
                                        <SelectItem value="accessories">Accessories</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Detailed product description, features, and highlights..."
                                rows={4}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                                <Input
                                    id="sku"
                                    placeholder="e.g., ELEC-IP15-256-BLK"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="barcode">Barcode/UPC</Label>
                                <Input
                                    id="barcode"
                                    placeholder="e.g., 194253395577"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Product Images */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ImageIcon className="h-5 w-5" />
                            Product Images
                        </CardTitle>
                        <CardDescription>
                            Upload high-quality product images (up to 10 images)
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {/* Upload Button */}
                            <div className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 bg-muted/50">
                                <Upload className="h-8 w-8 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">Upload Image</span>
                            </div>

                            {/* Preview Placeholders */}
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square rounded-lg border border-border bg-muted/30 flex items-center justify-center relative group">
                                    <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                                    <Badge className="absolute top-2 left-2 text-xs">Image {i}</Badge>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            First image will be used as the main product image. Recommended size: 1200x1200px
                        </p>
                    </CardContent>
                </Card>

                {/* Pricing & Inventory */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5" />
                            Pricing & Inventory
                        </CardTitle>
                        <CardDescription>
                            Set pricing, stock levels, and availability
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Base Price *</Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="price"
                                        type="number"
                                        placeholder="0.00"
                                        className="pl-9"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="compare-price">Compare at Price</Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="compare-price"
                                        type="number"
                                        placeholder="0.00"
                                        className="pl-9"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cost">Cost per Item</Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="cost"
                                        type="number"
                                        placeholder="0.00"
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="stock">Stock Quantity *</Label>
                                <div className="relative">
                                    <Box className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="stock"
                                        type="number"
                                        placeholder="0"
                                        className="pl-9"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="low-stock">Low Stock Alert</Label>
                                <Input
                                    id="low-stock"
                                    type="number"
                                    placeholder="10"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="availability">Availability</Label>
                                <Select defaultValue="in-stock">
                                    <SelectTrigger id="availability">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="in-stock">In Stock</SelectItem>
                                        <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                                        <SelectItem value="pre-order">Pre-order</SelectItem>
                                        <SelectItem value="backorder">Backorder</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div>
                                <Label className="text-sm font-medium">Track Inventory</Label>
                                <p className="text-xs text-muted-foreground">Enable stock tracking for this product</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </CardContent>
                </Card>

                {/* Product Variants */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Tag className="h-5 w-5" />
                                    Product Variants
                                </CardTitle>
                                <CardDescription>
                                    Add different configurations (storage, color, size)
                                </CardDescription>
                            </div>
                            <Button onClick={addVariant} size="sm" variant="outline">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Variant
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {variants.map((variant, index) => (
                            <div key={index} className="flex flex-col sm:flex-row gap-3 items-start p-4 border border-border rounded-lg bg-muted/30">
                                <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                    <div className="space-y-2">
                                        <Label className="text-xs">Storage/Memory</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="64gb">64GB</SelectItem>
                                                <SelectItem value="128gb">128GB</SelectItem>
                                                <SelectItem value="256gb">256GB</SelectItem>
                                                <SelectItem value="512gb">512GB</SelectItem>
                                                <SelectItem value="1tb">1TB</SelectItem>
                                                <SelectItem value="2tb">2TB</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs">Color</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="black">Black</SelectItem>
                                                <SelectItem value="white">White</SelectItem>
                                                <SelectItem value="silver">Silver</SelectItem>
                                                <SelectItem value="gold">Gold</SelectItem>
                                                <SelectItem value="blue">Blue</SelectItem>
                                                <SelectItem value="red">Red</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs">Price Modifier</Label>
                                        <Input placeholder="+$0.00" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs">Stock</Label>
                                        <Input type="number" placeholder="0" />
                                    </div>
                                </div>

                                {variants.length > 1 && (
                                    <Button
                                        onClick={() => removeVariant(index)}
                                        variant="ghost"
                                        size="icon"
                                        className="mt-6 hover:bg-destructive/10 hover:text-destructive"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Technical Specifications */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Cpu className="h-5 w-5" />
                                    Technical Specifications
                                </CardTitle>
                                <CardDescription>
                                    Add detailed technical specs and features
                                </CardDescription>
                            </div>
                            <Button onClick={addSpecification} size="sm" variant="outline">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Spec
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Quick Specs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="processor">Processor</Label>
                                <Input id="processor" placeholder="e.g., Apple A17 Pro, Snapdragon 8 Gen 3" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="ram">RAM</Label>
                                <Input id="ram" placeholder="e.g., 8GB, 16GB LPDDR5" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="display">Display</Label>
                                <Input id="display" placeholder="e.g., 6.7-inch OLED, 120Hz" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="battery">Battery</Label>
                                <Input id="battery" placeholder="e.g., 4500mAh, 65W Fast Charging" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="os">Operating System</Label>
                                <Input id="os" placeholder="e.g., iOS 17, Android 14" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="connectivity">Connectivity</Label>
                                <Input id="connectivity" placeholder="e.g., 5G, Wi-Fi 6E, Bluetooth 5.3" />
                            </div>
                        </div>

                        <Separator />

                        {/* Custom Specifications */}
                        <div className="space-y-3">
                            <Label className="text-sm font-medium">Additional Specifications</Label>
                            {specifications.map((spec, index) => (
                                <div key={index} className="flex gap-3 items-center">
                                    <Input
                                        placeholder="Specification name"
                                        className="flex-1"
                                    />
                                    <Input
                                        placeholder="Value"
                                        className="flex-1"
                                    />
                                    {specifications.length > 1 && (
                                        <Button
                                            onClick={() => removeSpecification(index)}
                                            variant="ghost"
                                            size="icon"
                                            className="hover:bg-destructive/10 hover:text-destructive"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Details */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="h-5 w-5" />
                            Additional Details
                        </CardTitle>
                        <CardDescription>
                            Warranty, shipping, and other information
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="warranty">Warranty Period</Label>
                                <Select>
                                    <SelectTrigger id="warranty">
                                        <SelectValue placeholder="Select warranty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="no-warranty">No Warranty</SelectItem>
                                        <SelectItem value="6-months">6 Months</SelectItem>
                                        <SelectItem value="1-year">1 Year</SelectItem>
                                        <SelectItem value="2-years">2 Years</SelectItem>
                                        <SelectItem value="3-years">3 Years</SelectItem>
                                        <SelectItem value="lifetime">Lifetime</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="condition">Condition</Label>
                                <Select defaultValue="new">
                                    <SelectTrigger id="condition">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="new">Brand New</SelectItem>
                                        <SelectItem value="refurbished">Refurbished</SelectItem>
                                        <SelectItem value="open-box">Open Box</SelectItem>
                                        <SelectItem value="used">Used</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="weight">Weight (kg)</Label>
                                <Input id="weight" type="number" step="0.01" placeholder="0.00" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="dimensions">Dimensions (L×W×H cm)</Label>
                                <Input id="dimensions" placeholder="e.g., 15.7 × 7.6 × 0.8" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="package-contents">Package Contents</Label>
                            <Textarea
                                id="package-contents"
                                placeholder="List what's included in the box..."
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div>
                                    <Label className="text-sm font-medium">Featured Product</Label>
                                    <p className="text-xs text-muted-foreground">Show in featured section</p>
                                </div>
                                <Switch />
                            </div>

                            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div>
                                    <Label className="text-sm font-medium">Free Shipping</Label>
                                    <p className="text-xs text-muted-foreground">No shipping charges</p>
                                </div>
                                <Switch />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 pb-6">
                    <Button variant="outline" size="lg">Cancel</Button>
                    <Button variant="outline" size="lg">Save as Draft</Button>
                    <Button size="lg">
                        <Package className="h-4 w-4 mr-2" />
                        Publish Product
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    );
}
