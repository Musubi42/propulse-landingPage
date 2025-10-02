# Vercel Deployment Guide

Quick guide to deploy the Propulse landing page to Vercel from your terminal.

## Prerequisites

- Node.js 24.x installed
- pnpm 9.x installed
- Vercel account created
- Repository pushed to GitHub

## 1. Install Vercel CLI

```bash
npm install -g vercel
```

## 2. Login to Vercel

```bash
vercel login
```

This will open your browser for authentication. Follow the prompts.

## 3. Link Project to Vercel (First Time Only)

From the project root directory:

```bash
vercel link
```

You'll be asked:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your Vercel account/team
- **Link to existing project?** → No (if first time) or Yes (if project exists)
- **Project name?** → propulse-landing (or your choice)
- **Directory?** → `./` (current directory)

This creates a `.vercel` directory with your project settings.

## 4. Deploy to Preview (Development)

Deploy the `dev` branch to a preview URL:

```bash
# Make sure you're on dev branch
git checkout dev

# Deploy to preview
vercel
```

This creates a preview deployment with a unique URL like:
`https://propulse-landing-xyz.vercel.app`

## 5. Deploy to Production

Deploy the `main` branch to production:

```bash
# Make sure you're on main branch
git checkout main

# Deploy to production
vercel --prod
```

This deploys to your production domain: `propulse-association.fr`

## 6. Environment Variables (Optional)

If you need to set environment variables:

```bash
# Add environment variable
vercel env add NEXT_PUBLIC_FORM_LYCEEN

# Pull environment variables locally
vercel env pull
```

## 7. Common Commands

```bash
# Deploy current branch (preview)
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# List all deployments
vercel list

# Remove a deployment
vercel remove [deployment-url]

# Open project in Vercel dashboard
vercel open
```

## Git-Based Deployment (Recommended)

Once linked, Vercel automatically deploys:
- **dev branch** → Preview deployment
- **staging branch** → Staging deployment
- **main branch** → Production deployment

Just push to GitHub:

```bash
git push origin dev      # Auto-deploys to preview
git push origin staging  # Auto-deploys to staging
git push origin main     # Auto-deploys to production
```

## Project Configuration

The project is already configured with `vercel.json`:

```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["cdg1"],
  "git": {
    "deploymentEnabled": {
      "main": true,
      "staging": true,
      "dev": true
    }
  }
}
```

## Domain Configuration

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add `propulse-association.fr`
3. Follow DNS instructions from Cloudflare
4. Wait for DNS propagation (can take up to 48h)

## Troubleshooting

**Build fails:**
```bash
# Test build locally first
pnpm build

# Check logs
vercel logs [deployment-url]
```

**Wrong domain:**
```bash
# Check current domains
vercel domains ls

# Add production domain
vercel domains add propulse-association.fr
```

**Environment variables missing:**
```bash
# List all env vars
vercel env ls

# Pull latest env vars
vercel env pull
```

## Quick Deploy Workflow

```bash
# 1. Develop on dev branch
git checkout dev
# ... make changes ...
git add .
git commit -m "feat: new feature"
git push origin dev
# → Auto-deploys to preview URL

# 2. Test on staging
git checkout staging
git merge dev
git push origin staging
# → Auto-deploys to staging.propulse-association.fr

# 3. Deploy to production
git checkout main
git merge staging
git push origin main
# → Auto-deploys to propulse-association.fr
```

## Useful Links

- **Vercel CLI Docs**: https://vercel.com/docs/cli
- **Next.js on Vercel**: https://vercel.com/docs/frameworks/nextjs
- **Dashboard**: https://vercel.com/dashboard

---

**Note**: After first `vercel link`, the `.vercel` directory is created locally (already in .gitignore).
