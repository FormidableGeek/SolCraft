
import type { Tournament, InvestmentTier, UserProfile, Investment, PortfolioData, SocialPlayer, PortfolioAllocationItem, KeyMetric, Cryptocurrency, RecentActivity, RoadmapItemProps, TournamentTokenizationDetails } from './types';
import { ShieldAlert, ShieldCheck, Shield, ListChecks, Fuel, Timer, Wifi, Award, Star, Zap, Gem, Crown, TrendingUp as TierTrendingUp, Activity } from 'lucide-react'; // Added Crown, TierTrendingUp, Activity

const defaultTokenPrice = 1; // Assuming $1 per token for easy calculation

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
    tokenizationDetails: {
      isTokenized: true,
      tokenTicker: 'SSS',
      tokenPrice: defaultTokenPrice,
      totalTokenSupply: 100 / defaultTokenPrice, // 100 tokens
      minInvestmentTokens: 10, // $10
      maxInvestmentTokens: 100 / defaultTokenPrice, // $100 (full backing)
    },
    isCompleted: false,
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
    tokenizationDetails: {
      isTokenized: true,
      tokenTicker: 'CPM',
      tokenPrice: defaultTokenPrice,
      totalTokenSupply: 500 / defaultTokenPrice,
      minInvestmentTokens: 50 / defaultTokenPrice,
      maxInvestmentTokens: 500 / defaultTokenPrice,
    },
    isCompleted: false,
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
    isCompleted: true,
    prizeWon: 1000,
    // No tokenization for freeroll
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
    tokenizationDetails: {
      isTokenized: false,
      tokenTicker: 'NTC',
      tokenPrice: defaultTokenPrice,
      totalTokenSupply: 0,
      minInvestmentTokens: 0,
      maxInvestmentTokens: 0,
    },
    isCompleted: false,
  },
];

const TOKEN_PRICE_FOR_MOCK_TIERS = 1;

export const mockInvestmentTiers: InvestmentTier[] = [
  {
    id: 'tierBronze',
    name: 'Bronze Access',
    minInvestmentCurrency: 10,
    maxInvestmentCurrency: 250,
    minInvestmentTokens: 10 / TOKEN_PRICE_FOR_MOCK_TIERS,
    maxInvestmentTokens: 250 / TOKEN_PRICE_FOR_MOCK_TIERS,
    platformFeePercentage: 5,
    priorityDescription: 'Basic access to available tournaments.',
    potentialReturn: 'Est. 1.1x - 1.5x',
    riskLevel: 'Low',
    description: 'Standard entry-level investment tier.',
    benefits: ['Lowest capital requirement', 'Good for exploring tournament investments'],
  },
  {
    id: 'tierSilver',
    name: 'Silver Access',
    minInvestmentCurrency: 100,
    maxInvestmentCurrency: 500,
    minInvestmentTokens: 100 / TOKEN_PRICE_FOR_MOCK_TIERS,
    maxInvestmentTokens: 500 / TOKEN_PRICE_FOR_MOCK_TIERS,
    platformFeePercentage: 4,
    priorityDescription: 'Standard access to a wider range of tournaments.',
    potentialReturn: 'Est. 1.3x - 2.0x',
    riskLevel: 'Medium',
    description: 'A balanced option for growing your portfolio.',
    benefits: ['Access to more diverse tournaments', 'Moderate return potential'],
  },
  {
    id: 'tierGold',
    name: 'Gold Access',
    minInvestmentCurrency: 250,
    maxInvestmentCurrency: 750,
    minInvestmentTokens: 250 / TOKEN_PRICE_FOR_MOCK_TIERS,
    maxInvestmentTokens: 750 / TOKEN_PRICE_FOR_MOCK_TIERS,
    platformFeePercentage: 3,
    priorityDescription: 'Early access to select tournaments.',
    potentialReturn: 'Est. 1.5x - 3.0x',
    riskLevel: 'Medium',
    description: 'Preferred access and better fee structure for serious investors.',
    benefits: ['Early notification for new tournaments', 'Improved fee rates', 'Higher investment caps'],
  },
  {
    id: 'tierPlatinum',
    name: 'Platinum Access',
    minInvestmentCurrency: 500,
    maxInvestmentCurrency: 1000,
    minInvestmentTokens: 500 / TOKEN_PRICE_FOR_MOCK_TIERS,
    maxInvestmentTokens: 1000 / TOKEN_PRICE_FOR_MOCK_TIERS,
    platformFeePercentage: 2,
    priorityDescription: 'First access to high-value tournaments.',
    potentialReturn: 'Est. 2.0x - 5x+',
    riskLevel: 'High',
    description: 'Exclusive tier for top investors seeking maximum returns and benefits.',
    benefits: ['Priority access to all tournaments', 'Lowest platform fees', 'Exclusive insights & support'],
  },
];


export const mockUserProfile: UserProfile = {
  id: 'user123',
  uid: 'user123',
  email: 'stakeoshi@example.com',
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
  isWalletConnected: true,
  walletAddress: 'sol...4x2z',
  balance: { amount: 12345.67, currency: 'USD' },
  currentInvestmentTierName: 'Gold Access',
};

export const mockInvestments: Investment[] = [
  {
    id: 'inv1',
    investorId: mockUserProfile.id,
    tournamentId: '1',
    tournamentName: 'Solana Summer Showdown',
    tierName: 'Silver Access',
    investmentValueUSD: 100,
    tokenAmount: 100, // Assuming $1/token
    investmentDate: new Date('2024-07-10').toISOString(),
    status: 'Active',
    currentValue: 115,
  },
  {
    id: 'inv2',
    investorId: mockUserProfile.id,
    tournamentId: '3',
    tournamentName: 'Weekly Wednesday Freeroll',
    tierName: 'Bronze Access',
    investmentValueUSD: 0,
    tokenAmount: 0,
    investmentDate: new Date('2024-07-15').toISOString(),
    status: 'Cashed Out',
    returnOnInvestment: 20,
  },
  {
    id: 'inv3',
    investorId: mockUserProfile.id,
    tournamentName: 'Old Crypto Challenge',
    tournamentId: 'old_tourney_123',
    tierName: 'Gold Access',
    investmentValueUSD: 500,
    tokenAmount: 500, // Assuming $1/token
    investmentDate: new Date('2024-06-01').toISOString(),
    status: 'Lost',
    returnOnInvestment: -500,
  },
];

export const mockPortfolioData: PortfolioData = {
  totalValue: 18500,
  totalInvested: 15000,
  overallReturn: 23.33,
  bestPerformingInvestment: mockInvestments[0],
  worstPerformingInvestment: mockInvestments[2],
};


export const mockSocialPlayers: SocialPlayer[] = [
  {
    id: 'player1',
    uid: 'player1',
    email: 'ace@example.com',
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
    balance: { amount: 250000, currency: 'USD' },
    currentInvestmentTierName: 'Platinum Access',
  },
  {
    id: 'player2',
    uid: 'player2',
    email: 'bluff@example.com',
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
    balance: { amount: 120000, currency: 'USD' },
    currentInvestmentTierName: 'Gold Access',
  },
  {
    id: 'player3',
    uid: 'player3',
    email: 'grinder@example.com',
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
    balance: { amount: 80000, currency: 'USD' },
    currentInvestmentTierName: 'Silver Access',
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

export const priorityIconMap = {
    "First access to high-value tournaments.": Gem, // Platinum
    "Early access to select tournaments.": Star, // Gold
    "Standard access to a wider range of tournaments.": Award, // Silver
    "Basic access to available tournaments.": Zap, // Bronze
};

export const pageSpinnerStyle = "h-8 w-8 animate-spin text-primary";

// Mock data for the new dashboard UI (Figma design)
export const mockPortfolioAllocation: PortfolioAllocationItem[] = [
  { name: 'Bitcoin', value: 40, color: 'hsl(var(--chart-1))' },
  { name: 'Tether', value: 20, color: 'hsl(var(--chart-2))' },
  { name: 'Ethereum', value: 25, color: 'hsl(var(--chart-3))' },
  { name: 'Cardano', value: 10, color: 'hsl(var(--chart-4))' },
  { name: 'Doge', value: 5, color: 'hsl(var(--chart-5))' },
];

const pillStyle = "bg-primary/70 text-primary-foreground px-2 py-0.5 rounded text-xs";

export const mockKeyMetrics: KeyMetric[] = [
  { id: '1', label: 'Staking APY:', value: '14.2%', icon: ListChecks, valueClassName: pillStyle },
  { id: '2', label: 'Gas Saved:', value: '$128.4', icon: Fuel, valueClassName: pillStyle },
  { id: '3', label: 'Bundle Status:', value: '2m 34s left', icon: Timer, valueClassName: pillStyle },
  { id: '4', label: 'Network:', value: 'Solana Mainnet', icon: Wifi },
];


export const mockTopCryptocurrencies: Cryptocurrency[] = [
  { id: 'btc', rank: 1, name: 'Bitcoin', ticker: 'BTC', iconUrl: 'https://placehold.co/24x24/orange/white?text=B', price: 60344, change24h: -5.0, volume24h: 34040000000, marketCap: 1184940000000 },
  { id: 'eth', rank: 2, name: 'Ethereum', ticker: 'ETH', iconUrl: 'https://placehold.co/24x24/grey/white?text=E', price: 3350, change24h: -3.2, volume24h: 15000000000, marketCap: 400000000000 },
  { id: 'sol', rank: 3, name: 'Solana', ticker: 'SOL', iconUrl: 'https://placehold.co/24x24/purple/white?text=S', price: 135.50, change24h: 2.5, volume24h: 2500000000, marketCap: 60000000000 },
  { id: 'usdt', rank: 4, name: 'Tether', ticker: 'USDT', iconUrl: 'https://placehold.co/24x24/green/white?text=T', price: 1.00, change24h: 0.0, volume24h: 45000000000, marketCap: 110000000000 },
  { id: 'ada', rank: 5, name: 'Cardano', ticker: 'ADA', iconUrl: 'https://placehold.co/24x24/blue/white?text=A', price: 0.38, change24h: -1.1, volume24h: 300000000, marketCap: 13000000000 },
  { id: 'doge', rank: 6, name: 'Dogecoin', ticker: 'DOGE', iconUrl: 'https://placehold.co/24x24/yellow/black?text=D', price: 0.125, change24h: 0.5, volume24h: 1000000000, marketCap: 18000000000 },
];

export const mockRecentActivity: RecentActivity[] = [
  { id: 'act1', type: 'Swap', date: '05.23.2023', time: '21:22', tokenAmount: '0.453 BTC', status: 'Completed', viewLink: '#' },
  { id: 'act2', type: 'Deposit', date: '05.23.2023', time: '21:22', tokenAmount: '1.2 ETH', status: 'In Progress', viewLink: '#' },
  { id: 'act3', type: 'Withdrawal', date: '05.22.2023', time: '10:05', tokenAmount: '1000 USDT', status: 'Failed', viewLink: '#' },
  { id: 'act4', type: 'Investment', date: '05.21.2023', time: '15:30', tokenAmount: 'Solana Summer Showdown', status: 'Completed', viewLink: '#' },
  { id: 'act5', type: 'Payout', date: '05.20.2023', time: '09:00', tokenAmount: '$250.00', status: 'Completed', viewLink: '#' },
];

export const mockFigmaPortfolioPerformance = [
  { name: 'Day 1', value: 300 },
  { name: 'Day 2', value: 450 },
  { name: 'Day 3', value: 280 },
  { name: 'Day 4', value: 600 },
  { name: 'Day 5', value: 400 },
  { name: 'Day 6', value: 750 },
  { name: 'Day 7', value: 500 },
  { name: 'Day 8', value: 550 },
  { name: 'Day 9', value: 620 },
  { name: 'Day 10', value: 480 },
  { name: 'Day 11', value: 700 },
  { name: 'Day 12', value: 650 },
  { name: 'Day 13', value: 800 },
  { name: 'Day 14', value: 720 },
  { name: 'Day 15', value: 600 },
  { name: 'Day 16', value: 680 },
  { name: 'Day 17', value: 750 },
  { name: 'Day 18', value: 820 },
  { name: 'Day 19', value: 780 },
  { name: 'Day 20', value: 850 },
  { name: 'Day 21', value: 900 },
  { name: 'Day 22', value: 800 },
  { name: 'Day 23', value: 880 },
  { name: 'Day 24', value: 920 },
  { name: 'Day 25', value: 850 },
  { name: 'Day 26', value: 950 },
  { name: 'Day 27', value: 1000 },
  { name: 'Day 28', value: 930 },
  { name: 'Day 29', value: 980 },
  { name: 'Day 30', value: 1050 },
];

export const roadmapItems: RoadmapItemProps[] = [
  { quarter: 'Q2', year: '2025', milestones: ["Token Development + Deployment", "Cross Chain Bridge Launch", "Community Building", "Presale Launch"] },
  { quarter: 'Q3', year: '2025', milestones: ["Strategic Partnerships", "Layer 2 Core Infrastructure Deployment", "Web3 Interface Release", "Developer Documentation", "Initial Liquidity"], isOffset: true },
  { quarter: 'Q4', year: '2025', milestones: ["Anti-Rug System Display", "Bundle Engine Testnet", "Lock Liquidity Module (V1)", "Swap Optimizer Launch", "Security Dashboard"] },
  { quarter: 'Q1', year: '2026', milestones: ["Advanced DEX Integration", "Launchpad Platform", "Governance Implementation", "Mobile Application Release", "Ecosystem Grants Program"], isOffset: true },
  { quarter: 'Q2', year: '2026', milestones: ["Layer 2 Scaling Solutions", "Cross-Chain Interoperability", "Advanced DeFi Primitives", "Enterprise Solutions", "DAO Transition"], isLast: true }
];
