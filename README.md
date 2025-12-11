# E-Commerce Admin Suite

A modern, responsive e-commerce admin dashboard built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.
![Next.js](https://img.shields.io/badge/Next.js-16.0.8-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)

## ✨ Features

### Authentication
- **Role-based access control** (Admin & Developer)
- Demo credentials displayed on login page
- Protected routes with automatic redirects
- Session persistence via localStorage
- 
### Dashboard
- **Dynamic store type** switching (Clothing/Electronics)
- Real-time metrics display (revenue, orders, customers)
- Recent orders overview
- Responsive sidebar with collapse functionality
- 
### Products
- Product listing with search and filters
- **Comprehensive Add Product form** for electronics:
  - Basic info (name, brand, model, version, category)
  - Multi-image upload support
  - Pricing & inventory management
  - Product variants (storage, color, stock)
  - Technical specifications
  - Warranty & additional details
  - 
### Other Pages
- Orders management with status tracking
- Customer management with avatars
- Settings with notification & security options
- 
### Mobile Responsive
- Hamburger menu for mobile navigation
- Slide-in sidebar with overlay
- Responsive grids and layouts
- Touch-friendly UI components
- 
## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- 
### Installation
```bash
# Clone the repository
git clone [https://github.com/Redsniper99/ecom_admin_suit.git](https://github.com/Redsniper99/ecom_admin_suit.git)
# Navigate to project directory
cd ecom_admin_suit
# Install dependencies
npm install
# Run development server
npm run dev
Open http://localhost:3000 in your browser.

🔐 Demo Credentials
Role	Username	Password	Access
Admin	admin	admin123	View all features, cannot change store type
Developer	developer	dev123	Full access including store type configuration
📁 Project Structure
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard
│   ├── login/             # Login page
│   ├── products/          # Products & Add Product
│   ├── orders/            # Orders page
│   ├── customers/         # Customers page
│   └── settings/          # Settings page
├── components/
│   ├── layout/            # Layout components (Sidebar, Header)
│   └── ui/                # shadcn/ui components
├── contexts/
│   ├── AuthContext.tsx    # Authentication context
│   └── StoreTypeContext.tsx # Store type context
├── hooks/                 # Custom React hooks
└── lib/                   # Utility functions

🛠️ Tech Stack
Framework: Next.js 16 (App Router)
Language: TypeScript
Styling: Tailwind CSS 3.4
UI Components: shadcn/ui (Radix UI)
State Management: React Context API
Data Fetching: TanStack React Query
Charts: Recharts
Icons: Lucide React
Forms: React Hook Form + Zod

📱 Responsive Breakpoints
Mobile: < 640px
Tablet: 640px - 1024px
Desktop: > 1024px

🎨 Theming
The app supports a custom theme with:

Light/Dark mode ready (CSS variables)
Clothing store accent color (Pink)
Electronics store accent color (Blue)
Custom dashboard metric colors
📄 License

This project is for demonstration purposes.

Made with ❤️ using Next.js and shadcn/ui
