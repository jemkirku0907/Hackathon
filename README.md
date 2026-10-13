# UMak Assistant — Official AI Knowledge Assistant

AI-powered knowledge assistant for **University of Makati (UMak)** students, engineered for accuracy, strict source-grounding, prompt-injection defense, and zero hallucinations.

---

## 🏛️ Grounded Exclusively in 4 Official Sources

UMak Assistant answers factual queries using **exclusively** the four approved University of Makati documents:

1. **`Source01.pdf`** — Scholarships & Token Fee Exemptions (14 pages)
2. **`Source02.pdf`** — College Requirements (CCIS and other colleges, 2 pages)
3. **`Source03.pdf`** — Campus Map & Building Directory (6 pages)
4. **`Source04.pdf`** — Administrative & Academic Offices (14 pages)

If information is not explicitly documented in these sources, the assistant transparently responds:
> *"The requested information is not stated in the provided official University of Makati sources."*

---

## 🚀 Key Features

- **Lexical BM25/TF-IDF Retrieval**: Fast, precise, and deterministic retrieval across 38 page-level provenance chunks.
- **Server-Side Citation Verification**: Validates every cited document, page number, and verifies that quotations exist verbatim in the official text.
- **Quote Inspector Modal**: Interactive chips allow users to click any citation and view the exact excerpt from the source PDF.
- **Discrepancy / Source Conflict Flagging**: Automatically flags conflicting records across official guidelines.
- **Security & Prompt-Injection Defense**: Treats documents and user inputs as untrusted data; enforces boundaries server-side.
- **Cloudflare Turnstile Integration**: Bot protection enabled via server-side Siteverify checks.
- **Configurable Rate Limiting**: Enforces max 5 requests/min and 20 requests/hour per client with HTTP 429 status and `Retry-After` headers.
- **Polished UMak Theme**: Authentic UMak Blue (`#1E3A8A`), Yellow (`#FACC15`), and White responsive UI.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS & Lucide React
- **AI/LLM**: Google Generative AI SDK (`@google/generative-ai`)
- **Bot Protection**: Cloudflare Turnstile
- **Deployment Target**: Vercel

---

## ⚙️ Environment Variables

Create `.env.local` based on `.env.example`:

```bash
GOOGLE_AI_API_KEY=your_gemini_api_key_here
TURNSTILE_SECRET_KEY=your_turnstile_secret_here
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key_here
```

---

## 🧪 Testing Commands

Run the full RAG verification and citation test suite:
```bash
npm run test:rag
```

Run production build:
```bash
npm run build
```

Run local development server:
```bash
npm run dev
```
