'use client';

import React from 'react';
import { X, BookOpen, CheckCircle2 } from 'lucide-react';
import { Citation } from '@/lib/types';

interface QuoteModalProps {
  citation: Citation | null;
  onClose: () => void;
}

export function QuoteModal({ citation, onClose }: QuoteModalProps) {
  if (!citation) return null;

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150"
    >
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header with Brand Blue */}
        <div className="flex items-center justify-between bg-[#283991] px-5 py-4 text-white">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-[#D1CA25]" aria-hidden="true" />
            <span id="modal-title" className="font-semibold text-base text-white">
              Official Citation Inspector
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-1.5 text-blue-200 hover:text-white hover:bg-white/10 transition focus-visible:outline-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Source Document</span>
              <p className="font-semibold text-[#283991] text-sm mt-0.5 break-all">{citation.source}</p>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Page Provenance</span>
              <p className="font-bold text-slate-900 text-sm mt-0.5">Page {citation.page}</p>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Supported Statement</span>
            <p className="text-sm font-medium text-slate-800 mt-1 bg-slate-50 p-3 rounded-xl border border-slate-200/80 leading-relaxed">
              {citation.claim || "Factual support grounded in source records."}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Exact Extracted Passage</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Verified from PDF
              </span>
            </div>
            <div className="bg-[#E5F6FC] border-l-4 border-[#21ADE3] p-4 rounded-r-xl text-slate-900 italic text-[13px] leading-relaxed">
              &ldquo;{citation.quote}&rdquo;
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#283991] hover:bg-[#1C2866] text-white text-xs font-semibold rounded-xl shadow-xs transition"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
