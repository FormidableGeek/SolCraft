
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, Network, ShieldCheck, ArrowRightLeft, Brain, Coins, Gauge, ListChecks, LockKeyhole, Rocket, Bot, Award, FileScan, PieChart, Users, GitFork } from 'lucide-react';

interface RoadmapItemProps {
  quarter: string;
  year: string;
  milestones: string[];
  isOffset?: boolean;
  isLast?: boolean;
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({ quarter, year, milestones, isOffset, isLast }) => {
  return (
    <div className={`relative flex items-start ${isOffset ? 'md:ml-[calc(50%+2rem)]' : 'md:mr-[calc(50%+2rem)]'} md:w-[calc(50%-2rem)] mb-12`}>
      {/* Connector lines and dots for md+ screens */}
      {!isLast && !isMobileTimelinePoint(quarter, year, roadmapItems) && ( // Prevent connector for last true item on mobile-like view
        <div className={`hidden md:block absolute top-5 ${isOffset ? 'right-full mr-4' : 'left-full ml-4'} w-16 h-px bg-purple-500/50`}></div>
      )}
      <div className={`hidden md:block absolute top-5 ${isOffset ? 'right-[calc(100%+0.5rem)]' : 'left-[calc(100%+0.5rem)]'} w-4 h-4 bg-purple-500 rounded-full border-2 border-black`}></div>
      
      <div className="bg-purple-600/10 backdrop-blur-sm p-6 rounded-lg shadow-xl w-full">
        <h4 className="text-xl font-semibold text-purple-400 mb-3">{quarter} {year}</h4>
        <ul className="space-y-2">
          {milestones.map((milestone, index) => (
            <li key={index} className="text-sm text-gray-300 flex items-start">
              <GitFork className="h-4 w-4 mr-2 mt-0.5 text-purple-400 shrink-0" />
              {milestone}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Helper to determine if a point is the last "true" item for mobile timeline rendering to avoid drawing extra lines
const isMobileTimelinePoint = (currentQuarter: string, currentYear: string, allItems: RoadmapItemProps[]): boolean => {
    const currentIndex = allItems.findIndex(item => item.quarter === currentQuarter && item.year === currentYear);
    // This function is a bit simplistic for complex mobile timeline rendering,
    // but for stopping the last line, it's okay.
    // A more robust solution would involve knowing the exact mobile layout.
    return currentIndex === allItems.length -1;
};


const TokenomicsChart = () => {
  const data = [
    { name: "Liquidity", value: 35, color: "hsl(var(--primary))" },
    { name: "Presale", value: 20, color: "hsl(270,70%,60%)" },
    { name: "Staking", value: 15, color: "hsl(var(--chart-2))" },
    { name: "Team", value: 15, color: "hsl(240,60%,65%)" },
    { name: "Marketing", value: 15, color: "hsl(220,60%,70%)" }
  ];

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let accumulatedOffset = 0;

  return (
    <div className="relative w-56 h-56 md:w-64 md:h-64">
      <svg viewBox="0 0 160 160" className="transform -rotate-90 w-full h-full">
        {data.map((item, index) => {
          const strokeDashoffset = circumference - (item.value / 100) * circumference;
          const rotation = (accumulatedOffset / 100) * 360;
          accumulatedOffset += item.value;
          return (
            <circle
              key={item.name}
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke={item.color}
              strokeWidth="20"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform={`rotate(${rotation} 80 80)`}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <PieChart className="w-12 h-12 text-purple-400" />
      </div>
    </div>
  );
};

const roadmapItems: RoadmapItemProps[] = [
  { quarter: 'Q2', year: '2025', milestones: ["Token Development + Deployment", "Cross Chain Bridge Launch", "Community Building", "Presale Launch"] },
  { quarter: 'Q3', year: '2025', milestones: ["Strategic Partnerships", "Layer 2 Core Infrastructure Deployment", "Web3 Interface Release", "Developer Documentation", "Initial Liquidity"], isOffset: true },
  { quarter: 'Q4', year: '2025', milestones: ["Anti-Rug System Display", "Bundle Engine Testnet", "Lock Liquidity Module (V1)", "Swap Optimizer Launch", "Security Dashboard"] },
  { quarter: 'Q1', year: '2026', milestones: ["Advanced DEX Integration", "Launchpad Platform", "Governance Implementation", "Mobile Application Release", "Ecosystem Grants Program"], isOffset: true },
  { quarter: 'Q2', year: '2026', milestones: ["Layer 2 Scaling Solutions", "Cross-Chain Interoperability", "Advanced DeFi Primitives", "Enterprise Solutions", "DAO Transition"], isLast: true } // Mark the very last item
];


export default function LandingPage() {
  const featureCardBaseClass = "bg-purple-600/10 backdrop-blur-sm p-6 rounded-lg shadow-xl h-full flex flex-col";
  const featureCardTitleClass = "text-lg font-semibold mb-2 text-white flex items-center";
  const featureCardIconClass = "mr-3 h-6 w-6 text-purple-400";
  const featureCardDescriptionClass = "text-sm text-gray-300 flex-grow";


  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-body">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center space-x-1 md:space-x-2 bg-gray-800/50 backdrop-blur-sm p-2 rounded-full">
            <Link href="#about-section" className="text-xs sm:text-sm hover:text-purple-400 transition-colors px-2 py-1 sm:px-3">
              About
            </Link>
            <Link href="#features-section" className="text-xs sm:text-sm hover:text-purple-400 transition-colors px-2 py-1 sm:px-3">
              Features
            </Link>
            <Link href="#roadmap-section" className="text-xs sm:text-sm hover:text-purple-400 transition-colors px-2 py-1 sm:px-3">
              Roadmap
            </Link>
            <Link href="#tokenomics-section" className="text-xs sm:text-sm hover:text-purple-400 transition-colors px-2 py-1 sm:px-3">
              Tokenomics
            </Link>
            <Link href="#team-section" className="text-xs sm:text-sm hover:text-purple-400 transition-colors px-2 py-1 sm:px-3">
              Team
            </Link>
          </div>
          <Button variant="outline" className="text-white border-purple-500 hover:bg-purple-600 hover:text-white text-xs sm:text-sm" asChild>
            <Link href="/profile">Connect to Wallet</Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center">
        {/* Hero Section */}
        <section id="hero-section" className="container mx-auto px-4 md:px-6 py-20 md:py-32 text-center flex flex-col items-center">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            <span className="block text-purple-400">Trading Infrastructure</span>
            <span className="block">for the Next Era of Solana</span>
          </h1>
          <p className="max-w-xl md:max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-300 mb-10">
            Layer 2 speed, secure bridging, optimized swaps, and a launchpad—built for performance and protection.
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-3 rounded-lg font-semibold" asChild>
            <Link href="/dashboard">
              Explore Features
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </section>

        {/* About Us Section */}
        <section id="about-section" className="py-16 md:py-24 bg-gray-900/30">
          <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-6 text-purple-400">About Us</h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                We are blockchain innovators dedicated to unlocking Solana's full potential through our cutting-edge Layer 2 solution. We deliver lightning-fast transactions, near-zero fees, and robust security, creating a superior experience for users and developers building dApps, games, and more on the Solana blockchain.
              </p>
            </div>
            <div className="hidden md:flex justify-center items-center">
              {/* Placeholder for image/graphic similar to image, using a simple gradient bar for now */}
              <div className="w-4 h-64 bg-gradient-to-b from-cyan-400 via-teal-500 to-purple-600 rounded-full shadow-2xl shadow-purple-500/30"></div>
            </div>
          </div>
        </section>

        {/* Features Section (Aggregating multiple parts from image) */}
        <section id="features-section" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            {/* Cross-Chain Transfers */}
            <div className="mb-16 md:mb-24">
              <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-4 text-center text-purple-400">Cross-Chain Transfers Made Easy</h2>
              <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12">
                Seamlessly transfer assets between Solana, Ethereum, and other blockchains with SolCraft's secure, fast cross-chain bridge. Unlock the full potential of your digital assets with Layer 2 speed and security.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className={featureCardBaseClass}>
                  <h3 className={featureCardTitleClass}><Network className={featureCardIconClass} />Expanding Network Support</h3>
                  <p className={featureCardDescriptionClass}>With an ever-growing list of supported blockchains, SolCraft is committed to making cross-chain transfers faster and more accessible.</p>
                </div>
                <div className={featureCardBaseClass}>
                  <h3 className={featureCardTitleClass}><ShieldCheck className={featureCardIconClass} />Robust Security, Every Step of the Way</h3>
                  <p className={featureCardDescriptionClass}>Our advanced security protocols ensure that every transfer is protected. Transfer your assets with confidence, knowing your funds are secure.</p>
                </div>
                <div className={featureCardBaseClass}>
                  <h3 className={featureCardTitleClass}><ArrowRightLeft className={featureCardIconClass} />Effortless Asset Movement</h3>
                  <p className={featureCardDescriptionClass}>Transfer assets easily between Solana and other blockchains with just a few clicks. Enjoy seamless connectivity and flexibility across supported networks.</p>
                </div>
              </div>
            </div>

            {/* Trade Fast, Pay Less */}
            <div id="trade-fast-section" className="mb-16 md:mb-24">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center items-center">
                  <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-radial from-purple-700 via-purple-900 to-black rounded-full opacity-70 shadow-2xl shadow-purple-500/50"></div>
                </div>
                <div>
                  <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-8 text-purple-400">Trade Fast, Pay Less</h2>
                  <div className="space-y-6">
                    <div className={featureCardBaseClass}>
                      <h3 className={featureCardTitleClass}><Brain className={featureCardIconClass} />Optimized for Best Execution</h3>
                      <p className={featureCardDescriptionClass}>Enjoy lightning-fast processing times, powered by Solana's Layer 2 infrastructure. Trades are executed instantly, giving you the speed you need in a fast-moving market.</p>
                    </div>
                    <div className={featureCardBaseClass}>
                      <h3 className={featureCardTitleClass}><Coins className={featureCardIconClass} />Low-Cost Swaps, Big Savings</h3>
                      <p className={featureCardDescriptionClass}>Our intelligent routing ensures that every trade gets the best rate possible. Maximize returns and minimize slippage with optimized transaction routes.</p>
                    </div>
                    <div className={featureCardBaseClass}>
                      <h3 className={featureCardTitleClass}><Gauge className={featureCardIconClass} />Fast Transactions with Solana's Layer 2</h3>
                      <p className={featureCardDescriptionClass}>Experience minimal fees for each transaction. SolCraft keeps costs low so you can save more on every trade.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Launchpad Section */}
        <section id="launchpad-section" className="py-16 md:py-24 bg-gray-900/30">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-12 text-center text-purple-400">Your Launchpad for Secure, Scalable Growth</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className={featureCardBaseClass}>
                <h3 className={featureCardTitleClass}><ListChecks className={featureCardIconClass} />Integrated BuyBot for Accountability</h3>
                <p className={featureCardDescriptionClass}>The BuyBot is fully integrated to give you enhanced security and transparent project monitoring, ensuring your projects remain accountable and trustworthy.</p>
              </div>
              <div className={featureCardBaseClass}>
                <h3 className={featureCardTitleClass}><LockKeyhole className={featureCardIconClass} />Liquidity Locking for Stability</h3>
                <p className={featureCardDescriptionClass}>Ensure long-term success with liquidity locking. Protect your project and investors by securing funds within the SolCraft ecosystem.</p>
              </div>
              <div className={featureCardBaseClass}>
                <h3 className={featureCardTitleClass}><Rocket className={featureCardIconClass} />Secure Project Launchpad</h3>
                <p className={featureCardDescriptionClass}>Bring your projects to life with the SolCraft Launchpad. A secure environment where projects can grow, scale, and thrive within a trusted ecosystem.</p>
              </div>
            </div>
          </div>
        </section>

        {/* BuyBot Section */}
        <section id="buybot-section" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-12 text-center text-purple-400">Trade Smarter, Not Harder with BuyBot</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className={featureCardBaseClass}>
                <h3 className={featureCardTitleClass}><Bot className={featureCardIconClass} />Smart Automated Trading</h3>
                <p className={featureCardDescriptionClass}>Let BuyBot do the heavy lifting for you. Automatically optimize trades with intelligent algorithms that maximize returns on every transaction.</p>
              </div>
              <div className={featureCardBaseClass}>
                <h3 className={featureCardTitleClass}><Award className={featureCardIconClass} />Maximize Your Rewards</h3>
                <p className={featureCardDescriptionClass}>Leverage BuyBot's optimization features to earn more on every trade. The Swap & Reward Optimizer ensures you're always getting the best deal.</p>
              </div>
              <div className={featureCardBaseClass}>
                <h3 className={featureCardTitleClass}><FileScan className={featureCardIconClass} />Stay Protected with Anti-Rug Scoring</h3>
                <p className={featureCardDescriptionClass}>Trade with peace of mind. BuyBot's anti-rug scoring system protects you from risky projects and helps you avoid potential losses.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section id="roadmap-section" className="py-16 md:py-24 bg-gray-900/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-center mb-16">
              <div className="bg-black/50 backdrop-blur-sm px-8 py-4 rounded-lg shadow-xl border border-purple-500/30">
                <h2 className="font-headline text-3xl sm:text-4xl font-bold text-center text-white">Roadmap</h2>
              </div>
            </div>
            <div className="relative">
              {/* Central line for md+ screens */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-purple-500/30 transform -translate-x-1/2"></div>
              {roadmapItems.map((item, index) => (
                <RoadmapItem
                  key={index}
                  quarter={item.quarter}
                  year={item.year}
                  milestones={item.milestones}
                  isOffset={item.isOffset}
                  isLast={item.isLast}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Tokenomics Section */}
        <section id="tokenomics-section" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-16 text-center text-purple-400">Tokenomics</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center items-center">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-radial from-purple-600/50 via-purple-800/30 to-black rounded-full opacity-70 shadow-2xl shadow-purple-500/50 animate-pulse"></div>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <TokenomicsChart />
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 text-sm max-w-md">
                  {[
                    { name: "Liquidity", value: "35%", color: "bg-primary" },
                    { name: "Presale", value: "20%", color: "bg-purple-400" },
                    { name: "Staking", value: "15%", color: "bg-teal-500" },
                    { name: "Team", value: "15%", color: "bg-blue-500" },
                    { name: "Marketing", value: "15%", color: "bg-sky-500" },
                  ].map(item => (
                    <div key={item.name} className="flex items-center">
                      <span className={`w-3 h-3 rounded-full mr-2 ${item.color}`}></span>
                      <span className="text-gray-300">{item.name}:</span>
                      <span className="ml-1 font-semibold text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team-section" className="py-16 md:py-24 bg-gray-900/30">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-12 text-purple-400">Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {["Founder", "Dev", "Marketing", "Operations"].map((role) => (
                <div key={role} className={featureCardBaseClass}>
                  <Users className={`${featureCardIconClass} mx-auto mb-3 !mr-0`} />
                  <h3 className="text-xl font-semibold text-white mb-2">{role}</h3>
                  <p className={featureCardDescriptionClass}>
                    Dedicated professionals driving the SolCraft vision forward.
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-12 text-gray-400">More team details coming soon.</p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        <div className="container mx-auto px-4 md:px-6">
          © {new Date().getFullYear()} SolCraft. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
