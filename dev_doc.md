# Sara3com — Developer Documentation

## Architecture Overview

Sara3com uses the **Next.js 16 App Router** with a clear server/client component boundary:

```
Server Components          Client Components
─────────────────          ─────────────────
app/page.tsx               view/HomeView.tsx
app/admin/page.tsx         components/hero.tsx
app/layout.tsx             components/header.tsx
components/AuthGate.tsx    components/background.tsx
app/api/*/route.ts         components/ai-elements/*
                           providers/*
```

### Component Hierarchy (Homepage)

```
RootLayout (server)
└── page.tsx (server)
    └── <Suspense>
        └── AuthGate (server) → checks session, redirects if authenticated
            └── HomeView (client)
                ├── ScrollProgress
                └── Background (particles)
                    ├── FloatingElements
                    ├── Header
                    ├── <main>
                    │   ├── Hero
                    │   ├── Stats
                    │   ├── Features
                    │   ├── AboutSection
                    │   ├── Testimonials
                    │   ├── Pricing
                    │   ├── PartnersSection
                    │   ├── ContactSection
                    │   └── Newsletter
                    ├── Footer
                    └── FloatingChatButton
```

---

## Authentication Flow

### Stack
- **NextAuth v4** with JWT strategy
- **PrismaAdapter** (only in API route, not in session reads)
- Google, GitHub, Facebook OAuth + Credentials provider

### How It Works

1. `lib/auth.ts` exports two config objects:
   - `authOptions` — **no adapter**, used in `getServerSession()` calls. Makes session reads instant and stateless (JWT-only).
   - `authOptionsWithAdapter` — **with PrismaAdapter**, used only in `app/api/auth/[...nextauth]/route.ts` for OAuth account persistence.

2. **AuthGate** (`components/AuthGate.tsx`) — server component that checks the session:
   - Authenticated → redirect to `/admin`
   - Unauthenticated → render `HomeView`

3. **Middleware** (`middleware.ts`) — runs on `/admin/*` and `/signin`:
   - No token + `/admin` → redirect to `/signin`
   - Has token + `/signin` → redirect to `/admin`

4. **Custom fields** on session/JWT: `twoFactorEnabled`, `totpVerified`, `id`
   - Type augmentations in `types/next-auth.d.ts`

### Why the Adapter Split?

With `session.strategy: "jwt"`, `getServerSession()` only needs the JWT callbacks — not the database adapter. Including the adapter causes a DB connection on every session check, which can hang on Neon serverless cold starts, leaving Suspense boundaries stuck (blank page). The split ensures session reads are instant.

---

## Database Schema

Defined in `prisma/schema.prisma` (PostgreSQL via Neon):

| Model | Purpose |
|---|---|
| `User` | User accounts (email, password, 2FA, OAuth) |
| `Account` | OAuth provider accounts (linked to User) |
| `Session` | Database sessions (used by adapter, not JWT reads) |
| `VerificationToken` | Email verification tokens |
| `Subscriber` | Newsletter subscribers |
| `Article` | Blog articles (author → User) |
| `Service` | Company services (name, description, icon) |

---

## AI Chat System

### Endpoint: `app/api/chat/route.ts`

- Receives `{ messages, model, name, attachments }` via POST
- Validates input with Zod schema
- Streams response using Vercel AI SDK's `streamText`

### Model Registry: `lib/ia/config.ts`

```typescript
getModel(modelName) // Returns the AI SDK model instance
```

Available models:
| Key | Provider | Model |
|---|---|---|
| `gemini-2.5-flash` | Google | Gemini 2.5 Flash (default) |
| `gpt-4` | OpenAI | GPT-4o Mini |
| `deepSick` | DeepSeek | DeepSeek Chat |
| `magistral-small-2506` | Mistral | Magistral Small |
| `command-a-03-2025` | Cohere | Command A |
| `llama3.1` | Ollama | Llama 3.1 (local) |
| `grok-2` | XAI | Grok 2 |

### AI Tools: `lib/ia/tools/`

| Tool File | Purpose |
|---|---|
| `Chrome.ts` | Web scraping/browsing |
| `movebg.tool.ts` | Background removal |
| `qrcodeGenerate.tool.ts` | QR code generation |
| `queryDb.tool.ts` | Database querying |
| `tesseract.tool.ts` | OCR (text from images) |
| `tts.tool.ts` | Text-to-speech |

---

## Admin Dashboard

### Page: `app/admin/page.tsx`

Server component that:
1. Checks session via `getServerSession(authOptions)`
2. Reads `?tab=` from URL (awaited Promise in Next.js 16)
3. Renders `Dashboard` with the selected tab

### Tab System: `components/admin/dashboardTabs.tsx`

```typescript
export const dashboardTabs = [
  { value: "subscriber", title: "Inscritos",  icon: MailCheck,       component: Subscriber },
  { value: "service",    title: "Serviços",   icon: LayoutDashboard, component: Service },
  { value: "user",       title: "Conta",      icon: User2Icon,       component: User },
]
```

### Adding a New Tab

1. Create component in `components/admin/tabs/my-tab.tsx`
2. Add entry to `dashboardTabs` array in `components/admin/dashboardTabs.tsx`
3. Access via `/admin?tab=my-tab`

---

## How To Add a New Page

1. Create `app/my-page/page.tsx` (server component by default)
2. For client interactivity, create a view in `view/MyPageView.tsx` with `"use client"`
3. Import and render the view from the page component
4. To protect the page, add `getServerSession(authOptions)` check and/or add the path to `middleware.ts` matcher

---

## How To Add a New AI Tool

1. Create `lib/ia/tools/my-tool.tool.ts`:
   ```typescript
   import { tool } from "ai"
   import { z } from "zod"

   export const myTool = tool({
     description: "What this tool does",
     parameters: z.object({
       input: z.string().describe("Input parameter"),
     }),
     execute: async ({ input }) => {
       // Tool logic here
       return { result: "..." }
     },
   })
   ```
2. Import and register in the chat route's `streamText` call (or in a tools registry)

---

## Known Limitations & Gotchas

### Next.js 16 Specifics
- `searchParams` and `params` in server components are **Promises** — must be awaited
- `themeColor` must be in a `viewport` export, not in `metadata`
- `cookies()` and `headers()` are async — always `await` them

### NextAuth v4
- The adapter/JWT split is intentional — do NOT add the adapter back to `authOptions`
- `NEXTAUTH_SECRET` must be a strong random string in production (current dev value is weak)
- `NEXTAUTH_URL` must not have trailing spaces or slashes

### Neon Serverless
- Cold starts can add 2-5s latency on first DB query
- Connection pooling is via the `-pooler` suffix in the connection string
- The Prisma client uses `globalThis` caching to avoid creating new clients in dev mode

### Environment Variables
- **Never** use spaces around `=` in `.env` — `KEY="value"` (not `KEY= "value"`)
- `.env` is gitignored — use `.env.example` for documentation

### React 19
- `QueryClient` must be created inside components (not at module scope) to prevent cross-request data leaks
- `use client` components cannot import server-only modules

---

## Environment Variable Reference

| Variable | Type | Required | Description |
|---|---|---|---|
| `DATABASE_URL` | `string` | ✅ | PostgreSQL connection string (Neon) |
| `NEXTAUTH_URL` | `string` | ✅ | App base URL |
| `NEXTAUTH_SECRET` | `string` | ✅ | JWT signing secret |
| `GOOGLE_CLIENT_ID` | `string` | ✅ | Google OAuth |
| `GOOGLE_CLIENT_SECRET` | `string` | ✅ | Google OAuth |
| `GITHUB_CLIENT_ID` | `string` | Optional | GitHub OAuth |
| `GITHUB_CLIENT_SECRET` | `string` | Optional | GitHub OAuth |
| `FACEBOOK_CLIENT_ID` | `string` | Optional | Facebook OAuth |
| `FACEBOOK_CLIENT_SECRET` | `string` | Optional | Facebook OAuth |
| `GOOGLE_GENERATIVE_AI_API_KEY` | `string` | ✅ | Default AI model |
| `OPENAI_API_KEY` | `string` | Optional | GPT-4 model |
| `COHERE_API_KEY` | `string` | Optional | Cohere model |
| `MISTRAL_API_KEY` | `string` | Optional | Mistral model |
| `DEEPSEEK_API_KEY` | `string` | Optional | DeepSeek model |
| `XAI_API_KEY` | `string` | Optional | XAI/Grok model |
| `RESEND_API_KEY` | `string` | Optional | Email sending |
| `EMAIL_USER` | `string` | Optional | SMTP email |
| `EMAIL_PASS` | `string` | Optional | SMTP password |
| `QSTASH_TOKEN` | `string` | Optional | Background jobs |
| `QSTASH_URL` | `string` | Optional | QStash endpoint |
