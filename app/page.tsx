'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  BookOpen, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  Compass, 
  HelpCircle,
  GraduationCap,
  MapPin,
  Building2,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertOctagon
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

const SUGGESTED_QUESTIONS = [
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
    label: "Absent Info Test",
    query: "What is the tuition fee for the College of Medicine in 2030?"
  }
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Mabuhay! I am UMak Assistant, your verified AI knowledge assistant grounded strictly in the University of Makati's official documents (Scholarships, College Requirements, Campus Map, and Offices). How can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeCitation, setActiveCitation] = useState<Citation | null>(null);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

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
          setErrorBanner(data.answer || "Too many requests. Please wait a moment before sending another message.");
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
          text: "Unable to process request due to a connection failure.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-blue-900 border-b border-blue-800 shadow-md">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center font-black text-blue-900 text-xl shadow-inner">
              U
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg text-white leading-tight">UMak Assistant</h1>
                <span className="bg-amber-400/20 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-400/30">
                  RAG Grounded
                </span>
              </div>
              <p className="text-xs text-blue-200">Official Knowledge Assistant · University of Makati</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-blue-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Strict 4-Source Verification</span>
          </div>
        </div>
      </header>

      {/* Main Chat Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col">
        {/* Error Alert Banner */}
        {errorBanner && (
          <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-xl flex items-center gap-3 text-sm animate-in fade-in">
            <AlertOctagon className="w-5 h-5 text-rose-500 shrink-0" />
            <p className="flex-1">{errorBanner}</p>
            <button 
              onClick={() => setErrorBanner(null)}
              className="text-rose-500 hover:text-rose-700 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Messages List */}
        <div className="flex-1 space-y-4 overflow-y-auto pb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-blue-900 text-white rounded-br-none'
                    : 'bg-white border border-slate-200/80 rounded-bl-none text-slate-800'
                }`}
              >
                {/* Assistant Source Indicators */}
                {msg.sender === 'assistant' && msg.data && (
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                    {msg.data.conflict && (
                      <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full font-semibold">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        Source Conflict Flagged
                      </span>
                    )}

                    {!msg.data.in_sources ? (
                      <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full font-medium">
                        <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />
                        Information Not Found in Sources
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Verified Grounding
                      </span>
                    )}
                  </div>
                )}

                {/* Message Body */}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                {/* Citations Chips */}
                {msg.data?.citations && msg.data.citations.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Verified Citations (Click to inspect quote):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.data.citations.map((c, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveCitation(c)}
                          className="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 text-blue-900 text-xs px-2.5 py-1 rounded-lg font-medium transition shadow-xs group"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition" />
                          <span>{c.source} (p. {c.page})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timestamp */}
                <div
                  className={`mt-1.5 text-[10px] text-right ${
                    msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-start">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none p-4 shadow-sm flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-blue-900 animate-spin" />
                <span className="text-sm font-medium text-slate-600">
                  Retrieving passages & verifying official citations...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Questions */}
        {messages.length <= 2 && (
          <div className="mb-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Suggested Questions (Grounded in PDFs):
            </span>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q.query)}
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs px-3 py-2 rounded-xl transition shadow-xs"
                >
                  <q.icon className="w-4 h-4 text-blue-900" />
                  <span>{q.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about scholarships, requirements, campus locations, or offices..."
              maxLength={500}
              disabled={isLoading}
              className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden disabled:opacity-50"
            />

            <span className="text-[11px] font-mono text-slate-400 px-1">
              {input.length}/500
            </span>

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-blue-900 hover:bg-blue-800 text-white disabled:bg-slate-300 disabled:cursor-not-allowed p-2.5 rounded-xl shadow-xs transition flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <footer className="mt-2 text-center text-[11px] text-slate-400">
          Grounded solely in Source01 to Source04. Discloses missing data without hallucination.
        </footer>
      </div>

      {/* Quote Inspector Modal */}
      <QuoteModal citation={activeCitation} onClose={() => setActiveCitation(null)} />
    </main>
  );
}
