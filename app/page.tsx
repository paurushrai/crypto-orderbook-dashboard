import OrderBook from "@/components/OrderBook";
import { ThemeToggle } from "@/components/ui/theme-toggle";

/**
 * Home Component
 *
 * This is the main page component that serves as the landing page for the BTC-USD market data application.
 * It provides a responsive layout with consistent padding and maximum width constraints.
 *
 * Layout Structure:
 * - Main container with full minimum height and background styling
 * - Centered content wrapper with maximum width
 * - Header section with title and theme toggle
 * - Order book section
 *
 * Styling:
 * - Uses Tailwind CSS for responsive design
 * - Implements responsive padding (16px on mobile, 32px on medium screens and up)
 * - Maximum content width of 7xl (1280px)
 *
 * @returns {JSX.Element} The rendered Home component
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header section with title and theme toggle */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight">
            BTC-USD Market Data
          </h1>
          <ThemeToggle />
        </div>
        {/* Order book component */}
        <OrderBook />
      </div>
    </main>
  );
}
