"use client";

import { WalletConnect } from "@/components/Wallet-connect";
import { Dashboard } from "@/components/Dashboard";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { GradientText } from "@/components/ui/GradientText";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 relative overflow-hidden">
      <ParticlesBackground particleCount={80} speed={0.3} color="#8b5cf6" />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <GradientText
              colors={["#ffffff", "#8b5cf6", "#10b981", "#ffffff"]}
              animationSpeed={6}
              className="text-xl font-bold"
            >
              NeoBank
            </GradientText>
          </div>

          <WalletConnect />
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-12 px-4 relative z-10">
        <Dashboard />
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-auto py-8 text-center text-sm text-muted-foreground relative z-10">
        <p>© 2025 NeoBank Decentralized. Built on Flare Network.</p>
      </footer>
    </main>
  );
}
