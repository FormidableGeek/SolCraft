
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket } from "lucide-react";

export default function LaunchTokenPage() {
  return (
    <>
      <PageHeader
        title="Launchtoken"
        description="Discover and participate in new token launches. This feature is currently under development."
      />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Token Launchpad</CardTitle>
          <CardDescription>
            Get early access to promising new tokens on Solana!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64 text-muted-foreground">
          <Rocket className="w-16 h-16 mb-4" />
          <p className="text-lg">Launchtoken page coming soon!</p>
        </CardContent>
      </Card>
    </>
  );
}
