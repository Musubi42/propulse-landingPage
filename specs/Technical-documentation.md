**Version:** 1.0  
**Date:** October 2, 2025  
**Project:** Propulse Association Landing Page  
**Repository:** Monorepo with `landingPage/` and `platform/` folders

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Monorepo Structure](#monorepo-structure)
3. [Project Initialization](#project-initialization)
4. [Dependencies Installation](#dependencies-installation)
5. [Project Structure](#project-structure)
6. [Configuration Files](#configuration-files)
7. [Environment Variables](#environment-variables)
8. [VS Code Setup](#vs-code-setup)
9. [Vercel Deployment](#vercel-deployment)
10. [Cloudflare DNS Configuration](#cloudflare-dns-configuration)
11. [Shadcn Components Setup](#shadcn-components-setup)
12. [First Components](#first-components)
13. [Troubleshooting](#troubleshooting)
14. [Pre-Launch Checklist](#pre-launch-checklist)

---

## Prerequisites

### Required Software

#### 1. Node.js 24.x
```bash
# Check your current version
node --version

# Using nvm (recommended)
nvm install 24
nvm use 24

# Or using fnm
fnm install 24
fnm use 24
```

**Note:** Node.js 24 LTS will be released in October 2025. If working before this date, use Node.js 22.x as a temporary solution.

#### 2. pnpm 9.x
```bash
# Install pnpm globally
npm install -g pnpm@latest

# Verify installation
pnpm --version
# Should show 9.x.x
```

**Why pnpm?**
- Faster than npm/yarn
- Efficient disk space usage (content-addressable store)
- Strict by default (prevents phantom dependencies)
- Better monorepo support

#### 3. Git
```bash
# Verify Git installation
git --version
```

#### 4. Vercel CLI
```bash
# Install Vercel CLI globally
pnpm add -g vercel

# Verify installation
vercel --version
```

#### 5. VS Code
Download from: https://code.visualstudio.com/

### Required Accounts

- ✅ **GitHub account** (for repository)
- ✅ **Vercel account** (free tier, linked to GitHub)
- ✅ **Cloudflare account** (for DNS management)

---

## Monorepo Structure

Your repository structure:

```
your-monorepo/
├── .git/
├── .gitignore                 # Root gitignore
├── README.md
├── pnpm-workspace.yaml        # pnpm workspace configuration
├── package.json               # Root package.json (optional)
│
├── landingPage/               # ← WE WORK HERE
│   ├── .env.local
│   ├── .env.example
│   ├── .gitignore
│   ├── .npmrc
│   ├── .nvmrc
│   ├── next.config.ts
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── postcss.config.mjs
│   ├── README.md
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── vercel.json
│   │
│   ├── public/
│   │   ├── documents/
│   │   │   └── presentation-propulse.pdf
│   │   ├── images/
│   │   │   └── placeholders/
│   │   │       ├── hero-placeholder.jpg
│   │   │       ├── arthur-placeholder.jpg
│   │   │       └── hugo-placeholder.jpg
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── programme/
│   │   │   │   └── page.tsx
│   │   │   └── globals.css
│   │   │
│   │   ├── components/
│   │   │   ├── ui/           # shadcn components
│   │   │   ├── sections/     # page sections
│   │   │   └── animations/   # reusable animations
│   │   │
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   │
│   │   └── styles/
│   │       └── fonts.css
│   │
│   └── components.json        # shadcn configuration
│
└── platform/                  # Existing project
    └── ... (microfrontends, etc.)
```

### Create pnpm Workspace Configuration

**File: `pnpm-workspace.yaml` (at repository root)**

```yaml
packages:
  - 'landingPage'
  - 'platform/*'
```

This isolates `landingPage` from `platform` dependencies.

---

## Project Initialization

### Step 1: Navigate to Repository Root

```bash
cd /path/to/your-monorepo
```

### Step 2: Create Landing Page with Next.js

```bash
# Create Next.js app in landingPage directory
pnpm create next-app@latest landingPage --typescript --tailwind --app --src-dir --import-alias "@/*"
```

**Options explained:**
- `--typescript`: Enable TypeScript
- `--tailwind`: Include Tailwind CSS
- `--app`: Use App Router (not Pages Router)
- `--src-dir`: Use `src/` directory structure
- `--import-alias "@/*"`: Enable `@/` imports

**Interactive prompts (answer as shown):**
```
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Turbopack for next dev? … No
✔ Would you like to customize the import alias? … No (@/* is good)
```

### Step 3: Navigate to Landing Page

```bash
cd landingPage
```

### Step 4: Initialize Git Branch Strategy

```bash
# Create LP-dev branch (your working branch)
git checkout -b LP-dev

# Create LP-staging branch
git checkout -b LP-staging

# Create LP-main branch (production)
git checkout -b LP-main

# Switch back to LP-dev for development
git checkout LP-dev
```

---

## Dependencies Installation

### Core Dependencies (Already Installed)

These come with `create-next-app`:
- `next` (v15.x)
- `react` (v19.x)
- `react-dom` (v19.x)
- `typescript` (v5.x)
- `tailwindcss` (v3.x)
- `eslint` (v9.x)

### Animation & Interaction Libraries

```bash
# Install animation libraries
pnpm add framer-motion react-intersection-observer react-countup

# Install icon library
pnpm add lucide-react
```

**Package details:**

#### 1. **framer-motion** (v11.x)
- **Docs:** https://www.framer.com/motion/
- **Size:** ~60KB gzipped
- **Use:** All animations (pen lines, scroll effects, transitions)
```tsx
import { motion } from 'framer-motion';
```

#### 2. **react-intersection-observer** (v9.x)
- **Docs:** https://github.com/thebuilder/react-intersection-observer
- **Size:** ~3KB gzipped
- **Use:** Detect when elements enter viewport (trigger animations)
```tsx
import { useInView } from 'react-intersection-observer';
```

#### 3. **react-countup** (v6.x)
- **Docs:** https://github.com/glennreyes/react-countup
- **Size:** ~5KB gzipped
- **Use:** Animated number counters (50+, 400+, etc.)
```tsx
import CountUp from 'react-countup';
```

#### 4. **lucide-react** (v0.x)
- **Docs:** https://lucide.dev/guide/packages/lucide-react
- **Size:** Tree-shakeable (only imports what you use)
- **Use:** Icons throughout the site
```tsx
import { ChevronDown, Mail, Phone } from 'lucide-react';
```

### Utility Libraries

```bash
# Install className utilities (required for shadcn)
pnpm add clsx tailwind-merge

# Install Vercel Analytics
pnpm add @vercel/analytics
```

**Package details:**

#### 5. **clsx** (v2.x)
- **Docs:** https://github.com/lukeed/clsx
- **Use:** Conditional className construction
```tsx
import clsx from 'clsx';
clsx('base', { active: isActive });
```

#### 6. **tailwind-merge** (v2.x)
- **Docs:** https://github.com/dcastil/tailwind-merge
- **Use:** Merge Tailwind classes without conflicts
```tsx
import { twMerge } from 'tailwind-merge';
```

#### 7. **@vercel/analytics** (v1.x)
- **Docs:** https://vercel.com/docs/analytics
- **Use:** Free analytics (page views, Web Vitals)
```tsx
import { Analytics } from '@vercel/analytics/react';
```

### Development Dependencies

```bash
# Type definitions (if not auto-installed)
pnpm add -D @types/node @types/react @types/react-dom
```

---

## Project Structure

After initialization, your `landingPage/` directory should look like:

```
landingPage/
├── .next/                     # Build output (gitignored)
├── node_modules/              # Dependencies (gitignored)
│
├── public/
│   ├── documents/
│   │   └── presentation-propulse.pdf
│   ├── images/
│   │   └── placeholders/
│   │       ├── hero-placeholder.jpg
│   │       ├── arthur-placeholder.jpg
│   │       └── hugo-placeholder.jpg
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   ├── programme/
│   │   │   └── page.tsx       # Program page
│   │   ├── globals.css        # Global styles
│   │   └── fonts.ts           # Font configuration (optional)
│   │
│   ├── components/
│   │   ├── ui/                # shadcn components
│   │   │   ├── button.tsx
│   │   │   ├── accordion.tsx
│   │   │   └── card.tsx
│   │   │
│   │   ├── sections/          # Page sections
│   │   │   ├── hero.tsx
│   │   │   ├── social-proof.tsx
│   │   │   ├── stats.tsx
│   │   │   ├── founders.tsx
│   │   │   └── final-cta.tsx
│   │   │
│   │   └── animations/        # Reusable animations
│   │       ├── fade-in.tsx
│   │       ├── pen-line.tsx
│   │       └── counter.tsx
│   │
│   ├── lib/
│   │   └── utils.ts           # Utility functions
│   │
│   └── styles/
│       └── fonts.css          # System font stack
│
├── .env.local                 # Local environment variables (gitignored)
├── .env.example               # Example env file (committed)
├── .gitignore
├── .npmrc                     # pnpm configuration
├── .nvmrc                     # Node.js version
├── components.json            # shadcn configuration
├── next.config.ts             # Next.js configuration
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs         # PostCSS configuration
├── README.md
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── vercel.json                # Vercel deployment configuration
```

---

## Configuration Files

### 1. `.nvmrc`

**File: `landingPage/.nvmrc`**

```
24
```

**Purpose:** Specify Node.js version for local development and Vercel.

---

### 2. `.npmrc`

**File: `landingPage/.npmrc`**

```ini
# Ensure consistent installs across environments
prefer-frozen-lockfile=true

# Auto-install peer dependencies
auto-install-peers=true

# Allow flexible peer dependencies (Next.js ecosystem)
strict-peer-dependencies=false

# Use pnpm's strict mode
shamefully-hoist=false
```

**Purpose:** Configure pnpm behavior for consistent builds.

---

### 3. `package.json`

**File: `landingPage/package.json`**

```json
{
  "name": "propulse-landing",
  "version": "1.0.0",
  "private": true,
  "engines": {
    "node": ">=24.0.0",
    "pnpm": ">=9.0.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^11.5.4",
    "react-intersection-observer": "^9.13.0",
    "react-countup": "^6.5.3",
    "lucide-react": "^0.441.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.2",
    "@vercel/analytics": "^1.3.1"
  },
  "devDependencies": {
    "typescript": "^5.6.2",
    "tailwindcss": "^3.4.11",
    "postcss": "^8.4.47",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.10.0",
    "eslint-config-next": "^15.0.0",
    "@types/node": "^22.5.5",
    "@types/react": "^18.3.7",
    "@types/react-dom": "^18.3.0"
  }
}
```

**Note:** Versions shown are examples. Use `pnpm add` to get latest stable versions.

---

### 4. `next.config.ts`

**File: `landingPage/next.config.ts`**

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable React strict mode for better development warnings
  reactStrictMode: true,

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },

  // Enable Vercel Analytics
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP'],
  },
};

export default nextConfig;
```

---

### 5. `tailwind.config.ts`

**File: `landingPage/tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom Propulse color palette
        background: {
          DEFAULT: '#FAF6F0',
          secondary: '#F5EFE6',
          tertiary: '#EBE3D5',
        },
        primary: {
          DEFAULT: '#1B3A52',
          hover: '#2C5F7F',
          active: '#3D7FA6',
        },
        accent: {
          orange: '#D97642',
          'orange-hover': '#E89563',
          'orange-light': '#F4B587',
          green: '#4A6B52',
          'green-hover': '#5D8468',
          'green-light': '#7BA084',
        },
        text: {
          DEFAULT: '#2A2A2A',
          secondary: '#4A4A4A',
          tertiary: '#6B6B6B',
        },
        pen: '#3D3D3D',
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

**Install required plugin:**
```bash
pnpm add -D tailwindcss-animate
```

---

### 6. `vercel.json`

**File: `landingPage/vercel.json`**

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install --frozen-lockfile",
  "framework": "nextjs",
  "outputDirectory": ".next",
  "regions": ["cdg1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/www",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

**Configuration explained:**
- `regions: ["cdg1"]`: Deploy to Paris (closest to France)
- `--frozen-lockfile`: Strict lockfile for consistent builds
- Security headers included
- www redirect handled

---

### 7. `.gitignore`

**File: `landingPage/.gitignore`**

```gitignore
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# local env files
.env*.local
.env.local
.env.development.local
.env.test.local
.env.production.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

**Also update root `.gitignore`:**

```gitignore
# Add to root .gitignore
landingPage/.next/
landingPage/.vercel/
landingPage/node_modules/
```

---

### 8. `tsconfig.json`

**File: `landingPage/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## Environment Variables

### Native Node.js Environment Variables

Next.js 15+ uses native `process.env` handling (no `dotenv` needed).

### File Structure

```
landingPage/
├── .env.example          # Committed (template)
├── .env.local            # Gitignored (your local values)
└── .env.production       # Not needed (use Vercel dashboard)
```

### 1. `.env.example`

**File: `landingPage/.env.example`**

```bash
# Site URL (changes per environment)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Vercel Analytics (auto-generated by Vercel)
# NEXT_PUBLIC_VERCEL_ANALYTICS_ID=xxxxx

# Google Forms URLs (add when ready)
# NEXT_PUBLIC_FORM_LYCEEN_URL=https://forms.gle/xxxxx
# NEXT_PUBLIC_FORM_MENTOR_URL=https://forms.gle/xxxxx
# NEXT_PUBLIC_FORM_LYCEE_URL=https://forms.gle/xxxxx
```

### 2. `.env.local`

**File: `landingPage/.env.local`** (create this, it's gitignored)

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Reading Environment Variables

**In components:**

```tsx
// Public variables (exposed to browser)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

// Server-only variables (NOT prefixed with NEXT_PUBLIC_)
// Can only be used in Server Components or API routes
const secretKey = process.env.SECRET_KEY;
```

**Type safety (optional):**

**File: `src/lib/env.ts`**

```typescript
export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  // Add more as needed
} as const;
```

Then import:
```tsx
import { env } from '@/lib/env';

console.log(env.siteUrl);
```

### 4. Vercel Environment Variables

Set these in **Vercel Dashboard** for each environment:

**Development (LP-dev branch):**
```
NEXT_PUBLIC_SITE_URL = https://propulse-dev-*.vercel.app
```

**Preview/Staging (LP-staging branch):**
```
NEXT_PUBLIC_SITE_URL = https://staging.propulse-association.fr
```

**Production (LP-main branch):**
```
NEXT_PUBLIC_SITE_URL = https://propulse-association.fr
```

---

## VS Code Setup

### Recommended Extensions

Install these extensions for optimal development:

#### 1. **Tailwind CSS IntelliSense** (MUST HAVE)
- **ID:** `bradlc.vscode-tailwindcss`
- **Install:** `ext install bradlc.vscode-tailwindcss`
- **Purpose:** Autocomplete, linting, hover previews for Tailwind classes

#### 2. **ESLint**
- **ID:** `dbaeumer.vscode-eslint`
- **Install:** `ext install dbaeumer.vscode-eslint`
- **Purpose:** Real-time linting (comes with Next.js)

#### 3. **Pretty TypeScript Errors**
- **ID:** `yoavbls.pretty-ts-errors`
- **Install:** `ext install yoavbls.pretty-ts-errors`
- **Purpose:** Makes TypeScript errors human-readable

#### 4. **Error Lens**
- **ID:** `usernamehw.errorlens`
- **Install:** `ext install usernamehw.errorlens`
- **Purpose:** Inline error display (very helpful)

#### 5. **Path Intellisense**
- **ID:** `christian-kohler.path-intellisense`
- **Install:** `ext install christian-kohler.path-intellisense`
- **Purpose:** Autocomplete for file paths

### VS Code Settings

**File: `landingPage/.vscode/settings.json`**

```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "editor.quickSuggestions": {
    "strings": true
  }
}
```

**Create this file:**
```bash
mkdir -p .vscode
touch .vscode/settings.json
# Then paste the JSON above
```

---

## Vercel Deployment

### Step 1: Install Vercel CLI

```bash
pnpm add -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate with GitHub.

### Step 3: Link Project

From `landingPage/` directory:

```bash
cd landingPage
vercel link
```

**Prompts:**

```
? Set up "~/path/to/landingPage"? [Y/n] y
? Which scope should contain your project? [Your username]
? Link to existing project? [Y/n] n
? What's your project's name? propulse-landing
? In which directory is your code located? ./
```

This creates `landingPage/.vercel/` (gitignored) with project metadata.

### Step 4: Configure Vercel Project

**Option A: Via CLI**

```bash
# Set root directory (monorepo context)
vercel --cwd=../landingPage

# Set Node.js version (when 24 is available)
vercel env add NODE_VERSION production
# Enter: 24
```

**Option B: Via Vercel Dashboard** (Recommended for clarity)

1. Go to: https://vercel.com/dashboard
2. Select project: `propulse-landing`
3. Go to **Settings** → **General**
4. **Root Directory:** `landingPage`
5. **Framework Preset:** Next.js
6. **Build Command:** `pnpm build` (override)
7. **Install Command:** `pnpm install --frozen-lockfile` (override)
8. **Output Directory:** `.next` (default)
9. **Node.js Version:** `24.x` (select when available)

### Step 5: Set Environment Variables

**Vercel Dashboard** → **Settings** → **Environment Variables**

Add for each environment:

| Variable | Development | Preview (Staging) | Production |
|----------|-------------|-------------------|------------|
| `NEXT_PUBLIC_SITE_URL` | `https://propulse-dev-*.vercel.app` | `https://staging.propulse-association.fr` | `https://propulse-association.fr` |

**Note:** `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` is auto-generated by Vercel.

### Step 6: Configure Git Branches

**Vercel Dashboard** → **Settings** → **Git**

**Production Branch:** `LP-main`

**Preview Branches:**
- ✅ Enable automatic deployments for:
  - `LP-staging`
  - `LP-dev`
  - `LP-feature/*`

**Branch Protection (Optional):**
```
LP-main: Require PR approval before merging
LP-staging: Auto-deploy on push
LP-dev: Auto-deploy on push
```

### Step 7: Deploy

**Deploy to Development:**
```bash
git checkout LP-dev
git add .
git commit -m "Initial setup"
git push origin LP-dev
```

Vercel auto-deploys. Check: https://vercel.com/dashboard

**Deploy to Staging:**
```bash
git checkout LP-staging
git merge LP-dev
git push origin LP-staging
```

**Deploy to Production:**
1. Create PR: `LP-staging` → `LP-main`
2. Review on GitHub
3. Merge PR
4. Vercel auto-deploys to production

### Step 8: Verify Deployments

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]
```

---

## Cloudflare DNS Configuration

### Prerequisites
- Domain: `propulse-association.fr` (owned and in Cloudflare)
- Vercel project deployed

### Step 1: Add Domain to Vercel

**Vercel Dashboard** → **Settings** → **Domains**

**Add domains:**
1. `propulse-association.fr` (production)
2. `staging.propulse-association.fr` (staging)

Vercel will provide DNS records.

### Step 2: Configure DNS in Cloudflare

**Cloudflare Dashboard** → **DNS** → **Records**

**For Production (`propulse-association.fr`):**

| Type | Name | Content | Proxy Status | TTL |
|------|------|---------|--------------|-----|
| `A` | `@` | `76.76.21.21` | DNS only (gray cloud) | Auto |
| `CNAME` | `www` | `propulse-association.fr` | DNS only | Auto |

**For Staging (`staging.propulse-association.fr`):**

| Type | Name | Content | Proxy Status | TTL |
|------|------|---------|--------------|-----|
| `CNAME` | `staging` | `cname.vercel-dns.com` | DNS only | Auto |

**Important:** Use DNS only (gray cloud), NOT proxied (orange cloud), for Vercel.

### Step 3: Add Redirect (www → non-www)

**Cloudflare Dashboard** → **Rules** → **Page Rules**

**Create Page Rule:**
```
URL: www.propulse-association.fr/*
Setting: Forwarding URL (301 - Permanent Redirect)
Destination: https://propulse-association.fr/$1
```

### Step 4: Verify DNS Propagation

```bash
# Check DNS records
dig propulse-association.fr
dig staging.propulse-association.fr

# Or use online tool:
# https://dnschecker.org
```

### Step 5: Verify SSL Certificate

After DNS propagates (~5-10 minutes):

1. **Vercel Dashboard** → **Settings** → **Domains**
2. Verify ✅ SSL certificate is active
3. Visit: https://propulse-association.fr
4. Check for 🔒 (secure connection)

---

## Shadcn Components Setup

### Step 1: Initialize shadcn/ui

```bash
cd landingPage
pnpm dlx shadcn@latest init
```

**Interactive prompts:**

```
✔ Would you like to use TypeScript? … yes
✔ Which style would you like to use? › New York
✔ Which color would you like to use as base color? › Zinc
✔ Where is your global CSS file? … src/app/globals.css
✔ Would you like to use CSS variables for colors? … yes
✔ Are you using a custom tailwind prefix? … no
✔ Where is your tailwind.config.js located? … tailwind.config.ts
✔ Configure the import alias for components? … @/components
✔ Configure the import alias for utils? … @/lib/utils
✔ Are you using React Server Components? … yes
```

This creates:
- `components.json` (configuration)
- `src/components/ui/` (component directory)
- `src/lib/utils.ts` (utility function for className merging)

### Step 2: Install Required Components

**Based on PRD requirements:**

#### Button (CTAs)
```bash
pnpm dlx shadcn@latest add button
```

**Docs:** https://ui.shadcn.com/docs/components/button

**Usage:**
```tsx
import { Button } from '@/components/ui/button';

<Button variant="default">Je suis lycéen</Button>
<Button variant="outline">Devenir mentor</Button>
```

#### Accordion (Timeline on /programme)
```bash
pnpm dlx shadcn@latest add accordion
```

**Docs:** https://ui.shadcn.com/docs/components/accordion

**Usage:**
```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

<Accordion type="single" collapsible>
  <AccordionItem value="phase-1">
    <AccordionTrigger>Phase 1: Présentation des filières</AccordionTrigger>
    <AccordionContent>
      4 Masterclass de présentation...
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

#### Card (Optional - for mentor profiles)
```bash
pnpm dlx shadcn@latest add card
```

**Docs:** https://ui.shadcn.com/docs/components/card

**Usage:**
```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Arthur Costa</CardTitle>
    <CardDescription>Co-fondateur</CardDescription>
  </CardHeader>
  <CardContent>
    <p>EDHEC Lille & Université Paris-Dauphine</p>
  </CardContent>
</Card>
```

### Step 3: Verify Installation

Check that files are created:
```bash
ls src/components/ui/
# Should show: button.tsx, accordion.tsx, card.tsx
```

---

## First Components

### 1. Global Styles

**File: `src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 16%;
    --radius: 0.5rem;
  }
  
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

### 2. Root Layout

**File: `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Propulse | Mentorat Gratuit vers les Grandes Écoles',
  description:
    'Accompagnement gratuit et personnalisé pour lycéens vers les Grandes Écoles. 50+ mentors d\'HEC, EDHEC, Sciences Po, Polytechnique.',
  keywords: [
    'mentorat',
    'grandes écoles',
    'orientation',
    'égalité des chances',
    'classe préparatoire',
  ],
  authors: [{ name: 'Propulse Association' }],
  openGraph: {
    title: 'Propulse | Mentorat Gratuit vers les Grandes Écoles',
    description: 'Accompagnement gratuit vers les Grandes Écoles',
    url: 'https://propulse-association.fr',
    siteName: 'Propulse',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 3. Homepage Starter

**File: `src/app/page.tsx`**

```tsx
import { HeroSection } from '@/components/sections/hero';
import { SocialProofSection } from '@/components/sections/social-proof';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <SocialProofSection />
      {/* Add more sections as you build */}
    </main>
  );
}
```

### 4. Example Hero Section

**File: `src/components/sections/hero.tsx`**

```tsx
'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl lg:text-6xl font-bold text-primary mb-6">
            Propulsez votre avenir vers l'excellence
          </h1>
          
          <p className="text-xl text-text-secondary mb-8">
            Un accompagnement gratuit pour lycéens vers les Grandes Écoles
          </p>
          
          <div className="inline-block mb-8">
            <span className="text-2xl font-bold text-accent-orange italic">
              "Fonce, tu en es capable !"
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-accent-orange hover:bg-accent-orange-hover">
              Je suis lycéen
            </Button>
            <Button size="lg" variant="outline">
              Je deviens mentor
            </Button>
            <Button size="lg" variant="outline">
              Je suis un lycée
            </Button>
          </div>
        </motion.div>

        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-square rounded-full overflow-hidden bg-background-secondary">
            <img
              src="https://placehold.co/800x800/F5EFE6/1B3A52?text=hero-placeholder"
              alt="Hero visual"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-primary" />
      </motion.div>
    </section>
  );
}
```

### 5. Example Stats Section with Animations

**File: `src/components/sections/social-proof.tsx`**

```tsx
'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

export function SocialProofSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats = [
    {
      number: 50,
      suffix: '+',
      label: 'étudiants et diplômés de Grandes Écoles se sont engagés comme mentors',
    },
    {
      number: 400,
      suffix: '+',
      label: 'personnes soutiennent notre mission sur LinkedIn',
    },
    {
      number: 1,
      suffix: '',
      label: 'lycée partenaire pour la première cohorte 2025-2026',
    },
  ];

  return (
    <section className="py-24 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16 text-primary"
        >
          Un mouvement qui prend de l'ampleur
        </motion.h2>

        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center p-8 bg-background rounded-lg shadow-sm"
            >
              <div className="text-5xl font-bold text-accent-orange mb-4">
                {inView && (
                  <CountUp end={stat.number} duration={2} />
                )}
                {stat.suffix}
              </div>
              <p className="text-text-secondary">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## Troubleshooting

### Common Issues

#### 1. **pnpm install fails in Vercel**

**Error:** `ERR_PNPM_LOCKFILE_VERSION_MISMATCH`

**Solution:**
```bash
# Regenerate lockfile with latest pnpm
pnpm install --no-frozen-lockfile
git add pnpm-lock.yaml
git commit -m "Update pnpm lockfile"
git push
```

#### 2. **Vercel builds from wrong directory**

**Error:** `Build failed: Module not found`

**Solution:**
- Vercel Dashboard → Settings → General
- Set **Root Directory:** `landingPage`
- Redeploy

#### 3. **Environment variables not working**

**Error:** `process.env.NEXT_PUBLIC_SITE_URL is undefined`

**Solution:**
- Check variable is prefixed with `NEXT_PUBLIC_` (for client-side access)
- Verify set in Vercel Dashboard for correct environment
- Redeploy (env changes require rebuild)

#### 4. **Tailwind classes not working**

**Error:** Styles not applied

**Solution:**
```bash
# Check Tailwind IntelliSense extension is installed
# Restart VS Code
# Verify content paths in tailwind.config.ts include your files
```

#### 5. **Framer Motion animations lag**

**Issue:** Animations feel slow

**Solution:**
```tsx
// Use transform instead of position properties
<motion.div
  initial={{ opacity: 0, y: 20 }}  // ✅ Good
  // NOT: initial={{ opacity: 0, top: 20 }}  // ❌ Bad
/>
```

#### 6. **Next.js Image optimization fails**

**Error:** `Invalid src prop`

**Solution:**
```tsx
// For placehold.co, add to next.config.ts:
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'placehold.co' },
  ],
},
```

#### 7. **Git branch not deploying**

**Issue:** Push to LP-dev but no Vercel deployment

**Solution:**
- Check Vercel Dashboard → Settings → Git
- Ensure branch is enabled for deployments
- Check GitHub → Settings → Webhooks (Vercel webhook should be active)

---

## Pre-Launch Checklist

### Development Phase

- [ ] All components build without errors (`pnpm build`)
- [ ] TypeScript has no errors (`pnpm type-check`)
- [ ] ESLint passes (`pnpm lint`)
- [ ] All pages load correctly on localhost
- [ ] All animations work smoothly
- [ ] Forms redirect to correct Google Form URLs
- [ ] PDF download works (`/documents/presentation-propulse.pdf`)
- [ ] All placeholder images are visible

### Content Review

- [ ] All text matches PRD (no Lorem Ipsum)
- [ ] Founder stories are complete and accurate
- [ ] Contact information is correct (email, phone numbers)
- [ ] École logos are high quality
- [ ] All links work (LinkedIn, social media)
- [ ] Meta tags are optimized for SEO

### Technical Check

- [ ] Environment variables set for all environments
- [ ] Vercel Analytics is enabled and tracking
- [ ] Domain is connected and SSL certificate is active
- [ ] www → non-www redirect works
- [ ] All branches deploy correctly (dev, staging, prod)
- [ ] Mobile responsiveness verified (375px, 768px, 1024px+)
- [ ] Performance: Lighthouse score >90

### Deployment

- [ ] Staging deployment successful (`LP-staging` branch)
- [ ] Staging site reviewed and approved
- [ ] Production PR created (`LP-staging` → `LP-main`)
- [ ] PR reviewed and merged
- [ ] Production deployment successful
- [ ] Production site live at `propulse-association.fr`

### Post-Launch

- [ ] Monitor Vercel Analytics for traffic
- [ ] Check for console errors in browser
- [ ] Test all CTAs (form submissions work)
- [ ] Verify DNS propagation worldwide
- [ ] Collect feedback from mentors/users

---

## Next Steps

### Immediate (Week 1)
1. ✅ Complete project setup (this document)
2. Build Hero section
3. Build Social Proof section
4. Build Stats section

### Short-term (Week 2-3)
5. Build Founders section
6. Build Programme page with timeline
7. Build Final CTA section
8. Add footer with contact info

### Before Launch
9. Replace all placeholders with real images
10. Add actual Grande École logos
11. Connect Google Forms
12. Final testing and deployment

---

## Additional Resources

### Official Documentation
- **Next.js:** https://nextjs.org/docs
- **Framer Motion:** https://www.framer.com/motion/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com/docs
- **Vercel:** https://vercel.com/docs
- **pnpm:** https://pnpm.io/

### Community & Support
- **Next.js Discord:** https://nextjs.org/discord
- **Vercel Support:** https://vercel.com/help
- **Stack Overflow:** Tag questions with `next.js`, `tailwindcss`, `framer-motion`

---

## Document Version

**Version:** 1.0  
**Last Updated:** October 2, 2025  
**Maintained by:** Propulse Technical Team

---

**🚀 Ready to build! Start with:**
```bash
cd your-monorepo/landingPage
pnpm dev
```

Open http://localhost:3000 and start building your landing page!