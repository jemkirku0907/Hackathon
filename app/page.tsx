'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  BookOpen, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  GraduationCap, 
  MapPin, 
  Building2, 
  Loader2, 
  CheckCircle2, 
  AlertOctagon, 
  Plus, 
  Search, 
  MessageSquare, 
  Settings, 
  Copy, 
  Menu, 
  X,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { ChatResponse, Citation } from '@/lib/types';
import { QuoteModal } from '@/components/QuoteModal';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  data?: ChatResponse;
  timestamp: string;
}

interface ChatSession {
  id: string;
  title: string;
  date: string;
}

const INITIAL_SESSIONS: ChatSession[] = [
  { id: '1', title: 'Scholarships & Exemption Guidelines', date: 'Today' },
  { id: '2', title: 'CCIS Computer Science GWA Rules', date: 'Today' },
  { id: '3', title: 'Admin Building & Campus Directory', date: 'Yesterday' },
  { id: '4', title: 'University President & Registrar Details', date: 'Past week' },
];

const SUGGESTED_PROMPTS = [
  {
    icon: GraduationCap,
    label: "Automatic Scholar",
    query: "Who is automatically a scholar at UMak?"
  },
  {
    icon: FileText,
    label: "BS Computer Science",
    query: "What are the GWA and Math grade requirements for BS Computer Science?"
  },
  {
    icon: MapPin,
    label: "CIT Location",
    query: "Where is the Center for Information Technology located in the Admin building?"
  },
  {
    icon: Building2,
    label: "University President",
    query: "Who is the University President and what is his alias?"
  },
  {
    icon: HelpCircle,
    label: "Missing Info Check",
    query: "What is the tuition fee for the College of Medicine in 2030?"
  }
];

export default function Home() {
  const [sessions, setSessions] = useState<ChatSession[]>(INITIAL_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState<string>('1');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Mabuhay Herons! Welcome to TAGA-asK AI, your verified AI knowledge assistant grounded strictly in University of Makati's official documents:\n\n• Source01: Scholarships & Token Fee Exemption (14 pages)\n• Source02: College Requirements (CCIS & Colleges, 2 pages)\n• Source03: Campus Map & Building Directory (6 pages)\n• Source04: Administrative & Academic Offices (14 pages)\n\nAsk any question regarding admissions, scholarships, campus locations, or university offices.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeCitation, setActiveCitation] = useState<Citation | null>(null);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleNewChat = () => {
    const newId = String(Date.now());
    const newSession: ChatSession = {
      id: newId,
      title: 'New Conversation',
      date: 'Today'
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newId);
    setMessages([
      {
        id: 'welcome-' + newId,
        sender: 'assistant',
        text: "New conversation initiated. Ask anything about UMak scholarships, admission requirements, campus locations, or offices!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setIsSidebarOpen(false);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    if (query.length > 500) {
      setErrorBanner("Message exceeds the 500 characters limit.");
      return;
    }

    setErrorBanner(null);
    setInput('');

    const userMessage: Message = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      const data: ChatResponse = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setErrorBanner(data.answer || "Rate limit reached. Please wait a moment before sending another message.");
        } else {
          setErrorBanner(data.answer || "An error occurred while contacting the server.");
        }
      }

      const assistantMessage: Message = {
        id: 'asst-' + Date.now(),
        sender: 'assistant',
        text: data.answer,
        data: data,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      setErrorBanner("Network error. Please verify your connection.");
      setMessages(prev => [
        ...prev,
        {
          id: 'asst-err-' + Date.now(),
          sender: 'assistant',
          text: "Unable to process request due to a network connection failure.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSessions = sessions.filter(s => 
    s.title.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-800 font-sans overflow-hidden">
      {/* Mobile Drawer Backdrop */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-2xs transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* 1. SIDEBAR: Sleek Midnight Navy (#0B132B / #0F172A) & Gold Yellow (#D1CA25) */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 flex flex-col bg-[#0B132B] text-white border-r border-[#1C2541] transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1C2541] to-[#283991] flex items-center justify-center font-black text-[#D1CA25] text-lg shadow-md border-2 border-[#D1CA25]/80">
              TAK
            </div>
            <div>
              <h2 className="font-bold text-white text-[16px] tracking-tight leading-tight">TAGA-asK AI</h2>
              <span className="text-[10px] text-[#D1CA25] font-bold tracking-wider uppercase">UMak Knowledge Hub</span>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
            className="md:hidden text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Actions: New Chat & Search */}
        <div className="p-3 space-y-2">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#1C2541] hover:bg-[#283991] text-white font-semibold text-xs shadow-xs transition border border-white/10 group focus-visible:outline-[#D1CA25]"
          >
            <span className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#D1CA25] group-hover:rotate-90 transition-transform" />
              <span>New Conversation</span>
            </span>
            <kbd className="text-[10px] bg-black/40 px-1.5 py-0.5 rounded text-white/70 border border-white/10 font-mono">⌘K</kbd>
          </button>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search conversations..." 
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#1C2541]/70 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-hidden focus:border-[#D1CA25] transition"
            />
          </div>
        </div>

        {/* Navigation / History list */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
          <div>
            <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Verified Sessions
            </p>
            <div className="space-y-1">
              {filteredSessions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveSessionId(s.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition text-left truncate ${
                    activeSessionId === s.id
                      ? 'bg-[#1C2541] text-[#D1CA25] font-semibold border-l-4 border-[#D1CA25] shadow-xs'
                      : 'text-slate-300 hover:bg-[#1C2541]/50 hover:text-white'
                  }`}
                >
                  <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${activeSessionId === s.id ? 'text-[#D1CA25]' : 'text-slate-400'}`} />
                  <span className="truncate">{s.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Official PDF Sources
            </p>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1C2541]/40 border border-white/5">
                <FileText className="w-3.5 h-3.5 text-[#D1CA25] shrink-0" />
                <span className="truncate">Source01: Scholarships (14p)</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1C2541]/40 border border-white/5">
                <FileText className="w-3.5 h-3.5 text-[#21ADE3] shrink-0" />
                <span className="truncate">Source02: CCIS & Courses (2p)</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1C2541]/40 border border-white/5">
                <MapPin className="w-3.5 h-3.5 text-[#D1CA25] shrink-0" />
                <span className="truncate">Source03: Campus Map (6p)</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1C2541]/40 border border-white/5">
                <Building2 className="w-3.5 h-3.5 text-[#21ADE3] shrink-0" />
                <span className="truncate">Source04: Offices (14p)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/10 bg-[#070D1E] space-y-2">
          <div className="flex items-center gap-2 px-2 py-1 text-slate-300 text-xs">
            <ShieldCheck className="w-4 h-4 text-[#D1CA25]" />
            <span className="text-[11px] font-medium">Zero Hallucination Grounding</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/10 px-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#283991] to-[#1C2541] text-[#D1CA25] font-bold flex items-center justify-center text-xs border border-[#D1CA25]/60">
                UM
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-white">UMak Student</p>
                <p className="text-[10px] text-slate-400">Verified User</p>
              </div>
            </div>
            <Settings className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
          </div>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE */}
      <section className="flex-1 flex flex-col h-screen min-w-0 bg-[#f8fafc]">
        {/* Top Header */}
        <header className="h-16 px-4 md:px-8 bg-white border-b border-slate-200 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open sidebar menu"
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus-visible:outline-[#283991]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-900 text-base md:text-lg">UMak Knowledge Base</h1>
                <span className="bg-[#E9ECF8] text-[#283991] border border-[#283991]/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Verified RAG
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Exclusively referencing Source01 to Source04</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium text-slate-700">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Grounded Generation Active</span>
            </div>
          </div>
        </header>

        {/* Message View Area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6 max-w-4xl w-full mx-auto">
          {/* Error Banner with Alert Red (#EC202B) */}
          {errorBanner && (
            <div 
              role="alert"
              className="bg-[#FDE8E9] border border-[#EC202B]/30 text-[#EC202B] px-4 py-3 rounded-xl flex items-center gap-3 text-xs shadow-2xs animate-in fade-in"
            >
              <AlertOctagon className="w-4 h-4 text-[#EC202B] shrink-0" />
              <p className="flex-1 font-semibold">{errorBanner}</p>
              <button 
                onClick={() => setErrorBanner(null)}
                aria-label="Dismiss alert"
                className="text-[#EC202B] hover:opacity-80 font-bold p-1"
              >
                ✕
              </button>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* Bot Avatar with Official Blue & Yellow */}
              {msg.sender === 'assistant' && (
                <div className="w-9 h-9 rounded-xl bg-[#283991] text-[#D1CA25] font-black flex items-center justify-center text-sm shadow-xs shrink-0 border border-[#D1CA25]">
                  U
                </div>
              )}

              {/* Message Content */}
              <div className="max-w-[85%] md:max-w-[75%] space-y-1.5">
                {/* Meta info */}
                <div className={`flex items-center gap-2 text-[11px] ${msg.sender === 'user' ? 'justify-end text-slate-400' : 'text-slate-500'}`}>
                  <span className="font-semibold text-slate-700">
                    {msg.sender === 'user' ? 'You' : 'TAGA-asK AI'}
                  </span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-4 rounded-2xl text-[15px] leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-[#283991] text-white rounded-tr-none'
                      : 'bg-white text-slate-900 border border-slate-200/90 rounded-tl-none shadow-xs'
                  }`}
                >
                  {/* Assistant Status Badges */}
                  {msg.sender === 'assistant' && msg.data && (
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      {msg.data.conflict && (
                        <span className="inline-flex items-center gap-1.5 bg-[#FFFDE0] text-[#7A7400] border border-[#D1CA25] px-2.5 py-1 rounded-lg text-xs font-semibold">
                          <AlertTriangle className="w-3.5 h-3.5 text-[#D1CA25]" />
                          Source Conflict Flagged
                        </span>
                      )}

                      {!msg.data.in_sources ? (
                        <span className="inline-flex items-center gap-1.5 bg-[#FDE8E9] text-[#EC202B] border border-[#EC202B]/30 px-2.5 py-1 rounded-lg text-xs font-semibold">
                          <AlertOctagon className="w-3.5 h-3.5 text-[#EC202B]" />
                          Information Not Found in Sources
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-lg text-xs font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Strictly Grounded & Verified
                        </span>
                      )}
                    </div>
                  )}

                  {/* Message Text */}
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {/* Citations Box with Accent Cyan (#21ADE3) & Yellow icons */}
                  {msg.data?.citations && msg.data.citations.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                        Official Citations (Click to inspect exact quote):
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {msg.data.citations.map((c, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveCitation(c)}
                            className="inline-flex items-center gap-1.5 bg-[#E9ECF8] hover:bg-[#d8def2] border border-[#283991]/30 text-[#283991] text-xs px-3 py-1.5 rounded-lg font-semibold transition group shadow-2xs focus-visible:outline-[#21ADE3]"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-[#21ADE3] group-hover:scale-110 transition" />
                            <span>{c.source} · Page {c.page}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Assistant Message Actions */}
                {msg.sender === 'assistant' && (
                  <div className="flex items-center gap-2 pt-0.5 text-slate-400">
                    <button 
                      onClick={() => handleCopy(msg.text, msg.id)}
                      className="p-1.5 hover:text-slate-700 hover:bg-slate-200/60 rounded-md transition flex items-center gap-1 text-[11px]"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedId === msg.id ? <span className="text-emerald-600 font-semibold">Copied!</span> : <span>Copy</span>}
                    </button>
                  </div>
                )}
              </div>

              {/* User Avatar */}
              {msg.sender === 'user' && (
                <div className="w-9 h-9 rounded-xl bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-sm shadow-2xs shrink-0">
                  You
                </div>
              )}
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3.5 items-start">
              <div className="w-9 h-9 rounded-xl bg-[#283991] text-[#D1CA25] font-black flex items-center justify-center text-sm shadow-xs shrink-0 border border-[#D1CA25]">
                U
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-2xs flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-[#283991] animate-spin" />
                <span className="text-xs font-medium text-slate-600">
                  Retrieving official PDF passages and verifying citations...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompt Chips */}
        {messages.length <= 2 && (
          <div className="max-w-4xl w-full mx-auto px-4 md:px-8 mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Suggested Questions (Grounded in PDFs):
            </span>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p.query)}
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#E9ECF8] border border-slate-200 text-slate-700 hover:text-[#283991] text-xs px-3 py-2 rounded-xl transition shadow-2xs font-medium focus-visible:outline-[#21ADE3]"
                >
                  <p.icon className="w-3.5 h-3.5 text-[#283991]" />
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Composer Section */}
        <footer className="p-4 md:p-6 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto space-y-2">
            <div className="border border-slate-300 rounded-2xl bg-white shadow-2xs focus-within:border-[#283991] focus-within:ring-2 focus-within:ring-[#283991]/20 transition p-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask about UMak scholarships, admission requirements, campus locations, or offices..."
                maxLength={500}
                rows={2}
                disabled={isLoading}
                className="w-full bg-transparent resize-none border-0 focus:outline-hidden text-sm text-slate-800 placeholder-slate-400"
              />

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-[11px] font-mono text-slate-500">
                    {input.length}/500 chars
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!input.trim() || isLoading}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#283991] hover:bg-[#1C2866] text-white rounded-xl font-semibold text-xs shadow-xs disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition focus-visible:outline-[#D1CA25]"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <p className="text-center text-[11px] text-slate-500">
              TAGA-asK AI adheres strictly to Source01-Source04. Hallucinations are actively prevented server-side.
            </p>
          </div>
        </footer>
      </section>

      {/* Citation Quote Modal */}
      <QuoteModal citation={activeCitation} onClose={() => setActiveCitation(null)} />
    </div>
  );
}
