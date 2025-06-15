"use client";

import { useState, useTransition } from 'react';
import { assessTournamentRisk, type TournamentRiskAssessmentInput, type TournamentRiskAssessmentOutput } from '@/ai/flows/tournament-risk-assessment';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, ShieldAlert, ShieldCheck, Shield, Wand2 } from "lucide-react";
import type { Tournament } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface AiRiskAssessmentSectionProps {
  tournament: Tournament;
  initialAssessment?: TournamentRiskAssessmentOutput;
}

export function AiRiskAssessmentSection({ tournament, initialAssessment }: AiRiskAssessmentSectionProps) {
  const [averagePlayers, setAveragePlayers] = useState(tournament.averagePlayers?.toString() || '');
  const [historicalData, setHistoricalData] = useState(tournament.historicalData || '');
  const [assessmentResult, setAssessmentResult] = useState<TournamentRiskAssessmentOutput | undefined>(initialAssessment);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!averagePlayers || !historicalData) {
      toast({
        title: "Missing Information",
        description: "Please provide average players and historical data for assessment.",
        variant: "destructive",
      });
      return;
    }

    const inputData: TournamentRiskAssessmentInput = {
      tournamentName: tournament.name,
      buyIn: tournament.buyIn,
      guaranteedPrizePool: tournament.guaranteedPrizePool,
      averagePlayers: parseInt(averagePlayers, 10),
      historicalData: historicalData,
    };

    startTransition(async () => {
      try {
        const result = await assessTournamentRisk(inputData);
        setAssessmentResult(result);
        toast({
          title: "Assessment Complete",
          description: `Risk level for ${tournament.name} assessed.`,
        });
      } catch (error) {
        console.error("Error assessing risk:", error);
        toast({
          title: "Assessment Failed",
          description: "Could not retrieve AI risk assessment. Please try again.",
          variant: "destructive",
        });
        setAssessmentResult(undefined);
      }
    });
  };

  const RiskIcon = assessmentResult?.riskLevel === 'Low' ? ShieldCheck :
                   assessmentResult?.riskLevel === 'Medium' ? Shield :
                   assessmentResult?.riskLevel === 'High' ? ShieldAlert :
                   null;

  const riskIconColor = assessmentResult?.riskLevel === 'Low' ? 'text-green-500' :
                        assessmentResult?.riskLevel === 'Medium' ? 'text-yellow-500' :
                        assessmentResult?.riskLevel === 'High' ? 'text-red-500' : 'text-muted-foreground';


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">AI-Powered Risk Assessment</CardTitle>
        </div>
        <CardDescription>
          Analyze this tournament's risk profile using our AI tool. Provide additional data if necessary.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {!assessmentResult && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="averagePlayers">Average Players in Similar Tournaments</Label>
                <Input
                  id="averagePlayers"
                  type="number"
                  value={averagePlayers}
                  onChange={(e) => setAveragePlayers(e.target.value)}
                  placeholder="e.g., 150"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="historicalData">Historical Data / Notes</Label>
                <Textarea
                  id="historicalData"
                  value={historicalData}
                  onChange={(e) => setHistoricalData(e.target.value)}
                  placeholder="e.g., Payout structures, player skill observations, past results..."
                  rows={4}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">Provide context for a more accurate assessment.</p>
              </div>
            </div>
          )}

          {assessmentResult && (
            <Alert variant={
              assessmentResult.riskLevel === 'Low' ? 'default' :
              assessmentResult.riskLevel === 'High' ? 'destructive' :
              'default' // Using default for Medium, could create a warning variant
            } className={
              assessmentResult.riskLevel === 'Medium' ? 'border-yellow-500 bg-yellow-50' : ''
            }>
              {RiskIcon && <RiskIcon className={`h-5 w-5 ${riskIconColor}`} />}
              <AlertTitle className={`font-headline ${riskIconColor}`}>
                Risk Level: {assessmentResult.riskLevel}
              </AlertTitle>
              <AlertDescription className="space-y-2">
                <div>
                  <h4 className="font-semibold">Investment Recommendation:</h4>
                  <p>{assessmentResult.investmentRecommendation}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Potential Return:</h4>
                  <p>{assessmentResult.potentialReturn}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Key Risk Factors:</h4>
                  <ul className="list-disc list-inside pl-2">
                    {assessmentResult.riskFactors.map((factor, index) => (
                      <li key={index}>{factor}</li>
                    ))}
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {assessmentResult && (
            <Button type="button" variant="outline" onClick={() => setAssessmentResult(undefined)} disabled={isPending}>
              Re-assess
            </Button>
          )}
          {!assessmentResult && (
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Assess Risk
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
