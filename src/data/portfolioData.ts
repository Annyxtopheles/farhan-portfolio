export interface Project {
  id: string;
  title: string;
  category: string;
  company: string;
  companyLogo?: string;
  period: string;
  featured: boolean;
  summary: string;
  metrics?: string[];
  architecturePoints?: string[];
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
    // 1. Paymid (Flagship)
    {
      id: "paymid",
      title: "Paymid — Global Payment Gateway Orchestrator & Smart Routing Engine",
      category: "FinTech & Payments",
      company: "Paymid",
      companyLogo: "/logos/paymid.png",
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
      techStack: ["PHP 8.3", "Laravel 11", "MySQL 8.0", "Redis", "PSP Integrations", "Webhooks", "Docker", "REST APIs"]
    },

    // 2. JnJ Products migration to DxP Contentful (SJ Innovation)
    {
      id: "jnj-dxp-migration",
      title: "JnJ Products Migration to DxP Contentful — Tylenol, Zarbees & Aveeno",
      category: "Enterprise DXP",
      company: "SJ Innovation LLC",
      companyLogo: "/logos/sjinnovation.png",
      period: "May 2024 – Aug 2024",
      featured: true,
      summary: "Led backend migration pipelines and microservice integrations moving Tier-1 healthcare product platforms (Tylenol, Aveeno, Zarbees) from legacy monolithic Drupal to headless Contentful DXP for the Johnson & Johnson US team.",
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
      techStack: ["Contentful DXP", "Drupal Migration", "PHP", "Node.js", "REST APIs", "Agile/Scrum", "CI/CD"]
    },

    // 3. Simple Therapy (SJ Innovation)
    {
      id: "simple-therapy",
      title: "Simple Therapy — Microservice Body Therapy Platform",
      category: "HealthTech & Microservices",
      company: "SJ Innovation LLC",
      companyLogo: "/logos/sjinnovation.png",
      period: "May 2024 – Jul 2024",
      featured: true,
      summary: "Engineered core administrative backends and microservice integrations for a large-scale physical therapy platform. Admin panels built primarily with Laravel, integrated with Strapi CMS and custom Retool operations dashboards.",
      metrics: [
        "Multi-service communication across asynchronous REST endpoints",
        "Unified administrative workflows across Strapi and Retool tools"
      ],
      architecturePoints: [
        "Structured modular microservice endpoints decoupling patient scheduling, therapist assignments, and session tracking.",
        "Implemented secure JWT authentication and role-based operational permissions across services."
      ],
      techStack: ["Laravel", "PHP", "Microservices", "Strapi", "Retool", "MySQL", "REST APIs"]
    },

    // 4. Fynbos Financial Services (Namhost)
    {
      id: "fynbos-financial",
      title: "Fynbos Financial Services — Regional Credit & Ledgers",
      category: "FinTech & Cash Rails",
      company: "Namhost",
      companyLogo: "/logos/namhost.png",
      period: "Dec 2023 – Mar 2024",
      featured: true,
      summary: "Engineered core transactional logic and wallet reconciliation systems for South African financial online services with strict double-entry ledger bookkeeping.",
      metrics: [
        "100% transaction reconciliation accuracy across multi-currency ledgers",
        "Zero ledger variance across daily audit cycles"
      ],
      architecturePoints: [
        "Implemented strict double-entry ledger bookkeeping to guarantee zero mathematical drift across balances and disbursements.",
        "Optimized MySQL transactional isolation levels (SERIALIZABLE) to prevent race-condition overdrafts."
      ],
      techStack: ["PHP", "Laravel", "MySQL", "Double-Entry Ledger", "Payment Gateways", "REST APIs"]
    },

    // 5. Kuda FX (Namhost)
    {
      id: "kuda-fx",
      title: "Kuda FX — Foreign Money Transfer Rails",
      category: "FinTech & Cash Rails",
      company: "Namhost",
      companyLogo: "/logos/namhost.png",
      period: "Dec 2023 – Mar 2024",
      featured: true,
      summary: "Built cross-border foreign currency exchange and remittance infrastructure operating in Southern Africa with real-time rate updates and automated bank dispatches.",
      metrics: [
        "Real-time foreign exchange rate sync and automated conversion",
        "High-throughput transactional queue processing for instant remittances"
      ],
      architecturePoints: [
        "Integrated regional banking APIs and instant settlement rails with automated retry circuits.",
        "Engineered transactional state machines ensuring non-repudiation of currency transfer orders."
      ],
      techStack: ["PHP", "Laravel", "Foreign Exchange (FX)", "Banking Rails", "MySQL", "REST APIs"]
    },

    // 6. Broke Relief Cash Services (Namhost)
    {
      id: "broke-relief",
      title: "Broke Relief Cash Services — Loan Management Platform",
      category: "FinTech & Cash Rails",
      company: "Namhost",
      companyLogo: "/logos/namhost.png",
      period: "Oct 2023 – Dec 2023",
      featured: true,
      summary: "Engineered loan lifecycle management software for Namibian borrowers, incorporating automated credit assessment, disbursement scheduling, and penalty calculation rules.",
      metrics: [
        "Sub-100ms loan disbursement authorization",
        "Automated repayment schedules and overdue notification triggers"
      ],
      architecturePoints: [
        "Built strict compliance audit logging and KYC record preservation adhering to regional lending regulations.",
        "Engineered automated interest compounding and dynamic schedule recalculation routines."
      ],
      techStack: ["PHP", "Laravel", "MySQL", "Loan Management", "Ledger Accounting", "REST APIs"]
    },

    // 7. GrameenPhone Academy (IYLMA)
    {
      id: "gp-academy",
      title: "GrameenPhone Academy (LMS) — Enterprise Learning Portal",
      category: "Enterprise Infrastructure",
      company: "IYLMA Innovation Limited",
      companyLogo: "/logos/iylma.png",
      period: "Jan 2022 – May 2022",
      featured: true,
      summary: "Architected and delivered the nationwide enterprise Learning Management System (LMS) for Grameenphone Telecommunications Limited (Telenor Group) training thousands of corporate personnel.",
      metrics: [
        "Scaled across thousands of concurrent employees nationwide",
        "Zero downtime during executive training milestones"
      ],
      architecturePoints: [
        "Engineered role-based access control (RBAC) with granular multi-department permission hierarchies.",
        "Delivered regular executive feedback loops and on-site technical alignment sessions at GP House."
      ],
      techStack: ["PHP", "Laravel", "MySQL", "Vue.js", "Enterprise RBAC", "REST APIs"]
    },

    // 8. GrameenPhone bSafe (IYLMA)
    {
      id: "gp-bsafe",
      title: "GrameenPhone bSafe (HSSE) — Health & Fleet Safety System",
      category: "Enterprise Infrastructure",
      company: "IYLMA Innovation Limited",
      companyLogo: "/logos/iylma.png",
      period: "Jul 2022 – Sep 2022",
      featured: true,
      summary: "Health, Safety, Security & Environment (HSSE) compliance and fleet inspection assurance platform for Grameenphone sales executives and nationwide distribution hubs.",
      metrics: [
        "Deployed across thousands of field technicians and distribution houses",
        "High availability during peak nationwide audit submissions"
      ],
      architecturePoints: [
        "Developed offline-capable mobile checklist sync mechanisms for field workers in remote telecom towers.",
        "Built automated hazard escalation pipelines triggering real-time incident reports to corporate safety teams."
      ],
      techStack: ["PHP", "Laravel", "MySQL", "Mobile Field Audit", "Enterprise HSSE", "REST APIs"]
    },

    // 9. Instant HMS (Instantwebb)
    {
      id: "instant-hms",
      title: "Instant HMS — International Hospital Management System",
      category: "Healthcare Systems",
      company: "Instantwebb",
      companyLogo: "/logos/instantwebb.png",
      period: "Nov 2022 – Apr 2023",
      featured: true,
      summary: "Backend engineer on an 8-member team designing a comprehensive US-client hospital management system incorporating electronic medical records (EMR), patient admission, and medical billing.",
      metrics: [
        "Comprehensive EMR data models with strict relational integrity",
        "Compliant handling of patient health identifiers and billing records"
      ],
      architecturePoints: [
        "Designed relational schema models with strict relational integrity constraints.",
        "Engineered complex patient admission, electronic medical records, and billing calculation modules."
      ],
      techStack: ["Laravel", "PHP", "MySQL", "Database Architecture", "EHR Systems", "REST APIs"]
    },

    // 10. IWoman TV (SJ Innovation)
    {
      id: "iwoman-tv",
      title: "IWoman TV — Digital Media & Streaming Platform",
      category: "Media & Entertainment",
      company: "SJ Innovation LLC",
      companyLogo: "/logos/sjinnovation.png",
      period: "Jul 2023 – Jul 2024",
      featured: false,
      summary: "Scalable news, video streaming, and entertainment web platform delivering multimedia digital content and engaging high-volume audiences.",
      techStack: ["PHP", "WordPress", "Custom Plugins", "MySQL", "CDN Streaming"]
    },

    // 11. JDM STC Engines (SJ Innovation)
    {
      id: "jdm-stc-engines",
      title: "JDM STC Engines — Automotive E-Commerce Platform",
      category: "E-Commerce",
      company: "SJ Innovation LLC",
      companyLogo: "/logos/sjinnovation.png",
      period: "May 2024 – Jun 2024",
      featured: false,
      summary: "Specialized automotive engine selling e-commerce marketplace built with WordPress WooCommerce, featuring custom parts catalog filters and secure international payment gateways.",
      techStack: ["PHP", "WordPress", "WooCommerce", "PhpMyAdmin", "MySQL"]
    },

    // 12. TourPatron (SJ Innovation)
    {
      id: "tourpatron",
      title: "TourPatron — Saint Patrick's Cathedral Tourism Platform",
      category: "E-Commerce & Booking",
      company: "SJ Innovation LLC",
      companyLogo: "/logos/sjinnovation.png",
      period: "May 2024 – Jun 2024",
      featured: false,
      summary: "Custom WordPress WooCommerce booking website engineered for historical tours and ticket management around Saint Patrick's Cathedral.",
      techStack: ["PHP", "WordPress", "WooCommerce", "Booking Engine", "MySQL"]
    },

    // 13. Tailgunner Exhaust (SJ Innovation)
    {
      id: "tailgunner-exhaust",
      title: "Tailgunner Exhaust — Performance Motorcycle E-Commerce",
      category: "E-Commerce",
      company: "SJ Innovation LLC",
      companyLogo: "/logos/sjinnovation.png",
      period: "May 2024 – May 2024",
      featured: false,
      summary: "High-performance motorcycle exhaust systems e-commerce platform with WooCommerce inventory sync and streamlined checkout flows.",
      techStack: ["PHP", "WordPress", "WooCommerce", "MySQL"]
    },

    // 14. The Optimists (SJ Innovation)
    {
      id: "the-optimists",
      title: "The Optimists — Non-Profit Child Sponsorship Platform",
      category: "Non-Profit & Sponsorship",
      company: "SJ Innovation LLC",
      companyLogo: "/logos/sjinnovation.png",
      period: "May 2024 – May 2024",
      featured: false,
      summary: "Backend administrative portal for an international non-profit foundation enabling administrators to manage users, child profiles, sponsors, and automated recurring sponsorship donations.",
      techStack: ["PHP", "Laravel", "Recurring Payments", "MySQL", "Admin Dashboards"]
    },

    // 15. Learning And The Brain (SJ Innovation)
    {
      id: "learning-and-the-brain",
      title: "Learning And The Brain — Educational Platform Modernization",
      category: "EdTech & Legacy Systems",
      company: "SJ Innovation LLC",
      companyLogo: "/logos/sjinnovation.png",
      period: "Jun 2023 – Sep 2023",
      featured: false,
      summary: "Executed architectural modernizations, database optimizations, and feature enhancements for a long-established core PHP educational platform.",
      techStack: ["Core PHP", "MySQL", "PhpMyAdmin", "Back-End Web Development"]
    },

    // 16. Flippin Reality (SJ Innovation)
    {
      id: "flippin-reality",
      title: "Flippin Reality — Real Estate Property ETL & Scraping",
      category: "Real Estate & Data Scraping",
      company: "SJ Innovation LLC",
      companyLogo: "/logos/sjinnovation.png",
      period: "Jul 2023 – Aug 2023",
      featured: false,
      summary: "Engineered automated web scraping pipelines extracting land parcel datasets from multi-source real estate registries into a structured Laravel analytics application.",
      techStack: ["PHP", "Laravel", "Data Scraping", "ETL Pipelines", "MySQL"]
    },

    // 17. Inadcure (SJ Innovation)
    {
      id: "inadcure",
      title: "Inadcure — Autism Wellbeing Non-Profit Portal",
      category: "Non-Profit",
      company: "SJ Innovation LLC",
      companyLogo: "/logos/sjinnovation.png",
      period: "Jul 2023 – Aug 2023",
      featured: false,
      summary: "Digital communications and donation portal for an international non-profit foundation supporting children with autism spectrum conditions and neurodevelopmental wellbeing.",
      techStack: ["PHP", "WordPress", "Donations", "MySQL"]
    },

    // 18. Ennea Matchmaker (SJ Innovation)
    {
      id: "ennea-matchmaker",
      title: "Ennea Matchmaker — Privacy-Focused Matchmaking Engine",
      category: "Matchmaking & Privacy",
      company: "SJ Innovation LLC",
      companyLogo: "/logos/sjinnovation.png",
      period: "Jun 2023 – Jul 2023",
      featured: false,
      summary: "Compatible life partner discovery online platform engineered with personality scoring algorithms, strict user confidentiality, and private matching workflows.",
      techStack: ["Core PHP", "MySQL", "Matchmaking Algorithms", "Client Relations"]
    },

    // 19. Picnic BD (IYLMA)
    {
      id: "picnic-bd",
      title: "Picnic BD — Multi-Vendor Hotel Booking System",
      category: "Hospitality & Booking",
      company: "IYLMA Innovation Limited",
      companyLogo: "/logos/iylma.png",
      period: "Sep 2022 – Oct 2022",
      featured: false,
      summary: "Multi-vendor hotel, resort, and vacation reservation system supporting vendor onboarding, commission calculations, and room inventory availability tracking.",
      techStack: ["PHP", "Laravel", "Multi-Vendor Systems", "Booking Systems", "MySQL"]
    },

    // 20. Knowwear (Independent / Client)
    {
      id: "knowwear",
      title: "Knowwear — Australian Retail E-Commerce",
      category: "E-Commerce",
      company: "Independent Client",
      companyLogo: "/logos/instantwebb.png",
      period: "Jan 2022 – Feb 2022",
      featured: false,
      summary: "Direct-to-consumer fashion e-commerce storefront operating in Australia with responsive cart flows and integrated payment gateways.",
      techStack: ["PHP", "Laravel", "WooCommerce/E-Commerce", "MySQL", "Payment Gateways"]
    },

    // 21. EHRM of FSCD (Perky Rabbit)
    {
      id: "ehrm-fscd",
      title: "EHRM of FSCD — Fire Service Human Resource Management",
      category: "GovTech & Operations",
      company: "Perky Rabbit",
      companyLogo: "/logos/perkyrabbit.png",
      period: "Jan 2021 – Dec 2021",
      featured: false,
      summary: "National Human Resource Management system for the Fire Service and Civil Defence of Bangladesh Government managing thousands of civil service officers, service logs, and postings.",
      techStack: ["PHP", "Laravel", "GovTech Systems", "HR Management", "MySQL"]
    },

    // 22. ENOC of FSCD (Perky Rabbit)
    {
      id: "enoc-fscd",
      title: "ENOC of FSCD — National Building Fire Clearance Portal",
      category: "GovTech & Licensing",
      company: "Perky Rabbit",
      companyLogo: "/logos/perkyrabbit.png",
      period: "Jul 2021 – Dec 2021",
      featured: false,
      summary: "Public digital NOC (No Objection Certificate) clearance portal for buildings and commercial structures issued by Bangladesh Fire Service and Civil Defence.",
      techStack: ["PHP", "Laravel", "Government NOC Workflows", "Document Management", "MySQL"]
    },

    // 23. EStore of FSCD (Perky Rabbit)
    {
      id: "estore-fscd",
      title: "EStore of FSCD — Fire Service Centralized Inventory",
      category: "GovTech & Inventory",
      company: "Perky Rabbit",
      companyLogo: "/logos/perkyrabbit.png",
      period: "Jan 2021 – Dec 2021",
      featured: false,
      summary: "Centralized store and inventory tracking software managing apparatus, safety gear, hoses, and station equipment across regional fire stations nationwide.",
      techStack: ["PHP", "Laravel", "Inventory Management", "Logistics", "MySQL"]
    },

    // 24. Workshop/Fleet Management of FSCD (Perky Rabbit)
    {
      id: "workshop-fscd",
      title: "Workshop & Fleet Management of FSCD — Emergency Vehicle Fleet",
      category: "GovTech & Fleet",
      company: "Perky Rabbit",
      companyLogo: "/logos/perkyrabbit.png",
      period: "Jul 2021 – Dec 2021",
      featured: false,
      summary: "Operational workshop management system for Fire Service and Civil Defence tracking emergency vehicle maintenance, garage work orders, and emergency readiness.",
      techStack: ["PHP", "Laravel", "Fleet Management", "Maintenance Schedules", "MySQL"]
    },

    // 25. Law Messenger (MIEN IT)
    {
      id: "law-messenger",
      title: "Law Messenger — Legal Content & Subscription Platform",
      category: "LegalTech & Subscriptions",
      company: "MIEN IT LIMITED",
      companyLogo: "/logos/mienit.png",
      period: "Jan 2020 – Jan 2021",
      featured: false,
      summary: "Subscription-based legal repository providing law-related digital content, court case studies, and jurisprudence texts with recurring annual subscription access.",
      techStack: ["PHP", "HTML5", "Subscription Billing", "Digital Asset Management", "MySQL"]
    },

    // 26. FLS360 (MIEN IT)
    {
      id: "fls360",
      title: "FLS360 — Field Force Locator Telemetry System",
      category: "FinTech & Geospatial",
      company: "MIEN IT LIMITED",
      companyLogo: "/logos/mienit.png",
      period: "Jan 2020 – Dec 2020",
      featured: false,
      summary: "Field Force Locator 360° telemetry platform engineered for tracking field recovery and loan inspection officers of micro-finance organizations in real time.",
      techStack: ["PHP", "SQLite", "Field Force Telemetry", "Geolocation APIs"]
    },

    // 27. MTC (MIEN IT)
    {
      id: "mtc",
      title: "MTC — Hotel Management System & Double-Entry Accounting",
      category: "Hospitality & Accounting",
      company: "MIEN IT LIMITED",
      companyLogo: "/logos/mienit.png",
      period: "Jan 2020 – Dec 2020",
      featured: false,
      summary: "Hotel room reservation management system integrated with double-entry accounting ledgers, revenue calculations, room inventory, and occupancy analytics.",
      techStack: ["PHP MVC", "Bootstrap", "Accounting Ledgers", "Room Booking", "MySQL"]
    },

    // 28. School Management Software (classroom71) (MIEN IT)
    {
      id: "classroom71",
      title: "classroom71 — School Management ERP System",
      category: "EdTech",
      company: "MIEN IT LIMITED",
      companyLogo: "/logos/mienit.png",
      period: "Jan 2020 – Dec 2020",
      featured: false,
      summary: "Comprehensive school administrative ERP managing student enrollments, exam result tabulation, fee receipts, and automated guardian SMS notifications.",
      techStack: ["PHP", "MySQL", "School ERP", "Student Records", "REST APIs"]
    },

    // 29. Lawyer Finder (MIEN IT)
    {
      id: "lawyer-finder",
      title: "Lawyer Finder — Legal Services Client Marketplace",
      category: "LegalTech & Marketplace",
      company: "MIEN IT LIMITED",
      companyLogo: "/logos/mienit.png",
      period: "Aug 2020 – Oct 2020",
      featured: false,
      summary: "Marketplace connecting clients with attorneys. Legal practitioners manage experience profiles, while clients submit case briefs, solicit quotes, and engage counsel.",
      techStack: ["PHP", "Laravel", "HTML5", "Case Requests", "MySQL"]
    },

    // 30. CEDAR (MIEN IT)
    {
      id: "cedar",
      title: "CEDAR — Humanitarian Non-Profit Portal",
      category: "Non-Profit",
      company: "MIEN IT LIMITED",
      companyLogo: "/logos/mienit.png",
      period: "Jan 2020 – Mar 2020",
      featured: false,
      summary: "Dynamic digital portal and communication platform engineered for non-profit humanitarian organization CEDAR.",
      techStack: ["PHP MVC", "Bootstrap", "MySQL", "Non-Profit CMS"]
    },

    // 31. DESH Foundation (MIEN IT)
    {
      id: "desh-foundation",
      title: "DESH Foundation — Community Welfare Web Platform",
      category: "Non-Profit",
      company: "MIEN IT LIMITED",
      companyLogo: "/logos/mienit.png",
      period: "Feb 2020 – Mar 2020",
      featured: false,
      summary: "Public information and program coordination portal for non-profit social development organization Desh Foundation.",
      techStack: ["PHP MVC", "Bootstrap", "MySQL", "Content Publishing"]
    },

    // 32. DOLA Foundation (MIEN IT)
    {
      id: "dola-foundation",
      title: "DOLA Foundation — Youth Development Portal",
      category: "Non-Profit",
      company: "MIEN IT LIMITED",
      companyLogo: "/logos/mienit.png",
      period: "Jan 2020 – Mar 2020",
      featured: false,
      summary: "Dynamic digital web platform for non-profit foundation DOLA facilitating youth empowerment and social development initiatives.",
      techStack: ["PHP MVC", "Bootstrap", "MySQL", "Community Outreach"]
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
