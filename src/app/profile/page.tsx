
// @ts-nocheck
'use client';

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { mockInvestments, mockUserProfile } from "@/lib/mock-data"; // Keep mockUserProfile for fallback/structure
import { InvestmentHistoryCard } from "@/components/dashboard/investment-history-card";
import { Edit3, Mail, CalendarDays, DollarSign, TrendingUp, Wallet, CheckCircle, Copy, Loader2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ConnectWalletDialog } from "@/components/shared/connect-wallet-dialog";
import type { UserProfile } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnectWalletOpen, setIsConnectWalletOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setAuthUser(currentUser);
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserProfile(userDocSnap.data() as UserProfile);
          } else {
            // If no profile exists, create a basic one (e.g., if user signed up via a different method)
            // Or use parts of mockUserProfile as a template for missing fields.
            // For now, we'll set a minimal profile and let user edit.
            const username = currentUser.email?.split('@')[0] || 'new_user';
            const basicProfile: UserProfile = {
              ...mockUserProfile, // Spread to get structure and default stats
              uid: currentUser.uid,
              email: currentUser.email || '',
              username: username,
              name: currentUser.displayName || username,
              joinedDate: currentUser.metadata.creationTime || new Date().toISOString(),
              avatarUrl: currentUser.photoURL || mockUserProfile.avatarUrl,
              // Reset stats for a new/empty profile unless specifically fetched
              followersCount: 0,
              followingCount: 0,
              totalInvested: 0,
              overallReturn: 0,
              ranking: undefined,
            };
            // Optionally save this basic profile back to Firestore
            // await setDoc(userDocRef, basicProfile); 
            setUserProfile(basicProfile);
            toast({ title: "Profile Incomplete", description: "Please complete your profile information."});
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          toast({ title: "Error", description: "Could not load user profile.", variant: "destructive" });
          setUserProfile(mockUserProfile); // Fallback to mock on error
        }
      } else {
        setAuthUser(null);
        setUserProfile(null);
        router.push('/login'); // Redirect to login if not authenticated
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [router, toast]);

  const handleConnectWallet = async (selectedWalletName: string) => {
    if (!authUser || !userProfile) return;
    // Simulate wallet connection
    const newWalletAddress = `0xConnected...${selectedWalletName.substring(0,3)}`; // Placeholder
    
    setUserProfile(prevUser => ({
      ...(prevUser || mockUserProfile), // Ensure prevUser is not null
      isWalletConnected: true,
      walletAddress: newWalletAddress
    }));

    try {
      await setDoc(doc(db, "users", authUser.uid), { walletAddress: newWalletAddress, isWalletConnected: true }, { merge: true });
      toast({
          title: "Wallet Connected",
          description: `${selectedWalletName} has been successfully connected and saved.`,
      });
    } catch (error) {
        console.error("Error saving wallet address to Firestore:", error);
        toast({ title: "Connection Saved Locally", description: "Could not save wallet connection to cloud.", variant: "destructive"});
    }
    setIsConnectWalletOpen(false);
  };

  const handleDisconnectWallet = async () => {
    if (!authUser || !userProfile) return;
    setUserProfile(prevUser => ({
        ...(prevUser || mockUserProfile),
        isWalletConnected: false,
        walletAddress: mockUserProfile.walletAddress // Reset to placeholder or clear
    }));
    try {
        await setDoc(doc(db, "users", authUser.uid), { walletAddress: mockUserProfile.walletAddress, isWalletConnected: false }, { merge: true });
        toast({ title: "Wallet Disconnected", description: "Wallet has been disconnected and saved.", variant: "default"});
    } catch (error) {
        console.error("Error saving wallet disconnection to Firestore:", error);
        toast({ title: "Disconnected Locally", description: "Could not save wallet disconnection to cloud.", variant: "destructive"});
    }
  }

  const handleCopyAddress = () => {
    if (userProfile?.walletAddress) {
      navigator.clipboard.writeText(userProfile.walletAddress)
        .then(() => {
          toast({ title: "Wallet Address Copied!", description: userProfile.walletAddress });
        })
        .catch(err => {
          toast({ title: "Failed to copy", description: "Could not copy address to clipboard.", variant: "destructive" });
        });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!userProfile) {
    // This case should ideally be handled by the auth redirect or a more specific "profile not found" UI
    return (
         <div className="flex justify-center items-center h-screen">
            <p className="text-lg text-muted-foreground">User profile not available. You might be logged out.</p>
         </div>
    );
  }

  // Fallback for potentially undefined fields from Firestore
  const profileName = userProfile.name || userProfile.username || "User";
  const profileUsername = userProfile.username || "username";
  const profileAvatarUrl = userProfile.avatarUrl || mockUserProfile.avatarUrl; // Fallback to placeholder image
  const profileBio = userProfile.bio || "No bio available.";
  const profileJoinedDate = userProfile.joinedDate ? format(parseISO(userProfile.joinedDate), "MMMM d, yyyy") : "N/A";
  const profileEmail = userProfile.email || "No email available";


  return (
    <>
      <PageHeader
        title="My Profile"
        description="Manage your account details and view your investment portfolio."
      >
        <Button variant="outline">
          <Edit3 className="mr-2 h-4 w-4" /> Edit Profile (Coming Soon)
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 mb-4 border-4 border-primary">
                <AvatarImage src={profileAvatarUrl} alt={profileName} data-ai-hint="profile picture" />
                <AvatarFallback>{profileName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline text-2xl">{profileName}</CardTitle>
              <CardDescription>@{profileUsername}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              {userProfile.bio && <p className="text-muted-foreground text-center italic">{profileBio}</p>}
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{profileEmail}</span>
              </div>
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Joined: {profileJoinedDate}</span>
              </div>

              {userProfile.isWalletConnected && userProfile.walletAddress ? (
                <div className="pt-2">
                    <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-md text-center">
                        <div className="flex items-center justify-center mb-1">
                            <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                            <span className="font-semibold text-green-500">Wallet Connected</span>
                        </div>
                        <div className="flex items-center justify-center text-xs text-muted-foreground">
                            <span>{userProfile.walletAddress.length > 20 ? `${userProfile.walletAddress.substring(0,10)}...${userProfile.walletAddress.slice(-10)}` : userProfile.walletAddress}</span>
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
                <span className="font-semibold">{(userProfile.followersCount || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Following:</span>
                <span className="font-semibold">{(userProfile.followingCount || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Invested:</span>
                <span className="font-semibold">${(userProfile.totalInvested || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Overall Return:</span>
                <span className={`font-semibold ${(userProfile.overallReturn || 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {(userProfile.overallReturn || 0).toFixed(2)}%
                </span>
              </div>
              {userProfile.ranking && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Global Rank:</span>
                  <span className="font-semibold">#{userProfile.ranking}</span>
                </div>
              )}
               {!userProfile.ranking && (userProfile.followersCount === 0 && userProfile.totalInvested === 0) && (
                <p className="text-xs text-muted-foreground text-center pt-2">Stats will update as you engage with the platform.</p>
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
