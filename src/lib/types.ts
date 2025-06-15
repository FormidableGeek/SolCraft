import type { TournamentRiskAssessmentOutput } from '@/ai/flows/tournament-risk-assessment';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
}

export interface Tournament {
  id: string;
  name: string;
  buyIn: number;
  guaranteedPrizePool: number;
  startTime: string; // ISO string
  status: 'Upcoming' | 'Live' | 'Finished';
  participants?: {
    current: number;
    max?: number;
  };
  imageUrl?: string;
  description?: string;
  platform?: string; // e.g., "PokerStars", "Online", "Live Event"
  averagePlayers?: number; // For AI input
  historicalData?: string; // For AI input, can be a longer text
  aiRiskAssessment?: TournamentRiskAssessmentOutput; // Store pre-computed or on-demand
}

export interface InvestmentTier {
  id: string;
  name: string; // e.g., Bronze Stake, Silver Share, Gold Backing
  minInvestment: number;
  maxInvestment?: number; // Optional, could be a fixed amount tier
  potentialReturn: string; // e.g., "Est. 1.5x - 3x", "Fixed 10% ROI"
  riskLevel: 'Low' | 'Medium' | 'High';
  description: string;
  benefits: string[];
}

export interface UserProfile {
  id:string;
  name: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
  joinedDate: string; // ISO string
  followersCount: number;
  followingCount: number;
  totalInvested: number;
  overallReturn: number; // percentage or absolute
  ranking?: number;
}

export interface Investment {
  id: string;
  tournamentId: string;
  tournamentName: string;
  tierName?: string;
  amountInvested: number;
  investmentDate: string; // ISO string
  status: 'Active' | 'Cashed Out' | 'Lost' | 'Pending';
  currentValue?: number;
  returnOnInvestment?: number; // Can be percentage or absolute
}

export interface PortfolioData {
  totalValue: number;
  totalInvested: number;
  overallReturn: number; // percentage
  bestPerformingInvestment?: Investment;
  worstPerformingInvestment?: Investment;
}

export interface SocialPlayer extends UserProfile {
  recentPerformance: string; // e.g. "Won 2 tournaments last month"
  isFollowed?: boolean;
}
