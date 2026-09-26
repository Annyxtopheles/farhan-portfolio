import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Check, 
  Mail, 
  ShieldCheck,
  Lock,
  GitBranch,
  Cpu,
  Database,
  Key
} from 'lucide-react';
import { PORTFOLIO_DATA, type Experience, type Project } from './data/portfolioData';
import { GithubIcon } from './components/icons/GithubIcon';
import { TwitterIcon } from './components/icons/TwitterIcon';
import { LinkedInIcon } from './components/icons/LinkedInIcon';
import { ContactModal } from './components/ContactModal';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('about');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);

  const handleCopyCli = () => {
    navigator.clipboard.writeText('npx farhankhan');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects', 'architecture'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'ABOUT' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'architecture', label: 'ARCHITECTURE' },
  ];

  const architectureInvariants = [
    {
      num: '01',
      title: 'Boundary Ingress & Ephemeral Tokenization',
      category: 'PCI-DSS Boundary',
      icon: Key,
      desc: 'Client-side card tokenization exchanging raw PANs for ephemeral HMAC tokens. Strict OpenAPI DTO validation guarantees malformed payloads never reach internal services.',
      code: `final readonly class PaymentIngressRequest {
    public function __construct(
        public Money $amount,
        public Currency $currency,
        public PaymentMethodToken $token,
        public string $idempotencyKey
    ) { $this->assertValid(); }
}`
    },
    {
      num: '02',
      title: 'Atomic Distributed Idempotency Mutex',
      category: 'Concurrency Defense',
      icon: Lock,
      desc: '120-second atomic Redis cluster mutex on the client idempotency key. In-flight duplicates return HTTP 409, while previously completed mutations immediately serve signed cached receipts with zero duplicate acquirer calls.',
      code: `$lock = Cache::lock("idemp:{$key}", 15);
if (!$lock->get()) throw new ConcurrentMutationException();
try {
    if ($cached = Transaction::findByKey($key)) return $cached->toResponse();
    return $this->executePipeline($request);
} finally { $lock->release(); }`
    },
    {
      num: '03',
      title: 'Dynamic Routing & Sub-15ms Circuit Breaker',
      category: 'Acquirer Failover',
      icon: GitBranch,
      desc: 'Priority solver evaluating card BIN, merchant jurisdiction, and real-time latency metrics. When an upstream acquirer returns timeouts or HTTP 5xx spikes, the circuit breaker hot-swaps to secondary fallbacks in <15ms.',
      code: `foreach ($router->resolvePriorityChain($request) as $gateway) {
    if ($circuitBreaker->isOpen($gateway->id())) continue;
    try {
        $res = $gateway->charge($request);
        if ($res->isSuccessful()) return $res;
    } catch (GatewayTimeoutException $e) {
        $circuitBreaker->recordFailure($gateway->id());
    }
}`
    },
    {
      num: '04',
      title: 'Unified Acquirer Driver Abstraction',
      category: 'Strategy Pattern',
      icon: Cpu,
      desc: 'Decoupled Strategy Pattern unifying 200+ acquirers and 700+ alternative payment methods (APMs). New regional rails can be onboarded in under 48 hours without touching core transactional state machines.',
      code: `interface PaymentGatewayDriverInterface {
    public function authorize(PaymentRequest $req): AuthResult;
    public function capture(string $txId, Money $amt): CaptureResult;
    public function verifyWebhookSignature(Request $req): bool;
}`
    },
    {
      num: '05',
      title: 'Constant-Time HMAC Webhook Ingestion',
      category: 'Event Security',
      icon: ShieldCheck,
      desc: 'Asynchronous webhook workers verifying HMAC-SHA256 signatures in constant time against gateway secrets, defending against replay attacks with strict timestamp drift windows.',
      code: `$expected = hash_hmac('sha256', "{$timestamp}.{$payload}", $secret);
if (!hash_equals($expected, $signature)) abort(401, "Signature Tampered");
if (abs(now()->timestamp - $timestamp) > 300) abort(400, "Replay Expired");`
    },
    {
      num: '06',
      title: 'Double-Entry Ledger & ACID State Locks',
      category: 'Financial Integrity',
      icon: Database,
      desc: 'Zero mathematical variance across balances. Every transaction creates immutable matching debits and credits summing strictly to zero, locked with SELECT ... FOR UPDATE inside serializable transactions.',
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

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-400 font-sans selection:bg-sky-500/20 selection:text-sky-200">
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-8">
          
          {/* ========================================================
              LEFT COLUMN (Fixed / Sticky on Desktop)
              ======================================================== */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              {/* Identity */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="/farhan.jpg"
                  alt={PORTFOLIO_DATA.engineer.name}
                  className="w-16 h-16 rounded-xl border border-slate-700/80 object-cover bg-slate-900 shadow-md"
                  width="64"
                  height="64"
                />
                <div>
                  <span className="inline-flex items-center bg-slate-800/80 text-slate-300 text-xs font-medium px-2.5 py-0.5 rounded-full border border-slate-700/60">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-400 mr-1.5 animate-pulse"></span>
                    Paymid • Remote
                  </span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-100 font-sans">
                {PORTFOLIO_DATA.engineer.name}
              </h1>

              <h2 className="mt-3 text-lg sm:text-xl font-medium tracking-tight text-slate-200">
                Senior Backend & Payment Systems Engineer
              </h2>

              <p className="mt-4 max-w-xs leading-normal text-sm text-slate-400">
                I build fault-tolerant payment rails, multi-PSP orchestration engines, and high-concurrency transactional backends at Paymid.
              </p>

              {/* Brittany Chiang Style Horizontal Line Nav */}
              <nav className="nav hidden lg:block mt-16" aria-label="In-page jump links">
                <ul className="w-max space-y-4">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={`group flex items-center py-1 transition-all ${
                            isActive ? 'text-slate-100' : 'text-slate-500 hover:text-slate-200'
                          }`}
                        >
                          <span
                            className={`nav-indicator mr-4 h-px transition-all motion-reduce:transition-none ${
                              isActive
                                ? 'w-16 bg-slate-200'
                                : 'w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-200'
                            }`}
                          />
                          <span
                            className={`nav-text text-xs font-bold uppercase tracking-widest ${
                              isActive ? 'text-slate-100' : 'text-slate-500 group-hover:text-slate-200'
                            }`}
                          >
                            {item.label}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* Bottom Group: CLI Prompt & Social Links */}
            <div className="mt-8 flex flex-col gap-6">
              
              {/* Subtle CLI Terminal One-Liner */}
              <div
                onClick={handleCopyCli}
                title="Click to copy CLI command"
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 py-1.5 px-3 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group w-fit"
              >
                <span className="text-sky-400 font-bold">$</span>
                <span className="text-slate-300 group-hover:underline group-hover:underline-offset-2">
                  npx farhankhan
                </span>
                <span className="text-slate-500 text-[11px]">
                  — {copiedCli ? 'Copied to clipboard!' : 'try my CLI portfolio'}
                </span>
                {copiedCli ? (
                  <Check className="w-3 h-3 text-sky-400" />
                ) : (
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-slate-300 transition-colors" />
                )}
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center gap-5 text-slate-400">
                <a
                  href={PORTFOLIO_DATA.engineer.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-200 transition-colors"
                  title="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>

                <a
                  href={PORTFOLIO_DATA.engineer.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-200 transition-colors"
                  title="LinkedIn"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>

                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-200 transition-colors"
                  title="Twitter / X"
                >
                  <TwitterIcon className="w-5 h-5" />
                </a>

                <button
                  onClick={() => setIsContactOpen(true)}
                  className="hover:text-slate-200 transition-colors"
                  title="Email Farhan"
                >
                  <Mail className="w-5 h-5" />
                </button>
              </div>

            </div>
          </header>

          {/* ========================================================
              RIGHT COLUMN (Scrollable Content)
              ======================================================== */}
          <main className="pt-24 lg:w-1/2 lg:py-24 space-y-24 md:space-y-32">
            
            {/* ----------------------------------------------------
                ABOUT SECTION
                ---------------------------------------------------- */}
            <section id="about" className="scroll-mt-16 md:scroll-mt-24" aria-label="About me">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[#0b1120]/80 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  About
                </h2>
              </div>

              <div className="space-y-4 text-base text-slate-400 leading-relaxed font-sans">
                <p>
                  I’m a backend engineer with over 7 years of production experience, specializing in payment gateway integration, multi-PSP orchestration, and distributed transactional systems. I care deeply about building resilient financial rails where race conditions, duplicate webhooks, and upstream acquirer timeouts are solved by design.
                </p>

                <p>
                  Currently, I’m a Senior Backend Engineer at{' '}
                  <a
                    href="https://paymid.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-slate-200 hover:text-sky-400 focus-visible:text-sky-400 transition-colors underline underline-offset-4"
                  >
                    Paymid
                  </a>
                  , where I architect our multi-PSP routing engine and dynamic failover cascade — turning dozens of fragmented banking APIs into high-throughput, unified payment pipelines with sub-15ms automated failover.
                </p>

                <p>
                  My technical focus centers around event-driven architectures, distributed idempotency mutexes, and zero-variance double-entry ledgers with{' '}
                  <strong className="text-slate-200 font-medium">PHP 8.3 / Laravel</strong>,{' '}
                  <strong className="text-slate-200 font-medium">Go</strong>,{' '}
                  <strong className="text-slate-200 font-medium">Node.js</strong>, and{' '}
                  <strong className="text-slate-200 font-medium">Redis</strong>. I graduated from{' '}
                  <strong className="text-slate-200 font-medium">Khulna University of Engineering & Technology (KUET)</strong> with a degree in Electrical & Communication Engineering.
                </p>

                <p>
                  When I’m away from transaction logs, I’m usually reading distributed consensus whitepapers, brewing pour-over coffee, or mentoring upcoming backend engineers.
                </p>
              </div>
            </section>

            {/* ----------------------------------------------------
                EXPERIENCE SECTION
                ---------------------------------------------------- */}
            <section id="experience" className="scroll-mt-16 md:scroll-mt-24" aria-label="Work experience">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[#0b1120]/80 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  Experience
                </h2>
              </div>

              <ol className="group/list space-y-12">
                {PORTFOLIO_DATA.experiences.map((exp: Experience, idx: number) => (
                  <li key={idx} className="mb-12">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      
                      {/* Background highlight on hover */}
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/40 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]" />

                      {/* Period on Left */}
                      <header
                        className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2"
                        aria-label={exp.period}
                      >
                        {exp.period}
                      </header>

                      {/* Content on Right */}
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-slate-200">
                          <div>
                            <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-sky-400 focus-visible:text-sky-400 text-base">
                              <span>
                                {exp.role} ·{' '}
                                <span className="inline-block text-slate-100 font-semibold">
                                  {exp.company}
                                </span>
                              </span>
                            </span>
                          </div>
                          <div className="text-xs font-mono text-slate-500 mt-1">
                            {exp.location} • {exp.type}
                          </div>
                        </h3>

                        <p className="mt-2 text-sm leading-normal text-slate-400">
                          {exp.description}
                        </p>

                        <ul className="mt-2 space-y-1 text-xs text-slate-400">
                          {exp.highlights.map((hl: string, hIdx: number) => (
                            <li key={hIdx} className="flex items-start gap-1.5">
                              <span className="text-sky-400/80 mt-0.5">•</span>
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech Tag Pills */}
                        <ul className="mt-3 flex flex-wrap" aria-label="Technologies used">
                          {exp.techStack.map((tech: string, tIdx: number) => (
                            <li key={tIdx} className="mr-1.5 mt-2">
                              <span className="flex items-center rounded-full bg-sky-400/10 px-3 py-1 text-xs font-medium leading-5 text-sky-300">
                                {tech}
                              </span>
                            </li>
                          ))}
                        </ul>

                      </div>

                    </div>
                  </li>
                ))}
              </ol>

              {/* View Resume link */}
              <div className="mt-8">
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="inline-flex items-center font-medium leading-tight text-slate-200 group hover:text-sky-400 focus-visible:text-sky-400 text-sm"
                >
                  <span className="border-b border-transparent pb-px transition group-hover:border-sky-400 motion-reduce:transition-none">
                    Discuss Architecture or Request Resume
                  </span>
                  <ArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none" />
                </button>
              </div>
            </section>

            {/* ----------------------------------------------------
                PROJECTS SECTION
                ---------------------------------------------------- */}
            <section id="projects" className="scroll-mt-16 md:scroll-mt-24" aria-label="Selected projects">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[#0b1120]/80 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  Projects
                </h2>
              </div>

              <ul className="group/list space-y-12">
                {PORTFOLIO_DATA.projects.map((project: Project, idx: number) => (
                  <li key={idx} className="mb-12">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      
                      {/* Background highlight on hover */}
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/40 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]" />

                      <header
                        className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2"
                      >
                        {project.period}
                      </header>

                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-slate-200">
                          <div>
                            <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-sky-400 focus-visible:text-sky-400 text-base">
                              <span>
                                {project.title} ·{' '}
                                <span className="inline-block text-slate-100 font-semibold">
                                  {project.company}
                                </span>
                              </span>
                            </span>
                          </div>
                        </h3>

                        <p className="mt-2 text-sm leading-normal text-slate-400">
                          {project.summary}
                        </p>

                        <ul className="mt-2 space-y-1 text-xs text-slate-400">
                          {project.architecturePoints.map((point: string, pIdx: number) => (
                            <li key={pIdx} className="flex items-start gap-1.5">
                              <span className="text-sky-400/80 mt-0.5">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>

                        <ul className="mt-3 flex flex-wrap" aria-label="Technologies used">
                          {project.techStack.map((tech: string, tIdx: number) => (
                            <li key={tIdx} className="mr-1.5 mt-2">
                              <span className="flex items-center rounded-full bg-sky-400/10 px-3 py-1 text-xs font-medium leading-5 text-sky-300">
                                {tech}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* ----------------------------------------------------
                ARCHITECTURE BLUEPRINT SECTION
                ---------------------------------------------------- */}
            <section id="architecture" className="scroll-mt-16 md:scroll-mt-24" aria-label="System Architecture Invariants">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[#0b1120]/80 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  Architecture Invariants
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-200 tracking-tight">
                    Anatomy of a Fault-Tolerant Payment Rail
                  </h3>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                    Production concurrency invariants and failure modes engineered across 200+ gateways and 700+ APMs at Paymid.
                  </p>
                </div>

                <div className="space-y-6">
                  {architectureInvariants.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.num}
                        className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded bg-slate-800 text-sky-400">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                              Stage {item.num} • {item.category}
                            </span>
                          </div>
                        </div>

                        <h4 className="text-sm font-bold text-slate-200">
                          {item.title}
                        </h4>

                        <p className="text-xs text-slate-400 leading-relaxed">
                          {item.desc}
                        </p>

                        <div className="p-3 rounded-lg bg-[#060a12] border border-slate-800/80 font-mono text-[11px] text-slate-300 overflow-x-auto">
                          <pre>{item.code}</pre>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ----------------------------------------------------
                EDUCATION & COLOPHON
                ---------------------------------------------------- */}
            <footer className="pt-8 text-xs text-slate-500 leading-relaxed space-y-4 border-t border-slate-800/80">
              <div className="text-slate-400">
                <strong className="text-slate-300">Khulna University of Engineering & Technology (KUET)</strong> — B.Sc. in Electrical, Electronics & Communication Engineering (2014 – 2019, Batch ECE '13).
              </div>
              <p>
                Engineered by Farhan Zaman Khan. Built with React 19, TypeScript, and Tailwind CSS. Hosted on Vercel. All text set in Plus Jakarta Sans and JetBrains Mono.
              </p>
            </footer>

          </main>

        </div>
      </div>

      {/* Direct Ingress Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default App;
