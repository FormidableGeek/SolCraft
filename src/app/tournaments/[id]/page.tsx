
import { notFound } from "next/navigation";
import { TournamentDetailHeader } from "@/components/tournaments/tournament-detail-header";
import { InvestmentTierCard } from "@/components/tournaments/investment-tier-card";
import { AiRiskAssessmentSection } from "@/components/tournaments/ai-risk-assessment-section";
import { mockTournaments, mockInvestmentTiers } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Trophy, Info, DollarSign, MessageCircle, Layers3, AlertCircle, TrendingUp, BarChartHorizontalBig } from "lucide-react"; // Added Layers3, BarChartHorizontalBig
import { Separator } from "@/components/ui/separator";
import type { Tournament } from "@/lib/types";

// This function would typically fetch data from a DB or API
async function getTournamentData(id: string) {
  const tournament = mockTournaments.find((t) => t.id === id);
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

  const isTokenizedAndDetailsExist = tournament.tokenizationDetails?.isTokenized && tournament.tokenizationDetails;
  const tokenTicker = tournament.tokenizationDetails?.tokenTicker || "Tokens";

  return (
    <div className="container mx-auto py-8">
      <TournamentDetailHeader tournament={tournament} />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
          <TabsTrigger value="overview"><Info className="mr-2 h-4 w-4 sm:inline hidden"/>Overview</TabsTrigger>
          <TabsTrigger value="invest"><DollarSign className="mr-2 h-4 w-4 sm:inline hidden"/>Invest</TabsTrigger>
          <TabsTrigger value="tokenization"><Layers3 className="mr-2 h-4 w-4 sm:inline hidden"/>Tokenization</TabsTrigger>
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
              <CardDescription>
                Choose an investment level that matches your risk appetite and goals. 
                Platform fees (detailed on each tier) apply to your share of any winnings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mockInvestmentTiers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockInvestmentTiers.map((tier) => (
                    <InvestmentTierCard 
                        key={tier.id} 
                        tier={tier} 
                        onInvest={handleInvestment}
                        tokenTicker={tokenTicker} 
                    />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No investment tiers available for this tournament yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tokenization">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center">
                <Layers3 className="mr-2 h-6 w-6 text-primary" />
                Tournament Tokenization
              </CardTitle>
              <CardDescription>
                Details about how this tournament's buy-in is tokenized for investment.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isTokenizedAndDetailsExist && tournament.tokenizationDetails ? (
                <>
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-md">
                    <h3 className="font-semibold text-green-700 dark:text-green-400">This tournament is tokenized!</h3>
                    <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                      You can invest in fractions of the player's buy-in by purchasing tournament tokens.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-foreground flex items-center">
                      <BarChartHorizontalBig className="mr-2 h-5 w-5 text-primary" />
                      Token Fractionalization
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Token Ticker:</p>
                        <p className="font-semibold text-foreground">{tournament.tokenizationDetails.tokenTicker}</p>
                      </div>
                       <div className="space-y-1">
                        <p className="text-muted-foreground">Total Token Supply:</p>
                        <p className="font-semibold text-foreground">{tournament.tokenizationDetails.totalTokenSupply.toLocaleString()} tokens</p>
                      </div>
                       <div className="space-y-1">
                        <p className="text-muted-foreground">Equivalent Total Buy-in (Tokenized):</p>
                        <p className="font-semibold text-foreground">${(tournament.tokenizationDetails.totalTokenSupply * tournament.tokenizationDetails.tokenPrice).toLocaleString()}</p>
                      </div>
                       <div className="space-y-1">
                        <p className="text-muted-foreground">Original Tournament Buy-in:</p>
                        <p className="font-semibold text-foreground">${tournament.buyIn.toLocaleString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Minimum Investment:</p>
                        <p className="font-semibold text-foreground">
                          {tournament.tokenizationDetails.minInvestmentTokens.toLocaleString()} tokens 
                          (${(tournament.tokenizationDetails.minInvestmentTokens * tournament.tokenizationDetails.tokenPrice).toLocaleString()})
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Maximum Investment (per investor):</p>
                        <p className="font-semibold text-foreground">
                          {tournament.tokenizationDetails.maxInvestmentTokens.toLocaleString()} tokens 
                          (${(tournament.tokenizationDetails.maxInvestmentTokens * tournament.tokenizationDetails.tokenPrice).toLocaleString()})
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-foreground flex items-center">
                        <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                        Token Economics
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                            <p className="text-muted-foreground">Initial Token Price:</p>
                            <p className="font-semibold text-foreground">${tournament.tokenizationDetails.tokenPrice.toFixed(2)} per {tournament.tokenizationDetails.tokenTicker}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-muted-foreground">Valuation Basis:</p>
                            <p className="font-semibold text-foreground">
                                {`$${tournament.buyIn.toLocaleString()} (Buy-in) / ${tournament.tokenizationDetails.totalTokenSupply.toLocaleString()} ${tournament.tokenizationDetails.tokenTicker} (Supply)`}
                            </p>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                        Note: The token value is fixed pre-tournament. Post-tournament, the value per token will be recalculated based on actual prize winnings minus platform fees. Dynamic pricing may apply on secondary markets during the tournament.
                    </p>
                  </div>

                  <Separator />
                   <div>
                    <h4 className="font-semibold text-md mb-2">How Tokenization Works:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Each tournament buy-in can be represented by a set number of tokens.</li>
                        <li>Investors purchase these tokens to collectively fund a player's entry.</li>
                        <li>If the player wins, profits (after platform fees) are distributed proportionally to token holders.</li>
                        <li>If the tournament is not fully funded via tokens, investments may be refunded (specific logic TBD).</li>
                        <li>Tokens may become tradable on a secondary market, allowing for dynamic valuation during the tournament (feature TBD).</li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-md flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-amber-700 dark:text-amber-400">Not Currently Tokenized</h3>
                    <p className="text-sm text-amber-600 dark:text-amber-300 mt-1">
                      This tournament is not set up for tokenized investment at this time.
                      Traditional staking or backing methods may be available elsewhere if applicable.
                    </p>
                  </div>
                </div>
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
               <CardDescription>See what others are saying about this tournament.</CardDescription>
            </Header>
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

