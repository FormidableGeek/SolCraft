
'use client';

import { useState, useEffect } from 'react';
import { KeyMetricsCard } from "@/components/dashboard/figma/key-metrics-card";
import { MyBalanceCard } from "@/components/dashboard/figma/my-balance-card";
import { RecentActivityTable } from "@/components/dashboard/figma/recent-activity-table";
import { FigmaPortfolioPerformanceChart } from "@/components/dashboard/figma/figma-portfolio-performance-chart";
import { mockTournaments, mockRecentActivity, mockFigmaPortfolioPerformance, mockKeyMetrics as defaultMockKeyMetrics } from "@/lib/mock-data";
import { TournamentCard } from "@/components/tournaments/tournament-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import type { UserProfile, Investment, KeyMetric, Tournament } from '@/lib/types';
import { Loader2, Activity, Award, TrendingUp, Crown } from 'lucide-react'; // Import icons for key metrics

export default function DashboardPage() {
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userInvestments, setUserInvestments] = useState<Investment[]>([]);
  const [dynamicKeyMetrics, setDynamicKeyMetrics] = useState<KeyMetric[]>(defaultMockKeyMetrics);
  const [isLoading, setIsLoading] = useState(true);

  const featuredTournaments = mockTournaments.filter(t => t.status === 'Upcoming' || t.status === 'Live').slice(0, 3);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setAuthUser(currentUser);
        try {
          // Fetch User Profile
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const profileData = userDocSnap.data() as UserProfile;
            setUserProfile(profileData);

            // Simulate fetching user investments (replace with actual Firestore query later)
            // For now, we filter mockInvestments by mockUserProfile.id for demonstration.
            // In a real app, you'd query the 'investments' collection where investorId === currentUser.uid
            const simulatedInvestments = mockInvestments.filter(
              (inv) => inv.investorId === profileData.uid // Assuming mockUserProfile.id is the logged-in user for mock data
            );
            setUserInvestments(simulatedInvestments);
            
            // Calculate dynamic key metrics
            const activeInvestmentsCount = simulatedInvestments.filter(inv => inv.status === 'Active').length;
            
            const newKeyMetrics: KeyMetric[] = [
              { 
                id: 'active-investments', 
                label: 'Active Investments:', 
                value: activeInvestmentsCount.toString(), 
                icon: Activity 
              },
              { 
                id: 'total-invested', 
                label: 'Total Invested:', 
                value: `$${(profileData.totalInvested ?? 0).toLocaleString()}`, 
                icon: Award // Changed from DollarSign to Award as per mockKeyMetrics change
              },
              { 
                id: 'lifetime-roi', 
                label: 'Lifetime ROI:', 
                value: `${(profileData.overallReturn ?? 0).toFixed(1)}%`, 
                icon: TrendingUp, 
                valueClassName: (profileData.overallReturn ?? 0) >= 0 ? "text-green-500" : "text-red-500" 
              },
              { 
                id: 'current-tier', 
                label: 'Current Tier:', 
                value: profileData.currentInvestmentTierName || "N/A", 
                icon: Crown 
              },
            ];
            setDynamicKeyMetrics(newKeyMetrics);

          } else {
            setUserProfile(null); // Or handle profile not found case
            setDynamicKeyMetrics(defaultMockKeyMetrics); // Fallback to default
          }
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
          setUserProfile(null);
          setDynamicKeyMetrics(defaultMockKeyMetrics); // Fallback
        }
      } else {
        setAuthUser(null);
        setUserProfile(null);
        setUserInvestments([]);
        setDynamicKeyMetrics(defaultMockKeyMetrics); // Fallback
      }
      setIsLoading(false);
    });

    return () => unsubscribeAuth();
  }, []); // Empty dependency array, runs once on mount

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading dashboard...</p>
      </div>
    );
  }
  
  // If user is logged out or profile couldn't be loaded, you might want to show a message or redirect.
  // For now, it will attempt to render with default/empty data if profile is null.

  return (
    <div className="space-y-6">
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MyBalanceCard className="lg:col-span-1" />
        <KeyMetricsCard metrics={dynamicKeyMetrics} className="lg:col-span-2" />
      </div>

      {/* Featured Tournaments Section */}
      {featuredTournaments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-xl">Featured Tournaments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTournaments.map(tournament => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bottom Row: Recent Activity and Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentActivityTable activities={mockRecentActivity} className="lg:col-span-2" />
        <FigmaPortfolioPerformanceChart data={mockFigmaPortfolioPerformance} className="lg:col-span-1" />
      </div>
    </div>
  );
}
