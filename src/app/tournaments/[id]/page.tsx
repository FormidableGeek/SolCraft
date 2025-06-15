import { notFound } from "next/navigation";
import { TournamentDetailHeader } from "@/components/tournaments/tournament-detail-header";
import { InvestmentTierCard } from "@/components/tournaments/investment-tier-card";
import { AiRiskAssessmentSection } from "@/components/tournaments/ai-risk-assessment-section";
import { mockTournaments, mockInvestmentTiers } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Trophy, Info, DollarSign, MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// This function would typically fetch data from a DB or API
async function getTournamentData(id: string) {
  const tournament = mockTournaments.find((t) => t.id === id);
  // Simulate fetching AI assessment if not already on tournament object
  if (tournament && !tournament.aiRiskAssessment) {
    // For demo, let's assign a mock assessment to one tournament
    if (tournament.id === '1') {
        // This is just placeholder, actual call will be in AiRiskAssessmentSection client component
        // or pre-fetched here if criteria are met.
    }
  }
  return tournament;
}


export default async function TournamentDetailPage({ params }: { params: { id: string } }) {
  const tournament = await getTournamentData(params.id);

  if (!tournament) {
    notFound();
  }

  // Placeholder for handling investment action
  const handleInvestment = (tierId: string) => {
    console.log(`Investing in tier ${tierId} for tournament ${tournament.id}`);
    // Here you would typically open a modal, call an API, etc.
    alert(`Investment action for tier ${tierId} triggered! (Placeholder)`);
  };

  return (
    <div className="container mx-auto py-8">
      <TournamentDetailHeader tournament={tournament} />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="overview"><Info className="mr-2 h-4 w-4 sm:inline hidden"/>Overview</TabsTrigger>
          <TabsTrigger value="invest"><DollarSign className="mr-2 h-4 w-4 sm:inline hidden"/>Invest</TabsTrigger>
          <TabsTrigger value="ai-risk"><Trophy className="mr-2 h-4 w-4 sm:inline hidden"/>AI Risk</TabsTrigger>
          <TabsTrigger value="community"><MessageCircle className="mr-2 h-4 w-4 sm:inline hidden"/>Community</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Tournament Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{tournament.description || "Detailed description not available."}</p>
              <Separator />
              <h3 className="font-semibold text-lg">Key Details</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><span className="font-medium text-foreground">Platform:</span> {tournament.platform}</li>
                <li><span className="font-medium text-foreground">Game Type:</span> Texas Hold'em (Assumed)</li>
                <li><span className="font-medium text-foreground">Structure:</span> Standard Payout (Assumed)</li>
                {tournament.participants?.max && <li><span className="font-medium text-foreground">Max Participants:</span> {tournament.participants.max}</li>}
              </ul>
              <Button variant="outline" disabled>View Full Rules (Coming Soon)</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invest">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Investment Tiers</CardTitle>
              <p className="text-muted-foreground">Choose an investment level that matches your risk appetite and goals.</p>
            </CardHeader>
            <CardContent>
              {mockInvestmentTiers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockInvestmentTiers.map((tier) => (
                    <InvestmentTierCard key={tier.id} tier={tier} onInvest={handleInvestment} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No investment tiers available for this tournament yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-risk">
          <AiRiskAssessmentSection tournament={tournament} initialAssessment={tournament.aiRiskAssessment} />
        </TabsContent>
        
        <TabsContent value="community">
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">Community Discussion</CardTitle>
               <p className="text-muted-foreground">See what others are saying about this tournament.</p>
            </CardHeader>
            <CardContent className="text-center py-12">
              <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-lg font-medium text-muted-foreground">Community features coming soon!</p>
              <p className="text-sm text-muted-foreground">Discuss strategies, share insights, and connect with other investors.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
