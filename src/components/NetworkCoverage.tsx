import React from 'react';

export const NetworkCoverage: React.FC = () => {
  const networks = [
    { name: "Visa", category: "Global Card Rail", mark: "VISA" },
    { name: "Mastercard", category: "Global Card Rail", mark: "●●" },
    { name: "Apple Pay", category: "Tokenized Device", mark: "Pay" },
    { name: "PayPal", category: "Global Wallet", mark: "PayPal" },
    { name: "Stripe", category: "Acquirer Driver", mark: "stripe" },
    { name: "Adyen", category: "Global Clearing", mark: "adyen" },
    { name: "SEPA", category: "Eurozone ACH", mark: "SEPA" },
    { name: "bKash", category: "South Asian MFS", mark: "bKash" },
    { name: "USDT", category: "On-Chain Stablecoin", mark: "USDT" },
  ];

  return (
    <div className="bg-[#0b0f17] border-y border-white/10 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase mb-6">
          Direct Drivers & Acquirer Integrations Engineered by Farhan
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {networks.map((net, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#121622] border border-white/5 shadow-md hover:border-white/20 transition-all"
            >
              <span className="font-black text-sm font-mono tracking-tight text-white">
                {net.mark}
              </span>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-200">{net.name}</div>
                <div className="text-[9px] font-mono text-slate-500 uppercase">{net.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
