
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";


interface MyBalanceCardProps {
  balance: {
    amount: number;
    currency: string;
    walletAddress: string;
  };
  className?: string;
}

export function MyBalanceCard({ balance, className }: MyBalanceCardProps) {
  const { toast } = useToast();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(balance.walletAddress)
      .then(() => {
        toast({ title: "Wallet Address Copied!", description: balance.walletAddress });
      })
      .catch(err => {
        toast({ title: "Failed to copy", description: "Could not copy address to clipboard.", variant: "destructive" });
      });
  };

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="text-sm font-medium uppercase text-muted-foreground">My Balance</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-4xl font-bold text-foreground mb-2">
          ${balance.amount.toLocaleString()}
        </p>
        <div className="flex items-center justify-center text-xs text-muted-foreground">
          <span>Wallet Address: {balance.walletAddress}</span>
          <Button variant="ghost" size="icon" className="ml-1 h-6 w-6" onClick={handleCopyAddress}>
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
