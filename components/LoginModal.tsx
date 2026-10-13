'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, Lock, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onLoginSuccess: (user: { email: string; studentId: string; fullName: string }) => void;
}

export function LoginModal({ isOpen, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.endsWith('@umak.edu.ph')) {
      setError('Access is restricted to University of Makati students. Please enter your official @umak.edu.ph email.');
      return;
    }

    if (!studentId.trim() || studentId.trim().length < 5) {
      setError('Please provide your valid UMak Student ID number (e.g., K12048592).');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          studentId: studentId.trim(),
          fullName: fullName.trim() || 'UMak Student',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      onLoginSuccess(data.user);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-[#0B132B] shadow-2xl border border-slate-200 dark:border-[#1C2541] overflow-hidden flex flex-col">
        {/* Header with Brand Gradient and Official Logos */}
        <div className="bg-gradient-to-r from-[#3F56CA] to-[#2B3C8E] p-6 text-white text-center relative">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-md">
              <Image 
                src="/taga-ask-logo-light.png" 
                alt="TAGA-ask AI" 
                width={40} 
                height={40} 
                className="object-contain" 
              />
            </div>
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden border border-white">
              <Image 
                src="/umak-seal.png" 
                alt="UMak Seal" 
                width={48} 
                height={48} 
                className="object-contain" 
              />
            </div>
          </div>
          <h2 className="text-xl font-bold tracking-tight">UMak Student Portal</h2>
          <p className="text-xs text-blue-100 mt-1">
            Sign in with your verified University of Makati institutional credentials
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-[#FDE8E9] dark:bg-red-950/40 border border-[#EC202B]/40 text-[#EC202B] text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              UMak Institutional Email <span className="text-[#EC202B]">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username@umak.edu.ph"
              required
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-[#3F56CA] focus:ring-2 focus:ring-[#3F56CA]/20 transition"
            />
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
              Must end with <code className="text-[#3F56CA] dark:text-[#D1CA25] font-semibold">@umak.edu.ph</code>
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Student ID Number <span className="text-[#EC202B]">*</span>
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g. K12048592"
              required
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-[#3F56CA] focus:ring-2 focus:ring-[#3F56CA]/20 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Student Full Name (Optional)
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Juan Dela Cruz"
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-[#3F56CA] focus:ring-2 focus:ring-[#3F56CA]/20 transition"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-[#3F56CA] hover:bg-[#2B3C8E] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Institutional Identity...</span>
                </>
              ) : (
                <>
                  <span>Authenticate as UMak Student</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#3F56CA] dark:text-[#D1CA25]" />
              <span>Encrypted Session • Verified UMak Students Only</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500">
              <div className="w-3.5 h-3.5 rounded-full overflow-hidden shrink-0 bg-slate-900 border border-slate-300 dark:border-slate-700">
                <Image src="/doerrorin-logo.png" alt="DoError!n" width={14} height={14} className="w-full h-full object-contain" />
              </div>
              <span>Developed by DoError!n</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
