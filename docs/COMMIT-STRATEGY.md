# Commit Strategy - Propulse Landing Page

**Last Updated:** 2025-10-02
**Repository:** git@github.com:Musubi42/propulse-landingPage.git

---

## Commit Message Format

We follow the **Conventional Commits** specification for clear, consistent commit messages.

### Structure

```
<type>: <subject>

<body (optional)>
```

### Example

```
feat: add Hero section with 3 CTAs

- Create HeroSection component with animations
- Add placeholder image with circle crop
- Implement scroll indicator
- Configure CTA buttons for 3 audiences
```

---

## Commit Types

### Primary Types (Use These Most)

| Type | When to Use | Example |
|------|-------------|---------|
| `feat` | New feature or component | `feat: add Social Proof section` |
| `fix` | Bug fix | `fix: correct button alignment in Hero` |
| `style` | Visual/styling changes (no logic) | `style: update color palette` |
| `config` | Configuration changes | `config: add Vercel deployment settings` |
| `docs` | Documentation updates | `docs: update README with setup instructions` |

### Secondary Types (Use When Needed)

| Type | When to Use | Example |
|------|-------------|---------|
| `perf` | Performance improvements | `perf: optimize image loading` |
| `refactor` | Code restructure (no feature change) | `refactor: extract animation logic to hooks` |
| `test` | Add or update tests | `test: add unit tests for Counter component` |
| `chore` | Maintenance tasks | `chore: update dependencies` |

---

## Writing Good Commit Messages

### Subject Line Rules

1. **Start with type:** `feat:`, `fix:`, `style:`, etc.
2. **Use imperative mood:** "add" not "added" or "adds"
3. **Be specific:** "add Hero section" not "update page"
4. **Keep it short:** 50 characters or less
5. **Don't end with period:** No `.` at the end

### ✅ Good Examples

```bash
feat: add Hero section with 3 CTAs
fix: correct mobile layout for Statistics section
style: implement Propulse color palette
config: configure Tailwind with custom colors
docs: add Phase 2 documentation
perf: lazy load images below fold
```

### ❌ Bad Examples

```bash
updated stuff                    # Too vague
Added hero section.             # Wrong tense, has period
feat add hero                   # Missing colon
fixed bug                       # Not specific enough
WIP                            # Not descriptive
asdfasdf                       # Meaningless
```

---

## Body Guidelines (Optional)

Add a body when you need to explain **what** and **why**, not **how**.

### When to Add Body

- Complex changes that need context
- Multiple files changed
- Breaking changes
- Important decisions made

### Format

```
feat: add interactive timeline component

- Create Accordion-based timeline for 6 phases
- Add expand/collapse animations
- Implement scroll-triggered entrance
- Connect to Programme page

This replaces the static timeline mockup and improves
user engagement with expandable content.
```

### Body Rules

- Leave **blank line** between subject and body
- Use **bullet points** (`-`) for multiple changes
- Explain **why** the change was made, not **how**
- Keep lines under 72 characters

---

## Commit Frequency

### When to Commit

**Commit after completing a logical unit of work:**

✅ **DO Commit:**
- Finished component (Hero, Footer, etc.)
- Complete section functionality
- Configuration file updates
- Bug fix that works
- Documentation updates
- Style/design changes

❌ **DON'T Commit:**
- Half-finished features (unless in feature branch)
- Broken/non-functional code
- Debug console.logs
- Commented-out code blocks
- Code with syntax errors

### Frequency Guidelines

**Small, frequent commits > Large, infrequent commits**

```bash
# ✅ Good: Multiple small commits
git commit -m "feat: add Hero section structure"
git commit -m "style: add Hero section animations"
git commit -m "feat: add scroll indicator to Hero"

# ❌ Bad: One massive commit
git commit -m "feat: add entire homepage"
```

---

## Examples by Phase

### Phase 1: Setup

```bash
git commit -m "feat: initialize Next.js 15 with TypeScript and Tailwind CSS"

git commit -m "config: add shadcn/ui with New York style"

git commit -m "config: configure Tailwind with Propulse color palette"

git commit -m "docs: add initial project documentation"
```

### Phase 2: Visual Foundation

```bash
git commit -m "style: implement Propulse color system"

git commit -m "feat: add FadeIn animation component"

git commit -m "feat: create PenLine SVG component"

git commit -m "feat: add PolymorphDivider component"
```

### Phase 3: Homepage Sections

```bash
git commit -m "feat: add Hero section with 3 CTAs"

git commit -m "feat: add Social Proof section with animated counters"

git commit -m "feat: add Statistics section (Le Problème)"

git commit -m "feat: add Founders section with stories"
```

### Phase 4: Programme Page

```bash
git commit -m "feat: create Programme page structure"

git commit -m "feat: add interactive 6-phase timeline"

git commit -m "style: add timeline entrance animations"
```

### Phase 5: Polish

```bash
git commit -m "style: optimize mobile responsiveness (375px)"

git commit -m "perf: optimize images and lazy loading"

git commit -m "fix: improve color contrast for accessibility"
```

### Phase 6: Deployment

```bash
git commit -m "config: configure Vercel deployment settings"

git commit -m "config: add environment variables for production"

git commit -m "docs: update README with deployment instructions"
```

---

## Multi-Line Commit Template

For complex commits, use this template:

```bash
git commit -m "feat: add interactive timeline component

- Create AccordionTimeline component
- Add 6-phase program data
- Implement expand/collapse logic
- Add scroll-triggered animations
- Link from Solution Preview section

This component allows users to explore the program
details interactively, improving engagement and
reducing initial page complexity."
```

Or use your editor:

```bash
# Opens default editor for multi-line commit
git commit

# In editor, write:
feat: add interactive timeline component

- Create AccordionTimeline component
- Add 6-phase program data
- Implement expand/collapse logic
- Add scroll-triggered animations
- Link from Solution Preview section

This component allows users to explore the program
details interactively.
```

---

## Breaking Changes

If a commit introduces breaking changes, add `!` or `BREAKING CHANGE:`:

```bash
git commit -m "feat!: restructure component directory

BREAKING CHANGE: Components moved from /components
to /components/sections and /components/ui.

Update all imports accordingly."
```

---

## Commit Message Checklist

Before committing, verify:

- [ ] Correct type (`feat`, `fix`, `style`, etc.)
- [ ] Imperative mood ("add" not "added")
- [ ] Specific and clear subject
- [ ] Under 50 characters (subject)
- [ ] No period at end of subject
- [ ] Body explains "why" (if needed)
- [ ] No debug code or console.logs
- [ ] Code works and builds successfully

---

## Git Commit Commands

### Basic Commit

```bash
# Add all changes
git add .

# Commit with message
git commit -m "feat: add Hero section"

# Push to current branch
git push
```

### Amend Last Commit

```bash
# Fix last commit message
git commit --amend -m "feat: add Hero section with CTAs"

# Add forgotten files to last commit
git add forgotten-file.tsx
git commit --amend --no-edit
```

### Commit Specific Files

```bash
# Stage specific files
git add src/components/sections/hero.tsx
git add src/app/page.tsx

# Commit only staged files
git commit -m "feat: add Hero section"
```

---

## Tools & Automation

### VSCode Git Integration

```json
// .vscode/settings.json
{
  "git.enableCommitSigning": false,
  "git.confirmSync": false,
  "git.autofetch": true
}
```

### Commit Template (Optional)

Create `.gitmessage` template:

```bash
# ~/.gitmessage
<type>: <subject>

# Why:
# -

# What changed:
# -
```

Set as default:

```bash
git config --global commit.template ~/.gitmessage
```

---

## Real-World Examples

### Example 1: New Component

```bash
git add src/components/sections/hero.tsx
git commit -m "feat: add Hero section with 3 CTAs

- Create HeroSection component
- Add circle-cropped placeholder image
- Implement 3 CTA buttons (Lycéen, Mentor, Lycée)
- Add scroll indicator with bounce animation
- Style with Propulse color palette"
```

### Example 2: Bug Fix

```bash
git add src/components/animations/counter.tsx
git commit -m "fix: prevent Counter from re-triggering on re-render

Add triggerOnce: true to useInView hook to ensure
counter animation only plays once when scrolled into view."
```

### Example 3: Configuration

```bash
git add tailwind.config.ts
git commit -m "config: add custom Propulse color palette to Tailwind

- Add background colors (cream, beige, divider)
- Add primary colors (navy with hover states)
- Add accent colors (orange, green with variants)
- Add text colors (primary, secondary, tertiary)"
```

### Example 4: Documentation

```bash
git add docs/GIT-WORKFLOW.md
git commit -m "docs: add Git workflow documentation

Create comprehensive guide for three-branch strategy
(dev → staging → main) with examples and best practices."
```

---

## Anti-Patterns to Avoid

### ❌ Don't Do This

```bash
# Vague messages
git commit -m "updates"
git commit -m "fixes"
git commit -m "WIP"

# Wrong tense
git commit -m "feat: added hero section"
git commit -m "feat: adds hero section"

# Missing type
git commit -m "add hero section"

# Too long subject
git commit -m "feat: add hero section with 3 CTAs and animations and placeholder images and everything else"

# Combining unrelated changes
git add src/components/hero.tsx src/components/footer.tsx
git commit -m "feat: add hero and footer"
```

### ✅ Do This Instead

```bash
# Clear, specific messages
git commit -m "feat: add Hero section"
git commit -m "fix: correct mobile button layout"
git commit -m "style: update color palette"

# Correct tense (imperative)
git commit -m "feat: add hero section"

# Include type
git commit -m "feat: add hero section"

# Keep subject short, add details in body
git commit -m "feat: add Hero section with 3 CTAs

- Implement responsive layout
- Add animations and transitions
- Use placeholder images"

# Separate commits for separate features
git add src/components/hero.tsx
git commit -m "feat: add Hero section"

git add src/components/footer.tsx
git commit -m "feat: add Footer component"
```

---

## Summary

### Quick Rules

1. **Format:** `<type>: <subject>` (e.g., `feat: add Hero section`)
2. **Types:** feat, fix, style, config, docs, perf, refactor, test, chore
3. **Imperative:** "add" not "added" or "adds"
4. **Specific:** Describe what changed clearly
5. **Short subject:** Under 50 characters
6. **Body optional:** Explain "why" when needed
7. **Commit often:** Small, logical units of work

### Most Common Types You'll Use

- `feat:` - New components, sections, features
- `style:` - Visual changes, colors, layout
- `fix:` - Bug fixes
- `config:` - Configuration updates
- `docs:` - Documentation changes

---

**For Git workflow, see:** [GIT-WORKFLOW.md](GIT-WORKFLOW.md)
**For project phases, see:** [PROJECT-TRACKER.md](PROJECT-TRACKER.md)

---

**Last Updated:** 2025-10-02
