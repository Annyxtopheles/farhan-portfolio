import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Check, 
  Copy, 
  Mail, 
  Layers, 
  Briefcase, 
  GraduationCap, 
  Quote, 
  Server, 
  Cpu, 
  ArrowRight,
  ShieldCheck,
  Lock,
  GitBranch,
  Database,
  Key
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon } from './icons/GithubIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';

interface BentoGridProps {
  onOpenContact: () => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ onOpenContact }) => {
  const [copiedCli, setCopiedCli] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeStageId, setActiveStageId] = useState<string>('idempotency');

  const handleCopyCli = () => {
    navigator.clipboard.writeText('npx farhankhan');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.engineer.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const stages = [
    {
      id: 'ingress',
      num: '01',
      title: 'Boundary Ingress & Tokenization',
      category: 'Security Boundary',
      icon: Key,
      problem: 'Raw card details or malformed payloads reaching backend services violate PCI-DSS compliance and risk injection.',
      solution: 'Stateless ingress layer enforcing strict DTO contracts. Card PANs are exchanged for ephemeral client tokens before reaching internal services.',
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
      problem: 'Mobile network retries or aggressive client mutations submitting identical requests twice, risking catastrophic double charges.',
      solution: 'Distributed mutex acquired in Redis cluster using the client idempotency key for 120s. In-flight duplicates return HTTP 409, while previously completed mutations immediately serve signed cached receipts.',
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
      category: 'Smart Routing',
      icon: GitBranch,
      problem: 'Upstream acquirer latency spikes or HTTP 5xx errors dropping checkouts and bleeding merchant conversion.',
      solution: 'Real-time solver evaluating card BIN, jurisdiction, fee tier, and gateway health. On latency spike or timeout threshold, the circuit breaker hot-swaps to secondary fallbacks in <15ms.',
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
      problem: 'Disparate PSP APIs (Stripe, Adyen, Checkout, local APMs) leading to brittle vendor lock-in and spaghetti code.',
      solution: 'Strict Strategy Pattern abstraction. New acquirers and local payment rails can be onboarded in under 48 hours without modifying core orchestration logic.',
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
      problem: 'Asynchronous payment state callbacks are vulnerable to replay attacks, signature tampering, and out-of-order execution.',
      solution: 'Workers verify constant-time HMAC-SHA256 signatures against gateway secrets and enforce strict timestamp drift windows to neutralize replay attacks.',
      code: `$expected = hash_hmac('sha256', "{$timestamp}.{$rawPayload}", $gatewaySecret);
if (!hash_equals($expected, $headerSignature)) {
    abort(401, "Invalid webhook signature");
}
if (abs(now()->timestamp - $timestamp) > 300) {
    abort(400, "Timestamp expired (replay defense)");
}`
    },
    {
      id: 'ledger',
      num: '06',
      title: 'Double-Entry Ledger & ACID State',
      category: 'Financial Integrity',
      icon: Database,
      problem: 'Single-entry balance updates causing rounding drift, race-condition overdrafts, and untraceable financial variance.',
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      
      {/* ========================================================
          ROW 1: Large Bio Tile (8 cols) + Key Metrics Tile (4 cols)
          ======================================================== */}
      <div id="overview" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* TILE 1: Personal Bio & Narrative (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl bg-[#0f172a]/70 border border-slate-800/90 p-8 sm:p-10 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg">
          <div>
            {/* Identity Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-7">
              <img
                src="/farhan.jpg"
                alt={PORTFOLIO_DATA.engineer.name}
                className="w-24 h-24 rounded-2xl border-2 border-slate-700/80 object-cover bg-slate-900 shadow-md shrink-0"
                width="96"
                height="96"
              />
              <div>
                <div className="flex items-center flex-wrap gap-2.5 mb-1.5">
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight font-sans">
                    {PORTFOLIO_DATA.engineer.name}
                  </h1>
                  <span className="inline-flex items-center bg-slate-800/90 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full border border-slate-700/70">
                    <span className="inline-block w-2 h-2 rounded-full bg-sky-400 mr-2 animate-pulse"></span>
                    Paymid • Remote
                  </span>
                </div>

                <p className="text-base text-slate-300 font-medium">
                  Senior Backend & Payment Systems Engineer
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-4 mt-3 text-sm text-slate-400">
                  <a
                    href={PORTFOLIO_DATA.engineer.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-slate-100 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4 text-slate-400" />
                    <span>GitHub</span>
                  </a>
                  <span className="text-slate-700">•</span>
                  <a
                    href={PORTFOLIO_DATA.engineer.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-slate-100 transition-colors"
                  >
                    <LinkedInIcon className="w-4 h-4 text-slate-400" />
                    <span>LinkedIn</span>
                  </a>
                  <span className="text-slate-700">•</span>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-slate-100 transition-colors"
                  >
                    <TwitterIcon className="w-4 h-4 text-slate-400" />
                    <span>Twitter</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Clear, Spacious, Legible Narrative Bio */}
            <div className="space-y-4 text-base text-slate-300 leading-relaxed font-sans">
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
            </div>
          </div>

          {/* Bottom Bar: CLI Prompt & Direct Action */}
          <div className="pt-6 mt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div
              onClick={handleCopyCli}
              title="Click to copy CLI command"
              className="inline-flex items-center gap-2 text-sm font-mono text-slate-400 py-2 px-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group"
            >
              <span className="text-sky-400 font-bold">$</span>
              <span className="text-slate-200 group-hover:underline group-hover:underline-offset-2">
                npx farhankhan
              </span>
              <span className="text-slate-500 text-xs">
                — {copiedCli ? 'Copied to clipboard!' : 'try my CLI portfolio'}
              </span>
              {copiedCli ? (
                <Check className="w-4 h-4 text-sky-400" />
              ) : (
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
              )}
            </div>

            <button
              onClick={onOpenContact}
              className="text-sm font-medium text-slate-100 hover:text-white px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

        </div>

        {/* TILE 2: High-Signal Metrics Tile (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl bg-[#0f172a]/70 border border-slate-800/90 p-8 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold uppercase tracking-wider mb-6">
              <Server className="w-4 h-4" />
              <span>Production Invariants</span>
            </div>

            <div className="space-y-6">
              <div className="pb-5 border-b border-slate-800">
                <div className="text-4xl font-extrabold text-slate-100 font-mono tracking-tight">
                  200+
                </div>
                <div className="text-sm font-semibold text-slate-200 mt-1">
                  Payment Gateways Integrated
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Stripe, Adyen, Checkout.com, SEPA, and regional acquirers.
                </p>
              </div>

              <div className="pb-5 border-b border-slate-800">
                <div className="text-4xl font-extrabold text-slate-100 font-mono tracking-tight">
                  700+
                </div>
                <div className="text-sm font-semibold text-slate-200 mt-1">
                  Alternative Payment Methods
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  APMs onboarded with Strategy Pattern driver interface.
                </p>
              </div>

              <div className="pb-5 border-b border-slate-800">
                <div className="text-4xl font-extrabold text-sky-400 font-mono tracking-tight">
                  &lt;15ms
                </div>
                <div className="text-sm font-semibold text-slate-200 mt-1">
                  Automated Acquirer Failover
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Circuit breaker hot-swaps on timeouts to prevent drop-offs.
                </p>
              </div>

              <div>
                <div className="text-4xl font-extrabold text-slate-100 font-mono tracking-tight">
                  0.00%
                </div>
                <div className="text-sm font-semibold text-slate-200 mt-1">
                  Ledger Mathematical Variance
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Strict double-entry journal balance with row-level locks.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-800 text-xs font-mono text-slate-500 text-center">
            7+ Years Production Experience
          </div>
        </div>

      </div>

      {/* ========================================================
          ROW 2: Spacious Interactive Architecture Blueprint (12 cols)
          ======================================================== */}
      <div id="architecture" className="rounded-3xl bg-[#0f172a]/70 border border-slate-800/90 p-8 sm:p-10 hover:border-slate-700 transition-all shadow-lg">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold uppercase tracking-wider mb-1.5">
              <Layers className="w-4 h-4" />
              <span>Interactive Architecture Blueprint</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Anatomy of a Fault-Tolerant Payment Rail
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md font-normal md:text-right leading-relaxed">
            Click any architectural stage below to inspect the concurrency invariants and implementation logic.
          </p>
        </div>

        {/* 2-Column Blueprint Inspector with Generous Legible Sizing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Stage Buttons (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider mb-2">
              Pipeline Stages
            </div>

            {stages.map((stage) => {
              const isSelected = stage.id === activeStageId;
              const Icon = stage.icon;

              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                    isSelected
                      ? 'bg-slate-800/90 border-sky-500/50 text-slate-100 shadow-md ring-1 ring-sky-500/20'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl mt-0.5 shrink-0 ${isSelected ? 'bg-sky-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-mono text-xs font-semibold text-slate-400 uppercase">
                        Stage {stage.num} • {stage.category}
                      </span>
                      {isSelected && (
                        <span className="text-xs font-mono text-sky-400 flex items-center gap-1 font-semibold">
                          <span>Active</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-100">
                      {stage.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Deep-Dive Inspection Panel (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-slate-950/80 border border-slate-800 p-7 space-y-6">
            
            {/* Active Stage Header */}
            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold uppercase">
                <span>Stage {activeStage.num}</span>
                <span>•</span>
                <span>{activeStage.category}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight mt-1.5">
                {activeStage.title}
              </h3>
            </div>

            {/* Problem & Solution Breakdown with Large Readable Text */}
            <div className="space-y-4">
              <div>
                <div className="font-mono text-xs font-bold text-slate-400 uppercase mb-1.5">
                  The Financial Failure Mode
                </div>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  {activeStage.problem}
                </p>
              </div>

              <div>
                <div className="font-mono text-xs font-bold text-slate-400 uppercase mb-1.5">
                  Architectural Resolution
                </div>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  {activeStage.solution}
                </p>
              </div>
            </div>

            {/* Production Code Pattern */}
            <div className="pt-2">
              <div className="font-mono text-xs font-bold text-slate-400 uppercase mb-2">
                Production Pattern (PHP 8.3)
              </div>
              <div className="p-4 rounded-xl bg-[#060a12] border border-slate-800 font-mono text-xs overflow-x-auto text-slate-200 leading-relaxed">
                <pre>{activeStage.code}</pre>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ========================================================
          ROW 3: Selected Projects (8 cols) + Core Tech Stack (4 cols)
          ======================================================== */}
      <div id="projects" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* TILE 4: Selected Enterprise Projects (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl bg-[#0f172a]/70 border border-slate-800/90 p-8 sm:p-10 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg">
          <div>
            <div className="flex items-center justify-between gap-4 mb-7 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold uppercase tracking-wider mb-1">
                  <Briefcase className="w-4 h-4" />
                  <span>Selected Platforms</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                  Production Systems & Migrations
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                4 Flagship Systems
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PORTFOLIO_DATA.projects.map((project) => (
                <div
                  key={project.id}
                  className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-2.5">
                      <span className="text-sky-300 font-semibold bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">
                        {project.company}
                      </span>
                      <span className="text-slate-400 font-medium">{project.period}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-100 mb-2 leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      {project.summary}
                    </p>

                    <ul className="space-y-1.5 mb-4 text-xs text-slate-400">
                      {project.architecturePoints?.slice(0, 2).map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-sky-400 mt-0.5">•</span>
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TILE 5: Core Tech Stack (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl bg-[#0f172a]/70 border border-slate-800/90 p-8 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold uppercase tracking-wider mb-6 pb-4 border-b border-slate-800">
              <Cpu className="w-4 h-4" />
              <span>Core Stack & Standards</span>
            </div>

            <div className="space-y-6 text-sm">
              <div>
                <div className="font-mono text-xs font-bold text-slate-400 uppercase mb-2">
                  Languages & Frameworks
                </div>
                <div className="flex flex-wrap gap-2">
                  {['PHP 8.3', 'Laravel 11', 'Go', 'Node.js', 'TypeScript', 'Symfony'].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-mono text-xs font-bold text-slate-400 uppercase mb-2">
                  Data & Concurrency
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Redis Cluster', 'Redlock Mutex', 'PostgreSQL', 'MySQL', 'Row Locks'].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-mono text-xs font-bold text-slate-400 uppercase mb-2">
                  Architecture & Patterns
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Strategy Pattern', 'Circuit Breakers', 'Double-Entry Ledger', 'Distributed Mutex'].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-mono text-xs font-bold text-slate-400 uppercase mb-2">
                  Security & Compliance
                </div>
                <div className="flex flex-wrap gap-2">
                  {['PCI-DSS Ingress', 'HMAC-SHA256', 'OpenAPI Contracts', 'Docker', 'Linux'].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-800 text-xs font-mono text-slate-500 text-center">
            Zero Gimmicks • Enterprise Scaled
          </div>
        </div>

      </div>

      {/* ========================================================
          ROW 4: Career Experience & KUET Education (12 cols)
          ======================================================== */}
      <div id="experience" className="rounded-3xl bg-[#0f172a]/70 border border-slate-800/90 p-8 sm:p-10 hover:border-slate-700 transition-all shadow-lg">
        
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold uppercase tracking-wider mb-1">
              <Briefcase className="w-4 h-4" />
              <span>Career Record & Foundation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Work Experience & Academic Rigor
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500 hidden sm:inline">
            7+ Years Track Record
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Chronological Experience (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {PORTFOLIO_DATA.experiences.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 hover:border-slate-700 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="text-base font-bold text-slate-100">
                      {exp.role}
                    </h3>
                    <span className="text-slate-500 font-mono text-sm">at</span>
                    <span className="text-slate-200 font-semibold text-sm">{exp.company}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-medium">
                    {exp.period}
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-500">
                  {exp.location} • {exp.type}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {exp.description}
                </p>

                <ul className="space-y-1.5 pt-1 text-xs text-slate-400">
                  {exp.highlights.slice(0, 2).map((hl, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <span className="text-sky-400 mt-0.5">•</span>
                      <span className="leading-relaxed">{hl}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
                  {exp.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: KUET Education & Testimonial (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Education Card */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold uppercase">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </div>
              <h4 className="text-base font-bold text-slate-100">
                Khulna University of Engineering & Technology (KUET)
              </h4>
              <div className="text-sm text-slate-300 font-medium">
                Bachelor of Engineering in Electrical, Electronics & Communication Engineering
              </div>
              <div className="text-xs font-mono text-slate-500">
                Batch of ECE '13 • 2014 – 2019
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
                Rigorous 4-year engineering foundation in telecommunication protocols, signal processing, network topologies, and computational systems.
              </p>
            </div>

            {/* Colleague Testimonial */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 relative">
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

      </div>

      {/* ========================================================
          ROW 5: Direct Ingress Footer (12 cols)
          ======================================================== */}
      <footer className="rounded-3xl bg-[#0f172a]/70 border border-slate-800/90 p-8 sm:p-10 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
              Let's talk payment architecture.
            </h2>
            <p className="text-sm text-slate-400 max-w-lg mt-1.5 leading-relaxed">
              Available for senior backend engineering roles, multi-PSP orchestration, and distributed transactional consulting.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyEmail}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-white text-slate-950 font-bold text-xs font-mono transition-colors flex items-center gap-2 shadow-sm"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>Copied Email</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{PORTFOLIO_DATA.engineer.links.email}</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenContact}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-mono border border-slate-700 transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-slate-400" />
              <span>Send message</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </button>

            <a
              href={PORTFOLIO_DATA.engineer.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title="LinkedIn Profile"
            >
              <LinkedInIcon className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Colophon */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-500">
          <div>
            {PORTFOLIO_DATA.engineer.name} • {PORTFOLIO_DATA.engineer.headline}
          </div>
          <div className="flex items-center gap-4">
            <span>Dhaka (UTC+6) • Remote</span>
            <span>•</span>
            <a
              href={PORTFOLIO_DATA.engineer.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors underline underline-offset-4"
            >
              Source on GitHub
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};
