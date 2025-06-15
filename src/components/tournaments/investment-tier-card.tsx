import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { InvestmentTier } from "@/lib/types";
import { CheckCircle, TrendingUp, DollarSign } from "lucide-react";
import { riskLevelColorMap, riskLevelIconMap } from "@/lib/mock-data"; // Using mock for map

interface InvestmentTierCardProps {
  tier: InvestmentTier;
  onInvest: (tierId: string) => void; // Placeholder for invest action
}

export function InvestmentTierCard({ tier, onInvest }: InvestmentTierCardProps) {
  const RiskIcon = riskLevelIconMap[tier.riskLevel];

  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="font-headline text-lg">{tier.name}</CardTitle>
          <Badge variant="outline" className={`border-2 ${
              tier.riskLevel === 'Low' ? 'border-green-500 text-green-600' :
              tier.riskLevel === 'Medium' ? 'border-yellow-500 text-yellow-600' :
              'border-red-500 text-red-600'
            }`}>
            <RiskIcon className={`h-4 w-4 mr-1 ${riskLevelColorMap[tier.riskLevel]}`} />
            {tier.riskLevel} Risk
          </Badge>
        </div>
        <CardDescription>{tier.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center text-sm">
          <DollarSign className="h-4 w-4 mr-2 text-primary" />
          <span>
            Investment: ${tier.minInvestment.toLocaleString()}
            {tier.maxInvestment ? ` - $${tier.maxInvestment.toLocaleString()}` : '+'}
          </span>
        </div>
        <div className="flex items-center text-sm">
          <TrendingUp className="h-4 w-4 mr-2 text-primary" />
          <span>Potential Return: {tier.potentialReturn}</span>
        </div>
        {tier.benefits.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Benefits:</h4>
            <ul className="space-y-1">
              {tier.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-xs">
                  <CheckCircle className="h-3 w-3 mr-2 text-green-500 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onInvest(tier.id)} variant="default">
          Invest in {tier.name}
        </Button>
      </CardFooter>
    </Card>
  );
}
