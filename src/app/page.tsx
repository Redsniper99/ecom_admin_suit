"use client";

import { useStoreType } from "@/contexts/StoreTypeContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Shirt,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  color: string;
}

function MetricCard({ title, value, change, icon: Icon, color }: MetricCardProps) {
  const isPositive = change >= 0;

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn("rounded-lg p-2", color)}>
          <Icon className="h-4 w-4 text-primary-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="flex items-center gap-1 mt-1">
          {isPositive ? (
            <ArrowUpRight className="h-4 w-4 text-success" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-destructive" />
          )}
          <span className={cn(
            "text-sm font-medium",
            isPositive ? "text-success" : "text-destructive"
          )}>
            {isPositive ? "+" : ""}{change}%
          </span>
          <span className="text-sm text-muted-foreground">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
}

function RecentOrdersCard() {
  const { storeType } = useStoreType();

  const clothingOrders = [
    { id: "#1234", customer: "John Doe", product: "Blue Denim Jacket", amount: "$149.00", status: "Shipped" },
    { id: "#1233", customer: "Jane Smith", product: "Floral Summer Dress", amount: "$89.00", status: "Processing" },
    { id: "#1232", customer: "Mike Wilson", product: "Classic White Tee (3x)", amount: "$75.00", status: "Delivered" },
  ];

  const electronicsOrders = [
    { id: "#1234", customer: "John Doe", product: "iPhone 15 Pro Max", amount: "$1,199.00", status: "Shipped" },
    { id: "#1233", customer: "Jane Smith", product: "Sony WH-1000XM5", amount: "$349.00", status: "Processing" },
    { id: "#1232", customer: "Mike Wilson", product: "MacBook Pro 14\"", amount: "$1,999.00", status: "Delivered" },
  ];

  const orders = storeType === "clothing" ? clothingOrders : electronicsOrders;

  return (
    <Card className="col-span-2 animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Recent Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
              <div className="flex flex-col gap-1">
                <span className="font-medium text-foreground">{order.product}</span>
                <span className="text-sm text-muted-foreground">{order.customer} • {order.id}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-foreground">{order.amount}</span>
                <span className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-medium",
                  order.status === "Delivered" && "bg-success/10 text-success",
                  order.status === "Shipped" && "bg-primary/10 text-primary",
                  order.status === "Processing" && "bg-warning/10 text-warning"
                )}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TopProductsCard() {
  const { storeType } = useStoreType();

  const clothingProducts = [
    { name: "Classic White Tee", sales: 234, revenue: "$7,020" },
    { name: "Blue Denim Jacket", sales: 189, revenue: "$28,161" },
    { name: "Black Slim Jeans", sales: 156, revenue: "$12,480" },
    { name: "Floral Summer Dress", sales: 134, revenue: "$11,926" },
  ];

  const electronicsProducts = [
    { name: "iPhone 15 Pro", sales: 89, revenue: "$106,711" },
    { name: "AirPods Pro", sales: 234, revenue: "$58,266" },
    { name: "MacBook Air M3", sales: 67, revenue: "$80,333" },
    { name: "iPad Pro 12.9", sales: 45, revenue: "$49,455" },
  ];

  const products = storeType === "clothing" ? clothingProducts : electronicsProducts;

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {storeType === "clothing" ? (
            <Shirt className="h-5 w-5" />
          ) : (
            <Cpu className="h-5 w-5" />
          )}
          Top Products
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={product.name} className="flex items-center gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                {index + 1}
              </span>
              <div className="flex-1">
                <div className="font-medium text-foreground">{product.name}</div>
                <div className="text-sm text-muted-foreground">{product.sales} sales</div>
              </div>
              <span className="font-semibold text-foreground">{product.revenue}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { storeType } = useStoreType();

  const metrics = storeType === "clothing" ? {
    revenue: "$45,231",
    revenueChange: 12.5,
    orders: 156,
    ordersChange: 8.2,
    lowStock: 12,
    stockChange: -3.1,
    customers: 2341,
    customersChange: 15.3,
  } : {
    revenue: "$128,450",
    revenueChange: 18.2,
    orders: 89,
    ordersChange: 5.7,
    lowStock: 8,
    stockChange: -12.4,
    customers: 1876,
    customersChange: 9.8,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here&apos;s your store overview.
            </p>
          </div>
          <div className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2",
            storeType === "clothing" ? "bg-clothing-accent/10 text-clothing-accent" : "bg-electronics-accent/10 text-electronics-accent"
          )}>
            {storeType === "clothing" ? (
              <Shirt className="h-4 w-4" />
            ) : (
              <Cpu className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">
              {storeType === "clothing" ? "Fashion Store" : "Electronics Store"}
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value={metrics.revenue}
            change={metrics.revenueChange}
            icon={DollarSign}
            color="bg-metric-revenue"
          />
          <MetricCard
            title="Active Orders"
            value={metrics.orders.toString()}
            change={metrics.ordersChange}
            icon={ShoppingCart}
            color="bg-metric-orders"
          />
          <MetricCard
            title="Low Stock Items"
            value={metrics.lowStock.toString()}
            change={metrics.stockChange}
            icon={Package}
            color="bg-metric-stock"
          />
          <MetricCard
            title="Total Customers"
            value={metrics.customers.toLocaleString()}
            change={metrics.customersChange}
            icon={Users}
            color="bg-metric-customers"
          />
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          <RecentOrdersCard />
          <TopProductsCard />
        </div>
      </div>
    </DashboardLayout>
  );
}
