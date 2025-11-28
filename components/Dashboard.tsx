import React from 'react';
import { useAccount } from 'wagmi';
import { useBankContract } from '@/hooks/useContract';
import { ActionCard } from './ActionCard';
import { TransactionStatus } from './TransactionStatus';
import { GradientText } from './ui/GradientText';

export const Dashboard = () => {
    const { isConnected } = useAccount();
    const { data, actions, state } = useBankContract();

    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <GradientText
                    colors={["#ffffff", "#8b5cf6", "#10b981", "#ffffff"]}
                    animationSpeed={6}
                    className="text-3xl font-bold mb-3"
                >
                    Welcome to NeoBank
                </GradientText>
                <p className="text-muted-foreground max-w-md text-lg">
                    Connect your wallet to access the future of decentralized banking. Secure, transparent, and instant.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Bank Liquidity Card */}
                <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-24 h-24 text-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                        </svg>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Total Liquidity</p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-4xl font-bold text-foreground">{data.bankBalance}</h3>
                        <span className="text-lg font-medium text-primary">FLR</span>
                    </div>
                </div>

                {/* Personal Balance Card */}
                <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-24 h-24 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
                        </svg>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Your Balance</p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-4xl font-bold text-foreground">{data.myBalance}</h3>
                        <span className="text-lg font-medium text-secondary">FLR</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Action Area */}
                <div className="lg:col-span-2">
                    <ActionCard
                        userBalance={data.myBalance}
                        onDeposit={actions.deposit}
                        onWithdraw={actions.withdraw}
                        isLoading={state.isLoading}
                        isPending={state.isPending}
                    />
                    <TransactionStatus
                        hash={state.hash}
                        isConfirming={state.isConfirming}
                        isConfirmed={state.isConfirmed}
                        error={state.error}
                    />
                </div>

                {/* Info / Sidebar */}
                <div className="space-y-6">
                    <div className="glass-panel rounded-2xl p-6">
                        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Quick Tips
                        </h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                Deposits are secured by the blockchain.
                            </li>
                            <li className="flex gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                                Withdrawals are instant but require confirmation.
                            </li>
                            <li className="flex gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                                Always keep some FLR for gas fees.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
