import type { Tournament, InvestmentTier, UserProfile, Investment, PortfolioData, SocialPlayer, PortfolioAllocationItem, KeyMetric, Cryptocurrency, RecentActivity } from './types';
import { ShieldAlert, ShieldCheck, Shield, DollarSign, TrendingUp, CalendarDays, Users, BarChart, LineChart, PieChart, ListChecks, Fuel, Timer, Wifi, Copy, ExternalLink, CircleDollarSign, Bitcoin } from 'lucide-react';

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

// Mock data for the new dashboard UI
export const mockPortfolioAllocation: PortfolioAllocationItem[] = [
  { name: 'Bitcoin', value: 40, color: 'hsl(var(--chart-1))' }, // Purple-blue
  { name: 'Tether', value: 20, color: 'hsl(var(--chart-2))' }, // Teal/Green
  { name: 'Ethereum', value: 25, color: 'hsl(var(--chart-3))' }, // Lighter Purple
  { name: 'Cardano', value: 10, color: 'hsl(var(--chart-4))' }, // Muted Blue
  { name: 'Doge', value: 5, color: 'hsl(var(--chart-5))' }, // Muted Teal
];

export const mockKeyMetrics: KeyMetric[] = [
  { id: '1', label: 'Staking APY:', value: '14.2%', icon: ListChecks, valueClassName: 'bg-primary/70 text-primary-foreground px-2 py-0.5 rounded' },
  { id: '2', label: 'Gas Saved:', value: '$128.4', icon: Fuel, valueClassName: 'bg-primary/70 text-primary-foreground px-2 py-0.5 rounded' },
  { id: '3', label: 'Bundle Status:', value: '2m 34s left', icon: Timer, valueClassName: 'bg-primary/70 text-primary-foreground px-2 py-0.5 rounded' },
  { id: '4', label: 'Network:', value: 'Solana Mainnet', icon: Wifi },
];

export const mockBalance = {
  amount: 1000000,
  currency: 'USD',
  walletAddress: 'sol...4x2z', // Example, keep it short
};

export const mockTopCryptocurrencies: Cryptocurrency[] = [
  { id: 'btc', rank: 1, name: 'Bitcoin', ticker: 'BTC', iconUrl: 'https://placehold.co/24x24/orange/white?text=B', price: 30344, change24h: -5.0, volume24h: 34040000, marketCap: 334940000000 },
  { id: 'eth', rank: 2, name: 'Ethereum', ticker: 'ETH', iconUrl: 'https://placehold.co/24x24/grey/white?text=E', price: 1850, change24h: -3.2, volume24h: 15000000, marketCap: 220000000000 },
  { id: 'sol', rank: 3, name: 'Solana', ticker: 'SOL', iconUrl: 'https://placehold.co/24x24/purple/white?text=S', price: 22.50, change24h: -1.5, volume24h: 50000000, marketCap: 9000000000 },
  { id: 'ada', rank: 4, name: 'Cardano', ticker: 'ADA', iconUrl: 'https://placehold.co/24x24/blue/white?text=A', price: 0.28, change24h: -2.1, volume24h: 20000000, marketCap: 10000000000 },
  { id: 'doge', rank: 5, name: 'Dogecoin', ticker: 'DOGE', iconUrl: 'https://placehold.co/24x24/yellow/black?text=D', price: 0.065, change24h: 0.5, volume24h: 100000000, marketCap: 9000000000 },
  { id: 'usdt', rank: 6, name: 'Tether', ticker: 'USDT', iconUrl: 'https://placehold.co/24x24/green/white?text=T', price: 1.00, change24h: 0.0, volume24h: 45000000000, marketCap: 80000000000 },
];

export const mockRecentActivity: RecentActivity[] = [
  { id: 'act1', type: 'Swap', date: '05.23.2023', time: '21:22', tokenAmount: '0.453 BTC', status: 'Completed', viewLink: '#' },
  { id: 'act2', type: 'Deposit', date: '05.23.2023', time: '21:22', tokenAmount: '1.2 ETH', status: 'In Progress', viewLink: '#' },
  { id: 'act3', type: 'Withdrawal', date: '05.22.2023', time: '10:05', tokenAmount: '1000 USDT', status: 'Failed', viewLink: '#' },
  { id: 'act4', type: 'Investment', date: '05.21.2023', time: '15:30', tokenAmount: 'Solana Summer Showdown', status: 'Completed', viewLink: '#' },
  { id: 'act5', type: 'Payout', date: '05.20.2023', time: '09:00', tokenAmount: '$250.00', status: 'Completed', viewLink: '#' },
];

// Data for the portfolio performance chart (green bars/area)
export const mockFigmaPortfolioPerformance = [
  { name: 'Day 1', value: 300 },
  { name: 'Day 2', value: 450 },
  { name: 'Day 3', value: 280 },
  { name: 'Day 4', value: 600 },
  { name: 'Day 5', value: 400 },
  { name: 'Day 6', value: 750 },
  { name: 'Day 7', value: 500 },
];
