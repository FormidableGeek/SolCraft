
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About SolCraft"
        description="Learn more about our mission and platform. This section is currently under development."
      />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">About Us</CardTitle>
          <CardDescription>
            Discover the story behind SolCraft and our vision for decentralized finance.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64 text-muted-foreground">
          <Info className="w-16 h-16 mb-4" />
          <p className="text-lg">About page coming soon!</p>
        </CardContent>
      </Card>
    </>
  );
}
