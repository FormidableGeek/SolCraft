
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightLeft } from "lucide-react";

export default function DepositSendPage() {
  return (
    <>
      <PageHeader
        title="Deposit & Send"
        description="Manage your funds by depositing and sending assets. This feature is currently under development."
      />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Deposit & Send Funds</CardTitle>
          <CardDescription>
            Secure and easy ways to manage your crypto assets are planned here!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64 text-muted-foreground">
          <ArrowRightLeft className="w-16 h-16 mb-4" />
          <p className="text-lg">Deposit & Send page coming soon!</p>
        </CardContent>
      </Card>
    </>
  );
}
