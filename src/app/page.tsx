
import { PageHeader } from "@/components/shared/page-header";
import { PortfolioOverviewCard } from "@/components/dashboard/portfolio-overview-card";
import { InvestmentHistoryCard } from "@/components/dashboard/investment-history-card";
import { PerformanceChartCard } from "@/components/dashboard/performance-chart-card";
import { mockPortfolioData, mockInvestments, portfolioPerformanceData } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, Flame } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTournaments } from "@/lib/mock-data";
import { TournamentCard } from "@/components/tournaments/tournament-card";

export default function DashboardPage() {
  const featuredTournaments = mockTournaments.filter(t => t.status === 'Upcoming').slice(0, 2);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your Solcraft activity."
      >
        <Button asChild>
          <Link href="/tournaments">
            <PlusCircle className="mr-2 h-4 w-4" /> Find Tournaments
          </Link>
        </Button>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3 mb-6">
        <div className="lg:col-span-2">
           <PortfolioOverviewCard data={mockPortfolioData} />
        </div>
        <div className="lg:col-span-1">
          {/* Placeholder for another key metric or quick actions */}
           <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline">Quick Actions</CardTitle>
              <CardDescription>Common tasks at your fingertips.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
              <Button variant="outline" asChild><Link href="/tournaments">Browse Tournaments</Link></Button>
              <Button variant="outline" asChild><Link href="/profile">View Profile</Link></Button>
              <Button variant="outline" disabled>Deposit Funds (Coming Soon)</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 mb-6">
        <PerformanceChartCard data={portfolioPerformanceData} />
        <InvestmentHistoryCard investments={mockInvestments} />
      </div>

      {featuredTournaments.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Flame className="h-6 w-6 mr-2 text-primary" />
            <h2 className="text-2xl font-headline font-semibold">Spotlight: Hot Tournaments</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {featuredTournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
