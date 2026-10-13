'use client';

import React from 'react';
import { X, BookOpen, ExternalLink, CheckCircle } from 'lucide-react';
import { Citation } from '@/lib/types';

interface QuoteModalProps {
  citation: Citation | null;
  onClose: () => void;
}

export function QuoteModal({ citation, onClose }: QuoteModalProps) {
  if (!citation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-blue-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between bg-blue-900 px-6 py-4 text-white">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span className="font-semibold text-lg">Verified Source Evidence</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-blue-200 hover:text-white hover:bg-blue-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Document</span>
              <p className="font-bold text-blue-950 text-base">{citation.source}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Page Provenance</span>
              <p className="font-bold text-amber-600 text-base">Page {citation.page}</p>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Claim Supported</span>
            <p className="text-sm font-medium text-slate-800 mt-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              {citation.claim || "Factual support for the provided answer."}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Exact Extracted Quote</span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle className="w-3.5 h-3.5" />
                Verified from PDF
              </span>
            </div>
            <div className="bg-amber-50/70 border-l-4 border-amber-400 p-4 rounded-r-lg text-slate-800 italic text-sm leading-relaxed">
              &ldquo;{citation.quote}&rdquo;
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-sm font-medium rounded-xl shadow-sm transition"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
}
