import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { mockUserProfile, mockInvestments } from "@/lib/mock-data";
import { InvestmentHistoryCard } from "@/components/dashboard/investment-history-card";
import { Edit3, Mail, CalendarDays, DollarSign, TrendingUp, Wallet } from "lucide-react";
import { format, parseISO } from "date-fns";

export default function ProfilePage() {
  const user = mockUserProfile;

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
              <Button className="w-full mt-4" variant="default">
                <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
              </Button>
               <p className="text-xs text-muted-foreground text-center mt-2">Wallet not connected. Connect to manage funds and sign transactions.</p>
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
    </>
  );
}
