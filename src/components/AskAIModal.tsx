import React, { useState } from 'react';
import { X, Sparkles, Send, Terminal, Bot } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface AskAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact?: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AskAIModal: React.FC<AskAIModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I'm Farhan's AI engineering avatar. Ask me anything about Farhan's 7+ years of experience, multi-PSP payment orchestration at Paymid, distributed idempotency mutexes, or tech stack.`
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);

  if (!isOpen) return null;

  const sampleQuestions = [
    "What does Farhan do at Paymid?",
    "How does he handle idempotency & race conditions?",
    "What is Farhan's core tech stack?",
    "How to retain or contact Farhan?"
  ];

  const handleAsk = (userQuestion: string) => {
    if (!userQuestion.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: userQuestion }];
    setMessages(newMessages);
    setQuery('');
    setIsThinking(true);

    setTimeout(() => {
      let reply = "";
      const q = userQuestion.toLowerCase();

      if (q.includes('paymid') || q.includes('current') || q.includes('role')) {
        reply = `Farhan is a Senior Backend & Payment Systems Engineer at Paymid (Cyprus / Remote). He architects high-throughput multi-PSP payment orchestration pipelines supporting 200+ acquirers and 700+ alternative payment methods. His work features dynamic routing matrices, automated acquirer circuit breakers (<15ms failover), and double-entry ledger bookkeeping.`;
      } else if (q.includes('idempotency') || q.includes('race') || q.includes('concurrency') || q.includes('lock')) {
        reply = `Farhan prevents double-charges using atomic distributed Redis mutexes combined with cryptographic idempotency keys (120-second TTL). In-flight duplicates are rejected with HTTP 409 or return cached signed receipts, while financial balances are protected with database row-level locking (SELECT ... FOR UPDATE) inside strict ACID transactions.`;
      } else if (q.includes('tech stack') || q.includes('skills') || q.includes('language') || q.includes('framework')) {
        reply = `Farhan's core production stack includes:\n• Languages & Frameworks: PHP 8.3, Laravel 11, Go, Node.js, TypeScript\n• Data & Storage: PostgreSQL, MySQL, Redis (Cluster, Redlock, Streams)\n• Architecture: Multi-PSP Orchestration, Event-Driven Architecture, Strategy Pattern, Distributed Idempotency, Double-Entry Ledgers, RESTful & OpenAPI Contracts\n• DevOps: Docker, Linux, CI/CD, AWS`;
      } else if (q.includes('contact') || q.includes('hire') || q.includes('retain') || q.includes('email') || q.includes('advisory')) {
        reply = `Farhan is open for senior engineering roles, payment infrastructure advisory, and backend architecture contracts. You can reach him directly at ${PORTFOLIO_DATA.engineer.links.email} or connect on LinkedIn at ${PORTFOLIO_DATA.engineer.links.linkedin}.`;
      } else {
        reply = `Farhan Zaman Khan is a Senior Software Engineer with over 7 years of production backend experience. He holds an engineering degree from KUET (Batch '13) and specializes in payment gateways, fault-tolerant financial rails, and distributed transactional systems at Paymid. Feel free to ask about his projects, architecture patterns, or contact info!`;
      }

      setMessages([...newMessages, { role: 'assistant', content: reply }]);
      setIsThinking(false);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-2xl border border-white/[0.08] bg-[#111318] shadow-2xl p-6 sm:p-7 text-left flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-blue-400 font-semibold uppercase">
                <Terminal className="w-3.5 h-3.5" />
                <span>Ask AI • Farhan's Knowledge Base</span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Ask about Architecture, Projects & Tech Stack
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#090a0d] border border-white/[0.08] text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 text-xs mb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-6 h-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-blue-400" />
                </div>
              )}
              <div
                className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-600/20 text-white border border-blue-500/30 font-medium'
                    : 'bg-[#090a0d] text-slate-300 border border-white/[0.05] whitespace-pre-line'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 text-slate-500 text-xs font-mono pl-8">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
              <span>Querying knowledge graph...</span>
            </div>
          )}
        </div>

        {/* Suggested Queries */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(q)}
              className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-slate-400 hover:text-slate-200 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(query);
          }}
          className="flex items-center gap-2 pt-2 border-t border-white/[0.06]"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a technical or career question..."
            className="flex-1 bg-[#090a0d] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-white/20 font-mono"
          />
          <button
            type="submit"
            disabled={!query.trim()}
            className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-black font-semibold text-xs transition-colors flex items-center gap-1 disabled:opacity-40"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};
