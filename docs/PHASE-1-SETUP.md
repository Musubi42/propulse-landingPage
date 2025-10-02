# Phase 1: Project Setup

**Status:** 🟡 Not Started
**Estimated Time:** 2-3 hours
**Prerequisites:** None

---

## Overview

This phase covers the complete initial setup of the Propulse landing page project, including environment configuration, project initialization, dependencies installation, and development environment setup.

---

## Checklist

### 1.1 Environment Prerequisites ⬜

**Install Required Software:**

- [ ] Node.js 24.x (or 22.x temporarily)
  ```bash
  # Using nvm
  nvm install 24
  nvm use 24
  node --version  # Verify
  ```

- [ ] pnpm 9.x
  ```bash
  npm install -g pnpm@latest
  pnpm --version  # Should show 9.x.x
  ```

- [ ] Vercel CLI
  ```bash
  pnpm add -g vercel
  vercel --version
  ```

**Verify Accounts:**
- [ ] GitHub account (repository access)
- [ ] Vercel account (linked to GitHub)
- [ ] Cloudflare account (domain management)

---

### 1.2 Project Initialization ⬜

**Navigate to Project Directory:**
```bash
cd /Users/musubi42/Documents/freelance/propulse/newLandingPage
```

**Initialize Git Repository:**
- [ ] Initialize git
  ```bash
  git init
  ```

- [ ] Add remote repository
  ```bash
  git remote add origin git@github.com:Musubi42/propulse-landingPage.git
  ```

- [ ] Verify remote
  ```bash
  git remote -v
  ```

**Initialize Next.js Project:**
- [ ] Create Next.js app in current directory
  ```bash
  pnpm create next-app@latest . \
    --typescript \
    --tailwind \
    --app \
    --src-dir \
    --import-alias "@/*"
  ```

**Interactive Prompts:**
- [ ] ESLint: **Yes**
- [ ] Turbopack: **No**
- [ ] Import alias: **No** (keep `@/*`)

---

### 1.3 Core Dependencies Installation ⬜

**Animation & Interaction Libraries:**
- [ ] Install animation packages
  ```bash
  pnpm add framer-motion react-intersection-observer react-countup
  ```

- [ ] Install icon library
  ```bash
  pnpm add lucide-react
  ```

**Utility Libraries:**
- [ ] Install className utilities
  ```bash
  pnpm add clsx tailwind-merge
  ```

- [ ] Install Vercel Analytics
  ```bash
  pnpm add @vercel/analytics
  ```

- [ ] Install Tailwind plugins
  ```bash
  pnpm add -D tailwindcss-animate
  ```

**Verify Installation:**
- [ ] Check `package.json` has all dependencies
- [ ] Run `pnpm install` to ensure lockfile is consistent

---

### 1.4 Configuration Files Setup ⬜

**Create `.nvmrc`:**
- [ ] File: `.nvmrc` (in project root)
  ```
  24
  ```

**Create `.npmrc`:**
- [ ] File: `.npmrc` (in project root)
  ```ini
  prefer-frozen-lockfile=true
  auto-install-peers=true
  strict-peer-dependencies=false
  shamefully-hoist=false
  ```

**Update `package.json`:**
- [ ] Add engine requirements
  ```json
  "engines": {
    "node": ">=24.0.0",
    "pnpm": ">=9.0.0"
  }
  ```

**Configure `next.config.ts`:**
- [ ] Enable React strict mode
- [ ] Configure image optimization
- [ ] Add remote patterns for placeholder images
  ```typescript
  const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
      formats: ['image/avif', 'image/webp'],
      remotePatterns: [
        { protocol: 'https', hostname: 'placehold.co' },
      ],
    },
    experimental: {
      webVitalsAttribution: ['CLS', 'LCP'],
    },
  };
  ```

**Configure `tailwind.config.ts`:**
- [ ] Add Propulse color palette (from [Palette-colors.md](../specs/Palette-colors.md))
- [ ] Add custom font stack
- [ ] Configure border radius variables
- [ ] Add `tailwindcss-animate` plugin

**Create `vercel.json`:**
- [ ] File: `vercel.json` (in project root)
- [ ] Set build command to `pnpm build`
- [ ] Set region to `cdg1` (Paris)
- [ ] Add security headers
- [ ] Add www redirect

**Update `.gitignore`:**
- [ ] Ensure `.next/`, `.vercel/`, `node_modules/` are ignored
- [ ] Add `.env*.local` to gitignore
- [ ] Add `docs/` and `specs/` are NOT ignored (keep them in git)

---

### 1.5 Environment Variables Setup ⬜

**Create `.env.example`:**
- [ ] File: `.env.example` (in project root)
  ```bash
  NEXT_PUBLIC_SITE_URL=http://localhost:3000
  # NEXT_PUBLIC_FORM_LYCEEN_URL=
  # NEXT_PUBLIC_FORM_MENTOR_URL=
  # NEXT_PUBLIC_FORM_LYCEE_URL=
  ```

**Create `.env.local`:**
- [ ] File: `.env.local` (gitignored, in project root)
  ```bash
  NEXT_PUBLIC_SITE_URL=http://localhost:3000
  ```

---

### 1.6 Shadcn/UI Setup ⬜

**Initialize Shadcn:**
- [ ] Run initialization
  ```bash
  pnpm dlx shadcn@latest init
  ```

**Configuration Answers:**
- [ ] TypeScript: **Yes**
- [ ] Style: **New York**
- [ ] Base color: **Zinc**
- [ ] Global CSS: `src/app/globals.css`
- [ ] CSS variables: **Yes**
- [ ] Tailwind prefix: **No**
- [ ] Tailwind config: `tailwind.config.ts`
- [ ] Component alias: `@/components`
- [ ] Utils alias: `@/lib/utils`
- [ ] React Server Components: **Yes**

**Install Required Components:**
- [ ] Button component
  ```bash
  pnpm dlx shadcn@latest add button
  ```

- [ ] Accordion component
  ```bash
  pnpm dlx shadcn@latest add accordion
  ```

- [ ] Card component (optional)
  ```bash
  pnpm dlx shadcn@latest add card
  ```

**Verify Installation:**
- [ ] Check `components.json` exists
- [ ] Check `src/components/ui/` directory exists
- [ ] Check `src/lib/utils.ts` exists

---

### 1.7 Git Branch Strategy ⬜

**Create Development Branches:**
- [ ] Create and switch to dev
  ```bash
  git checkout -b dev
  ```

- [ ] Create staging branch
  ```bash
  git checkout -b staging
  ```

- [ ] Create main branch
  ```bash
  git checkout -b main
  ```

- [ ] Switch back to dev
  ```bash
  git checkout dev
  ```

**Initial Commit:**
- [ ] Add all files
  ```bash
  git add .
  ```

- [ ] Commit setup (see [COMMIT-STRATEGY.md](COMMIT-STRATEGY.md) for format)
  ```bash
  git commit -m "feat: initialize Next.js 15 with TypeScript and Tailwind CSS

- Add Next.js 15 with App Router
- Configure Tailwind CSS and PostCSS
- Set up TypeScript with strict mode
- Add ESLint configuration"
  ```

- [ ] Push to remote
  ```bash
  git push -u origin dev staging main
  ```

**Note:** All development happens in `dev` branch. See [GIT-WORKFLOW.md](GIT-WORKFLOW.md) for complete workflow.

---

### 1.8 VS Code Configuration ⬜

**Install Recommended Extensions:**
- [ ] Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss`)
- [ ] ESLint (`dbaeumer.vscode-eslint`)
- [ ] Pretty TypeScript Errors (`yoavbls.pretty-ts-errors`)
- [ ] Error Lens (`usernamehw.errorlens`)
- [ ] Path Intellisense (`christian-kohler.path-intellisense`)

**Create Workspace Settings:**
- [ ] Create `.vscode/` directory
  ```bash
  mkdir -p .vscode
  ```

- [ ] Create `.vscode/settings.json`
  ```json
  {
    "typescript.tsdk": "node_modules/typescript/lib",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    },
    "tailwindCSS.experimental.classRegex": [
      ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
    ],
    "files.associations": {
      "*.css": "tailwindcss"
    }
  }
  ```

---

### 1.9 Verify Setup ⬜

**Test Development Server:**
- [ ] Start dev server
  ```bash
  pnpm dev
  ```

- [ ] Open http://localhost:3000
- [ ] Verify Next.js welcome page loads

**Test Build:**
- [ ] Build project
  ```bash
  pnpm build
  ```

- [ ] Verify build succeeds with no errors

**Test Type Checking:**
- [ ] Run TypeScript check
  ```bash
  pnpm type-check
  ```

- [ ] Verify no type errors

**Test Linting:**
- [ ] Run ESLint
  ```bash
  pnpm lint
  ```

- [ ] Verify no linting errors

---

## Project Structure Created

After completing Phase 1, you should have:

```
newLandingPage/            # Project root
├── .git/                  # Git repository
├── .next/                 # Build output (gitignored)
├── .vscode/
│   └── settings.json
├── docs/                  # Documentation (in git)
│   ├── PHASE-1-SETUP.md
│   ├── PHASE-2-FOUNDATION.md
│   ├── PROJECT-TRACKER.md
│   ├── GIT-WORKFLOW.md
│   └── COMMIT-STRATEGY.md
├── specs/                 # Specifications (in git)
│   ├── PRD.md
│   ├── Technical-documentation.md
│   ├── Palette-colors.md
│   └── Vercel.md
├── node_modules/          # Dependencies (gitignored)
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   └── ui/            # shadcn components
│   │       ├── button.tsx
│   │       ├── accordion.tsx
│   │       └── card.tsx
│   └── lib/
│       └── utils.ts
├── .env.example
├── .env.local             # Gitignored
├── .gitignore
├── .npmrc
├── .nvmrc
├── CLAUDE.md
├── README.md
├── components.json
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

---

## Troubleshooting

### Issue: pnpm version mismatch
**Solution:** Update pnpm globally
```bash
npm install -g pnpm@latest
```

### Issue: Node.js 24 not available
**Solution:** Use Node.js 22 temporarily
```bash
nvm install 22
nvm use 22
```

### Issue: Tailwind IntelliSense not working
**Solution:** Restart VS Code and verify extension is installed

### Issue: Next.js build fails
**Solution:** Delete `.next` and `node_modules`, reinstall
```bash
rm -rf .next node_modules
pnpm install
pnpm build
```

---

## Success Criteria

Phase 1 is complete when:

- ✅ All dependencies installed successfully
- ✅ Development server runs without errors
- ✅ Build completes successfully
- ✅ TypeScript has no errors
- ✅ ESLint passes
- ✅ Git branches created and pushed
- ✅ VS Code configured with extensions
- ✅ Environment variables set up

---

## Next Phase

Once Phase 1 is complete, proceed to:
👉 [PHASE-2-FOUNDATION.md](PHASE-2-FOUNDATION.md) - Visual Identity & Foundation

---

**Last Updated:** 2025-10-02
