# CyberGuide AI

**AI-Powered Cybersecurity Assistance Platform**

CyberGuide AI helps cyber fraud victims understand what steps to take after being scammed. It provides AI-ready fraud analysis, emergency response guidance, complaint draft generation, evidence scanning, and scam awareness.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + Vite 7 + Tailwind CSS v4 + shadcn/ui |
| **Backend** | Express 5 (Node.js) + Zod validation |
| **API Spec** | OpenAPI 3.1 + Orval codegen |
| **Database** | PostgreSQL + Drizzle ORM (optional) |
| **Monorepo** | pnpm workspaces |
| **Build** | esbuild (server), Vite (client) |

## Project Structure

```
CyberGuideAI/
├── artifacts/
│   ├── api-server/          # Express API server
│   │   ├── src/
│   │   │   ├── routes/      # API route handlers
│   │   │   ├── services/    # Business logic services
│   │   │   ├── lib/         # Logger, utilities
│   │   │   ├── middlewares/ # Express middlewares
│   │   │   ├── app.ts       # Express app setup
│   │   │   └── index.ts     # Server entry point
│   │   └── build.mjs        # esbuild config
│   ├── cyberguide/          # React frontend
│   │   ├── src/
│   │   │   ├── components/  # UI components (shadcn/ui)
│   │   │   ├── pages/       # Page components
│   │   │   ├── context/     # React context providers
│   │   │   ├── hooks/       # Custom hooks
│   │   │   ├── lib/         # Utilities
│   │   │   └── App.tsx      # App root
│   │   └── vite.config.ts   # Vite config
│   └── mockup-sandbox/      # Design prototyping sandbox
├── lib/
│   ├── api-spec/            # OpenAPI spec + Orval config
│   ├── api-client-react/    # Generated React Query hooks
│   ├── api-zod/             # Generated Zod validation schemas
│   └── db/                  # Drizzle ORM database layer
├── scripts/                 # Utility scripts
├── pnpm-workspace.yaml      # Workspace configuration
└── tsconfig.base.json       # Shared TypeScript config
```

## Quick Start

### Prerequisites

- Node.js 20+ (v25 recommended)
- pnpm 9+

### Installation

```bash
# Install pnpm if not installed
npm install -g pnpm

# Install all dependencies
pnpm install

# Delete stale lockfile if install fails
del pnpm-lock.yaml
pnpm install
```

### Running the Application

**Terminal 1 — API Server (port 5000):**
```bash
pnpm dev:api
```

**Terminal 2 — Frontend (port 5173):**
```bash
pnpm dev:client
```

The frontend dev server proxies `/api/*` requests to the backend at `http://localhost:5000`.

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/healthz` | Health check |
| `POST` | `/api/analyze` | Analyze fraud report |
| `POST` | `/api/guidance` | Get emergency guidance |
| `POST` | `/api/recovery` | Estimate recovery probability |
| `POST` | `/api/documents` | Get document checklist |
| `POST` | `/api/complaint` | Generate complaint drafts |
| `POST` | `/api/ocr` | Scan evidence screenshot |
| `GET` | `/api/awareness` | Get scam awareness data |

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` (server) / `5173` (client) | Server port |
| `NODE_ENV` | `development` | Environment |
| `DATABASE_URL` | _(optional)_ | PostgreSQL connection string |

## Features

- **Fraud Report Analysis** — Classify fraud type, severity, risk indicators
- **Emergency Guidance** — Step-by-step emergency actions with helpline numbers
- **Recovery Estimation** — Rule-based recovery probability engine
- **Document Checklist** — Dynamic evidence checklist by fraud type
- **Complaint Generator** — FIR, bank complaint, and cybercrime complaint drafts
- **OCR Evidence Scanner** — Extract entities from screenshot evidence
- **Scam Awareness Dashboard** — Trending scams, statistics, and prevention tips
- **Modern Dark UI** — Cybersecurity-themed with glassmorphism and animations

## License

MIT
