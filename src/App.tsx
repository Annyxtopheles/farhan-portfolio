import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowLeft,
  Mail,
  Copy,
  Check
} from 'lucide-react';
import { PORTFOLIO_DATA } from './data/portfolioData';
import { GithubIcon } from './components/icons/GithubIcon';
import { TwitterIcon } from './components/icons/TwitterIcon';
import { LinkedInIcon } from './components/icons/LinkedInIcon';
import { ContactModal } from './components/ContactModal';
import { 
  PhpIcon, 
  LaravelIcon, 
  GoIcon, 
  NodeIcon, 
  SymfonyIcon, 
  RedisIcon, 
  MySqlIcon, 
  PostgreSqlIcon, 
  DockerIcon,
  TypeScriptIcon
} from './components/TechLogos';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('bento');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeStageId, setActiveStageId] = useState<string>('idempotency');
  const [projectFilter, setProjectFilter] = useState<string>('all');

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
    <div className="min-h-screen bg-[#0c0e14] text-slate-400 font-sans selection:bg-white/10 selection:text-slate-200 flex flex-col justify-between relative overflow-hidden">
      {/* Subtle Ambient Lighting (Linear/Stripe aesthetic) */}
      <div 
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_75%_55%_at_50%_-15%,rgba(56,189,248,0.06),transparent_75%)]" 
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none absolute -top-40 right-1/4 w-96 h-96 bg-emerald-500/[0.025] rounded-full blur-3xl" 
        aria-hidden="true" 
      />
      
      {/* =========================================================================
          GLOBAL SHELL: CONSISTENT WIDTH (max-w-6xl), NO JUMPING, SOFT PROFESSIONAL PALETTE
          ========================================================================= */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col min-h-screen relative z-10">
        
        {/* Top Navigation Header: NO duplicate name/logo! Clean navigation */}
        <header className="flex items-center justify-between py-4 border-b border-white/[0.06] shrink-0">
          <div>
            {currentPage !== 'bento' && (
              <button
                onClick={() => navigateTo('bento')}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors group"
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
                currentPage === 'bento' ? 'text-slate-200 bg-white/[0.06]' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                currentPage === 'about' ? 'text-slate-200 bg-white/[0.06]' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              About
            </button>
            <button
              onClick={() => navigateTo('architecture')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                currentPage === 'architecture' ? 'text-slate-200 bg-white/[0.06]' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              Architecture
            </button>
            <button
              onClick={() => navigateTo('projects')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                currentPage === 'projects' ? 'text-slate-200 bg-white/[0.06]' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => navigateTo('experience')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                currentPage === 'experience' ? 'text-slate-200 bg-white/[0.06]' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => setIsContactOpen(true)}
              className="ml-2 px-3 py-1 rounded-lg text-xs font-medium text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-colors"
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
              className="lg:col-span-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-5 xl:p-6 flex flex-col justify-between hover:border-white/[0.12] hover:bg-white/[0.03] transition-all cursor-pointer group"
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
                    <h1 className="text-lg xl:text-xl font-bold text-slate-200 tracking-tight group-hover:text-slate-100 transition-colors">
                      {PORTFOLIO_DATA.engineer.name}
                    </h1>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Senior Backend & Payment Systems Engineer
                    </p>
                  </div>
                </div>

                <p className="text-xs xl:text-sm text-slate-400 leading-relaxed mb-4">
                  Over 7 years architecting high-throughput payment rails, sub-15ms dynamic routing solvers, distributed Redis mutexes, and zero-variance double-entry ledgers at <strong className="text-slate-200 font-medium">Paymid</strong>.
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

              <div className="pt-3 mt-3 border-t border-white/[0.05] flex items-center justify-between text-xs text-slate-400">
                <span>Limassol, Cyprus (Remote)</span>
                <span className="text-slate-300 group-hover:text-slate-100 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>About Farhan</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* BOX 2: Architecture Focus (7 cols) */}
            <div
              onClick={() => navigateTo('architecture')}
              className="lg:col-span-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-5 xl:p-6 flex flex-col justify-between hover:border-white/[0.12] hover:bg-white/[0.03] transition-all cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-base xl:text-lg font-bold text-slate-200 tracking-tight group-hover:text-slate-100 transition-colors">
                    Payment Architecture
                  </h2>
                  <span className="text-xs text-slate-400 font-mono">
                    200+ Gateways · 700+ APMs
                  </span>
                </div>

                <p className="text-xs xl:text-sm text-slate-400 leading-relaxed mb-4">
                  Multi-acquirer priority routing, distributed idempotency locks, and ACID double-entry bookkeeping engineered for zero downtime and zero financial drift.
                </p>

                {/* 3 Clean Invariant Focus Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-3.5 rounded-xl bg-white/[0.015] border border-white/[0.05] text-left">
                    <div className="text-xs font-semibold text-slate-200">Dynamic Failover</div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Circuit breakers execute automated acquirer fallbacks during gateway timeouts.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.015] border border-white/[0.05] text-left">
                    <div className="text-xs font-semibold text-slate-200">Distributed Idempotency</div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Redis mutex locks prevent duplicate charges across aggressive network retries.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.015] border border-white/[0.05] text-left">
                    <div className="text-xs font-semibold text-slate-200">Double-Entry Ledgers</div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      ACID serializable journal transactions guarantee debit and credit balance to zero.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-white/[0.05] flex items-center justify-between text-xs text-slate-400">
                <span>Interactive Pipeline & PHP 8.3 Patterns</span>
                <span className="text-slate-300 group-hover:text-slate-100 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Explore Architecture</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* BOX 3: Selected Platforms (4 cols) */}
            <div
              onClick={() => navigateTo('projects')}
              className="lg:col-span-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4 xl:p-5 flex flex-col justify-between hover:border-white/[0.12] hover:bg-white/[0.03] transition-all cursor-pointer group"
            >
              <div>
                <h3 className="text-base font-bold text-slate-200 mb-2.5 group-hover:text-slate-100 transition-colors">
                  Projects
                </h3>

                <div className="space-y-2.5 text-xs">
                  {/* Paymid Flagship Feature */}
                  <div className="p-2.5 rounded-xl bg-white/[0.015] border border-white/[0.05]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center p-1 shrink-0 shadow-sm border border-white/[0.1] overflow-hidden">
                        <img
                          src="/logos/paymid.png"
                          alt="Paymid"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-200 truncate">Paymid Orchestrator</div>
                        <div className="text-[11px] text-slate-400 truncate mt-0.5">200+ Gateways · Smart Routing</div>
                      </div>
                    </div>
                  </div>

                  {/* Secondary platforms list */}
                  <div className="px-1 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Johnson & Johnson</span>
                      <span className="text-[11px] text-slate-400">Enterprise DXP Migration</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Namhost</span>
                      <span className="text-[11px] text-slate-400">FinTech Cash Rails</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Grameenphone</span>
                      <span className="text-[11px] text-slate-400">Enterprise LMS & HSSE</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2.5 mt-2.5 border-t border-white/[0.05] flex items-center justify-between text-xs text-slate-400">
                <span>32 Production Projects</span>
                <span className="text-slate-300 group-hover:text-slate-100 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>View All Projects</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* BOX 4: Career Record (4 cols) — Real Engineering Roles with Company Logos */}
            <div
              onClick={() => navigateTo('experience')}
              className="lg:col-span-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4 xl:p-5 flex flex-col justify-between hover:border-white/[0.12] hover:bg-white/[0.03] transition-all cursor-pointer group"
            >
              <div>
                <h3 className="text-base font-bold text-slate-200 mb-2.5 group-hover:text-slate-100 transition-colors">
                  Work Experience
                </h3>

                <div className="space-y-2 text-xs">
                  {/* Role 1: Paymid */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center p-0.5 shrink-0 shadow-sm border border-white/[0.1] overflow-hidden">
                      <img src="/logos/paymid.png" alt="Paymid" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0 flex items-baseline justify-between">
                      <div>
                        <span className="font-medium text-slate-200">Paymid</span>
                        <span className="text-slate-400 text-[11px] ml-1.5">SDE-1 Payments</span>
                      </div>
                      <span className="text-[11px] text-slate-400 shrink-0">Present</span>
                    </div>
                  </div>

                  {/* Role 2: SJ Innovation */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center p-0.5 shrink-0 shadow-sm border border-white/[0.1] overflow-hidden">
                      <img src="/logos/sjinnovation.png" alt="SJ Innovation" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0 flex items-baseline justify-between">
                      <div>
                        <span className="font-medium text-slate-200">SJ Innovation</span>
                        <span className="text-slate-400 text-[11px] ml-1.5">Senior Software Eng</span>
                      </div>
                      <span className="text-[11px] text-slate-400 shrink-0">2023–24</span>
                    </div>
                  </div>

                  {/* Role 3: Namhost */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center p-0.5 shrink-0 shadow-sm border border-white/[0.1] overflow-hidden">
                      <img src="/logos/namhost.png" alt="Namhost" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0 flex items-baseline justify-between">
                      <div>
                        <span className="font-medium text-slate-200">Namhost</span>
                        <span className="text-slate-400 text-[11px] ml-1.5">FinTech Engineer</span>
                      </div>
                      <span className="text-[11px] text-slate-400 shrink-0">2023–24</span>
                    </div>
                  </div>

                  {/* Role 4: Earlier Companies */}
                  <div className="flex items-center gap-2.5 pt-1.5 border-t border-white/[0.04]">
                    <div className="flex items-center gap-1 shrink-0">
                      <div className="h-4 w-6 rounded bg-white p-0.5 flex items-center justify-center border border-white/[0.1] overflow-hidden">
                        <img src="/logos/instantwebb.png" alt="Instantwebb" className="w-full h-full object-contain" />
                      </div>
                      <div className="h-4 w-4 rounded bg-white p-0.5 flex items-center justify-center border border-white/[0.1] overflow-hidden">
                        <img src="/logos/iylma.png" alt="IYLMA" className="w-full h-full object-contain" />
                      </div>
                      <div className="h-4 w-4 rounded bg-white p-0.5 flex items-center justify-center border border-white/[0.1] overflow-hidden">
                        <img src="/logos/perkyrabbit.png" alt="Perky Rabbit" className="w-full h-full object-contain" />
                      </div>
                      <div className="h-4 w-4 rounded bg-white p-0.5 flex items-center justify-center border border-white/[0.1] overflow-hidden">
                        <img src="/logos/mienit.png" alt="MIEN IT" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 flex items-baseline justify-between">
                      <span className="text-[11px] text-slate-400 truncate">Earlier Engineering Roles</span>
                      <span className="text-[11px] text-slate-500 shrink-0">2019–23</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2.5 mt-2.5 border-t border-white/[0.05] flex items-center justify-between text-xs text-slate-400">
                <span>7 Companies · 7+ Years</span>
                <span className="text-slate-300 group-hover:text-slate-100 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>View Timeline</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* BOX 5: Core Tech Stack (4 cols) — Clean Tech Badges */}
            <div
              onClick={() => navigateTo('architecture')}
              className="lg:col-span-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4 xl:p-5 flex flex-col justify-between hover:border-white/[0.12] hover:bg-white/[0.03] transition-all cursor-pointer group"
            >
              <div>
                <h3 className="text-base font-bold text-slate-200 mb-2.5 group-hover:text-slate-100 transition-colors">
                  Core Stack
                </h3>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Languages & Frameworks</span>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                        <PhpIcon className="w-3 h-3 text-slate-400" />
                        <span>PHP 8.3</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                        <LaravelIcon className="w-3 h-3 text-slate-400" />
                        <span>Laravel 11</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                        <GoIcon className="w-3 h-3 text-slate-400" />
                        <span>Go</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                        <NodeIcon className="w-3 h-3 text-slate-400" />
                        <span>Node.js</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                        <SymfonyIcon className="w-3 h-3 text-slate-400" />
                        <span>Symfony</span>
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Data & Mutex</span>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                        <RedisIcon className="w-3 h-3 text-slate-400" />
                        <span>Redis Cluster</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                        <MySqlIcon className="w-3 h-3 text-slate-400" />
                        <span>MySQL 8.0</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                        <PostgreSqlIcon className="w-3 h-3 text-slate-400" />
                        <span>PostgreSQL</span>
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Protocols & Standards</span>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                        <DockerIcon className="w-3 h-3 text-slate-400" />
                        <span>Docker</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                        <TypeScriptIcon className="w-3 h-3 text-slate-400" />
                        <span>TypeScript</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                        PCI-DSS Ingress
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                        HMAC-SHA256
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2.5 mt-2.5 border-t border-white/[0.05] flex items-center justify-between text-xs text-slate-400">
                <span>Production Stack</span>
                <span className="text-slate-300 group-hover:text-slate-100 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
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
            
            {/* DETAIL PAGE 1: ABOUT (Clean, Unboxed Layout) */}
            {currentPage === 'about' && (
              <div className="space-y-10 text-left max-w-4xl">
                
                {/* Profile Block: Photo on Left, Content on Right (Top and Bottom Aligned) */}
                <div className="flex flex-col sm:flex-row items-stretch gap-6 sm:gap-8">
                  <div className="w-full sm:w-44 md:w-48 shrink-0">
                    <img
                      src="/farhan.jpg"
                      alt={PORTFOLIO_DATA.engineer.name}
                      className="w-full h-48 sm:h-full rounded-xl border border-white/[0.08] object-cover object-top shadow-lg"
                    />
                  </div>
                  <div className="flex flex-col justify-between py-0.5 space-y-3 flex-1">
                    <div className="space-y-2">
                      <div className="text-xs text-slate-400 font-medium">
                        Based in Dhaka, Bangladesh · Remote for Paymid (Cyprus)
                      </div>
                      <h1 className="text-2xl sm:text-3xl font-bold text-slate-200 tracking-tight">
                        {PORTFOLIO_DATA.engineer.name}
                      </h1>
                      <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
                        Senior Backend & Payment Systems Engineer specializing in multi-PSP orchestration, distributed mutexes, and zero-drift financial ledgers.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-3 border-t border-white/[0.06]">
                      <a
                        href={PORTFOLIO_DATA.engineer.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-slate-200 transition-colors"
                      >
                        GitHub Profile
                      </a>
                      <span className="text-slate-600">•</span>
                      <a
                        href={PORTFOLIO_DATA.engineer.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-slate-200 transition-colors"
                      >
                        LinkedIn Profile
                      </a>
                      <span className="text-slate-600">•</span>
                      <button
                        onClick={handleCopyEmail}
                        className="hover:text-slate-200 transition-colors"
                      >
                        {copiedEmail ? 'Copied' : PORTFOLIO_DATA.engineer.links.email}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4 Operational Milestones (Unboxed, Clean Typography) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-white/[0.06]">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-slate-200 tracking-tight">7+</div>
                    <div className="text-xs text-slate-300 font-medium mt-1">Years Experience</div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">High-concurrency backend & fintech platforms.</p>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-slate-200 tracking-tight">200+</div>
                    <div className="text-xs text-slate-300 font-medium mt-1">Payment Gateways</div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">APMs, cards, and banking connectors integrated.</p>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-slate-200 tracking-tight">&lt;15ms</div>
                    <div className="text-xs text-slate-300 font-medium mt-1">Acquirer Failover</div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Automated circuit breaking without checkout loss.</p>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-slate-200 tracking-tight">0.00%</div>
                    <div className="text-xs text-slate-300 font-medium mt-1">Ledger Variance</div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Strict double-entry bookkeeping precision.</p>
                  </div>
                </div>

                {/* Grounding Narrative: The Engineer's Journey */}
                <div className="space-y-6 text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
                  
                  <div className="space-y-3">
                    <h2 className="text-lg font-bold text-slate-200 tracking-tight">
                      The Stakes of Moving Money
                    </h2>
                    <p>
                      In typical web backends, a transient HTTP 504 error means the user refreshes the page. In financial engineering, that same timeout means someone may have been charged twice, an acquirer may have captured funds without notifying the merchant, or an account ledger may have drifted into negative balance.
                    </p>
                    <p>
                      Over the last seven years, I have specialized in eliminating those failure modes by design. At <strong className="text-slate-300 font-medium">Paymid</strong> (Cyprus), I architect our core multi-PSP payment orchestrator—the pipeline responsible for dynamically evaluating incoming merchant requests, checking card BIN jurisdictions, acquiring atomic distributed Redis mutexes to make duplicate mutations physically impossible, and cascading across secondary fallbacks in under 15 milliseconds when primary acquirers drop.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h2 className="text-lg font-bold text-slate-200 tracking-tight">
                      Engineering Pragmatism & Modern PHP 8.3
                    </h2>
                    <p>
                      I believe in boring, reliable technologies pushed to exceptional throughput. Modern <strong className="text-slate-300 font-medium">PHP 8.3 with strict typing, readonly classes, and persistent worker processes (RoadRunner / Octane)</strong> delivers predictable sub-50ms p99 response times while maintaining maintainable, decoupled domain contracts. Combined with <strong className="text-slate-300 font-medium">Go</strong> for lightweight concurrent daemon workers and <strong className="text-slate-300 font-medium">Redis Cluster</strong> for distributed lock synchronization, our systems process thousands of transaction mutations with zero downtime.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h2 className="text-lg font-bold text-slate-200 tracking-tight">
                      Beyond the Terminal
                    </h2>
                    <p>
                      I operate remotely from Dhaka, seamlessly integrated with European and global timezones. Outside of production alerts and transaction pipelines, I spend time studying distributed consensus literature (Raft, Paxos, Spanner), experimenting with localized caching topologies, brewing pour-over coffee, and mentoring younger backend engineers on the importance of database indexing, invariant defenses, and idempotent API design.
                    </p>
                  </div>

                </div>

                {/* 4 Core Architectural Principles (Unboxed) */}
                <div className="space-y-4 pt-4 border-t border-white/[0.06]">
                  <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Core Engineering Invariants
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-slate-200">01 · Idempotency by Default</div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Never assume a reliable network. Every payment mutation must accept an idempotency key and be safely replayable without side effects.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-slate-200">02 · Pessimistic Integrity over Hope</div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        When account balances are mutated, row-level locks (SELECT FOR UPDATE) and serializable transactions guarantee zero overdraft races.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-slate-200">03 · Zero-Trust Webhook Ingestion</div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Treat asynchronous callbacks as unverified until constant-time HMAC-SHA256 verification and 300s timestamp drift checks confirm origin.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-slate-200">04 · Contract Decoupling</div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Wrap raw third-party gateway APIs behind strict Polymorphic Strategy Pattern drivers so acquirer breaking changes never leak into core domain logic.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Action Strip */}
                <div className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-slate-400">
                    Discussing payment architecture, backend contracts, or a senior engineering role?
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsContactOpen(true)}
                      className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-white text-slate-900 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Contact Farhan</span>
                    </button>
                    <button
                      onClick={handleCopyEmail}
                      className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] text-slate-300 text-xs transition-colors flex items-center gap-1.5"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-slate-200" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                      <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* DETAIL PAGE 2: ARCHITECTURE BLUEPRINT */}
            {currentPage === 'architecture' && (
              <div className="space-y-8 text-left max-w-4xl">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-200 tracking-tight">
                    Payment Architecture
                  </h1>
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
                            ? 'bg-white/[0.06] border-white/[0.15] text-slate-200 shadow-sm'
                            : 'bg-white/[0.015] border-white/[0.05] text-slate-400 hover:text-slate-200 hover:border-white/[0.08]'
                        }`}
                      >
                        <div className="text-[11px] font-bold text-slate-400">
                          Stage {stage.num}
                        </div>
                        <div className="text-xs font-medium text-slate-300 truncate mt-1">
                          {stage.title}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Stage Deep Dive */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                    <span>Stage {activeStage.num}</span>
                    <span>•</span>
                    <span>{activeStage.category}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-200">
                    {activeStage.title}
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        The Financial Failure Mode
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {activeStage.problem}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Architectural Resolution
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {activeStage.solution}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Production Architecture Pattern (PHP 8.3)
                    </h3>
                    <div className="p-4 rounded-xl bg-[#0a0c11] border border-white/[0.06] font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed">
                      <pre>{activeStage.code}</pre>
                    </div>
                  </div>
                </div>

                {/* Stack & System Invariants Section — With Vector Tech Logos! */}
                <div className="space-y-6 pt-6 border-t border-white/[0.06]">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Production Stack & Principles
                    </div>
                    <h2 className="text-xl font-bold text-slate-200 tracking-tight">
                      Core Tech Stack & Systems Invariants
                    </h2>
                    <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                      Technologies and architectural constraints chosen for strict zero-drift transactional processing and sub-15ms latency.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                      <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Languages & Frameworks
                      </h3>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                          <PhpIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>PHP 8.3</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                          <LaravelIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>Laravel 11</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                          <GoIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>Go</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                          <NodeIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>Node.js</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                          <SymfonyIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>Symfony</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed pt-2">
                        Modern PHP 8.3 typed properties, readonly classes, and JIT compilation powering high-throughput API endpoints with low memory footprint.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                      <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Data & Mutex Defense
                      </h3>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                          <RedisIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>Redis Cluster</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                          <MySqlIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>MySQL 8.0</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                          <PostgreSqlIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>PostgreSQL</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed pt-2">
                        Distributed idempotency locks with Redlock algorithm, ACID serializable transactions, and strict row-level pessimistic locking for ledger records.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                      <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Protocols & Standards
                      </h3>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                          <DockerIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>Docker</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                          <TypeScriptIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>TypeScript</span>
                        </span>
                        <span className="px-2.5 py-1 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                          PCI-DSS Ingress
                        </span>
                        <span className="px-2.5 py-1 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300 text-xs">
                          HMAC-SHA256
                        </span>
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
            {currentPage === 'projects' && (() => {
              const projectFilters = [
                { id: 'all', label: 'All Projects', count: PORTFOLIO_DATA.projects.length },
                { id: 'paymid', label: 'Paymid', count: PORTFOLIO_DATA.projects.filter(p => p.company.includes('Paymid')).length },
                { id: 'sj', label: 'SJ Innovation', count: PORTFOLIO_DATA.projects.filter(p => p.company.includes('SJ Innovation')).length },
                { id: 'namhost', label: 'Namhost', count: PORTFOLIO_DATA.projects.filter(p => p.company.includes('Namhost')).length },
                { id: 'instantwebb', label: 'Instantwebb', count: PORTFOLIO_DATA.projects.filter(p => p.company.includes('Instantwebb')).length },
                { id: 'iylma', label: 'IYLMA', count: PORTFOLIO_DATA.projects.filter(p => p.company.includes('IYLMA')).length },
                { id: 'perky', label: 'Perky Rabbit', count: PORTFOLIO_DATA.projects.filter(p => p.company.includes('Perky Rabbit')).length },
                { id: 'mienit', label: 'MIEN IT', count: PORTFOLIO_DATA.projects.filter(p => p.company.includes('MIEN IT')).length },
              ];

              const filteredProjects = PORTFOLIO_DATA.projects.filter(project => {
                if (projectFilter === 'all') return true;
                if (projectFilter === 'paymid') return project.company.includes('Paymid');
                if (projectFilter === 'sj') return project.company.includes('SJ Innovation');
                if (projectFilter === 'namhost') return project.company.includes('Namhost');
                if (projectFilter === 'instantwebb') return project.company.includes('Instantwebb');
                if (projectFilter === 'iylma') return project.company.includes('IYLMA');
                if (projectFilter === 'perky') return project.company.includes('Perky Rabbit');
                if (projectFilter === 'mienit') return project.company.includes('MIEN IT');
                return true;
              });

              return (
                <div className="space-y-8 text-left max-w-4xl">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-200 tracking-tight">
                      Projects
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                      {PORTFOLIO_DATA.projects.length} production platforms engineered across FinTech, enterprise DXP migrations, government operational infrastructure, and health systems.
                    </p>
                  </div>

                  {/* Company Filter Tabs */}
                  <div className="flex flex-wrap items-center gap-1.5 pb-1">
                    {projectFilters.map(filter => (
                      <button
                        key={filter.id}
                        onClick={() => setProjectFilter(filter.id)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                          projectFilter === filter.id
                            ? 'bg-white/[0.08] text-slate-100 border-white/[0.2] font-medium'
                            : 'bg-white/[0.02] text-slate-400 border-white/[0.05] hover:text-slate-200 hover:bg-white/[0.04]'
                        }`}
                      >
                        <span>{filter.label}</span>
                        <span className={`ml-1.5 text-[10px] ${projectFilter === filter.id ? 'text-slate-300' : 'text-slate-500'}`}>
                          {filter.count}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-6">
                    {filteredProjects.map((project) => (
                      <div
                        key={project.id}
                        className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="flex items-start gap-3.5">
                            {project.companyLogo && (
                              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1.5 shrink-0 shadow-sm border border-white/[0.1] overflow-hidden">
                                <img
                                  src={project.companyLogo}
                                  alt={`${project.company} logo`}
                                  className="w-full h-full object-contain"
                                  loading="lazy"
                                />
                              </div>
                            )}
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs font-semibold text-slate-300">
                                  {project.company}
                                </span>
                                <span className="text-slate-600">•</span>
                                <span className="text-[11px] text-slate-400 bg-white/[0.035] px-2 py-0.5 rounded border border-white/[0.06]">
                                  {project.category}
                                </span>
                              </div>
                              <h2 className="text-lg sm:text-xl font-bold text-slate-200 mt-1">
                                {project.title}
                              </h2>
                            </div>
                          </div>

                          <div className="text-xs text-slate-400 sm:text-right shrink-0 pt-1">
                            {project.period}
                          </div>
                        </div>

                        <p className="text-sm text-slate-400 leading-relaxed">
                          {project.summary}
                        </p>

                        {project.metrics && project.metrics.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                            {project.metrics.map((metric, mIdx) => (
                              <div
                                key={mIdx}
                                className="px-3 py-2 rounded-lg bg-white/[0.015] border border-white/[0.05] text-xs text-slate-300"
                              >
                                {metric}
                              </div>
                            ))}
                          </div>
                        )}

                        {project.architecturePoints && project.architecturePoints.length > 0 && (
                          <div className="space-y-1.5 pt-2">
                            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                              Architectural Highlights
                            </h3>
                            <ul className="space-y-1.5 text-xs text-slate-400">
                              {project.architecturePoints.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-slate-500 mt-0.5">•</span>
                                  <span className="leading-relaxed">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.05]">
                          {project.techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2.5 py-0.5 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* DETAIL PAGE 4: EXPERIENCE */}
            {currentPage === 'experience' && (
              <div className="space-y-8 text-left max-w-4xl">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-200 tracking-tight">
                    Work Experience
                  </h1>
                </div>

                {/* Roles Timeline */}
                <div className="space-y-6">
                  {PORTFOLIO_DATA.experiences.map((exp, idx) => (
                    <div
                      key={idx}
                      className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          {exp.logo && (
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-1.5 shrink-0 shadow-sm border border-white/[0.1] overflow-hidden">
                              <img
                                src={exp.logo}
                                alt={`${exp.company} logo`}
                                className="w-full h-full object-contain"
                                loading="lazy"
                              />
                            </div>
                          )}
                          <div>
                            <div className="flex flex-wrap items-baseline gap-2">
                              <h2 className="text-lg sm:text-xl font-bold text-slate-200">
                                {exp.role}
                              </h2>
                              <span className="text-slate-500 text-sm">at</span>
                              {exp.website ? (
                                <a
                                  href={exp.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-slate-300 font-semibold text-base hover:text-white inline-flex items-center gap-1 group/link transition-colors"
                                >
                                  <span>{exp.company}</span>
                                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/link:opacity-100 transition-opacity" />
                                </a>
                              ) : (
                                <span className="text-slate-300 font-semibold text-base">{exp.company}</span>
                              )}
                            </div>
                            <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                              <span>{exp.location}</span>
                              <span className="text-slate-600">•</span>
                              <span>{exp.type}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-xs text-slate-400 sm:text-right shrink-0 pt-0.5">
                          <div className="font-medium text-slate-300">{exp.period}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{exp.duration}</div>
                        </div>
                      </div>

                      <p className="text-sm text-slate-400 leading-relaxed">
                        {exp.description}
                      </p>

                      <ul className="space-y-1.5 text-xs text-slate-400">
                        {exp.highlights.map((hl, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <span className="text-slate-500 mt-0.5">•</span>
                            <span className="leading-relaxed">{hl}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.05]">
                        {exp.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-xs px-2.5 py-0.5 rounded bg-white/[0.025] border border-white/[0.06] text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Manager Testimonial */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2 mt-4">
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{PORTFOLIO_DATA.recommendations[0].quote}"
                  </p>
                  <div className="pt-2 border-t border-white/[0.05] text-xs flex flex-wrap items-baseline justify-between gap-1">
                    <div className="font-semibold text-slate-200">{PORTFOLIO_DATA.recommendations[0].name}</div>
                    <div className="text-slate-400">
                      {PORTFOLIO_DATA.recommendations[0].title} · SJ Innovation
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
