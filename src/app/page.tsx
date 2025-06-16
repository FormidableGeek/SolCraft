
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, Network, ShieldCheck, ArrowRightLeft, Brain, Coins, Gauge, ListChecks, LockKeyhole, Rocket, Bot, Award, FileScan } from 'lucide-react';

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
            <Link href="#launchpad-section" className="text-xs sm:text-sm hover:text-purple-400 transition-colors px-2 py-1 sm:px-3">
              Launchpad
            </Link>
            <Link href="#buybot-section" className="text-xs sm:text-sm hover:text-purple-400 transition-colors px-2 py-1 sm:px-3">
              BuyBot
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
            <div className="mb-16 md:mb-24">
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

    