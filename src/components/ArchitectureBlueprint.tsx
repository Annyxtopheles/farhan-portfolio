import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  GitBranch, 
  Cpu, 
  Database, 
  Key,
  Layers
} from 'lucide-react';

interface BlueprintNode {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  spec: {
    problemStatement: string;
    architecturalSolution: string;
    concurrencyHandling: string;
    codePattern: string;
  };
}

export const ArchitectureBlueprint: React.FC = () => {
  const nodes: BlueprintNode[] = [
    {
      id: 'ingress',
      number: '01',
      title: 'Ingress & Schema Validation',
      shortDesc: 'PCI-DSS scoped tokenization & strict OpenAPI contract enforcement.',
      category: 'Boundary Security',
      icon: Key,
      spec: {
        problemStatement: 'Untrusted external inputs, malformed payload injections, and direct card data exposure violating PCI-DSS compliance.',
        architecturalSolution: 'Stateless edge ingress layer enforcing strict DTO contracts. Raw card details are exchanged for ephemeral tokens at the client SDK level before ever touching the backend application layer.',
        concurrencyHandling: 'Rate limiting per API client via token bucket algorithm implemented in Redis with microsecond TTLs.',
        codePattern: `// Ingress DTO Contract with Strict Types
final readonly class PaymentIngressRequest
{
    public function __construct(
        public Money $amount,
        public Currency $currency,
        public PaymentMethodToken $token,
        public string $idempotencyKey,
        public array $metadata
    ) {
        $this->assertValidCurrency();
        $this->assertNonNegativeAmount();
    }
}`
      }
    },
    {
      id: 'idempotency',
      number: '02',
      title: 'Distributed Idempotency Lock',
      shortDesc: 'Atomic Redis mutex guarding against network replays and double-charges.',
      category: 'Concurrency Defense',
      icon: Lock,
      spec: {
        problemStatement: 'Flaky mobile networks or aggressive client retry logic sending identical payment mutations twice, risking duplicate card charges.',
        architecturalSolution: 'Distributed mutex acquired using Redis cluster before database transactions begin. The client-provided idempotency key serves as a cryptographic lock for 120 seconds.',
        concurrencyHandling: 'If an incoming request matches an in-flight key, the thread waits or returns HTTP 409. If the previous operation succeeded, the cached signed receipt is returned immediately with zero duplicate acquirer calls.',
        codePattern: `// Distributed Mutex Pattern with Atomic Lock
$lock = Cache::lock("idemp:lock:{$idempotencyKey}", 15);

if (!$lock->get()) {
    throw new ConcurrentMutationException("Transaction in flight.");
}

try {
    if ($cached = Transaction::findByReplayKey($idempotencyKey)) {
        return $cached->toResponse();
    }
    return $this->executeTransactionPipeline($request);
} finally {
    $lock->release();
}`
      }
    },
    {
      id: 'routing',
      number: '03',
      title: 'Dynamic Routing & Circuit Breaker',
      shortDesc: 'Cost-minimizing multi-acquirer solver with sub-15ms automated failover.',
      category: 'Smart Routing',
      icon: GitBranch,
      spec: {
        problemStatement: 'Acquirer outages (HTTP 502/504) causing transaction drops, and fixed interchange fees bleeding merchant margins.',
        architecturalSolution: 'Dynamic priority matrix evaluating card BIN, customer country, volume tier, and live gateway health. When an upstream acquirer experiences latency spikes or timeout thresholds, the circuit breaker hot-swaps to the secondary fallback in under 15ms.',
        concurrencyHandling: 'Circuit states (CLOSED, OPEN, HALF-OPEN) tracked across distributed Redis keys with rolling 60-second window metrics.',
        codePattern: `// Acquirer Cascade with Circuit Breaker
foreach ($this->router->resolvePriorityChain($request) as $gateway) {
    if ($this->circuitBreaker->isOpen($gateway->identifier())) {
        continue; // Skip degraded acquirers
    }

    try {
        $result = $gateway->charge($request);
        if ($result->isSuccessful()) return $result;
    } catch (GatewayTimeoutException $e) {
        $this->circuitBreaker->recordFailure($gateway->identifier());
        Log::warning("PSP {$gateway->identifier()} timed out. Hot-swapping to fallback.");
    }
}
throw new AllAcquirersDegradedException();`
      }
    },
    {
      id: 'drivers',
      number: '04',
      title: 'Unified Acquirer Driver Interface',
      shortDesc: 'Strategy Pattern abstraction decoupling 200+ gateways and 700+ APMs.',
      category: 'Abstraction Layer',
      icon: Cpu,
      spec: {
        problemStatement: 'Integrating dozens of disparate PSP APIs (Stripe, Adyen, Checkout.com, bKash, SEPA) leads to messy codebases and vendor lock-in.',
        architecturalSolution: 'Clean Strategy Pattern defining a strict PaymentGatewayDriver interface. New payment methods or local rails can be onboarded in under 48 hours without modifying core transaction orchestration logic.',
        concurrencyHandling: 'Drivers are stateless and instantiated via dependency injection container with isolated HTTP connection pools.',
        codePattern: `// Unified Acquirer Driver Contract
interface PaymentGatewayDriverInterface
{
    public function authorize(PaymentRequest $request): GatewayAuthorizationResult;
    public function capture(string $transactionId, Money $amount): GatewayCaptureResult;
    public function refund(string $transactionId, Money $amount): GatewayRefundResult;
    public function verifyWebhookSignature(Request $request): bool;
}`
      }
    },
    {
      id: 'webhooks',
      number: '05',
      title: 'Cryptographic Webhook Ingestion',
      shortDesc: 'Constant-time HMAC-SHA256 signature verification & event queues.',
      category: 'Event Security',
      icon: ShieldCheck,
      spec: {
        problemStatement: 'Asynchronous payment state callbacks are vulnerable to replay attacks, man-in-the-middle forging, and out-of-order delivery.',
        architecturalSolution: 'Dedicated asynchronous ingress workers verifying constant-time HMAC-SHA256 signatures against acquirer secrets. Timestamp drift is enforced to neutralize replay attacks.',
        concurrencyHandling: 'Payloads are ingested into Redis/RabbitMQ high-priority streams. Workers process state transitions with optimistic locking on the transaction aggregate.',
        codePattern: `// Constant-Time HMAC Signature Verification
$expectedSignature = hash_hmac('sha256', "{$timestamp}.{$rawPayload}", $gatewaySecret);

if (!hash_equals($expectedSignature, $headerSignature)) {
    Log::critical("SECURITY ALERT: Webhook signature tampering detected.");
    abort(401, "Invalid signature");
}

if (abs(now()->timestamp - $timestamp) > 300) {
    abort(400, "Timestamp expired (replay attack defense)");
}`
      }
    },
    {
      id: 'ledger',
      number: '06',
      title: 'Double-Entry Ledger & ACID State',
      shortDesc: 'Zero mathematical variance across balances with row-level locks.',
      category: 'Data Integrity',
      icon: Database,
      spec: {
        problemStatement: 'Single-entry balance updates causing rounding drift, race-condition overdrafts, and untraceable financial discrepancies.',
        architecturalSolution: 'Immutable double-entry bookkeeping where every transaction produces matching debits and credits that sum strictly to zero. Financial balances are materialized views derived from immutable ledger journal entries.',
        concurrencyHandling: 'Pessimistic row locking (SELECT ... FOR UPDATE) inside SERIALIZABLE database transactions guarantees zero race-condition over-disbursements.',
        codePattern: `// ACID Transaction Settlement with Pessimistic Lock
DB::transaction(function () use ($transactionId, $amount) {
    $tx = Transaction::lockForUpdate()->findOrFail($transactionId);
    
    if ($tx->state !== TransactionState::AUTHORIZED) {
        throw new InvalidStateTransitionException();
    }

    $tx->transitionTo(TransactionState::SETTLED);
    $this->ledger->recordJournalEntry([
        new Entry(account: $tx->merchantAccountId, type: DebitCredit::CREDIT, amount: $amount),
        new Entry(account: Account::CLEARING_RESERVE, type: DebitCredit::DEBIT, amount: $amount),
    ]);
}, attempts: 5);`
      }
    }
  ];

  const [activeNodeId, setActiveNodeId] = useState<string>('idempotency');
  const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[1];

  return (
    <section id="workbench" className="py-20 max-w-6xl mx-auto px-6 lg:px-8 border-t border-white/[0.06]">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider mb-2">
            <Layers className="w-4 h-4" />
            <span>Interactive Architecture Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Anatomy of a Fault-Tolerant Payment Rail
          </h2>
        </div>
        <p className="text-slate-400 text-xs sm:text-sm max-w-md font-normal md:text-right">
          Interactive technical blueprint of the multi-PSP orchestration pipeline. Click any architectural stage below to inspect the production concurrency considerations and implementation logic.
        </p>
      </div>

      {/* Main Blueprint Explorer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Architectural Pipeline Sequence (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs font-mono text-slate-500 font-bold uppercase tracking-wider mb-2">
            Pipeline Architecture Stages
          </div>

          {nodes.map((node) => {
            const isSelected = node.id === activeNodeId;
            const Icon = node.icon;

            return (
              <button
                key={node.id}
                onClick={() => setActiveNodeId(node.id)}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 ${
                  isSelected
                    ? 'bg-[#141620] border-blue-500/40 text-white shadow-sm'
                    : 'bg-[#111318] border-white/[0.06] text-slate-400 hover:text-slate-200 hover:border-white/15'
                }`}
              >
                <div className={`p-2 rounded-lg mt-0.5 ${isSelected ? 'bg-white text-black' : 'bg-[#090a0d] text-slate-500 border border-white/[0.04]'}`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-slate-500 uppercase">
                      Stage {node.number} • {node.category}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-mono text-blue-400 flex items-center gap-1 font-semibold">
                        <span>Active</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-100 mt-0.5">
                    {node.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                    {node.shortDesc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Architectural Deep-Dive & Code Specification (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#111318] border border-white/[0.07] p-6 sm:p-8 space-y-6 shadow-xl">
          
          {/* Header of Active Node */}
          <div className="border-b border-white/[0.06] pb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold uppercase">
              <span>Stage {activeNode.number}</span>
              <span>•</span>
              <span>{activeNode.category}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              {activeNode.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {activeNode.shortDesc}
            </p>
          </div>

          {/* Technical Specs Breakdown */}
          <div className="space-y-4 text-xs">
            <div>
              <div className="font-mono text-[10px] font-bold text-slate-500 uppercase mb-1">
                The Financial Failure Mode
              </div>
              <p className="text-slate-300 leading-relaxed bg-[#090a0d] p-3.5 rounded-xl border border-white/[0.05]">
                {activeNode.spec.problemStatement}
              </p>
            </div>

            <div>
              <div className="font-mono text-[10px] font-bold text-slate-500 uppercase mb-1">
                Architectural Resolution
              </div>
              <p className="text-slate-300 leading-relaxed bg-[#090a0d] p-3.5 rounded-xl border border-white/[0.05]">
                {activeNode.spec.architecturalSolution}
              </p>
            </div>

            <div>
              <div className="font-mono text-[10px] font-bold text-slate-500 uppercase mb-1">
                Concurrency & Edge Case Invariant
              </div>
              <p className="text-slate-300 leading-relaxed bg-[#090a0d] p-3.5 rounded-xl border border-white/[0.05]">
                {activeNode.spec.concurrencyHandling}
              </p>
            </div>
          </div>

          {/* Implementation Pattern (PHP 8.3 / Laravel 11) */}
          <div className="pt-2">
            <div className="font-mono text-[10px] font-bold text-slate-500 uppercase mb-2">
              Production Architecture Pattern (PHP 8.3)
            </div>
            <div className="p-4 rounded-xl bg-[#07080b] border border-white/[0.07] font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed">
              <pre>{activeNode.spec.codePattern}</pre>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
