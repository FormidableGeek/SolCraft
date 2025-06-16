import { PortfolioAllocationCard } from "@/components/dashboard/figma/portfolio-allocation-card";
import { KeyMetricsCard } from "@/components/dashboard/figma/key-metrics-card";
import { MyBalanceCard } from "@/components/dashboard/figma/my-balance-card";
import { TopCryptocurrencyTable } from "@/components/dashboard/figma/top-cryptocurrency-table";
import { RecentActivityTable } from "@/components/dashboard/figma/recent-activity-table";
import { FigmaPortfolioPerformanceChart } from "@/components/dashboard/figma/figma-portfolio-performance-chart";
import { mockPortfolioAllocation, mockKeyMetrics, mockBalance, mockTopCryptocurrencies, mockRecentActivity, mockFigmaPortfolioPerformance } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PortfolioAllocationCard data={mockPortfolioAllocation} className="lg:col-span-1" />
        <KeyMetricsCard metrics={mockKeyMetrics} className="lg:col-span-1" />
        <MyBalanceCard balance={mockBalance} className="lg:col-span-1" />
      </div>

      {/* Middle Section */}
      <div>
        <TopCryptocurrencyTable cryptocurrencies={mockTopCryptocurrencies} />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentActivityTable activities={mockRecentActivity} className="lg:col-span-2" />
        <FigmaPortfolioPerformanceChart data={mockFigmaPortfolioPerformance} className="lg:col-span-1" />
      </div>
    </div>
  );
}
