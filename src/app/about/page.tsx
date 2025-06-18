'use client'; // Add this directive

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image"; // Import next/image

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
        <CardContent className="flex flex-col items-center justify-center py-8 md:py-12">
          <Image
            src="https://placehold.co/300x300.png"
            alt="SolCraft Vision - Our Mission and Team"
            width={300}
            height={300}
            className="rounded-lg shadow-lg mb-6"
            data-ai-hint="blockchain professional"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/300x300.png'; (e.target as HTMLImageElement).alt = 'Placeholder SolCraft Vision';}}
          />
          <p className="text-lg text-muted-foreground">
            More details about our mission, team, and technology coming soon!
          </p>
        </CardContent>
      </Card>
    </>
  );
}
