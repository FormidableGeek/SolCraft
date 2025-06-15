import type { Tournament, InvestmentTier, UserProfile, Investment, PortfolioData, SocialPlayer } from './types';
import { ShieldAlert, ShieldCheck, Shield, DollarSign, TrendingUp, CalendarDays, Users, BarChart, LineChart, PieChart } from 'lucide-react';

export const mockTournaments: Tournament[] = [
  {
    id: '1',
    name: 'Solana Summer Showdown',
    buyIn: 100,
    guaranteedPrizePool: 10000,
    startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    status: 'Upcoming',
    participants: { current: 50, max: 200 },
    imageUrl: 'https://placehold.co/600x400.png',
    description: 'Join the biggest Texas Hold\'em tournament on Solana this summer! Big prizes and even bigger glory.',
    platform: 'Solana Poker Club',
    averagePlayers: 150,
    historicalData: 'Previous similar tournaments had an average ROI of 25% for top 10% players. Payout structure is typically top 15% get paid.',
  },
  {
    id: '2',
    name: 'Crypto Poker Masters',
    buyIn: 500,
    guaranteedPrizePool: 50000,
    startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
    status: 'Upcoming',
    participants: { current: 20, max: 100 },
    imageUrl: 'https://placehold.co/600x400.png',
    description: 'High stakes, high rewards. Only for the serious poker players in the crypto space.',
    platform: 'Decentralized Poker Arena',
    averagePlayers: 80,
    historicalData: 'This is a new high-roller tournament. Similar buy-in events show high variance but potential for large payouts.',
  },
  {
    id: '3',
    name: 'Weekly Wednesday Freeroll',
    buyIn: 0,
    guaranteedPrizePool: 1000,
    startTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    status: 'Finished',
    participants: { current: 300 },
    imageUrl: 'https://placehold.co/600x400.png',
    description: 'Our popular weekly freeroll. Great for practice and winning some starting capital.',
    platform: 'Community Poker Platform',
    averagePlayers: 250,
    historicalData: 'Freerolls attract a wide range of skill levels. Payouts are small but frequent for top finishers.',
  },
  {
    id: '4',
    name: 'Nightly Turbo Challenge',
    buyIn: 50,
    guaranteedPrizePool: 2000,
    startTime: new Date().toISOString(), // Happening now-ish
    status: 'Live',
    participants: { current: 80, max: 150 },
    imageUrl: 'https://placehold.co/600x400.png',
    description: 'Fast-paced turbo tournament. Quick games, quick wins!',
    platform: 'Speed Poker Online',
    averagePlayers: 100,
    historicalData: 'Turbo structures favor aggressive play. Player skill variance can be high.',
  },
];

export const mockInvestmentTiers: InvestmentTier[] = [
  {
    id: 'tier1',
    name: 'Bronze Stake',
    minInvestment: 10,
    maxInvestment: 50,
    potentialReturn: 'Est. 1.2x - 1.8x',
    riskLevel: 'Low',
    description: 'A small stake for newer investors. Lower risk, modest returns.',
    benefits: ['Smallest capital requirement', 'Good for learning the ropes'],
  },
  {
    id: 'tier2',
    name: 'Silver Share',
    minInvestment: 50,
    maxInvestment: 200,
    potentialReturn: 'Est. 1.5x - 2.5x',
    riskLevel: 'Medium',
    description: 'A balanced option for those looking for better returns with manageable risk.',
    benefits: ['Access to more promising tournaments', 'Higher potential upside'],
  },
  {
    id: 'tier3',
    name: 'Gold Backing',
    minInvestment: 200,
    potentialReturn: 'Est. 2x - 5x',
    riskLevel: 'High',
    description: 'For seasoned investors aiming for significant returns, accepting higher risk.',
    benefits: ['Highest potential returns', 'Exclusive tournament access', 'Priority support'],
  },
];

export const mockUserProfile: UserProfile = {
  id: 'user123',
  name: 'Satoshi Stakeoshi',
  username: 'Stakeoshi',
  avatarUrl: 'https://placehold.co/100x100.png',
  bio: 'Poker enthusiast & Solana believer. Investing in the future of cards.',
  joinedDate: new Date('2023-01-15').toISOString(),
  followersCount: 1250,
  followingCount: 300,
  totalInvested: 15000,
  overallReturn: 25.5, // percentage
  ranking: 42,
};

export const mockInvestments: Investment[] = [
  {
    id: 'inv1',
    tournamentId: '1',
    tournamentName: 'Solana Summer Showdown',
    tierName: 'Silver Share',
    amountInvested: 100,
    investmentDate: new Date('2024-07-10').toISOString(),
    status: 'Active',
    currentValue: 115,
  },
  {
    id: 'inv2',
    tournamentId: '3',
    tournamentName: 'Weekly Wednesday Freeroll',
    amountInvested: 0, // Freeroll might not be an investment in this context, or represent a "play"
    investmentDate: new Date('2024-07-15').toISOString(),
    status: 'Cashed Out',
    returnOnInvestment: 20, // Absolute gain
  },
  {
    id: 'inv3',
    tournamentName: 'Old Crypto Challenge',
    tournamentId: 'old_tourney_123',
    tierName: 'Gold Backing',
    amountInvested: 500,
    investmentDate: new Date('2024-06-01').toISOString(),
    status: 'Lost',
    returnOnInvestment: -500,
  },
];

export const mockPortfolioData: PortfolioData = {
  totalValue: 18500,
  totalInvested: 15000,
  overallReturn: 23.33, // (18500 - 15000) / 15000 * 100
  bestPerformingInvestment: mockInvestments[0],
  worstPerformingInvestment: mockInvestments[2],
};


export const mockSocialPlayers: SocialPlayer[] = [
  {
    id: 'player1',
    name: 'Ace High',
    username: 'AceHighRoller',
    avatarUrl: 'https://placehold.co/80x80.png',
    bio: 'Living life one hand at a time.',
    joinedDate: new Date('2022-05-20').toISOString(),
    followersCount: 5200,
    followingCount: 150,
    totalInvested: 150000,
    overallReturn: 45.2,
    ranking: 1,
    recentPerformance: 'Won the Monthly Major ($50k prize)',
    isFollowed: true,
  },
  {
    id: 'player2',
    name: 'Bluff Queen',
    username: 'TheBluffQueen',
    avatarUrl: 'https://placehold.co/80x80.png',
    bio: 'They never see it coming.',
    joinedDate: new Date('2023-08-10').toISOString(),
    followersCount: 3100,
    followingCount: 80,
    totalInvested: 75000,
    overallReturn: 30.8,
    ranking: 5,
    recentPerformance: 'Final tabled 3 events this month',
    isFollowed: false,
  },
  {
    id: 'player3',
    name: 'Grind Master',
    username: 'SteadyGrinder',
    avatarUrl: 'https://placehold.co/80x80.png',
    bio: 'Slow and steady wins the race.',
    joinedDate: new Date('2021-11-01').toISOString(),
    followersCount: 2000,
    followingCount: 500,
    totalInvested: 50000,
    overallReturn: 15.5,
    ranking: 12,
    recentPerformance: 'Consistently in the money',
    isFollowed: true,
  },
];

export const portfolioPerformanceData = [
  { date: 'Jan', value: 10000 },
  { date: 'Feb', value: 10500 },
  { date: 'Mar', value: 11500 },
  { date: 'Apr', value: 11000 },
  { date: 'May', value: 12500 },
  { date: 'Jun', value: 13000 },
  { date: 'Jul', value: 15000 },
];

export const assetAllocationData = [
  { asset: 'Tournament Stakes', value: 60, fill: 'var(--color-chart-1)' },
  { asset: 'Player Backing', value: 30, fill: 'var(--color-chart-2)' },
  { asset: 'Liquid SOL', value: 10, fill: 'var(--color-chart-3)' },
];

export const riskLevelIconMap = {
  Low: ShieldCheck,
  Medium: Shield,
  High: ShieldAlert,
};

export const riskLevelColorMap = {
  Low: 'text-green-500',
  Medium: 'text-yellow-500',
  High: 'text-red-500',
};

export const pageSpinnerStyle = "h-8 w-8 animate-spin text-primary";
