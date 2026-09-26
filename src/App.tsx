import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowLeft
} from 'lucide-react';
import { PORTFOLIO_DATA } from './data/portfolioData';
import { GithubIcon } from './components/icons/GithubIcon';
import { TwitterIcon } from './components/icons/TwitterIcon';
import { LinkedInIcon } from './components/icons/LinkedInIcon';
import { ContactModal } from './components/ContactModal';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('bento');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeStageId, setActiveStageId] = useState<string>('idempotency');

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['architecture', 'projects', 'experience', 'about'].includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('bento');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page === 'bento' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(PORTFOLIO_DATA.engineer.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const stages = [
    {
      id: 'ingress',
      num: '01',
      title: 'Boundary Ingress & Tokenization',
      category: 'PCI-DSS Boundary',
      problem: 'Raw card details or malformed payloads reaching backend services violate PCI-DSS compliance and risk injection attacks.',
      solution: 'Stateless ingress layer enforcing strict DTO contracts. Card PANs are exchanged for ephemeral tokens at the client SDK before reaching internal backend services.',
      code: `final readonly class PaymentIngressRequest {
    public function __construct(
        public Money $amount,
        public Currency $currency,
        public PaymentToken $token,
        public string $idempotencyKey
    ) {
        $this->assertValidCurrency();
        $this->assertNonNegativeAmount();
    }
}`
    },
    {
      id: 'idempotency',
      num: '02',
      title: 'Atomic Distributed Redis Mutex',
      category: 'Concurrency Defense',
      problem: 'Aggressive client retries or transient network drops sending identical mutations twice, risking duplicate card charges.',
      solution: 'Distributed mutex acquired in Redis cluster using the client idempotency key for 120s. In-flight duplicates return HTTP 409, while previously completed mutations immediately serve signed cached receipts with zero duplicate acquirer calls.',
      code: `$lock = Cache::lock("idemp:lock:{$idempotencyKey}", 15);
if (!$lock->get()) {
    throw new ConcurrentMutationException("Transaction in flight.");
}
try {
    if ($cached = Transaction::findByKey($idempotencyKey)) {
        return $cached->toResponse();
    }
    return $this->executeTransactionPipeline($request);
} finally {
    $lock->release();
}`
    },
    {
      id: 'routing',
      num: '03',
      title: 'Dynamic Routing & Circuit Breaker',
      category: 'Acquirer Failover',
      problem: 'Acquirer outages or latency spikes (HTTP 502/504) causing checkout drops and bleeding merchant conversion.',
      solution: 'Dynamic routing solver evaluating card BIN, customer jurisdiction, and real-time acquirer health. The circuit breaker hot-swaps to secondary fallbacks in <15ms.',
      code: `foreach ($this->router->resolvePriorityChain($request) as $gateway) {
    if ($this->circuitBreaker->isOpen($gateway->id())) continue;
    try {
        $result = $gateway->charge($request);
        if ($result->isSuccessful()) {
            return $result;
        }
    } catch (GatewayTimeoutException $e) {
        $this->circuitBreaker->trip($gateway->id());
    }
}
throw new NoViablePaymentGatewayException();`
    },
    {
      id: 'execution',
      num: '04',
      title: 'Strategy Pattern Gateway Drivers',
      category: 'Driver Decoupling',
      problem: 'Direct vendor API SDK couplings creating brittle codebases where gateway schema updates break global checkout.',
      solution: 'Polymorphic Strategy Pattern drivers wrapping vendor-specific payloads into normalized transactional contracts.',
      code: `interface PaymentGatewayDriverInterface {
    public function authorize(PaymentRequest $req): GatewayResponse;
    public function capture(string $txId, Money $amount): GatewayResponse;
    public function refund(string $txId, Money $amount): GatewayResponse;
    public function verifyWebhookSignature(Request $req): bool;
}`
    },
    {
      id: 'webhooks',
      num: '05',
      title: 'Constant-Time HMAC Webhook Ingestion',
      category: 'Event Security',
      problem: 'Asynchronous payment state callbacks are vulnerable to replay attacks and signature tampering.',
      solution: 'Workers verify constant-time HMAC-SHA256 signatures against gateway secrets and enforce strict timestamp drift windows to neutralize replay attacks.',
      code: `$expected = hash_hmac('sha256', "{$timestamp}.{$rawPayload}", $gatewaySecret);
if (!hash_equals($expected, $headerSignature)) {
    abort(401, "Invalid webhook signature");
}
if (abs(now()->timestamp - $timestamp) > 300) {
    abort(400, "Timestamp expired (replay attack defense)");
}`
    },
    {
      id: 'ledger',
      num: '06',
      title: 'Double-Entry Ledger & ACID State',
      category: 'Financial Integrity',
      problem: 'Single-entry balance updates causing rounding drift, race-condition overdrafts, and mathematical discrepancies.',
      solution: 'Immutable double-entry bookkeeping where every transaction produces matching debits and credits summing strictly to zero, locked with SELECT ... FOR UPDATE inside serializable transactions.',
      code: `DB::transaction(function () use ($txId, $amount) {
    $tx = Transaction::lockForUpdate()->findOrFail($txId);
    $tx->transitionTo(TransactionState::SETTLED);
    $this->ledger->recordJournalEntry([
        new Entry(account: $tx->merchantAccountId, type: CREDIT, amount: $amount),
        new Entry(account: Account::CLEARING_RESERVE, type: DEBIT, amount: $amount),
    ]);
}, attempts: 5);`
    }
  ];

  const activeStage = stages.find(s => s.id === activeStageId) || stages[1];

  return (
    <div className="min-h-screen bg-[#0f1117] text-slate-300 font-sans selection:bg-white/20 selection:text-white flex flex-col justify-between">
      
      {/* =========================================================================
          GLOBAL SHELL: CONSISTENT WIDTH (max-w-6xl), NO JUMPING, SOFT PROFESSIONAL PALETTE
          ========================================================================= */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col min-h-screen">
        
        {/* Top Navigation Header: NO duplicate name/logo! Clean navigation */}
        <header className="flex items-center justify-between py-4 border-b border-white/[0.08] shrink-0">
          <div>
            {currentPage === 'bento' ? (
              <span className="text-xs font-medium text-slate-400 tracking-wide uppercase">
                Payment Infrastructure & Rails
              </span>
            ) : (
              <button
                onClick={() => navigateTo('bento')}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                <span>Back to Overview</span>
              </button>
            )}
          </div>

          <nav className="flex items-center gap-1 sm:gap-1.5">
            <button
              onClick={() => navigateTo('bento')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                currentPage === 'bento' ? 'text-slate-100 bg-white/[0.08]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                currentPage === 'about' ? 'text-slate-100 bg-white/[0.08]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              About
            </button>
            <button
              onClick={() => navigateTo('architecture')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                currentPage === 'architecture' ? 'text-slate-100 bg-white/[0.08]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Architecture
            </button>
            <button
              onClick={() => navigateTo('projects')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                currentPage === 'projects' ? 'text-slate-100 bg-white/[0.08]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => navigateTo('experience')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                currentPage === 'experience' ? 'text-slate-100 bg-white/[0.08]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => setIsContactOpen(true)}
              className="ml-2 px-3 py-1 rounded-lg text-xs font-medium text-slate-200 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] transition-colors"
            >
              Contact
            </button>
          </nav>
        </header>

        {/* =========================================================================
            VIEW A: BENTO GRID OVERVIEW (Single-screen on desktop, soft easy-to-read surfaces)
            ========================================================================= */}
        {currentPage === 'bento' && (
          <main className="my-auto py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3.5 xl:gap-4 flex-1 items-stretch">
            
            {/* BOX 1: Persona & Bio (5 cols) */}
            <div
              onClick={() => navigateTo('about')}
              className="lg:col-span-5 rounded-2xl bg-white/[0.025] border border-white/[0.07] p-5 xl:p-6 flex flex-col justify-between hover:border-white/[0.14] hover:bg-white/[0.04] transition-all cursor-pointer group"
            >
              <div>
                <div className="flex items-center gap-4 mb-3.5 xl:mb-4">
                  <img
                    src="/farhan.jpg"
                    alt={PORTFOLIO_DATA.engineer.name}
                    className="w-14 h-14 xl:w-16 xl:h-16 rounded-xl border border-white/[0.08] object-cover bg-black shrink-0"
                    width="64"
                    height="64"
                  />
                  <div>
                    <h1 className="text-lg xl:text-xl font-bold text-slate-100 tracking-tight group-hover:text-white transition-colors">
                      {PORTFOLIO_DATA.engineer.name}
                    </h1>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Senior Backend & Payment Systems Engineer
                    </p>
                  </div>
                </div>

                <p className="text-xs xl:text-sm text-slate-300 leading-relaxed mb-3.5 xl:mb-4">
                  Over 7 years architecting high-throughput payment rails, sub-15ms dynamic routing solvers, distributed Redis mutexes, and zero-variance double-entry ledgers at <strong className="text-slate-100 font-medium">Paymid</strong>.
                </p>

                {/* Direct Social Links */}
                <div className="flex items-center gap-3.5 text-xs text-slate-400 pt-0.5">
                  <a
                    href={PORTFOLIO_DATA.engineer.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 hover:text-slate-200 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>GitHub</span>
                  </a>
                  <span className="text-slate-700">•</span>
                  <a
                    href={PORTFOLIO_DATA.engineer.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 hover:text-slate-200 transition-colors"
                  >
                    <LinkedInIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>LinkedIn</span>
                  </a>
                  <span className="text-slate-700">•</span>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 hover:text-slate-200 transition-colors"
                  >
                    <TwitterIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>Twitter</span>
                  </a>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                <span>Limassol, Cyprus (Remote)</span>
                <span className="text-slate-300 group-hover:text-white font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>About Farhan</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* BOX 2: Architecture Focus (7 cols) */}
            <div
              onClick={() => navigateTo('architecture')}
              className="lg:col-span-7 rounded-2xl bg-white/[0.025] border border-white/[0.07] p-5 xl:p-6 flex flex-col justify-between hover:border-white/[0.14] hover:bg-white/[0.04] transition-all cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-200">
                    Payment Architecture & Concurrency
                  </span>
                  <span className="text-xs text-slate-400">
                    200+ Gateways · 700+ APMs
                  </span>
                </div>

                <h2 className="text-base xl:text-lg font-bold text-slate-100 tracking-tight mb-1.5 group-hover:text-white transition-colors">
                  Fault-Tolerant Payment Rail Orchestration
                </h2>

                <p className="text-xs xl:text-sm text-slate-300 leading-relaxed mb-3 xl:mb-4">
                  Multi-acquirer priority routing, distributed idempotency locks, and ACID double-entry bookkeeping engineered for zero downtime and zero financial drift.
                </p>

                {/* 3 Clean Focus Invariant Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-left">
                    <div className="text-xs font-semibold text-slate-200">Dynamic Failover</div>
                    <div className="text-xs text-slate-400 mt-0.5">&lt;15ms automated swap</div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                      Instant circuit breaker fallbacks when upstream acquirers timeout.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-left">
                    <div className="text-xs font-semibold text-slate-200">Redis Mutex Lock</div>
                    <div className="text-xs text-slate-400 mt-0.5">Zero double charges</div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                      Distributed locks guarantee single-execution mutation per key.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-left">
                    <div className="text-xs font-semibold text-slate-200">ACID Double-Entry</div>
                    <div className="text-xs text-slate-400 mt-0.5">Zero rounding drift</div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                      Serializable journal records ensure matching debits and credits sum to zero.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                <span>Interactive Pipeline & PHP 8.3 Patterns</span>
                <span className="text-slate-300 group-hover:text-white font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Explore Architecture</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* BOX 3: Selected Platforms (4 cols) */}
            <div
              onClick={() => navigateTo('projects')}
              className="lg:col-span-4 rounded-2xl bg-white/[0.025] border border-white/[0.07] p-4 xl:p-5 flex flex-col justify-between hover:border-white/[0.14] hover:bg-white/[0.04] transition-all cursor-pointer group"
            >
              <div>
                <div className="text-xs font-semibold text-slate-200 mb-1">
                  Production Platforms
                </div>

                <h3 className="text-base font-bold text-slate-100 mb-2.5 group-hover:text-white transition-colors">
                  Key Systems Engineered
                </h3>

                <div className="space-y-2 text-xs">
                  {/* Paymid Flagship Feature */}
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-100">Paymid</span>
                      <span className="text-[10px] text-slate-300 bg-white/[0.06] px-2 py-0.5 rounded font-medium">Core PSP</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      Global payment gateway orchestrator handling multi-acquirer transaction routing and APMs across Europe.
                    </p>
                  </div>

                  {/* Secondary platforms list */}
                  <div className="px-1 space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span>Namhost</span>
                      <span className="text-[11px] text-slate-400">Cross-Border Fintech</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Johnson & Johnson</span>
                      <span className="text-[11px] text-slate-400">Enterprise DXP</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Grameenphone</span>
                      <span className="text-[11px] text-slate-400">Telecom Core API</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2.5 mt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                <span>4 Production Platforms</span>
                <span className="text-slate-300 group-hover:text-white font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>View Systems</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* BOX 4: Career Record (4 cols) — Real Engineering Roles Only! */}
            <div
              onClick={() => navigateTo('experience')}
              className="lg:col-span-4 rounded-2xl bg-white/[0.025] border border-white/[0.07] p-4 xl:p-5 flex flex-col justify-between hover:border-white/[0.14] hover:bg-white/[0.04] transition-all cursor-pointer group"
            >
              <div>
                <div className="text-xs font-semibold text-slate-200 mb-1">
                  Career Record
                </div>

                <h3 className="text-base font-bold text-slate-100 mb-2.5 group-hover:text-white transition-colors">
                  Work History
                </h3>

                {/* Real Software Engineering Roles Timeline */}
                <div className="space-y-2 text-xs">
                  <div className="border-l-2 border-white/[0.2] pl-3 py-0.5">
                    <div className="flex items-baseline justify-between">
                      <span className="font-semibold text-slate-100">Paymid (Cyprus)</span>
                      <span className="text-[11px] text-slate-400">2024 — Present</span>
                    </div>
                    <div className="text-[11px] text-slate-400">Software Engineer — Platform & Payments</div>
                  </div>

                  <div className="border-l-2 border-white/[0.1] pl-3 py-0.5">
                    <div className="flex items-baseline justify-between">
                      <span className="font-medium text-slate-200">SJ Innovation</span>
                      <span className="text-[11px] text-slate-400">2023 — 2024</span>
                    </div>
                    <div className="text-[11px] text-slate-400">Senior Software Engineer</div>
                  </div>

                  <div className="border-l-2 border-white/[0.1] pl-3 py-0.5">
                    <div className="flex items-baseline justify-between">
                      <span className="font-medium text-slate-200">Namhost</span>
                      <span className="text-[11px] text-slate-400">2023 — 2024</span>
                    </div>
                    <div className="text-[11px] text-slate-400">FinTech & Ledger Engineer</div>
                  </div>

                  <div className="border-l-2 border-white/[0.1] pl-3 py-0.5">
                    <div className="flex items-baseline justify-between">
                      <span className="font-medium text-slate-200">IYLMA / Grameenphone</span>
                      <span className="text-[11px] text-slate-400">2022</span>
                    </div>
                    <div className="text-[11px] text-slate-400">Software Engineer</div>
                  </div>
                </div>
              </div>

              <div className="pt-2.5 mt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                <span>7+ Years Production Track Record</span>
                <span className="text-slate-300 group-hover:text-white font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>View Timeline</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* BOX 5: Core Tech Stack (4 cols) */}
            <div
              onClick={() => navigateTo('architecture')}
              className="lg:col-span-4 rounded-2xl bg-white/[0.025] border border-white/[0.07] p-4 xl:p-5 flex flex-col justify-between hover:border-white/[0.14] hover:bg-white/[0.04] transition-all cursor-pointer group"
            >
              <div>
                <div className="text-xs font-semibold text-slate-200 mb-1">
                  Core Technologies
                </div>

                <h3 className="text-base font-bold text-slate-100 mb-2.5 group-hover:text-white transition-colors">
                  Backend & Systems Stack
                </h3>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Languages & Frameworks</span>
                    <div className="flex flex-wrap gap-1">
                      {['PHP 8.3', 'Laravel 11', 'Go', 'Node.js', 'Symfony'].map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-300 text-xs">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Data & Mutex</span>
                    <div className="flex flex-wrap gap-1">
                      {['Redis Cluster', 'Redlock', 'MySQL', 'PostgreSQL'].map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-300 text-xs">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Protocols & Standards</span>
                    <div className="flex flex-wrap gap-1">
                      {['PCI-DSS Ingress', 'HMAC-SHA256', 'OpenAPI', 'Docker'].map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-300 text-xs">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2.5 mt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                <span>Production Stack</span>
                <span className="text-slate-300 group-hover:text-white font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Stack Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

          </main>
        )}

        {/* =========================================================================
            VIEW B: CLEAN DETAIL PAGES (Inside Same Frame, Soft Comfortable Lighting)
            ========================================================================= */}
        {currentPage !== 'bento' && (
          <main className="py-8 lg:py-10 flex-1">
            
            {/* DETAIL PAGE 1: ABOUT */}
            {currentPage === 'about' && (
              <div className="max-w-3xl space-y-8 text-left">
                <div className="flex items-center gap-5 pb-6 border-b border-white/[0.08]">
                  <img
                    src="/farhan.jpg"
                    alt={PORTFOLIO_DATA.engineer.name}
                    className="w-20 h-20 rounded-2xl border border-white/[0.08] object-cover shadow-lg"
                    width="80"
                    height="80"
                  />
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                      {PORTFOLIO_DATA.engineer.name}
                    </h1>
                    <p className="text-base text-slate-300 font-medium mt-1">
                      Senior Backend & Payment Systems Engineer at Paymid
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Limassol, Cyprus (Remote) · Dhaka, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="space-y-5 text-base text-slate-300 leading-relaxed font-sans">
                  <p>
                    I’m a backend engineer with over 7 years of production experience, specializing in payment gateway integration, multi-PSP orchestration, and distributed transactional systems. I care deeply about building resilient financial rails where race conditions, duplicate webhooks, and upstream acquirer timeouts are solved by design.
                  </p>

                  <p>
                    Currently, I’m a Senior Backend Engineer at{' '}
                    <a
                      href="https://paymid.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-100 font-medium underline underline-offset-4 hover:text-white transition-colors"
                    >
                      Paymid
                    </a>
                    , where I architect our multi-PSP routing engine and dynamic failover cascade — turning dozens of fragmented banking APIs into high-throughput, unified payment pipelines with sub-15ms automated failover.
                  </p>

                  <p>
                    My technical foundation centers around event-driven architectures, distributed idempotency mutexes, and zero-variance double-entry ledgers with{' '}
                    <strong className="text-slate-100 font-semibold">PHP 8.3 / Laravel</strong>,{' '}
                    <strong className="text-slate-100 font-semibold">Go</strong>,{' '}
                    <strong className="text-slate-100 font-semibold">Node.js</strong>, and{' '}
                    <strong className="text-slate-100 font-semibold">Redis</strong>.
                  </p>

                  <p>
                    I hold an engineering degree from{' '}
                    <strong className="text-slate-100 font-semibold">Khulna University of Engineering & Technology (KUET)</strong> in Electrical, Electronics & Communication Engineering. When away from production logs, I study distributed consensus papers, brew pour-over coffee, and mentor engineers.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/[0.08] flex items-center gap-4">
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-black font-semibold text-xs transition-colors"
                  >
                    Contact Farhan
                  </button>
                  <button
                    onClick={handleCopyEmail}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-slate-300 text-xs transition-colors"
                  >
                    {copiedEmail ? 'Copied Email' : 'Copy Email'}
                  </button>
                </div>
              </div>
            )}

            {/* DETAIL PAGE 2: ARCHITECTURE BLUEPRINT */}
            {currentPage === 'architecture' && (
              <div className="space-y-8 text-left max-w-4xl">
                <div>
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Technical Architecture
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                    Anatomy of a Fault-Tolerant Payment Rail
                  </h1>
                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                    Interactive blueprint of the multi-PSP orchestration pipeline. Select any stage to inspect the production failure mode, architectural resolution, and PHP 8.3 implementation.
                  </p>
                </div>

                {/* Stage selector bar */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {stages.map((stage) => {
                    const isSelected = stage.id === activeStageId;
                    return (
                      <button
                        key={stage.id}
                        onClick={() => setActiveStageId(stage.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-white/[0.08] border-white/[0.2] text-slate-100 shadow-sm'
                            : 'bg-white/[0.02] border-white/[0.05] text-slate-400 hover:text-slate-200 hover:border-white/[0.1]'
                        }`}
                      >
                        <div className="text-[11px] font-bold text-slate-400">
                          Stage {stage.num}
                        </div>
                        <div className="text-xs font-medium text-slate-200 truncate mt-1">
                          {stage.title}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Stage Deep Dive */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.07] space-y-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <span>Stage {activeStage.num}</span>
                    <span>•</span>
                    <span>{activeStage.category}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
                    {activeStage.title}
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        The Financial Failure Mode
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {activeStage.problem}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Architectural Resolution
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {activeStage.solution}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Production Architecture Pattern (PHP 8.3)
                    </h3>
                    <div className="p-4 rounded-xl bg-[#090b0f] border border-white/[0.07] font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed">
                      <pre>{activeStage.code}</pre>
                    </div>
                  </div>
                </div>

                {/* Stack & System Invariants Section */}
                <div className="space-y-6 pt-6 border-t border-white/[0.08]">
                  <div>
                    <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Production Stack & Principles
                    </div>
                    <h2 className="text-xl font-bold text-slate-100 tracking-tight">
                      Core Tech Stack & Systems Invariants
                    </h2>
                    <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                      Technologies and architectural constraints chosen for strict zero-drift transactional processing and sub-15ms latency.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.07] space-y-2">
                      <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                        Languages & Frameworks
                      </h3>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {['PHP 8.3', 'Laravel 11', 'Go', 'Node.js', 'Symfony'].map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-300 text-xs">
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed pt-2">
                        Modern PHP 8.3 typed properties, readonly classes, and JIT compilation powering high-throughput API endpoints with low memory footprint.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.07] space-y-2">
                      <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                        Data & Mutex Defense
                      </h3>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {['Redis Cluster', 'Redlock', 'MySQL 8.0', 'PostgreSQL'].map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-300 text-xs">
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed pt-2">
                        Distributed idempotency locks with Redlock algorithm, ACID serializable transactions, and strict row-level pessimistic locking for ledger records.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.07] space-y-2">
                      <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                        Protocols & Standards
                      </h3>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {['PCI-DSS Ingress', 'HMAC-SHA256', 'OpenAPI 3.1', 'Docker'].map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-300 text-xs">
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed pt-2">
                        Zero card data at rest outside tokenization perimeter, constant-time webhook verification, and contract-first OpenAPI schemas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DETAIL PAGE 3: PROJECTS */}
            {currentPage === 'projects' && (
              <div className="space-y-8 text-left max-w-4xl">
                <div>
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Production Platforms
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                    Selected Systems & Production Migrations
                  </h1>
                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                    Real enterprise platforms across payment gateway orchestration, cross-border credit, and telecom billing backends.
                  </p>
                </div>

                <div className="space-y-6">
                  {PORTFOLIO_DATA.projects.map((project) => (
                    <div
                      key={project.id}
                      className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.07] space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-medium text-slate-200 bg-white/[0.05] px-2.5 py-0.5 rounded-full border border-white/[0.06]">
                          {project.company}
                        </span>
                        <span className="text-xs text-slate-400">
                          {project.period}
                        </span>
                      </div>

                      <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                        {project.title}
                      </h2>

                      <p className="text-sm text-slate-300 leading-relaxed">
                        {project.summary}
                      </p>

                      <div className="space-y-1.5 pt-2">
                        <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                          Architectural Highlights
                        </h3>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {project.architecturePoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-slate-400 mt-0.5">•</span>
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                        {project.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DETAIL PAGE 4: EXPERIENCE */}
            {currentPage === 'experience' && (
              <div className="space-y-8 text-left max-w-4xl">
                <div>
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Career Record
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                    Work Experience & Academic Background
                  </h1>
                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                    Over seven years building transactional web applications, payment rails, and enterprise microservices.
                  </p>
                </div>

                {/* Roles Timeline */}
                <div className="space-y-6">
                  {PORTFOLIO_DATA.experiences.map((exp, idx) => (
                    <div
                      key={idx}
                      className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.07] space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                            {exp.role}
                          </h2>
                          <span className="text-slate-500 text-sm">at</span>
                          <span className="text-slate-200 font-semibold text-base">{exp.company}</span>
                        </div>
                        <span className="text-xs text-slate-400">
                          {exp.period}
                        </span>
                      </div>

                      <div className="text-xs text-slate-400">
                        {exp.location} • {exp.type}
                      </div>

                      <p className="text-sm text-slate-300 leading-relaxed">
                        {exp.description}
                      </p>

                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {exp.highlights.map((hl, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <span className="text-slate-400 mt-0.5">•</span>
                            <span className="leading-relaxed">{hl}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                        {exp.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-xs px-2.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dedicated Education & Recommendation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  
                  {/* Academic Background / Education */}
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.07] space-y-2">
                    <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Academic Background
                    </div>
                    <h3 className="text-base font-bold text-slate-100">
                      Khulna University of Engineering & Technology (KUET)
                    </h3>
                    <div className="text-xs text-slate-300 font-medium">
                      B.Sc. in Electrical, Electronics & Communication Engineering
                    </div>
                    <div className="text-xs text-slate-400">
                      2014 – 2019
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-white/[0.06]">
                      Rigorous 4-year engineering foundation in telecommunication protocols, signal processing, network topologies, and computational systems.
                    </p>
                  </div>

                  {/* Manager Testimonial */}
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.07] space-y-2">
                    <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Manager Testimonial
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      "{PORTFOLIO_DATA.recommendations[0].quote}"
                    </p>
                    <div className="pt-2 border-t border-white/[0.06] text-xs">
                      <div className="font-semibold text-slate-100">{PORTFOLIO_DATA.recommendations[0].name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {PORTFOLIO_DATA.recommendations[0].title} · SJ Innovation
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </main>
        )}

        {/* Bottom Colophon Footer */}
        <footer className="py-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 shrink-0">
          <div>
            <span>Dhaka, Bangladesh · Remote Worldwide</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={PORTFOLIO_DATA.engineer.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-200 transition-colors"
            >
              GitHub
            </a>
            <span className="text-slate-700">•</span>
            <a
              href={PORTFOLIO_DATA.engineer.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-200 transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-slate-700">•</span>
            <button
              onClick={handleCopyEmail}
              className="hover:text-slate-200 transition-colors"
            >
              {copiedEmail ? 'Copied' : 'Email'}
            </button>
          </div>
        </footer>

      </div>

      {/* Direct Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

    </div>
  );
};

export default App;
