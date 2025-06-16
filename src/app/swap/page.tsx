
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Replace } from "lucide-react";

export default function SwapPage() {
  return (
    <>
      <PageHeader
        title="Swap Tokens"
        description="Exchange your cryptocurrencies seamlessly. This feature is currently under development."
      />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Token Swap</CardTitle>
          <CardDescription>
            Exciting token swapping capabilities are planned for this section!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64 text-muted-foreground">
          <Replace className="w-16 h-16 mb-4" />
          <p className="text-lg">Swap page coming soon!</p>
        </CardContent>
      </Card>
    </>
  );
}
