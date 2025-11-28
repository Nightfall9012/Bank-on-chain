import React from 'react';

interface TransactionStatusProps {
  hash?: string;
  isConfirming: boolean;
  isConfirmed: boolean;
  error: Error | null;
}

export const TransactionStatus: React.FC<TransactionStatusProps> = ({
  hash,
  isConfirming,
  isConfirmed,
  error,
}) => {
  if (!hash && !error) return null;

  return (
    <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {hash && (
        <div className="glass-panel rounded-xl p-4 border-l-4 border-l-primary">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">
            Transaction Details
          </p>
          <p className="text-xs font-mono text-foreground/80 break-all mb-3 bg-black/20 p-2 rounded">
            {hash}
          </p>
          <div className="flex items-center gap-3">
            {isConfirming && (
              <div className="flex items-center gap-2 text-yellow-500">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                </span>
                <span className="text-sm font-medium">Confirming on blockchain...</span>
              </div>
            )}
            {isConfirmed && (
              <div className="flex items-center gap-2 text-secondary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium">Transaction Successful!</span>
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 glass-panel rounded-xl p-4 border-l-4 border-l-red-500 bg-red-500/5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-red-500">Transaction Failed</p>
              <p className="text-xs text-red-400 mt-1">{error.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
