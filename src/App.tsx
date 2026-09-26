import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowLeft,
  Mail, 
  Layers, 
  Briefcase, 
  GraduationCap, 
  Quote, 
  Cpu, 
  ShieldCheck,
  Lock,
  GitBranch,
  Database,
  Key
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
  const [copiedCli, setCopiedCli] = useState(false);
  const [activeStageId, setActiveStageId] = useState<string>('idempotency');

  // Handle browser back/forward and hash
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

  const handleCopyCli = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('npx farhankhan');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const stages = [
    {
      id: 'ingress',
      num: '01',
      title: 'Boundary Ingress & Tokenization',
      category: 'PCI-DSS Boundary',
      icon: Key,
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
      icon: Lock,
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
      icon: GitBranch,
      problem: 'Acquirer outages or latency spikes (HTTP 502/504) causing checkout drops and bleeding merchant conversion.',
      solution: 'Dynamic routing solver evaluating card BIN, customer jurisdiction, and real-time acquirer health. The circuit breaker hot-swaps to secondary fallbacks in <15ms.',
      code: `foreach ($this->router->resolvePriorityChain($request) as $gateway) {
    if ($this->circuitBreaker->isOpen($gateway->id())) continue;
    try {
        $result = $gateway->charge($request);
        if ($result->isSuccessful()) return $result;
    } catch (GatewayTimeoutException $e) {
        $this->circuitBreaker->recordFailure($gateway->id());
    }
}
throw new AllAcquirersDegradedException();`
    },
    {
      id: 'drivers',
      num: '04',
      title: 'Unified Acquirer Driver Strategy',
      category: 'Strategy Pattern',
      icon: Cpu,
      problem: 'Integrating dozens of disparate PSP APIs leads to brittle vendor lock-in and chaotic custom handlers.',
      solution: 'Strict Strategy Pattern abstraction. New acquirers and local APMs can be onboarded in under 48 hours without modifying core transaction orchestration logic.',
      code: `interface PaymentGatewayDriverInterface {
    public function authorize(PaymentRequest $req): GatewayResult;
    public function capture(string $txId, Money $amount): GatewayResult;
    public function refund(string $txId, Money $amount): GatewayResult;
    public function verifyWebhookSignature(Request $req): bool;
}`
    },
    {
      id: 'webhooks',
      num: '05',
      title: 'Constant-Time HMAC Webhook Ingestion',
      category: 'Event Security',
      icon: ShieldCheck,
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
      icon: Database,
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
    <div className="min-h-screen bg-[#0b1120] text-slate-300 font-sans selection:bg-sky-500/20 selection:text-sky-200">
      
      {/* =========================================================================
          VIEW A: SINGLE PAGE BENTO GRID (Zero Scroll on Desktop, Summarizing Everything)
          ========================================================================= */}
      {currentPage === 'bento' && (
        <div className="min-h-screen lg:h-screen flex flex-col justify-between p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          
          {/* Top Navbar */}
          <header className="flex items-center justify-between pb-4 border-b border-slate-800/80 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-base font-bold text-slate-100 tracking-tight font-sans">
                {PORTFOLIO_DATA.engineer.name}
              </span>
              <span className="inline-flex items-center bg-slate-800/80 text-slate-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-slate-700/60">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-400 mr-1.5 animate-pulse"></span>
                Paymid • Remote
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsContactOpen(true)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-750 border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Contact</span>
              </button>
            </div>
          </header>

          {/* Bento Grid: 12 Columns, No Scroll on Desktop */}
          <main className="my-auto py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5 flex-1 items-stretch">
            
            {/* BOX 1: Persona & Narrative Summary (5 cols) -> Clicks to About */}
            <div
              onClick={() => navigateTo('about')}
              className="lg:col-span-5 rounded-2xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-slate-850/60 transition-all cursor-pointer group shadow-sm"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="/farhan.jpg"
                    alt={PORTFOLIO_DATA.engineer.name}
                    className="w-16 h-16 rounded-xl border border-slate-700 object-cover bg-slate-950 shadow shrink-0"
                    width="64"
                    height="64"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-slate-100 tracking-tight group-hover:text-sky-300 transition-colors">
                      {PORTFOLIO_DATA.engineer.name}
                    </h2>
                    <p className="text-xs text-slate-400 font-medium">
                      Senior Backend & Payment Systems Engineer
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  Architecting multi-PSP orchestration pipelines, distributed idempotency mutexes, and zero-variance double-entry ledgers at Paymid.
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="text-slate-500 font-mono">7+ Yrs Production Backend</span>
                <span className="text-sky-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Read full bio</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* BOX 2: Architecture Blueprint Summary (7 cols) -> Clicks to Architecture */}
            <div
              onClick={() => navigateTo('architecture')}
              className="lg:col-span-7 rounded-2xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-slate-850/60 transition-all cursor-pointer group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold uppercase tracking-wider">
                    <Layers className="w-4 h-4" />
                    <span>System Architecture Blueprint</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">&lt;15ms Automated Failover</span>
                </div>

                <h3 className="text-lg font-bold text-slate-100 tracking-tight mb-2 group-hover:text-sky-300 transition-colors">
                  Anatomy of a Fault-Tolerant Payment Rail
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  Multi-acquirer routing solver, Redis atomic mutexes, Strategy Pattern drivers, and strict double-entry ledger bookkeeping.
                </p>

                {/* Micro stage pills */}
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {['01 Ingress Contract', '02 Redis Mutex', '03 Smart Router', '04 Strategy Drivers', '05 HMAC Webhook', '06 Double-Entry'].map((s) => (
                    <span key={s} className="px-2 py-1 rounded-md bg-slate-950/70 border border-slate-800 text-slate-400 text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="text-slate-500 font-mono">PHP 8.3 • Concurrency Invariants</span>
                <span className="text-sky-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Inspect Blueprint & Code</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* BOX 3: Selected Enterprise Projects (4 cols) -> Clicks to Projects */}
            <div
              onClick={() => navigateTo('projects')}
              className="lg:col-span-4 rounded-2xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-slate-850/60 transition-all cursor-pointer group shadow-sm"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold uppercase tracking-wider mb-3">
                  <Briefcase className="w-4 h-4" />
                  <span>Selected Platforms</span>
                </div>

                <h3 className="text-base font-bold text-slate-100 mb-2 group-hover:text-sky-300 transition-colors">
                  4 Production Systems
                </h3>

                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">Paymid</span>
                    <span className="text-slate-500 font-mono">Global PSP Engine</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">Namhost</span>
                    <span className="text-slate-500 font-mono">Cross-Border Fintech</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">Johnson & Johnson</span>
                    <span className="text-slate-500 font-mono">DXP Modernization</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">Grameenphone</span>
                    <span className="text-slate-500 font-mono">Telecom Systems</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="text-slate-500 font-mono">FinTech & Lending</span>
                <span className="text-sky-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>View Project Specs</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* BOX 4: Career Experience (4 cols) -> Clicks to Experience */}
            <div
              onClick={() => navigateTo('experience')}
              className="lg:col-span-4 rounded-2xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-slate-850/60 transition-all cursor-pointer group shadow-sm"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold uppercase tracking-wider mb-3">
                  <GraduationCap className="w-4 h-4" />
                  <span>Career & Academic Rigor</span>
                </div>

                <h3 className="text-base font-bold text-slate-100 mb-2 group-hover:text-sky-300 transition-colors">
                  Career Track Record
                </h3>

                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">Paymid (Cyprus)</span>
                    <span className="text-slate-500 font-mono">2023 — Present</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">SJ Innovation</span>
                    <span className="text-slate-500 font-mono">2021 — 2023</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">KUET (ECE '13)</span>
                    <span className="text-slate-500 font-mono">B.Sc. in Engineering</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="text-slate-500 font-mono">Timeline & KUET</span>
                <span className="text-sky-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>View Timeline</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* BOX 5: Core Tech Stack & Protocols (4 cols) */}
            <div
              onClick={() => navigateTo('architecture')}
              className="lg:col-span-4 rounded-2xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-slate-850/60 transition-all cursor-pointer group shadow-sm"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold uppercase tracking-wider mb-3">
                  <Cpu className="w-4 h-4" />
                  <span>Core Tech Stack</span>
                </div>

                <h3 className="text-base font-bold text-slate-100 mb-2 group-hover:text-sky-300 transition-colors">
                  Backend & Invariants
                </h3>

                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {['PHP 8.3', 'Laravel 11', 'Go', 'Redis Cluster', 'MySQL', 'PostgreSQL', 'Docker', 'PCI-DSS'].map((item) => (
                    <span key={item} className="px-2 py-1 rounded bg-slate-950/70 border border-slate-800 text-slate-300 text-[11px]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="text-slate-500 font-mono">Zero Toy Dependencies</span>
                <span className="text-sky-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Stack details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

          </main>

          {/* Bottom Bar / Quick Links */}
          <footer className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400 shrink-0">
            <div
              onClick={handleCopyCli}
              title="Click to copy CLI command"
              className="inline-flex items-center gap-2 py-1 px-2.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group"
            >
              <span className="text-sky-400 font-bold">$</span>
              <span className="text-slate-300 group-hover:underline">npx farhankhan</span>
              <span className="text-slate-500 text-[11px]">
                {copiedCli ? 'Copied!' : '— try CLI portfolio'}
              </span>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <a href={PORTFOLIO_DATA.engineer.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-slate-100 transition-colors">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href={PORTFOLIO_DATA.engineer.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-slate-100 transition-colors">
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-100 transition-colors">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <button onClick={() => setIsContactOpen(true)} className="hover:text-slate-100 transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </footer>

        </div>
      )}

      {/* =========================================================================
          VIEW B: CLEAN SEPARATE DETAIL PAGES (Like Brittany Chiang Clean Layout)
          ========================================================================= */}
      {currentPage !== 'bento' && (
        <div className="min-h-screen max-w-4xl mx-auto px-6 py-12 lg:py-16">
          
          {/* Top Sticky Navigation Bar */}
          <div className="sticky top-0 z-30 -mx-6 px-6 py-4 bg-[#0b1120]/90 backdrop-blur border-b border-slate-800/80 mb-10 flex items-center justify-between">
            <button
              onClick={() => navigateTo('bento')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors group px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Overview</span>
            </button>

            {/* Quick tabs */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <button
                onClick={() => navigateTo('about')}
                className={`px-2.5 py-1 rounded transition-colors ${currentPage === 'about' ? 'text-sky-400 bg-sky-500/10 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                About
              </button>
              <button
                onClick={() => navigateTo('architecture')}
                className={`px-2.5 py-1 rounded transition-colors ${currentPage === 'architecture' ? 'text-sky-400 bg-sky-500/10 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Architecture
              </button>
              <button
                onClick={() => navigateTo('projects')}
                className={`px-2.5 py-1 rounded transition-colors ${currentPage === 'projects' ? 'text-sky-400 bg-sky-500/10 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Projects
              </button>
              <button
                onClick={() => navigateTo('experience')}
                className={`px-2.5 py-1 rounded transition-colors ${currentPage === 'experience' ? 'text-sky-400 bg-sky-500/10 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Experience
              </button>
            </div>
          </div>

          {/* DETAIL PAGE 1: ABOUT */}
          {currentPage === 'about' && (
            <div className="space-y-8 animate-fadeIn text-left">
              <div className="flex items-center gap-5 pb-6 border-b border-slate-800">
                <img
                  src="/farhan.jpg"
                  alt={PORTFOLIO_DATA.engineer.name}
                  className="w-20 h-20 rounded-2xl border-2 border-slate-700 object-cover shadow-lg"
                  width="80"
                  height="80"
                />
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">
                    {PORTFOLIO_DATA.engineer.name}
                  </h1>
                  <p className="text-base text-slate-300 font-medium mt-1">
                    Senior Backend & Payment Systems Engineer at Paymid
                  </p>
                  <p className="text-xs text-slate-500 font-mono mt-1">
                    Limassol, Cyprus (Remote) • Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div className="space-y-5 text-base text-slate-300 leading-relaxed font-sans max-w-3xl">
                <p>
                  I’m a backend engineer with over 7 years of production experience, specializing in payment gateway integration, multi-PSP orchestration, and distributed transactional systems. I care deeply about building resilient financial rails where race conditions, duplicate webhooks, and upstream acquirer timeouts are solved by design.
                </p>

                <p>
                  Currently, I’m a Senior Backend Engineer at{' '}
                  <a
                    href="https://paymid.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-100 font-semibold hover:text-sky-400 transition-colors underline underline-offset-4"
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
                  <strong className="text-slate-100 font-semibold">Khulna University of Engineering & Technology (KUET)</strong> in Electrical, Electronics & Communication Engineering (Batch ECE '13). When away from production logs, I study distributed consensus papers, brew pour-over coffee, and mentor engineers.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800 flex items-center gap-4">
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-white text-slate-950 font-bold text-xs font-mono transition-colors"
                >
                  Contact Farhan
                </button>
                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-mono transition-colors"
                >
                  {copiedEmail ? 'Copied Email' : 'Copy Email'}
                </button>
              </div>
            </div>
          )}

          {/* DETAIL PAGE 2: ARCHITECTURE BLUEPRINT */}
          {currentPage === 'architecture' && (
            <div className="space-y-10 animate-fadeIn text-left">
              <div>
                <div className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider mb-2">
                  Technical Architecture
                </div>
                <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">
                  Anatomy of a Fault-Tolerant Payment Rail
                </h1>
                <p className="text-base text-slate-400 mt-2 max-w-2xl leading-relaxed">
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
                          ? 'bg-slate-800 border-sky-400 text-slate-100 shadow-md ring-1 ring-sky-400/30'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-mono text-[10px] uppercase font-bold text-slate-400">
                        Stage {stage.num}
                      </div>
                      <div className="text-xs font-bold text-slate-200 truncate mt-1">
                        {stage.title}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Stage Deep Dive */}
              <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold uppercase">
                  <span>Stage {activeStage.num}</span>
                  <span>•</span>
                  <span>{activeStage.category}</span>
                </div>

                <h2 className="text-2xl font-bold text-slate-100">
                  {activeStage.title}
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-mono font-bold text-slate-400 uppercase mb-1">
                      The Financial Failure Mode
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                      {activeStage.problem}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-mono font-bold text-slate-400 uppercase mb-1">
                      Architectural Resolution
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                      {activeStage.solution}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase mb-2">
                    Production Architecture Pattern (PHP 8.3)
                  </h3>
                  <div className="p-4 rounded-xl bg-[#060a12] border border-slate-800 font-mono text-xs overflow-x-auto text-slate-200 leading-relaxed">
                    <pre>{activeStage.code}</pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DETAIL PAGE 3: PROJECTS */}
          {currentPage === 'projects' && (
            <div className="space-y-10 animate-fadeIn text-left">
              <div>
                <div className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider mb-2">
                  Production Platforms
                </div>
                <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">
                  Selected Systems & Production Migrations
                </h1>
                <p className="text-base text-slate-400 mt-2 max-w-2xl leading-relaxed">
                  Real enterprise platforms across payment gateway orchestration, cross-border credit, and telecom billing backends.
                </p>
              </div>

              <div className="space-y-8">
                {PORTFOLIO_DATA.projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-mono font-semibold text-sky-300 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
                        {project.company}
                      </span>
                      <span className="text-xs font-mono text-slate-400 font-medium">
                        {project.period}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-100">
                      {project.title}
                    </h2>

                    <p className="text-base text-slate-300 leading-relaxed">
                      {project.summary}
                    </p>

                    <div className="space-y-2 pt-2">
                      <h3 className="text-xs font-mono font-bold text-slate-400 uppercase">
                        Architectural Highlights
                      </h3>
                      <ul className="space-y-2 text-sm text-slate-300">
                        {project.architecturePoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="text-sky-400 mt-1">•</span>
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
                      {project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-mono px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300"
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
            <div className="space-y-10 animate-fadeIn text-left">
              <div>
                <div className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider mb-2">
                  Career Record
                </div>
                <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">
                  Work Experience & Academic Rigor
                </h1>
                <p className="text-base text-slate-400 mt-2 max-w-2xl leading-relaxed">
                  Over seven years building transactional web applications, payment rails, and enterprise microservices.
                </p>
              </div>

              {/* Roles Timeline */}
              <div className="space-y-8">
                {PORTFOLIO_DATA.experiences.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h2 className="text-xl font-bold text-slate-100">
                          {exp.role}
                        </h2>
                        <span className="text-slate-500 font-mono text-sm">at</span>
                        <span className="text-slate-200 font-semibold text-base">{exp.company}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400 font-medium">
                        {exp.period}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-slate-500">
                      {exp.location} • {exp.type}
                    </div>

                    <p className="text-base text-slate-300 leading-relaxed">
                      {exp.description}
                    </p>

                    <ul className="space-y-2 text-sm text-slate-300">
                      {exp.highlights.map((hl, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5">
                          <span className="text-sky-400 mt-1">•</span>
                          <span className="leading-relaxed">{hl}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
                      {exp.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs font-mono px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Education & Recommendation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                
                {/* KUET Education */}
                <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold uppercase">
                    <GraduationCap className="w-4 h-4" />
                    <span>Education</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100">
                    Khulna University of Engineering & Technology (KUET)
                  </h3>
                  <div className="text-sm text-slate-300 font-medium">
                    Bachelor of Engineering in Electrical, Electronics & Communication Engineering
                  </div>
                  <div className="text-xs font-mono text-slate-500">
                    Batch of ECE '13 • 2014 – 2019
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed pt-3 border-t border-slate-800">
                    Rigorous 4-year engineering foundation in telecommunication protocols, signal processing, network topologies, and computational systems.
                  </p>
                </div>

                {/* Manager Testimonial */}
                <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 relative">
                  <Quote className="w-10 h-10 text-white/[0.03] absolute top-4 right-4 pointer-events-none" />
                  <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold uppercase">
                    <Quote className="w-4 h-4" />
                    <span>Manager Testimonial</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed italic">
                    "{PORTFOLIO_DATA.recommendations[0].quote}"
                  </p>
                  <div className="pt-3 border-t border-slate-800 text-xs">
                    <div className="font-bold text-slate-100">{PORTFOLIO_DATA.recommendations[0].name}</div>
                    <div className="text-xs font-mono text-slate-400 mt-0.5">
                      {PORTFOLIO_DATA.recommendations[0].title}
                    </div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">
                      Direct Manager at SJ Innovation
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      )}

      {/* Direct Ingress Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

    </div>
  );
};

export default App;
