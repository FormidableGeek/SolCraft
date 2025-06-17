import type { TournamentRiskAssessmentOutput } from '@/ai/flows/tournament-risk-assessment';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
}

export interface TournamentTokenizationDetails {
  isTokenized: boolean;
  tokenTicker: string; // e.g., "TRNT"
  tokenPrice: number; // e.g., 1 (representing $1 per token)
  totalTokenSupply: number; // Derived from buyInAmount / tokenPrice
  minInvestmentTokens: number;
  maxInvestmentTokens: number; // Could be equal to totalTokenSupply for full backing
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
  tokenizationDetails?: TournamentTokenizationDetails;
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
  uid: string; // Added from signup page logic
  email: string; // Added from signup page logic
  name: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
  joinedDate: string; // ISO string
  followersCount: number;
  followingCount: number;
  totalInvested: number;
  overallReturn: number; // percentage or absolute
  ranking?: number | null; // Allow null from signup
  isWalletConnected?: boolean;
  walletAddress?: string;
  balance?: {
    amount: number;
    currency: string;
  };
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

// Types for the new dashboard UI
export interface PortfolioAllocationItem {
  name: string;
  value: number;
  color: string; // hex or css var
}

export interface KeyMetric {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  valueClassName?: string;
}

export interface Cryptocurrency {
  id: string;
  rank: number;
  name: string;
  ticker: string;
  iconUrl?: string; // URL to a small icon
  price: number;
  change24h: number; // percentage
  volume24h: number;
  marketCap: number;
}

export interface RecentActivity {
  id: string;
  type: 'Swap' | 'Deposit' | 'Withdrawal' | 'Investment' | 'Payout';
  date: string; // "MM.DD.YYYY"
  time: string; // "HH:MM"
  tokenAmount: string; // e.g., "0.453 BTC"
  status: 'Completed' | 'In Progress' | 'Failed' | 'Pending';
  viewLink?: string; // URL for viewing details
}

export interface RoadmapItemProps {
  quarter: string;
  year: string;
  milestones: string[];
  isOffset?: boolean;
  isLast?: boolean;
}
