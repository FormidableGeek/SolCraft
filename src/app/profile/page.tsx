// @ts-nocheck
'use client';

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { mockUserProfile as initialMockUserProfile, mockInvestments } from "@/lib/mock-data";
import { InvestmentHistoryCard } from "@/components/dashboard/investment-history-card";
import { Edit3, Mail, CalendarDays, DollarSign, TrendingUp, Wallet, CheckCircle, Copy } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ConnectWalletDialog } from "@/components/shared/connect-wallet-dialog";
import type { UserProfile } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";


export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>(initialMockUserProfile);
  const [isConnectWalletOpen, setIsConnectWalletOpen] = useState(false);
  const { toast } = useToast();

  const handleConnectWallet = (selectedWalletName: string) => {
    // Simulate wallet connection
    setUser(prevUser => ({
      ...prevUser,
      isWalletConnected: true,
      // For now, use a generic address. In a real app, this would come from the wallet.
      walletAddress: prevUser.walletAddress || `0x123...abc (Connected via ${selectedWalletName})`
    }));
    setIsConnectWalletOpen(false);
    toast({
        title: "Wallet Connected",
        description: `${selectedWalletName} has been successfully connected.`,
    });
  };

  const handleDisconnectWallet = () => {
    setUser(prevUser => ({
        ...prevUser,
        isWalletConnected: false,
        walletAddress: initialMockUserProfile.walletAddress // Reset to placeholder or clear
    }));
    toast({
        title: "Wallet Disconnected",
        variant: "default"
    });
  }

  const handleCopyAddress = () => {
    if (user.walletAddress) {
      navigator.clipboard.writeText(user.walletAddress)
        .then(() => {
          toast({ title: "Wallet Address Copied!", description: user.walletAddress });
        })
        .catch(err => {
          toast({ title: "Failed to copy", description: "Could not copy address to clipboard.", variant: "destructive" });
        });
    }
  };

  return (
    <>
      <PageHeader
        title="My Profile"
        description="Manage your account details and view your investment portfolio."
      >
        <Button variant="outline">
          <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 mb-4 border-4 border-primary">
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="profile picture" />
                <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline text-2xl">{user.name}</CardTitle>
              <CardDescription>@{user.username}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              {user.bio && <p className="text-muted-foreground text-center italic">{user.bio}</p>}
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{user.username.toLowerCase()}@example.com</span> {/* Placeholder email */}
              </div>
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Joined: {format(parseISO(user.joinedDate), "MMMM d, yyyy")}</span>
              </div>

              {user.isWalletConnected && user.walletAddress ? (
                <div className="pt-2">
                    <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-md text-center">
                        <div className="flex items-center justify-center mb-1">
                            <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                            <span className="font-semibold text-green-500">Wallet Connected</span>
                        </div>
                        <div className="flex items-center justify-center text-xs text-muted-foreground">
                            <span>{user.walletAddress.length > 20 ? `${user.walletAddress.substring(0,10)}...${user.walletAddress.slice(-10)}` : user.walletAddress}</span>
                            <Button variant="ghost" size="icon" className="ml-1 h-6 w-6" onClick={handleCopyAddress}>
                                <Copy className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                    <Button className="w-full mt-2" variant="outline" onClick={handleDisconnectWallet}>
                        Disconnect Wallet
                    </Button>
                </div>
              ) : (
                <>
                    <Button className="w-full mt-4" variant="default" onClick={() => setIsConnectWalletOpen(true)}>
                        <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2">Wallet not connected. Connect to manage funds and sign transactions.</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Followers:</span>
                <span className="font-semibold">{user.followersCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Following:</span>
                <span className="font-semibold">{user.followingCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Invested:</span>
                <span className="font-semibold">${user.totalInvested.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Overall Return:</span>
                <span className={`font-semibold ${user.overallReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {user.overallReturn.toFixed(2)}%
                </span>
              </div>
              {user.ranking && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Global Rank:</span>
                  <span className="font-semibold">#{user.ranking}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <InvestmentHistoryCard investments={mockInvestments} limit={10} />
           {/* Could add more cards here: e.g., Achievements, Watchlist, Settings */}
        </div>
      </div>
      <ConnectWalletDialog
        open={isConnectWalletOpen}
        onOpenChange={setIsConnectWalletOpen}
        onConnect={handleConnectWallet}
      />
    </>
  );
}
