# Git Workflow - Propulse Landing Page

**Last Updated:** 2025-10-02
**Repository:** git@github.com:Musubi42/propulse-landingPage.git

---

## Branch Strategy

We use a **three-branch workflow** for organized development and deployment:

```
dev      →  staging  →  main
 ↑           ↑           ↑
Development  Preview   Production
```

### Branch Overview

| Branch | Purpose | Auto-Deploy | URL |
|--------|---------|-------------|-----|
| `dev` | Active development | ✅ Yes | Vercel preview URL |
| `staging` | Pre-production testing | ✅ Yes | staging.propulse-association.fr |
| `main` | Production | ✅ Yes | propulse-association.fr |

---

## Development Workflow

### 1. Starting New Work

**Always work in the `dev` branch:**

```bash
# Make sure you're on dev
git checkout dev

# Pull latest changes
git pull origin dev

# Start working on your feature
```

### 2. Making Changes

**Commit frequently with clear messages:**

```bash
# Stage your changes
git add .

# Commit with descriptive message (see COMMIT-STRATEGY.md)
git commit -m "feat: add Hero section with 3 CTAs"

# Push to dev branch
git push origin dev
```

**Result:** Vercel automatically deploys a preview of your changes.

### 3. Testing on Staging

**When `dev` is stable and ready for testing:**

```bash
# Switch to staging
git checkout staging

# Merge dev into staging
git merge dev

# Push to staging
git push origin staging
```

**Result:** Changes deploy to `staging.propulse-association.fr` for final review.

### 4. Deploying to Production

**When staging is tested and approved:**

```bash
# Switch to main
git checkout main

# Merge staging into main
git merge staging

# Push to main
git push origin main
```

**Result:** Changes deploy to `propulse-association.fr` (production).

### 5. Return to Development

```bash
# Always switch back to dev for new work
git checkout dev
```

---

## Feature Branch Workflow (Optional)

For larger features, you can create feature branches:

```bash
# Create feature branch from dev
git checkout dev
git checkout -b feature/interactive-timeline

# Work on your feature
git add .
git commit -m "feat: create interactive timeline component"

# Push feature branch
git push origin feature/interactive-timeline

# When done, merge into dev
git checkout dev
git merge feature/interactive-timeline

# Delete feature branch
git branch -d feature/interactive-timeline
git push origin --delete feature/interactive-timeline
```

---

## Commit Frequency

**Commit after:**
- ✅ Each component is complete
- ✅ Each section is functional
- ✅ Configuration changes
- ✅ Bug fixes
- ✅ Documentation updates

**Don't commit:**
- ❌ Broken/non-functional code
- ❌ Half-finished features (unless in feature branch)
- ❌ Debug console.logs or commented code
- ❌ Secrets or API keys

---

## Vercel Deployment Triggers

### Automatic Deployments

| Branch | Trigger | Environment | Domain |
|--------|---------|-------------|--------|
| `dev` | Push to dev | Preview | Auto-generated Vercel URL |
| `staging` | Push to staging | Preview | staging.propulse-association.fr |
| `main` | Push to main | Production | propulse-association.fr |

### Deployment Checklist

**Before merging to staging:**
- [ ] All features work in dev preview
- [ ] No console errors
- [ ] TypeScript compiles (`pnpm type-check`)
- [ ] ESLint passes (`pnpm lint`)
- [ ] Build succeeds (`pnpm build`)

**Before merging to main:**
- [ ] Staging deployment tested thoroughly
- [ ] Mobile responsiveness verified
- [ ] All CTAs/links work
- [ ] Performance is acceptable (Lighthouse check)
- [ ] Content reviewed and approved

---

## Common Git Commands

### Checking Status

```bash
# See current branch and changes
git status

# See branch list
git branch -a

# See commit history
git log --oneline -10
```

### Syncing Branches

```bash
# Update dev with latest from remote
git checkout dev
git pull origin dev

# Update staging with dev changes
git checkout staging
git merge dev
git push origin staging

# Update main with staging changes
git checkout main
git merge staging
git push origin main
```

### Undoing Changes

```bash
# Undo local changes (before commit)
git checkout -- <file>

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes) ⚠️ DANGEROUS
git reset --hard HEAD~1
```

### Resolving Merge Conflicts

```bash
# If merge conflict occurs
git status  # See conflicted files

# Edit files to resolve conflicts
# Remove conflict markers: <<<<<<<, =======, >>>>>>>

# Stage resolved files
git add <resolved-file>

# Complete the merge
git commit -m "fix: resolve merge conflicts"
```

---

## Pull Request Workflow (Optional)

For team collaboration, you can use PRs:

```bash
# Push feature to remote
git push origin feature/my-feature

# Create PR on GitHub: feature/my-feature → dev

# After review and approval, merge on GitHub

# Delete local feature branch
git checkout dev
git pull origin dev
git branch -d feature/my-feature
```

---

## Emergency Hotfix Workflow

**If production needs immediate fix:**

```bash
# Create hotfix from main
git checkout main
git checkout -b hotfix/urgent-fix

# Make the fix
git add .
git commit -m "fix: critical bug on hero section"

# Merge into main
git checkout main
git merge hotfix/urgent-fix
git push origin main

# Also merge into staging and dev to keep in sync
git checkout staging
git merge hotfix/urgent-fix
git push origin staging

git checkout dev
git merge hotfix/urgent-fix
git push origin dev

# Delete hotfix branch
git branch -d hotfix/urgent-fix
```

---

## Best Practices

### ✅ DO

- **Commit frequently** with clear messages
- **Pull before you push** to avoid conflicts
- **Test locally** before pushing to staging/main
- **Keep branches in sync** (dev → staging → main)
- **Delete merged feature branches** to keep repo clean
- **Use meaningful branch names** (feature/hero-section, not feature/abc)

### ❌ DON'T

- **Don't commit directly to main** (always go through dev → staging)
- **Don't force push** (`git push -f`) unless absolutely necessary
- **Don't commit sensitive data** (.env files, API keys, passwords)
- **Don't leave unfinished code in dev** (use feature branches)
- **Don't merge without testing** on the previous environment

---

## Quick Reference

### Daily Development Flow

```bash
# 1. Start work
git checkout dev
git pull origin dev

# 2. Make changes
# ... edit files ...

# 3. Commit changes
git add .
git commit -m "feat: add new component"
git push origin dev

# 4. Repeat steps 2-3 as needed
```

### Weekly Deployment Flow

```bash
# 1. Deploy to staging (Friday afternoon)
git checkout staging
git merge dev
git push origin staging
# → Test on staging over weekend

# 2. Deploy to production (Monday, if staging OK)
git checkout main
git merge staging
git push origin main

# 3. Back to development
git checkout dev
```

---

## Troubleshooting

### Issue: "Your branch is behind 'origin/dev'"

```bash
git pull origin dev
```

### Issue: "Merge conflict"

```bash
# See conflicted files
git status

# Edit and fix conflicts, then:
git add <file>
git commit -m "fix: resolve merge conflict"
```

### Issue: "I committed to wrong branch"

```bash
# If you haven't pushed yet
git log  # Note the commit hash
git reset --hard HEAD~1  # Undo commit
git checkout <correct-branch>
git cherry-pick <commit-hash>  # Apply commit here
```

### Issue: "I need to undo my last push"

```bash
# ⚠️ Only if no one else has pulled
git reset --hard HEAD~1
git push -f origin <branch>

# ✅ Better: Create revert commit
git revert HEAD
git push origin <branch>
```

---

## Visual Workflow Diagram

```
┌─────────┐
│   dev   │ ← Active development (commit frequently)
└────┬────┘
     │ merge when stable
     ▼
┌──────────┐
│ staging  │ ← Pre-production testing
└────┬─────┘
     │ merge when tested
     ▼
┌─────────┐
│  main   │ ← Production (live site)
└─────────┘
```

---

**For commit message format, see:** [COMMIT-STRATEGY.md](COMMIT-STRATEGY.md)
**For project setup, see:** [PHASE-1-SETUP.md](PHASE-1-SETUP.md)

---

**Last Updated:** 2025-10-02
