import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { AuthGuard } from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "E-Commerce Admin Suite",
  description: "Enterprise e-commerce admin dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <AuthGuard>{children}</AuthGuard>
        </Providers>
      </body>
    </html>
  );
}
