import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-body">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4 bg-gray-800/50 backdrop-blur-sm p-2 rounded-full">
            <Link href="#about-section" className="text-sm hover:text-purple-400 transition-colors px-3 py-1">
              About
            </Link>
            <Link href="#features-section" className="text-sm hover:text-purple-400 transition-colors px-3 py-1">
              Features
            </Link>
            <Link href="#roadmap-section" className="text-sm hover:text-purple-400 transition-colors px-3 py-1">
              Roadmap
            </Link>
            <Link href="#team-section" className="text-sm hover:text-purple-400 transition-colors px-3 py-1">
              Team
            </Link>
          </div>
          <Button variant="outline" className="text-white border-purple-500 hover:bg-purple-600 hover:text-white text-sm" asChild>
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
              <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-6">About Us</h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                We are blockchain innovators dedicated to unlocking Solana's full potential through our cutting-edge Layer 2 solution. We deliver lightning-fast transactions, near-zero fees, and robust security, creating a superior experience for users and developers building dApps, games, and more on the Solana blockchain.
              </p>
            </div>
            <div className="hidden md:flex justify-center items-center">
              <div className="w-4 h-64 bg-gradient-to-b from-cyan-400 via-teal-500 to-purple-600 rounded-full shadow-2xl shadow-purple-500/30"></div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer (Optional) */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        <div className="container mx-auto px-4 md:px-6">
          © {new Date().getFullYear()} SolCraft. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
