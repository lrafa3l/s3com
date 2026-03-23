# Sara3com

> **Sua Conexão, Nossa Inovação. Tecnologia que Protege e Transforma o Futuro.**

Sara3com is a Portuguese-language telecom company website (Angola) featuring an AI chat assistant (Sara AI), admin dashboard, authentication, newsletter, and service management.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4, Framer Motion |
| Database | PostgreSQL (Neon Serverless), Prisma ORM |
| Auth | NextAuth v4 (JWT strategy) |
| AI | Vercel AI SDK, Google Gemini, OpenAI, Cohere, Mistral, DeepSeek, XAI/Grok, Ollama |
| Data Fetching | TanStack React Query |
| Deployment | Vercel |

---

## Prerequisites

- **Node.js** ≥ 20
- **pnpm** (or npm)
- **PostgreSQL** database (or [Neon](https://neon.tech) serverless account)

---

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/your-org/sara3com.git
cd sara3com

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your actual values (see table below)

# 4. Generate Prisma client & push schema
npx prisma generate
npx prisma db push

# 5. Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create a `.env` file with these variables (no spaces around `=`):

| Variable | Description | Required |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `NEXTAUTH_URL` | App base URL (`http://localhost:3000` for dev) | ✅ |
| `NEXTAUTH_SECRET` | Random secret for JWT signing | ✅ |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | ✅ |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | ✅ |
| `GITHUB_CLIENT_ID` | GitHub OAuth Client ID | Optional |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth Client Secret | Optional |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google Gemini API key | ✅ |
| `OPENAI_API_KEY` | OpenAI API key | Optional |
| `COHERE_API_KEY` | Cohere API key | Optional |
| `MISTRAL_API_KEY` | Mistral API key | Optional |
| `DEEPSEEK_API_KEY` | DeepSeek API key | Optional |
| `XAI_API_KEY` | XAI/Grok API key | Optional |
| `RESEND_API_KEY` | Resend email API key | Optional |
| `EMAIL_USER` | SMTP email username | Optional |
| `EMAIL_PASS` | SMTP email app password | Optional |
| `QSTASH_TOKEN` | Upstash QStash token | Optional |
| `QSTASH_URL` | QStash endpoint URL | Optional |
| `QSTASH_CURRENT_SIGNING_KEY` | QStash signing key | Optional |
| `QSTASH_NEXT_SIGNING_KEY` | QStash next signing key | Optional |

> ⚠️ **Never commit `.env` with real credentials.** The `.gitignore` already excludes it.

---

## Project Structure

```
sara3com/
├── app/                    # Next.js App Router pages & API routes
│   ├── (auth)/             # Authentication pages (signin)
│   ├── admin/              # Admin dashboard page
│   ├── api/
│   │   ├── auth/           # NextAuth API handler
│   │   └── chat/           # AI chat endpoint
│   ├── chat/               # Chat page
│   ├── service/            # Service detail page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage (AuthGate → HomeView)
│   └── manifest.ts         # PWA manifest
├── components/             # UI components
│   ├── admin/              # Admin dashboard components & tabs
│   ├── ai-elements/        # Chat UI components
│   ├── auth/               # Auth form components
│   ├── ui/                 # shadcn/ui primitives
│   └── ...                 # Homepage sections (Hero, Pricing, etc.)
├── config/                 # Shared configuration (nav links)
├── hooks/                  # Custom React hooks
├── lib/
│   ├── auth.ts             # NextAuth config (split: read-only + adapter)
│   ├── prisma.ts           # Prisma client singleton
│   └── ia/                 # AI model config & tools
│       ├── config.ts       # Model registry (7 providers)
│       └── tools/          # AI tool definitions
├── providers/              # React context providers
├── prisma/
│   └── schema.prisma       # Database schema
├── public/                 # Static assets
├── services/               # API service layers (auth, data fetching)
├── styles/                 # Global stylesheet
├── types/                  # TypeScript type augmentations
├── util/                   # Utility functions
└── view/                   # Page-level view components
```

---

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `npx prisma studio` | Open Prisma database GUI |
| `npx prisma db push` | Push schema changes to database |

---

## Deployment (Vercel)

1. Push to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com)
3. Add all required environment variables in Vercel project settings
4. Deploy — Vercel auto-detects Next.js and runs `pnpm build`

The project includes `vercel.json` for custom configuration.

---

## License

Private — All rights reserved © Sara3com.