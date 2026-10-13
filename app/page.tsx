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
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertOctagon,
  Plus,
  Search,
  MessageSquare,
  Settings,
  HelpCircle,
  ChevronDown,
  Paperclip,
  Mic,
  Copy,
  RefreshCw,
  ExternalLink,
  Info,
  Menu,
  X
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
  active?: boolean;
}

const INITIAL_SESSIONS: ChatSession[] = [
  { id: '1', title: 'Scholarship Requirements & Process', date: 'Today', active: true },
  { id: '2', title: 'CCIS Computer Science GWA', date: 'Today' },
  { id: '3', title: 'Admin Building Offices & Floor Map', date: 'Yesterday' },
  { id: '4', title: 'University President & Registrar Head', date: 'Previous 7 days' },
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
    label: "Out of Bounds Test",
    query: "What is the tuition fee for the College of Medicine in 2030?"
  }
];

export default function Home() {
  const [sessions, setSessions] = useState<ChatSession[]>(INITIAL_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState<string>('1');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Mabuhay Herons! I am UMak Assistant, your verified AI knowledge assistant grounded strictly in University of Makati's official documents:\n\n• Source01: Scholarships & Token Fee Exemption\n• Source02: College Requirements (CCIS & Available Colleges)\n• Source03: Campus Map & Building Directory\n• Source04: Administrative & Academic Offices\n\nHow can I help you navigate your university concerns today?",
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
      date: 'Today',
      active: true
    };
    setSessions(prev => [newSession, ...prev.map(s => ({ ...s, active: false }))]);
    setActiveSessionId(newId);
    setMessages([
      {
        id: 'welcome-' + newId,
        sender: 'assistant',
        text: "Started a new verified session. Ask anything about UMak scholarships, admission/college requirements, campus locations, or offices!",
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

  return (
    <div className="flex h-screen w-full bg-[#f8f9fa] text-slate-800 font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar: Groupmates' Professional Structure upgraded with UMak Colors */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 flex flex-col bg-[#0f172a] text-slate-200 border-r border-slate-800 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E3A8A] border border-amber-400/40 flex items-center justify-center font-black text-amber-400 text-lg shadow-md">
              UM
            </div>
            <div>
              <h2 className="font-bold text-white tracking-tight leading-tight text-sm">UMak Assistant</h2>
              <span className="text-[10px] text-amber-400/90 font-medium tracking-wide uppercase">AI Knowledge Hub</span>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="p-3 space-y-2">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#1E3A8A] to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white font-medium text-xs shadow-sm transition border border-blue-700/50 group"
          >
            <span className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-400 group-hover:rotate-90 transition-transform" />
              New Conversation
            </span>
            <kbd className="text-[10px] bg-blue-950/80 px-1.5 py-0.5 rounded text-blue-200 border border-blue-800">⌘K</kbd>
          </button>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900/80 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* Chat History Section */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
          <div>
            <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Verified Sessions
            </p>
            <div className="space-y-1">
              {sessions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveSessionId(s.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition text-left truncate ${
                    activeSessionId === s.id
                      ? 'bg-blue-950/80 text-amber-400 font-medium border border-blue-800/60'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${activeSessionId === s.id ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span className="truncate">{s.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Official PDF Sources
            </p>
            <div className="space-y-1 text-[11px] text-slate-300">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900/60 border border-slate-800/80">
                <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">Source01: Scholarships (14p)</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900/60 border border-slate-800/80">
                <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate">Source02: CCIS & Courses (2p)</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900/60 border border-slate-800/80">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Source03: Campus Map (6p)</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900/60 border border-slate-800/80">
                <Building2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="truncate">Source04: Offices (14p)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-800 bg-[#0b1120] space-y-2">
          <div className="flex items-center gap-2.5 px-2 py-1 text-slate-400 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px]">Zero Hallucination Grounding</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 px-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-900 text-amber-400 font-bold flex items-center justify-center text-xs border border-amber-400/30">
                JH
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-200">UMak Student</p>
                <p className="text-[10px] text-slate-400">Verified User</p>
              </div>
            </div>
            <Settings className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <section className="flex-1 flex flex-col h-screen min-w-0 bg-[#f8fafc]">
        {/* Header matching wireframe */}
        <header className="h-16 px-6 bg-white border-b border-slate-200 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-900 text-base">UMak Knowledge Base</h1>
                <span className="bg-blue-50 text-blue-900 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Verified RAG
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Exclusively referencing Source01 to Source04</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl border border-slate-200 text-xs font-medium text-slate-700">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Google Gemini 1.5 Flash Grounded</span>
            </div>
          </div>
        </header>

        {/* Message View Area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6 max-w-4xl w-full mx-auto">
          {/* Error Banner */}
          {errorBanner && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-xl flex items-center gap-3 text-xs shadow-xs animate-in fade-in">
              <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0" />
              <p className="flex-1 font-medium">{errorBanner}</p>
              <button 
                onClick={() => setErrorBanner(null)}
                className="text-rose-500 hover:text-rose-800 font-bold"
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
                <div className="w-9 h-9 rounded-xl bg-[#1E3A8A] text-amber-400 font-black flex items-center justify-center text-sm shadow-sm shrink-0 border border-amber-400/30">
                  U
                </div>
              )}

              {/* Message Content Container */}
              <div className={`max-w-[85%] md:max-w-[75%] space-y-2`}>
                {/* Meta info */}
                <div className={`flex items-center gap-2 text-[11px] ${msg.sender === 'user' ? 'justify-end text-slate-400' : 'text-slate-500'}`}>
                  <span className="font-semibold text-slate-700">
                    {msg.sender === 'user' ? 'You' : 'UMak Assistant'}
                  </span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#1E3A8A] text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-none shadow-sm'
                  }`}
                >
                  {/* Assistant Status Badges */}
                  {msg.sender === 'assistant' && msg.data && (
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      {msg.data.conflict && (
                        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-lg text-xs font-semibold">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          Source Conflict Flagged
                        </span>
                      )}

                      {!msg.data.in_sources ? (
                        <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-1 rounded-lg text-xs font-semibold">
                          <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                          Information Not Found in Sources
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg text-xs font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Strictly Grounded & Verified
                        </span>
                      )}
                    </div>
                  )}

                  {/* Message Text */}
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {/* Citations Box */}
                  {msg.data?.citations && msg.data.citations.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Official Citations (Click to inspect exact quote):
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {msg.data.citations.map((c, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveCitation(c)}
                            className="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#1E3A8A] text-xs px-3 py-1.5 rounded-lg font-semibold transition group shadow-2xs"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition" />
                            <span>{c.source} · Page {c.page}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Assistant Message Actions (Wireframe match) */}
                {msg.sender === 'assistant' && (
                  <div className="flex items-center gap-2 pt-1 text-slate-400">
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
                <div className="w-9 h-9 rounded-xl bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                  You
                </div>
              )}
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3.5 items-start">
              <div className="w-9 h-9 rounded-xl bg-[#1E3A8A] text-amber-400 font-black flex items-center justify-center text-sm shadow-sm shrink-0 border border-amber-400/30">
                U
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-xs flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-[#1E3A8A] animate-spin" />
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
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Suggested Questions (Grounded in PDFs):
            </span>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p.query)}
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-100/90 border border-slate-200 text-slate-700 text-xs px-3 py-2 rounded-xl transition shadow-2xs font-medium"
                >
                  <p.icon className="w-3.5 h-3.5 text-[#1E3A8A]" />
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Composer Section matching wireframe */}
        <footer className="p-4 md:p-6 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto space-y-2">
            <div className="border border-slate-300 rounded-2xl bg-white shadow-sm focus-within:border-blue-700 focus-within:ring-2 focus-within:ring-blue-100 transition p-3">
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
                  <span className="text-[11px] font-mono text-slate-400">
                    {input.length}/500 chars
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!input.trim() || isLoading}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1E3A8A] hover:bg-blue-900 text-white rounded-xl font-medium text-xs shadow-xs disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <p className="text-center text-[11px] text-slate-400">
              UMak Assistant adheres strictly to Source01-Source04. Hallucinations are actively prevented server-side.
            </p>
          </div>
        </footer>
      </section>

      {/* Quote Inspector Modal */}
      <QuoteModal citation={activeCitation} onClose={() => setActiveCitation(null)} />
    </div>
  );
}
