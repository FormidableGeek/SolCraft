
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "lucide-react";

export default function StakingPage() {
  return (
    <>
      <PageHeader
        title="Staking"
        description="Earn rewards by staking your tokens. This feature is currently under development."
      />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Staking Pools</CardTitle>
          <CardDescription>
            Put your crypto to work and earn passive income.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64 text-muted-foreground">
          <Database className="w-16 h-16 mb-4" />
          <p className="text-lg">Staking page coming soon!</p>
        </CardContent>
      </Card>
    </>
  );
}
