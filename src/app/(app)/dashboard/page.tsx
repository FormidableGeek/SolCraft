
import { KeyMetricsCard } from "@/components/dashboard/figma/key-metrics-card";
import { MyBalanceCard } from "@/components/dashboard/figma/my-balance-card";
import { RecentActivityTable } from "@/components/dashboard/figma/recent-activity-table";
import { FigmaPortfolioPerformanceChart } from "@/components/dashboard/figma/figma-portfolio-performance-chart";
import { mockKeyMetrics, mockRecentActivity, mockFigmaPortfolioPerformance, mockTournaments } from "@/lib/mock-data";
import { TournamentCard } from "@/components/tournaments/tournament-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const featuredTournaments = mockTournaments.filter(t => t.status === 'Upcoming' || t.status === 'Live').slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MyBalanceCard className="lg:col-span-1" />
        <KeyMetricsCard metrics={mockKeyMetrics} className="lg:col-span-2" />
      </div>

      {/* Featured Tournaments Section */}
      {featuredTournaments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-xl">Featured Tournaments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTournaments.map(tournament => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bottom Row: Recent Activity and Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentActivityTable activities={mockRecentActivity} className="lg:col-span-2" />
        <FigmaPortfolioPerformanceChart data={mockFigmaPortfolioPerformance} className="lg:col-span-1" />
      </div>
    </div>
  );
}
