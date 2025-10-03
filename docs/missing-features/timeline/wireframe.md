Horizontal Timeline Wireframe - Complete Specification
Overall Layout
┌────────────────────────────────────────────────────────────────────────┐
│                     FIXED TIMELINE BAR (Always on top)                  │
│                                                                          │
│  Sept    Oct      Nov              Mars       Avril     Juin            │
│   ●       ○        ◉                ○          ○         ○              │
│   ├───────┼────────╫════════════════┼──────────┼─────────┤              │
│                    ↑                                                    │
│              Active (wider spacing)                                     │
│         [Pen line drawn from Sept to Nov]                              │
└────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌────────────┐    ┌──────────────────────────────────┐    ┌────────────┐
│            │    │                                  │    │            │
│  Phase 2   │    │      PHASE 3: Active            │    │  Phase 4   │
│            │    │                                  │    │            │
│  [Icon]    │    │      [Icon]                     │    │  [Icon]    │
│  Accomp.   │    │                                  │    │  Prépa     │
│  person.   │    │   Préparation académique        │    │  concours  │
│            │    │                                  │    │            │
│  Nov-Juin  │    │   Renforcement des compétences  │    │  2 mois    │
│            │    │   clés                          │    │            │
│ [Content]  │    │                                  │    │ [Content]  │
│            │    │   Détails:                      │    │            │
│ FADED >>>  │    │   • Cours de méthodologie       │    │  <<< FADED │
│            │    │   • Entraînements aux épreuves  │    │            │
└────────────┘    │   • Suivi personnalisé          │    └────────────┘
   ↑              │   • Groupes de travail          │         ↑
20% visible       │                                  │    20% visible
Fade gradient     │   Duration: 3 mois              │    Fade gradient
from right        │                                  │    from left
(left edge        └──────────────────────────────────┘    (right edge
most faded)                                                most faded)
                           100% visible
                         Fully saturated

Timeline Dot Spacing Detail
Normal spacing (dots not adjacent to active):
●─────○─────○  (equal spacing, ~80-100px)

Active spacing (dots adjacent to active):
○─────────◉─────────○  (wider spacing, ~150-180px)
         ↑
      Active
      
Complete example:
Sept    Oct       Nov                Mars          Avril      Juin
 ●       ○         ◉                  ○             ○          ○
 ├───────┼─────────╫══════════════════┼─────────────┼──────────┤
 │       │         ↑                  │             │          │
 80px   100px    180px              180px         100px      80px

Dot States & Interactions
Default State (Inactive Dot)
    ○
  [Icon]
   24px
 Opacity: 0.5
 Scale: 1.0
Hover State (Inactive Dot)
    ○
  [Icon]
   32px
 Opacity: 0.8
 Scale: 1.3
 + Cursor: pointer
 + Subtle bounce animation
Active State
    ◉
  [Icon]
   40px
 Opacity: 1.0
 Scale: 1.5
 + Highlight glow/ring
 + Pen line connects to this dot
Dot Icons (Placeholders)
Phase 1 (Sept-Oct):    [📚] Presentation icon
Phase 2 (Nov-Juin):    [👥] Mentorship icon
Phase 3 (3 mois):      [📖] Academic icon
Phase 4 (2 mois):      [🎯] Exam prep icon
Phase 5 (1 mois):      [📝] Interview icon
Phase 6 (3 mois):      [🎓] Post-admission icon

Edge Case: Phase 1 (First)
┌────────────────────────────────────────────────────────────────────────┐
│  Sept                Oct         Nov         Mars       Avril    Juin  │
│   ◉                   ○           ○           ○          ○        ○    │
│   ╫═══════════════════┼───────────┼───────────┼──────────┼────────┤    │
│   ↑                                                                     │
│ Active                                                                  │
└────────────────────────────────────────────────────────────────────────┘

              ┌──────────────────────────────────┐    ┌────────────┐
              │                                  │    │            │
              │   PHASE 1: Active               │    │  Phase 2   │
              │                                  │    │            │
              │   [Icon]                        │    │  [Icon]    │
[NOTHING]     │                                  │    │            │
              │   Présentation des filières     │    │ Accomp.    │
              │                                  │    │ person.    │
              │   4 Masterclass de présentation │    │            │
              │                                  │    │ FADED >>>  │
              │   Sept-Oct                      │    │            │
              │                                  │    └────────────┘
              │   Détails: ...                  │
              │                                  │
              └──────────────────────────────────┘

Edge Case: Phase 6 (Last)
┌────────────────────────────────────────────────────────────────────────┐
│  Sept    Oct         Nov         Mars       Avril              Juin    │
│   ○       ○           ○           ○          ○                  ◉      │
│   ├───────┼───────────┼───────────┼──────────┼══════════════════╫      │
│                                                                  ↑      │
│                                                               Active    │
└────────────────────────────────────────────────────────────────────────┘

┌────────────┐    ┌──────────────────────────────────┐
│            │    │                                  │
│  Phase 5   │    │   PHASE 6: Active               │
│            │    │                                  │              [NOTHING]
│  [Icon]    │    │   [Icon]                        │
│            │    │                                  │
│ Candid.    │    │   Suivi post-admission          │
│ entretiens │    │                                  │
│            │    │   Accompagnement dans la        │
│ <<< FADED  │    │   transition                    │
│            │    │                                  │
└────────────┘    │   3 mois                        │
                  │                                  │
                  │   Détails: ...                  │
                  │                                  │
                  └──────────────────────────────────┘

Card Fade Gradients (Visual Detail)
Left Card (Previous)
┌────────────┐
│████▓▓▓▒▒▒░░│  ← Fade from right to left
│████▓▓▓▒▒▒░░│     (left edge most transparent)
│████▓▓▓▒▒▒░░│
│████▓▓▓▒▒▒░░│  CSS: linear-gradient(to left, 
│████▓▓▓▒▒▒░░│       rgba(0,0,0,0) 0%, 
└────────────┘       rgba(0,0,0,1) 100%)
 ↑        ↑
100%     20%
opacity opacity
Right Card (Next)
┌────────────┐
│░░▒▒▒▓▓▓████│  ← Fade from left to right
│░░▒▒▒▓▓▓████│     (right edge most transparent)
│░░▒▒▒▓▓▓████│
│░░▒▒▒▓▓▓████│  CSS: linear-gradient(to right,
│░░▒▒▒▓▓▓████│       rgba(0,0,0,0) 0%,
└────────────┘       rgba(0,0,0,1) 100%)
 ↑        ↑
20%     100%
opacity opacity

Transition Animation: Going from Phase 2 → Phase 3
Before Transition (Phase 2 Active)
Timeline: Sept ● ─── Oct ◉ ────────── Nov ○ ─── Mars ○
                      ↑
                   Active

Cards:  [Phase 1]    [PHASE 2 Active]    [Phase 3]
         faded          centered            faded
During Transition (200-400ms)
Timeline: Pen line animates from Oct → Nov
          Oct dot scales down (1.5 → 1.0)
          Nov dot scales up (1.0 → 1.5)

Cards:  [Phase 1]         [Phase 2]              [Phase 3]
           ←──────────────────────────────────────→
        slides out      slides left          slides in
        completely      becomes peek      becomes active
        
Animation: transform: translateX(-100%)
After Transition (Phase 3 Active)
Timeline: Sept ● ─── Oct ○ ────────── Nov ◉ ─── Mars ○
                                        ↑
                                     Active

Cards:  [Phase 2]    [PHASE 3 Active]    [Phase 4]
         faded          centered            faded

Keyboard Navigation Behavior
User presses → (Right Arrow):
├─ If on Phase 1-5: Move to next phase
├─ If on Phase 6: Do nothing (already at end)
└─ Visual feedback: Brief highlight on next dot before transition

User presses ← (Left Arrow):
├─ If on Phase 2-6: Move to previous phase
├─ If on Phase 1: Do nothing (already at start)
└─ Visual feedback: Brief highlight on previous dot before transition

Mouse Wheel Hijacking (Optional - Can Add Later)
User scrolls mouse wheel:
├─ Wheel UP (scroll up): Move LEFT (previous phase)
├─ Wheel DOWN (scroll down): Move RIGHT (next phase)
└─ Only active when mouse is hovering over:
    - Timeline bar
    - Card container area
    
⚠️ Warning: This can be disorienting for users!
   Recommend: Test with users before implementing

Click Far Away Animation (e.g., Phase 2 → Phase 6)
Phase 2 → Phase 6 (4 phases away):

Step 1: Calculate distance (4 phases)
Step 2: Rapid-fire animation
        
Timeline animation:
Pen line draws quickly through each phase:
Oct ◉ → Nov ○ (150ms)
       → Mars ○ (150ms)
       → Avril ○ (150ms)
       → Juin ◉ (150ms)
Total: ~600ms (150ms per phase)

Cards animation:
[Phase 2] → [Phase 3] → [Phase 4] → [Phase 5] → [Phase 6]
   Blur effect during rapid transition
   Only first and last cards are sharp
   
OR: Direct jump with fade:
[Phase 2] fades out (200ms)
[Phase 6] fades in (200ms)
Total: 400ms
Recommendation: Use blur/quick-flip for 2-3 phases away, direct fade for 4+ phases away.

Pen Line Animation Detail
┌────────────────────────────────────────────┐
│  Sept ● ─── Oct ○ ══════> Nov ◉           │  
│             ↑      ↑       ↑               │
│          Previous Pen   Active             │
│          phase   draws                     │
│                  here                      │
└────────────────────────────────────────────┘

Pen line CSS:
- SVG path or pseudo-element
- stroke-dasharray for drawing effect
- Animates from previous dot to active dot
- Color: #3D3D3D (pen color from palette)
- Stroke-width: 3px
- Animation duration: 400ms
- Easing: cubic-bezier(0.4, 0.0, 0.2, 1)

Component Structure Summary
<Section id="programme-timeline">
  
  <TimelineBar> (Sticky/Fixed at top during scroll)
    <PenLine /> (SVG animated line)
    <Dots>
      <Dot phase={1} active={false} icon="📚" />
      <Dot phase={2} active={false} icon="👥" />
      <Dot phase={3} active={true} icon="📖" />
      <Dot phase={4} active={false} icon="🎯" />
      <Dot phase={5} active={false} icon="📝" />
      <Dot phase={6} active={false} icon="🎓" />
    </Dots>
  </TimelineBar>

  <CardContainer>
    <Card position="left" opacity={0.3} visible={20%}>
      {phases[currentPhase - 1]}
    </Card>
    
    <Card position="center" opacity={1} visible={100%}>
      {phases[currentPhase]}
    </Card>
    
    <Card position="right" opacity={0.3} visible={20%}>
      {phases[currentPhase + 1]}
    </Card>
  </CardContainer>

</Section>
