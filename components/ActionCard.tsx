import React, { useState } from 'react';

interface ActionCardProps {
    userBalance: string;
    onDeposit: (amount: string) => Promise<void>;
    onWithdraw: (amount: string) => Promise<void>;
    isLoading: boolean;
    isPending: boolean;
}

export const ActionCard: React.FC<ActionCardProps> = ({
    userBalance,
    onDeposit,
    onWithdraw,
    isLoading,
    isPending,
}) => {
    const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
    const [amount, setAmount] = useState('');

    const handleAction = async () => {
        if (!amount) return;
        try {
            if (activeTab === 'deposit') {
                await onDeposit(amount);
            } else {
                await onWithdraw(amount);
            }
            setAmount('');
        } catch (error) {
            console.error(error);
        }
    };

    const setMax = () => {
        if (activeTab === 'withdraw') {
            setAmount(userBalance);
        }
    };

    const isDeposit = activeTab === 'deposit';
    const isValid = Number(amount) > 0 && (isDeposit || Number(amount) <= Number(userBalance));

    return (
        <div className="glass-panel rounded-2xl p-1 overflow-hidden">
            {/* Tabs */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-black/20 rounded-xl mb-6">
                <button
                    onClick={() => setActiveTab('deposit')}
                    className={`py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${isDeposit
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                        }`}
                >
                    Deposit
                </button>
                <button
                    onClick={() => setActiveTab('withdraw')}
                    className={`py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${!isDeposit
                            ? 'bg-accent text-white shadow-lg shadow-accent/25'
                            : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                        }`}
                >
                    Withdraw
                </button>
            </div>

            <div className="px-5 pb-6">
                <div className="mb-6">
                    <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        Amount to {isDeposit ? 'Deposit' : 'Withdraw'}
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="glass-input w-full pl-4 pr-20 py-4 rounded-xl text-2xl font-bold placeholder:text-muted-foreground/30"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            <span className="text-sm font-semibold text-muted-foreground">FLR</span>
                            {!isDeposit && (
                                <button
                                    onClick={setMax}
                                    className="text-xs bg-white/10 hover:bg-white/20 text-primary px-2 py-1 rounded transition-colors"
                                >
                                    MAX
                                </button>
                            )}
                        </div>
                    </div>
                    {!isDeposit && (
                        <p className="text-xs text-right mt-2 text-muted-foreground">
                            Available: <span className="text-foreground font-medium">{userBalance} FLR</span>
                        </p>
                    )}
                </div>

                <button
                    onClick={handleAction}
                    disabled={isLoading || !isValid}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${isDeposit
                            ? 'bg-gradient-to-r from-primary to-violet-600 hover:shadow-lg hover:shadow-primary/25 text-white'
                            : 'bg-gradient-to-r from-accent to-rose-600 hover:shadow-lg hover:shadow-accent/25 text-white'
                        }`}
                >
                    {isLoading && isPending ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Processing...
                        </span>
                    ) : (
                        `${isDeposit ? 'Deposit' : 'Withdraw'} Funds`
                    )}
                </button>
            </div>
        </div>
    );
};
