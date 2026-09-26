export interface Project {
  id: string;
  title: string;
  category: 'FinTech & Payments' | 'Enterprise Infrastructure' | 'Lending & Cash Rails';
  company: string;
  period: string;
  featured: boolean;
  summary: string;
  metrics: string[];
  architecturePoints: string[];
  techStack: string[];
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  duration: string;
  type: string;
  description: string;
  highlights: string[];
  techStack: string[];
  logo?: string;
  website?: string;
}

export const PORTFOLIO_DATA = {
  engineer: {
    name: "Farhan Zaman Khan",
    headline: "Senior Backend & Payment Systems Engineer",
    currentRole: "Software Engineer (SDE-1) at Paymid",
    location: "Limassol, Cyprus (Remote) · Dhaka, Bangladesh",
    experienceYears: "7+",
    summary: "Architecting zero-fault-tolerance payment infrastructure, multi-gateway orchestration engines, and high-concurrency transactional backends. Specialized in dynamic PSP routing, idempotent transaction lifecycles, and resilient cross-border financial rails.",
    status: {
      uptime: "99.99%",
      latency: "24ms",
      systemsState: "OPERATIONAL",
      timezone: "UTC+6 / UTC+2",
    },
    links: {
      linkedin: "https://www.linkedin.com/in/farhan-khan-a6a8b2157/",
      email: "farhankhan.engr@gmail.com",
      github: "https://github.com/farhankhan",
    }
  },

  stats: [
    { label: "Production Experience", value: "7+ Years", detail: "LAMP, Laravel & FinTech" },
    { label: "Gateways & APMs Orchestrated", value: "200+", detail: "Cards, Crypto & Local Rails" },
    { label: "Enterprise Track Record", value: "7 Companies", detail: "FinTech, Telecom & Enterprise" },
    { label: "Cognitive Aptitude", value: "IQ 123", detail: "Verified Analytical Score" }
  ],

  projects: [
    {
      id: "paymid-orchestrator",
      title: "Global Payment Channel Orchestrator & Smart Routing Engine",
      category: "FinTech & Payments",
      company: "Paymid (Limassol, Cyprus)",
      period: "Aug 2024 – Present",
      featured: true,
      summary: "Architected multi-PSP integration pipelines and intelligent routing algorithms connecting global merchants with over 200+ payment gateways and 700+ alternative payment methods (APMs).",
      metrics: [
        "Sub-30ms dynamic router decision latency",
        "99.8% authorization rate via automated PSP cascades",
        "Zero duplicate transactions across millions of API calls via atomic idempotency locks"
      ],
      architecturePoints: [
        "Designed an extensible Strategy Pattern gateway driver interface allowing codeless addition of new PSPs in under 48 hours.",
        "Implemented Redis-backed distributed locks and cryptographic idempotency key caching with microsecond TTLs.",
        "Engineered automatic cascading failover that reroutes traffic during 502/504 gateway timeouts without client-facing failure.",
        "Created an asynchronous HMAC-SHA256 signed webhook processing pipeline with exponential backoff and replay defense."
      ],
      techStack: ["PHP 8.3", "Laravel 11", "MySQL 8.0", "Redis", "Docker", "REST APIs", "PSP Integrations", "Webhooks"]
    },
    {
      id: "namhost-cash-platforms",
      title: "Cross-Border Cash & Credit Platforms (Broke-Relief, Kuda, Fynbos)",
      category: "Lending & Cash Rails",
      company: "Namhost (South Africa)",
      period: "Oct 2023 – Apr 2024",
      featured: true,
      summary: "Engineered core transactional logic and wallet reconciliation systems for 3 high-volume cash service and micro-credit platforms operating across Southern Africa.",
      metrics: [
        "100% transaction reconciliation accuracy across multi-currency ledgers",
        "Sub-100ms loan disbursement authorization",
        "Zero ledger variance across daily audit cycles"
      ],
      architecturePoints: [
        "Implemented strict double-entry ledger bookkeeping to guarantee zero mathematical drift across balances and disbursements.",
        "Optimized MySQL transactional isolation levels (`SERIALIZABLE` on balance mutations) to prevent race-condition overdrafts.",
        "Integrated regional banking APIs and instant settlement rails with automated retry circuits.",
        "Built automated compliance logging and KYC audit trails for South African financial regulations."
      ],
      techStack: ["PHP", "Laravel", "MySQL", "Double-Entry Ledger", "Payment Gateways", "REST APIs"]
    },
    {
      id: "jnj-dxp-migration",
      title: "Johnson & Johnson Global Brand Migration to DXP Contentful",
      category: "Enterprise Infrastructure",
      company: "SJ Innovation LLC (US Client Team)",
      period: "May 2024 – Aug 2024",
      featured: false,
      summary: "Led backend migration pipelines and microservice integrations moving Tier-1 healthcare product platforms (Tylenol, Aveeno, Zarbees) from legacy monolithic Drupal to headless Contentful DXP.",
      metrics: [
        "Zero downtime migration across thousands of global product SKUs",
        "40% reduction in API response times via Edge caching and payload normalization",
        "Coordinated across multi-disciplinary teams in US, Europe, and Asia"
      ],
      architecturePoints: [
        "Built robust schema translation and data normalization pipelines ensuring 100% data integrity during migration.",
        "Integrated modern headless APIs with CI/CD automated validation checks.",
        "Collaborated within Agile sprint cycles with strict enterprise compliance standards."
      ],
      techStack: ["Contentful DXP", "PHP", "Node.js", "REST APIs", "Agile/Scrum", "CI/CD"]
    },
    {
      id: "gp-academy-bsafe",
      title: "Grameenphone Enterprise LMS (Academy) & Fleet Safety (bSafe)",
      category: "Enterprise Infrastructure",
      company: "IYLMA Innovation Limited",
      period: "Jan 2022 – Nov 2022",
      featured: false,
      summary: "Developed two mission-critical enterprise systems for Grameenphone (Telenor Group, largest telecom operator in Bangladesh): nationwide corporate learning LMS and field vehicle inspection checklists.",
      metrics: [
        "Deployed across thousands of field technicians and corporate employees nationwide",
        "High availability during peak nationwide audit submissions",
        "Direct client stakeholder requirement discovery and rapid agile iterations"
      ],
      architecturePoints: [
        "Developed offline-capable mobile checklist sync mechanisms for field workers in remote telecom towers.",
        "Engineered role-based access control (RBAC) with granular multi-department permission hierarchies.",
        "Delivered regular executive feedback loops and participated in on-site technical alignment sessions at GP House."
      ],
      techStack: ["PHP", "Laravel", "MySQL", "Vue.js", "RESTful APIs", "Enterprise RBAC"]
    }
  ] as Project[],

  pillars: [
    {
      id: "idempotency",
      title: "Strict Idempotency & Concurrency Defense",
      subtitle: "Preventing double-charges and race conditions under peak network instability",
      description: "Financial transactions must never execute twice, even when aggressive network retries occur. By combining cryptographic client tokens, distributed Redis mutexes, and atomic MySQL database locks, duplicate operations are neutralized in sub-milliseconds without database contention.",
      tags: ["Distributed Locks", "Atomic DB Transactions", "Token Replay Defense", "Race Condition Protection"],
      codeExample: `// Atomic Idempotency Check with Redis Mutex
$lock = Cache::lock("idemp:lock:{$idempotencyKey}", 10);

if (!$lock->get()) {
    throw new ConcurrentTransactionException("Transaction in flight");
}

try {
    $existing = Transaction::where('idempotency_key', $idempotencyKey)->first();
    if ($existing) {
        return response()->json($existing->cached_payload, 200);
    }
    
    // Execute atomic gateway dispatch inside DB transaction
    return DB::transaction(fn() => $this->dispatchToPSP($request));
} finally {
    $lock->release();
}`
    },
    {
      id: "failover-routing",
      title: "Smart PSP Routing & Sub-Second Cascade Failover",
      subtitle: "Maximizing authorization rates and minimizing interchange fees",
      description: "Multi-PSP orchestration dynamically selects the optimal acquirer based on card BIN, merchant currency, fee tier, and historical uptime. When an upstream gateway returns 502/504 or network drops, an automatic circuit breaker hot-swaps to the fallback PSP in under 20ms.",
      tags: ["Dynamic Routing", "Circuit Breakers", "Cost Minimization", "Zero-Downtime Cascades"],
      codeExample: `// Intelligent Gateway Cascade Pipeline
public function process(PaymentRequest $req): GatewayResult 
{
    $route = $this->routingEngine->resolveOptimalRoute($req);
    
    foreach ($route->getGatewayPriorityList() as $gateway) {
        if ($this->circuitBreaker->isOpen($gateway)) {
            continue; // Skip degraded PSPs
        }
        
        try {
            $result = $gateway->charge($req);
            if ($result->isSuccess()) return $result;
        } catch (GatewayTimeoutException $e) {
            $this->circuitBreaker->recordFailure($gateway);
            Log::warning("Cascading from {$gateway->name} to fallback");
        }
    }
    throw new AllGatewaysExhaustedException();
}`
    },
    {
      id: "webhook-integrity",
      title: "HMAC Cryptographic Verification & Webhook Ingestion",
      subtitle: "Asynchronous signed event streaming with replay protection",
      description: "Payment state transitions happen asynchronously via webhooks. Every incoming payload is validated against constant-time HMAC-SHA256 signatures, validated against millisecond timestamp drift to prevent replay attacks, and placed into dedicated asynchronous workers for atomic ledger writes.",
      tags: ["HMAC-SHA256", "Constant-Time Verification", "Replay Protection", "Dead-Letter Queues"],
      codeExample: `// Constant-Time Cryptographic Signature Guard
$computedSignature = hash_hmac('sha256', "{$timestamp}.{$rawPayload}", $pspSecret);

if (!hash_equals($computedSignature, $headerSignature)) {
    Log::critical("SECURITY ALERT: Webhook signature tampering detected");
    abort(401, "Invalid cryptographic signature");
}

if (abs(now()->timestamp - $timestamp) > 300) {
    abort(400, "Webhook timestamp expired (replay defense)");
}

ProcessWebhookJob::dispatch($rawPayload)->onQueue('high-priority-payments');`
    },
    {
      id: "high-throughput-laravel",
      title: "High-Throughput Laravel & Database Engineering",
      subtitle: "Optimized PHP 8.3 architectures engineered for low-latency scale",
      description: "PHP is exceptionally fast when engineered properly. Utilizing strict typing, RoadRunner/Octane persistent workers, prepared queries, composite MySQL indexing, and zero-N+1 query discipline, the payment engine achieves sub-50ms p99 latency under heavy load.",
      tags: ["PHP 8.3 Strict Typing", "RoadRunner / Octane", "MySQL Composite Indexing", "Low-Latency Caching"],
      codeExample: `// High-Throughput Prepared Ledger Settlement
public function settleTransaction(string $txId, Money $amount): void 
{
    DB::transaction(function () use ($txId, $amount) {
        $tx = Transaction::lockForUpdate()->findOrFail($txId);
        
        if ($tx->state !== TransactionState::AUTHORIZED) {
            throw new InvalidStateTransitionException();
        }
        
        $tx->transitionTo(TransactionState::SETTLED);
        $this->ledger->credit($tx->merchant_account_id, $amount);
    }, attempts: 5);
}`
    }
  ],

  experiences: [
    {
      company: "Paymid",
      role: "Software Engineer (SDE-1) — Platform & Payments",
      location: "Limassol, Cyprus · Remote",
      period: "Aug 2024 – Present",
      duration: "Ongoing",
      type: "Full-time",
      logo: "/logos/paymid.png",
      website: "https://paymid.com/",
      description: "Core engineer on the payment orchestration infrastructure team. Designing multi-channel integration engines, codeless checkout flows, smart routing, and global gateway connectors.",
      highlights: [
        "Architecting payment gateway integration systems connecting global merchants with 200+ gateways and 700+ APMs.",
        "Developing dynamic payment routing logic optimizing checkout conversion and interchange rates.",
        "Building resilient webhook handlers with cryptographic signature guards and atomic transaction settlement."
      ],
      techStack: ["PHP 8.3", "Laravel 11", "MySQL 8.0", "Redis", "PSP Integrations", "APMs", "Docker", "REST APIs"]
    },
    {
      company: "SJ Innovation LLC",
      role: "Senior Software Engineer L1",
      location: "Dhaka, Bangladesh · On-site",
      period: "May 2023 – Aug 2024",
      duration: "1 yr 4 mos",
      type: "Full-time",
      logo: "/logos/sjinnovation.png",
      website: "https://sjinnovation.com/",
      description: "Progressed through 2 consecutive promotions across 16 months: Software Engineer L1 (May 2023 – Nov 2023), Software Engineer L2 (Nov 2023 – Apr 2024), and Senior Software Engineer L1 (Apr 2024 – Aug 2024). Awarded 'Performer of the Month' and recognized for AI/Chatbot innovation.",
      highlights: [
        "Earned 2 consecutive engineering promotions within 16 months for consistent technical execution, problem solving, and team delivery.",
        "Led backend integrations on Johnson & Johnson enterprise Contentful DXP migration for global brands including Tylenol, Zarbees, and Aveeno.",
        "Engineered custom backend microservices, caching architectures, and high-throughput REST APIs."
      ],
      techStack: ["Laravel", "PHP", "Contentful DXP", "MySQL", "Node.js", "Docker", "REST APIs", "Agile/Scrum"]
    },
    {
      company: "Namhost",
      role: "Software Engineer (FinTech Platforms)",
      location: "South Africa · Remote",
      period: "Oct 2023 – Apr 2024",
      duration: "7 mos",
      type: "Contract via SJ Innovation",
      logo: "/logos/namhost.png",
      website: "https://namhost.com/",
      description: "Contracted via SJ Innovation to build and scale transactional backends for 3 high-volume cash service and micro-credit platforms operating across Southern Africa: Broke-Relief, Kuda, and Fynbos.",
      highlights: [
        "Engineered strict double-entry ledger bookkeeping to guarantee zero mathematical drift across multi-currency accounts.",
        "Integrated Southern African regional banking APIs and automated instant disbursement rails with robust retry circuits.",
        "Optimized serializable database isolation levels to prevent race conditions during high-volume concurrent loan applications."
      ],
      techStack: ["PHP", "Laravel", "MySQL", "Double-Entry Ledger", "Payment Gateways", "REST APIs"]
    },
    {
      company: "Instantwebb",
      role: "Laravel Developer",
      location: "Dhaka, Bangladesh · On-site",
      period: "Nov 2022 – Apr 2023",
      duration: "6 mos",
      type: "Full-time",
      logo: "/logos/instantwebb.png",
      website: "https://instantwebb.com/",
      description: "Backend developer on an 8-member engineering team designing and implementing large-scale healthcare and hospital management platforms for US clients.",
      highlights: [
        "Architected electronic health records (EHR), patient admission workflows, and automated medical billing calculation modules.",
        "Implemented relational database models with strict foreign key constraints and transactional integrity.",
        "Built secure RESTful APIs adhering to healthcare data protection and privacy requirements."
      ],
      techStack: ["Laravel", "PHP", "MySQL", "Database Architecture", "REST APIs"]
    },
    {
      company: "IYLMA Innovation Limited",
      role: "Software Engineer",
      location: "Dhaka, Bangladesh · On-site",
      period: "Jan 2022 – Nov 2022",
      duration: "11 mos",
      type: "Full-time",
      logo: "/logos/iylma.png",
      website: "https://iylma.com/",
      description: "Engineered enterprise web systems for Grameenphone Limited (Telenor Group, largest telecom operator in Bangladesh), delivering the Grameenphone Academy LMS and bSafe vehicle safety systems.",
      highlights: [
        "Built the Grameenphone Academy enterprise learning portal and bSafe vehicle inspection platform deployed to nationwide field operations.",
        "Participated directly in requirement discovery, architectural reviews, and stakeholder demo loops at GP House.",
        "Designed role-based access control (RBAC) supporting multi-tier corporate hierarchies and departmental auditing."
      ],
      techStack: ["PHP", "Laravel", "MySQL", "Vue.js", "RESTful APIs", "Enterprise RBAC"]
    },
    {
      company: "Perky Rabbit",
      role: "Software Engineer",
      location: "Dhaka, Bangladesh · On-site",
      period: "Jan 2021 – Dec 2021",
      duration: "1 yr",
      type: "Full-time",
      logo: "/logos/perkyrabbit.png",
      website: "https://perkyrabbit.com/",
      description: "Full-time software engineer building core governmental web systems for the Bangladesh Fire Service and Civil Defence (FSCD).",
      highlights: [
        "Developed critical operational modules for FSCD including Inventory Management, HR Management, Fire Safety Clearance Applications, and Workshop Management.",
        "Engineered database schemas and transactional workflows handling departmental requisitions and equipment maintenance tracking.",
        "Maintained and optimized production web applications with continuous feature delivery and security patches."
      ],
      techStack: ["PHP", "Laravel", "MySQL", "JavaScript", "REST APIs", "System Architecture"]
    },
    {
      company: "MIEN IT LIMITED",
      role: "Jr. Software Engineer",
      location: "Bangladesh · On-site",
      period: "Jan 2019 – Mar 2020",
      duration: "1 yr 3 mos",
      type: "Full-time",
      logo: "/logos/mienit.png",
      website: "https://mienit.com/",
      description: "Started professional engineering career building custom backend web applications, client solutions, and managing Linux deployment environments.",
      highlights: [
        "Translated business requirements into functional database schemas and robust backend web applications.",
        "Managed Linux server deployments, cPanel hosting environments, domain configurations, and MySQL database administration.",
        "Debugged and resolved production issues across multiple concurrent client web applications."
      ],
      techStack: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "Linux", "cPanel"]
    }
  ] as Experience[],

  recommendations: [
    {
      name: "Musfek Ahmed Abir",
      title: "Project Manager | Driving Product Lifecycle | IIUM Alumnus",
      relationship: "Managed Farhan directly at SJ Innovation",
      date: "September 2024 & November 2025",
      quote: "I had the pleasure of directly managing Farhan, and I can confidently say he is an exceptional Laravel developer and an outstanding team player. Farhan consistently delivered high-quality work, demonstrating his deep technical expertise and problem-solving skills. What stands out most about Farhan is his calm, logical approach and his dedication to getting things done the right way. Any team would be lucky to have him!",
      verifiedBadge: "LinkedIn Verified Colleague"
    }
  ],

  accreditations: [
    {
      title: "Performer of the Month",
      issuer: "SJ Innovation LLC",
      date: "November 2023",
      credentialId: "SJI-2023-POM87",
      description: "Awarded for exceptional backend engineering delivery, clean code practices, and rapid problem resolution on enterprise client accounts."
    },
    {
      title: "Certificate of Appreciation (AI & Chatbot Innovation)",
      issuer: "SJ Innovation LLC",
      date: "October 2023",
      description: "Recognized for prototyping and integrating cutting-edge AI and automated conversational workflows into enterprise products."
    }
  ]
};
