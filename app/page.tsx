'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
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
  HelpCircle,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Mabuhay Herons! Welcome to TAGA-ask AI, your verified AI knowledge assistant grounded strictly in University of Makati's official documents:\n\n• Source01: Scholarships & Token Fee Exemption (14 pages)\n• Source02: College Requirements (CCIS & Colleges, 2 pages)\n• Source03: Campus Map & Building Directory (6 pages)\n• Source04: Administrative & Academic Offices (14 pages)\n\nAsk any question regarding admissions, scholarships, campus locations, or university offices.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeCitation, setActiveCitation] = useState<Citation | null>(null);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('umak_theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = prefersDark ? 'dark' : 'light';
      setTheme(initial);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('umak_theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

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
    <div className="flex h-screen w-full bg-[#F8FAFC] dark:bg-[#090E1A] text-slate-900 dark:text-slate-100 font-sans overflow-hidden transition-colors duration-200">
      
      {/* 
        1. COLLAPSIBLE ICON-STRIP / FULL SIDEBAR:
        - Smooth spring-like ease: transition-[width] duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]
        - Inner fixed width wrapper (w-72) prevents text from squishing or reflowing mid-transition
        - When Open: w-72 (288px)
        - When Closed: w-18 (72px)
      */}
      <aside 
        className={`group relative z-20 h-screen flex flex-col transition-[width] duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]
          bg-white dark:bg-[#0B132B] text-slate-800 dark:text-white border-r border-slate-200 dark:border-[#1C2541] shrink-0 overflow-visible
          ${isSidebarOpen ? 'w-72' : 'w-[72px]'}`}
      >
        {/* Hover Toggle Button on Sidebar Border - Centered vertically in the middle (top-1/2 -translate-y-1/2) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsSidebarOpen((prev) => !prev);
          }}
          aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          className="absolute -right-3.5 top-1/2 -translate-y-1/2 z-50 w-7 h-7 rounded-full bg-white dark:bg-[#1C2541] border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center text-slate-600 dark:text-slate-200 hover:text-[#3F56CA] dark:hover:text-[#D1CA25] transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 focus-visible:opacity-100 focus-visible:outline-[#3F56CA] cursor-pointer pointer-events-auto select-none"
        >
          {isSidebarOpen ? (
            <ChevronLeft className="w-4 h-4 transition-transform duration-200 pointer-events-none" />
          ) : (
            <ChevronRight className="w-4 h-4 transition-transform duration-200 pointer-events-none" />
          )}
        </button>

        {/* Inner Container with fixed w-72 so text never gets squeezed or clips mid-animation */}
        <div className="w-72 flex flex-col h-full overflow-hidden">

        {/* Brand Header */}
        <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between min-h-[64px]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#1C2541] flex items-center justify-center p-1 shadow-xs border border-slate-200 dark:border-[#1C2541] shrink-0 overflow-hidden">
              <Image 
                src="/taga-ask-logo.png" 
                alt="TAGA-ask AI Heron" 
                width={36} 
                height={36} 
                className="w-full h-full object-contain"
                priority
              />
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden whitespace-nowrap animate-in fade-in duration-200">
                <h2 className="font-bold text-slate-900 dark:text-white text-[16px] tracking-tight leading-tight">TAGA-ask AI</h2>
                <span className="text-[10px] text-[#3F56CA] dark:text-[#D1CA25] font-bold tracking-wider uppercase">UMak Knowledge Hub</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions: New Chat & Search */}
        <div className="p-3 space-y-2">
          <button
            onClick={handleNewChat}
            title="New Conversation"
            className={`w-full flex items-center rounded-xl transition shadow-xs group font-semibold text-xs
              bg-[#3F56CA] hover:bg-[#2B3C8E] text-white focus-visible:outline-[#3F56CA]
              ${isSidebarOpen ? 'justify-between px-3.5 py-2.5' : 'justify-center p-2.5'}`}
          >
            <span className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-white dark:text-[#D1CA25] group-hover:rotate-90 transition-transform shrink-0" />
              {isSidebarOpen && <span>New Conversation</span>}
            </span>
            {isSidebarOpen && (
              <kbd className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded text-white/90 border border-white/20 font-mono">⌘K</kbd>
            )}
          </button>

          {isSidebarOpen ? (
            <div className="relative animate-in fade-in duration-150">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/40" />
              <input 
                type="text" 
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search conversations..." 
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg transition
                  bg-slate-100 dark:bg-[#1C2541]/70 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-white/40 focus:outline-hidden focus:border-[#3F56CA] dark:focus:border-[#D1CA25]"
              />
            </div>
          ) : (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              title="Search conversations"
              className="w-full flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition"
            >
              <Search className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation / History list */}
        <div className="flex-1 overflow-y-auto px-2 space-y-4">
          <div>
            {isSidebarOpen && (
              <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1.5 animate-in fade-in">
                Verified Sessions
              </p>
            )}
            <div className="space-y-1">
              {filteredSessions.map((s) => {
                const isActive = activeSessionId === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveSessionId(s.id)}
                    title={s.title}
                    className={`w-full flex items-center gap-2.5 rounded-lg text-xs transition text-left truncate ${
                      isSidebarOpen ? 'px-3 py-2' : 'justify-center p-2.5'
                    } ${
                      isActive
                        ? 'bg-[#EEF2FC] dark:bg-[#1C2541] text-[#3F56CA] dark:text-[#D1CA25] font-semibold border-l-4 border-[#3F56CA] dark:border-[#D1CA25] shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1C2541]/50 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <MessageSquare className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#3F56CA] dark:text-[#D1CA25]' : 'text-slate-400 dark:text-slate-400'}`} />
                    {isSidebarOpen && <span className="truncate">{s.title}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            {isSidebarOpen && (
              <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1.5 animate-in fade-in">
                Official PDF Sources
              </p>
            )}
            <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
              <div 
                title="Source01: Scholarships (14p)"
                className={`flex items-center gap-2 rounded-lg bg-slate-50 dark:bg-[#1C2541]/40 border border-slate-200/80 dark:border-white/5 ${
                  isSidebarOpen ? 'px-3 py-2' : 'justify-center p-2.5'
                }`}
              >
                <FileText className="w-4 h-4 text-[#3F56CA] dark:text-[#D1CA25] shrink-0" />
                {isSidebarOpen && <span className="truncate">Source01: Scholarships (14p)</span>}
              </div>
              <div 
                title="Source02: CCIS & Courses (2p)"
                className={`flex items-center gap-2 rounded-lg bg-slate-50 dark:bg-[#1C2541]/40 border border-slate-200/80 dark:border-white/5 ${
                  isSidebarOpen ? 'px-3 py-2' : 'justify-center p-2.5'
                }`}
              >
                <FileText className="w-4 h-4 text-[#21ADE3] shrink-0" />
                {isSidebarOpen && <span className="truncate">Source02: CCIS & Courses (2p)</span>}
              </div>
              <div 
                title="Source03: Campus Map (6p)"
                className={`flex items-center gap-2 rounded-lg bg-slate-50 dark:bg-[#1C2541]/40 border border-slate-200/80 dark:border-white/5 ${
                  isSidebarOpen ? 'px-3 py-2' : 'justify-center p-2.5'
                }`}
              >
                <MapPin className="w-4 h-4 text-[#3F56CA] dark:text-[#D1CA25] shrink-0" />
                {isSidebarOpen && <span className="truncate">Source03: Campus Map (6p)</span>}
              </div>
              <div 
                title="Source04: Offices (14p)"
                className={`flex items-center gap-2 rounded-lg bg-slate-50 dark:bg-[#1C2541]/40 border border-slate-200/80 dark:border-white/5 ${
                  isSidebarOpen ? 'px-3 py-2' : 'justify-center p-2.5'
                }`}
              >
                <Building2 className="w-4 h-4 text-[#21ADE3] shrink-0" />
                {isSidebarOpen && <span className="truncate">Source04: Offices (14p)</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#070D1E] space-y-2">
          <div 
            title="Zero Hallucination Grounding"
            className={`flex items-center gap-2 text-slate-600 dark:text-slate-300 text-xs ${
              isSidebarOpen ? 'px-2 py-1' : 'justify-center'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#3F56CA] dark:text-[#D1CA25] shrink-0" />
            {isSidebarOpen && <span className="text-[11px] font-medium truncate">Zero Hallucination Grounding</span>}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-white/10 px-1">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-full bg-[#EEF2FC] dark:bg-gradient-to-br dark:from-[#3F56CA] dark:to-[#1C2541] text-[#3F56CA] dark:text-[#D1CA25] font-bold flex items-center justify-center text-xs border border-[#3F56CA]/30 dark:border-[#D1CA25]/60 shrink-0">
                UM
              </div>
              {isSidebarOpen && (
                <div className="text-left truncate">
                  <p className="text-xs font-semibold text-slate-800 dark:text-white truncate">UMak Student</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Verified User</p>
                </div>
              )}
            </div>
            {isSidebarOpen && (
              <Settings className="w-4 h-4 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer transition shrink-0" />
            )}
          </div>
        </div>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE */}
      <section className="flex-1 flex flex-col h-screen min-w-0 bg-[#F8FAFC] dark:bg-[#090E1A] transition-colors duration-200">
        {/* Top Header: Clean title, UMak Seal, and single Theme Toggle */}
        <header className="h-16 px-4 md:px-8 bg-white dark:bg-[#111827] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-2xs transition-colors duration-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow-xs border border-slate-200 dark:border-slate-700 shrink-0">
              <Image
                src="/umak-seal.png"
                alt="University of Makati Seal"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-900 dark:text-white text-base md:text-lg">UMak Knowledge Base</h1>
                <span className="bg-[#EEF2FC] dark:bg-[#1C2541] text-[#3F56CA] dark:text-[#21ADE3] border border-[#3F56CA]/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Verified RAG
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Exclusively referencing Source01 to Source04</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* THE ONLY THEME TOGGLE IN THE ENTIRE UI */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition focus-visible:outline-[#3F56CA]"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#D1CA25]" />
              ) : (
                <Moon className="w-4 h-4 text-[#3F56CA]" />
              )}
            </button>
          </div>
        </header>

        {/* Message View Area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6 max-w-4xl w-full mx-auto">
          {/* Error Banner with Alert Red (#EC202B) */}
          {errorBanner && (
            <div 
              role="alert"
              className="bg-[#FDE8E9] dark:bg-red-950/40 border border-[#EC202B]/40 text-[#EC202B] px-4 py-3 rounded-xl flex items-center gap-3 text-xs shadow-2xs animate-in fade-in"
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
              {/* Bot Avatar */}
              {msg.sender === 'assistant' && (
                <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#1C2541] flex items-center justify-center p-1 shadow-xs shrink-0 border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <Image
                    src="/taga-ask-logo.png"
                    alt="TAGA-ask AI"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Message Content */}
              <div className="max-w-[85%] md:max-w-[75%] space-y-1.5">
                {/* Meta info */}
                <div className={`flex items-center gap-2 text-[11px] ${msg.sender === 'user' ? 'justify-end text-slate-400' : 'text-slate-500 dark:text-slate-400'}`}>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {msg.sender === 'user' ? 'You' : 'TAGA-ask AI'}
                  </span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-4 rounded-2xl text-[15px] leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-[#3F56CA] text-white rounded-tr-none'
                      : 'bg-white dark:bg-[#111827] text-slate-900 dark:text-slate-100 border border-slate-200/90 dark:border-slate-800 rounded-tl-none shadow-xs'
                  }`}
                >
                  {/* Assistant Status Badges */}
                  {msg.sender === 'assistant' && msg.data && (
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      {msg.data.conflict && (
                        <span className="inline-flex items-center gap-1.5 bg-[#FFFDE0] dark:bg-yellow-950/40 text-[#7A7400] dark:text-[#D1CA25] border border-[#D1CA25] px-2.5 py-1 rounded-lg text-xs font-semibold">
                          <AlertTriangle className="w-3.5 h-3.5 text-[#D1CA25]" />
                          Source Conflict Flagged
                        </span>
                      )}

                      {!msg.data.in_sources ? (
                        <span className="inline-flex items-center gap-1.5 bg-[#FDE8E9] dark:bg-red-950/40 text-[#EC202B] border border-[#EC202B]/40 px-2.5 py-1 rounded-lg text-xs font-semibold">
                          <AlertOctagon className="w-3.5 h-3.5 text-[#EC202B]" />
                          Information Not Found in Sources
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 px-2.5 py-1 rounded-lg text-xs font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          Strictly Grounded & Verified
                        </span>
                      )}
                    </div>
                  )}

                  {/* Message Text */}
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {/* Citations Box with Accent Cyan (#21ADE3) */}
                  {msg.data?.citations && msg.data.citations.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                        Official Citations (Click to inspect exact quote):
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {msg.data.citations.map((c, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveCitation(c)}
                            className="inline-flex items-center gap-1.5 bg-[#EEF2FC] dark:bg-[#1C2541] hover:bg-[#d8e0f8] dark:hover:bg-[#253358] border border-[#3F56CA]/30 text-[#3F56CA] dark:text-[#21ADE3] text-xs px-3 py-1.5 rounded-lg font-semibold transition group shadow-2xs focus-visible:outline-[#21ADE3]"
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
                      className="p-1.5 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-md transition flex items-center gap-1 text-[11px]"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedId === msg.id ? <span className="text-emerald-600 font-semibold">Copied!</span> : <span>Copy</span>}
                    </button>
                  </div>
                )}
              </div>

              {/* User Avatar */}
              {msg.sender === 'user' && (
                <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold flex items-center justify-center text-sm shadow-2xs shrink-0">
                  You
                </div>
              )}
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3.5 items-start">
              <div className="w-9 h-9 rounded-xl bg-[#3F56CA] text-[#D1CA25] font-black flex items-center justify-center text-sm shadow-xs shrink-0 border border-[#D1CA25]/80">
                TAK
              </div>
              <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl rounded-tl-none p-4 shadow-2xs flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-[#3F56CA] animate-spin" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
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
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
              Suggested Questions (Grounded in PDFs):
            </span>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p.query)}
                  className="inline-flex items-center gap-2 bg-white dark:bg-[#111827] hover:bg-[#EEF2FC] dark:hover:bg-[#1C2541] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-[#3F56CA] dark:hover:text-[#21ADE3] text-xs px-3 py-2 rounded-xl transition shadow-2xs font-medium focus-visible:outline-[#21ADE3]"
                >
                  <p.icon className="w-3.5 h-3.5 text-[#3F56CA] dark:text-[#21ADE3]" />
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Composer Section */}
        <footer className="p-4 md:p-6 bg-white dark:bg-[#111827] border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
          <div className="max-w-4xl mx-auto space-y-2">
            <div className="border border-slate-300 dark:border-slate-700 rounded-2xl bg-white dark:bg-[#090E1A] shadow-2xs focus-within:border-[#3F56CA] focus-within:ring-2 focus-within:ring-[#3F56CA]/20 transition p-3">
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
                className="w-full bg-transparent resize-none border-0 focus:outline-hidden text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400"
              />

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    {input.length}/500 chars
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!input.trim() || isLoading}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#3F56CA] hover:bg-[#2B3C8E] text-white rounded-xl font-semibold text-xs shadow-xs disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 disabled:cursor-not-allowed transition focus-visible:outline-[#D1CA25]"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <p className="text-center text-[11px] text-slate-500 dark:text-slate-400">
              TAGA-ask AI adheres strictly to Source01-Source04. Hallucinations are actively prevented server-side.
            </p>
          </div>
        </footer>
      </section>

      {/* Citation Quote Modal */}
      <QuoteModal citation={activeCitation} onClose={() => setActiveCitation(null)} />
    </div>
  );
}
